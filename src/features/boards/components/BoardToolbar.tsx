"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import { ToolType } from "../types/ToolType"

type Props = {
  tool: ToolType
  onChange: (tool: ToolType) => void
}

export default function BoardToolbar({
  tool,
  onChange,
}: Props) {
  return (
    <Card className="w-56 shrink-0">

      <h3 className="font-semibold mb-5">
        Herramientas
      </h3>

      <div className="space-y-2">

        <Button
          fullWidth
          variant={
            tool === "select"
              ? "primary"
              : "outline"
          }
          onClick={() =>
            onChange("select")
          }
        >
          👆 Seleccionar
        </Button>

        <Button
          fullWidth
          variant={
            tool === "blue-player"
              ? "primary"
              : "outline"
          }
          onClick={() =>
            onChange("blue-player")
          }
        >
          🔵 Equipo azul
        </Button>

        <Button
          fullWidth
          variant={
            tool === "red-player"
              ? "primary"
              : "outline"
          }
          onClick={() =>
            onChange("red-player")
          }
        >
          🔴 Equipo rojo
        </Button>

        <Button
          fullWidth
          variant={
            tool === "ball"
              ? "primary"
              : "outline"
          }
          onClick={() =>
            onChange("ball")
          }
        >
          ⚽ Balón
        </Button>

        <Button
          fullWidth
          variant={
            tool === "arrow"
              ? "primary"
              : "outline"
          }
          onClick={() =>
            onChange("arrow")
          }
        >
          ↗ Flecha
        </Button>

        <Button
          fullWidth
          variant={
            tool === "line"
              ? "primary"
              : "outline"
          }
          onClick={() =>
            onChange("line")
          }
        >
          ➖ Línea
        </Button>

      </div>

    </Card>
  )
}