"use client"

import { Stage, Layer, Circle } from "react-konva"
import { useEffect, useState } from "react"

import { saveBoard } from "../services/saveBoard"

import { useAuthStore } from "@/store/authStore"

import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

type ElementType = {
  id: number
  type: "player" | "ball"
  team?: "blue" | "red"
  x: number
  y: number
}

export default function BoardCanvas({
  externalBoard,
}: any) {
  const [elements, setElements] = useState<
    ElementType[]
  >([])

  const user = useAuthStore(
    (state) => state.user
  )

  useEffect(() => {
    if (externalBoard) {
      setElements(externalBoard.elements)
    }
  }, [externalBoard])

  const addBluePlayer = () => {
    setElements((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "player",
        team: "blue",
        x: 180 + Math.random() * 120,
        y: 100 + Math.random() * 300,
      },
    ])
  }

  const addRedPlayer = () => {
    setElements((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "player",
        team: "red",
        x: 500 + Math.random() * 120,
        y: 100 + Math.random() * 300,
      },
    ])
  }

  const addBall = () => {
    const exists = elements.find(
      (el) => el.type === "ball"
    )

    if (exists) {
      return alert("Ya hay un balón")
    }

    setElements((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "ball",
        x: 400,
        y: 250,
      },
    ])
  }

  const handleDrag = (
    id: number,
    x: number,
    y: number
  ) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? { ...el, x, y }
          : el
      )
    )
  }

  const handleSave = async () => {
    if (!user) {
      return alert(
        "Debes estar logueado"
      )
    }

    await saveBoard({
      userId: user.uid,
      elements,
    })

    alert("Pizarra guardada")
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">
            Pizarra táctica
          </h2>

          <p className="text-gray-500 text-sm">
            Crea y organiza jugadas tácticas
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          onClick={addBluePlayer}
          className="bg-blue-600"
        >
          + Equipo Azul
        </Button>

        <Button
          onClick={addRedPlayer}
          className="bg-red-600"
        >
          + Equipo Rojo
        </Button>

        <Button
          onClick={addBall}
        >
          + Balón
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <Stage
          width={800}
          height={500}
          className="bg-green-700"
        >
          <Layer>

            {elements.map((el) => (
              <Circle
                key={el.id}
                x={el.x}
                y={el.y}
                radius={
                  el.type === "player"
                    ? 18
                    : 10
                }
                fill={
                  el.type === "ball"
                    ? "#ffffff"
                    : el.team === "blue"
                    ? "#2563eb"
                    : "#dc2626"
                }
                stroke="#ffffff"
                strokeWidth={2}
                shadowBlur={5}
                draggable
                onDragEnd={(e) =>
                  handleDrag(
                    el.id,
                    e.target.x(),
                    e.target.y()
                  )
                }
              />
            ))}

          </Layer>
        </Stage>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave}>
          Guardar pizarra
        </Button>
      </div>
    </Card>
  )
}