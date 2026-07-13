"use client"

import { Arrow, Circle, Line } from "react-konva"

import { BoardElement } from "../types/BoardElement"
import { ToolType } from "../types/ToolType"
import { BOARD } from "../config/BoardConfig"

type Props = {
  element: BoardElement
  tool: ToolType
  selectedId: number | null
  setSelectedId: (id: number | null) => void
  onDrag: (
    id: number,
    x: number,
    y: number
  ) => void,
  readOnly?: boolean
}

export default function BoardElementRenderer({
  element,
  tool,
  selectedId,
  setSelectedId,
  onDrag,
  readOnly = false
}: Props) {

  const commonProps = {
    draggable: !readOnly && tool === "select",

    onClick: (e:any) => {
        e.cancelBubble = true
        if(tool !== "select") return
        setSelectedId(element.id)
    },

    onDragEnd: (e: any) =>
      onDrag(
        element.id,
        e.target.x(),
        e.target.y()
      ),
  }

  switch (element.type) {

    case "player":

        return (
            <Circle
                {...commonProps}
                x={element.x}
                y={element.y}
                radius={BOARD.PLAYER_RADIUS}
                fill={
                    element.team === "blue"
                    ? "#2563eb"
                    : "#dc2626"
                }
                stroke={
                    selectedId === element.id
                    ? "#facc15"
                    : "#ffffff"
                }
                strokeWidth={
                    selectedId === element.id
                    ? BOARD.PLAYER_SELECTED_STROKE
                    : BOARD.PLAYER_STROKE
                }
                shadowBlur={BOARD.SHADOW_BLUR}
            />
        )

    case "ball":

        return (
            <Circle
                {...commonProps}
                x={element.x}
                y={element.y}
                radius={BOARD.BALL_RADIUS}
                fill="#ffffff"
                stroke={
                    selectedId === element.id
                    ? "#facc15"
                    : "#000000"
                }
                strokeWidth={
                    selectedId === element.id
                    ? BOARD.PLAYER_SELECTED_STROKE
                    : BOARD.PLAYER_STROKE
                }
            />
        )

    case "line":

        return (
            <Line
                {...commonProps}
                key={element.id}
                points={element.points || []}
                hitStrokeWidth={20}
                stroke={
                    selectedId === element.id
                        ? "#FFD54F"
                        : "white"
                }
                fill={
                    selectedId === element.id
                        ? "#FFD54F"
                        : "white"
                }
                strokeWidth={
                    selectedId === element.id
                        ? 5
                        : 3
                }
            />
        )

    case "arrow":

        return (
            <Arrow
                {...commonProps}
                key={element.id}
                points={element.points!}
                pointerLength={12}
                pointerWidth={12}
                hitStrokeWidth={20}
                stroke={
                    selectedId === element.id
                        ? "#FFD54F"
                        : "white"
                }
                fill={
                    selectedId === element.id
                        ? "#FFD54F"
                        : "white"
                }
                strokeWidth={
                    selectedId === element.id
                        ? 5
                        : 3
                }
            />
        )

    case "cone":

        return (
            <Circle
                x={element.x}
                y={element.y}
                radius={8}
                stroke={
                    selectedId === element.id
                        ? "#FFD54F"
                        : "white"
                }
                fill={
                    selectedId === element.id
                        ? "#FFD54F"
                        : "white"
                }
                strokeWidth={
                    selectedId === element.id
                        ? 5
                        : 3
                }
                {...commonProps}
            />
        )

    default:

        return null
  }

}