"use client"

import { Stage, Layer, Circle, Rect } from "react-konva"
import { useEffect, useState } from "react"
import { saveBoard } from "../services/saveBoard"
import { useAuthStore } from "@/store/authStore"

type ElementType = {
  id: number
  type: "player" | "ball"
  x: number
  y: number
}

export default function BoardCanvas({ externalBoard }: any) {
    const [elements, setElements] = useState<ElementType[]>([])

    useEffect(() => {
    if (externalBoard) {
        setElements(externalBoard.elements)
    }
    }, [externalBoard])

    const addPlayer = () => {
        setElements((prev) => [
        ...prev,
        {
            id: Date.now(),
            type: "player",
            x: 100,
            y: 100,
        },
        ])
    }

    const addBall = () => {
        const exists = elements.find((el) => el.type === "ball")
        if (exists) {
            return alert("Ya hay un balón")
        } else {
            setElements((prev) => [
            ...prev,
            {
                id: Date.now(),
                type: "ball",
                x: 200,
                y: 200,
            },
            ])
        }
    }

    const handleDrag = (id: number, x: number, y: number) => {
        setElements((prev) =>
        prev.map((el) => (el.id === id ? { ...el, x, y } : el))
        )
    }

    const user = useAuthStore((state) => state.user)

    const handleSave = async () => {
    if (!user) return alert("Debes estar logueado")

        await saveBoard({
            userId: user.uid,
            elements,
        })

        alert("Pizarra guardada")
    }

    const loadBoard = (board: any) => {
        setElements(board.elements)
    }

    return (
        <div>
        {/* Controles */}
        <div className="mb-4">
            <button onClick={addPlayer} className="mr-2 border p-2">
            + Jugador
            </button>

            <button onClick={addBall} className="border p-2">
            + Balón
            </button>
        </div>

        <Stage width={800} height={500}>
            <Layer>
            {/* Campo */}
            <Rect width={800} height={500} fill="#0a7f3f" />

            {/* Elementos */}
            {elements.map((el) => (
                <Circle
                key={el.id}
                x={el.x}
                y={el.y}
                radius={el.type === "player" ? 15 : 8}
                fill={el.type === "player" ? "blue" : "white"}
                draggable
                onDragEnd={(e) =>
                    handleDrag(el.id, e.target.x(), e.target.y())
                }
                />
            ))}
            </Layer>
        </Stage>

        <div className="mb-4">
            <button onClick={handleSave} className="mr-2 border p-2">
                Guardar pizarra
            </button>
        </div>
        </div>
    )
}