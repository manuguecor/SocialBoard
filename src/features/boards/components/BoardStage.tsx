"use client"

import { Stage, Layer, Circle, Rect } from "react-konva"

import { ToolType } from "../types/ToolType"
import { BoardElement } from "../types/BoardElement"


import { BOARD } from "../config/BoardConfig"
import BoardElementRenderer from "./BoardElementRenderer"
import { useState } from "react"

type Props = {
    boardType: "full" | "half" | "area"
    width?: number
    height?: number
    tool: ToolType
    elements: BoardElement[]
    selectedId: number | null
    setSelectedId: (id: number | null) => void
    setElements: React.Dispatch<
        React.SetStateAction<BoardElement[]>
    >
    readOnly?: boolean
}

export default function BoardStage({
    boardType,
    width,
    height,
    tool,
    elements,
    selectedId,
    setSelectedId,
    setElements,
    readOnly = false,
}: Props) {

    const [drawingLine, setDrawingLine] = useState<number[] | null>(null)
    const [drawingArrow, setDrawingArrow] = useState<number[] | null>(null)

    const stageWidth = width ?? BOARD.WIDTH
    const stageHeight = height ?? BOARD.HEIGHT

    const scaleX = stageWidth / BOARD.WIDTH
    const scaleY = stageHeight / BOARD.HEIGHT 

    const addBluePlayer = (x: number, y: number) => {
        setElements((prev) => [
            ...prev,
            {
            id: Date.now(),
            type: "player",
            team: "blue",
            x,
            y,
            },
        ])
    }

    const addRedPlayer = (x: number, y: number) => {
        setElements((prev) => [
            ...prev,
            {
            id: Date.now(),
            type: "player",
            team: "red",
            x,
            y,
            },
        ])
    }

    const addBall = (x: number, y: number) => {

        const exists = elements.some(
            (e) => e.type === "ball"
        )

        if (exists) return

        setElements((prev) => [
            ...prev,
            {
            id: Date.now(),
            type: "ball",
            x,
            y,
            },
        ])
    }

    const addCone = (x: number, y: number) => {

        setElements((prev) => [
            ...prev,
            {
            id: Date.now(),
            type: "cone",
            x,
            y,
            },
        ])
    }

    const startArrow = (x: number, y: number) => {

        if (!drawingArrow) {

            setDrawingArrow([x, y])

            return
        }

        setElements((prev) => [
            ...prev,
            {
            id: Date.now(),
            type: "arrow",
            points: [
                ...drawingArrow,
                x,
                y,
            ],
            },
        ])

        setDrawingArrow(null)
    }

    const startLine = (x: number, y: number) => {

        if (!drawingLine) {

            setDrawingLine([x, y])

            return
        }

        setElements((prev) => [
            ...prev,
            {
            id: Date.now(),
            type: "line",
            points: [
                ...drawingLine,
                x,
                y,
            ],
            },
        ])

        setDrawingLine(null)
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

    const handleStageClick = (e: any) => {

        if (
            e.target.className !== "Stage" &&
            e.target.className !== "Rect"
        ) {
            return
        }

        const pos = e.target.getStage().getPointerPosition()

        if (!pos) return

        switch(tool){

            case "blue-player":

                addBluePlayer(pos.x,pos.y)
                break

            case "red-player":

                addRedPlayer(pos.x,pos.y)
                break

            case "ball":

                addBall(pos.x,pos.y)
                break

            case "arrow":

                startArrow(pos.x,pos.y)
                break

            case "line":

                startLine(pos.x,pos.y)
                break

            default:

                setSelectedId(null)

        }

    }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">

      <Stage
        width={stageWidth}
        height={stageHeight}
        className="bg-green-700"
        onMouseDown={readOnly ? undefined: handleStageClick}
      >

        <Layer scaleX={scaleX} scaleY={scaleY}>

          <Rect
            x={0}
            y={0}
            width={BOARD.WIDTH}
            height={BOARD.HEIGHT}
            fill="#15803d"
          />

          {boardType === "half" && (
            <>
              <Rect
                x={0}
                y={0}
                width={BOARD.WIDTH}
                height={BOARD.HEIGHT}
                stroke="white"
                strokeWidth={2}
              />

              <Circle
                x={BOARD.WIDTH / 2}
                y={BOARD.HEIGHT}
                radius={60}
                stroke="white"
                strokeWidth={2}
              />
            </>
          )}

          {boardType === "area" && (
            <>
              <Rect
                x={250}
                y={0}
                width={300}
                height={180}
                stroke="white"
                strokeWidth={2}
              />

              <Rect
                x={325}
                y={0}
                width={150}
                height={70}
                stroke="white"
                strokeWidth={2}
              />

              <Circle
                x={BOARD.WIDTH / 2}
                y={220}
                radius={50}
                stroke="white"
                strokeWidth={2}
              />
            </>
          )}

          {elements.map((element) => (

            <BoardElementRenderer

              key={element.id}

              element={element}

              tool={tool}

              selectedId={selectedId}

              setSelectedId={setSelectedId}

              onDrag={handleDrag}

            />

          ))}

        </Layer>

      </Stage>

    </div>
  )
}