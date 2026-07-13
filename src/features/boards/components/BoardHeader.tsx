"use client"

import Button from "@/components/ui/Button"
import PageHeader from "@/components/ui/PageHeader"
import Input from "@/components/ui/Input"

type Props = {
  boardId: string | null

  boardName: string
  setBoardName: (value: string) => void

  boardType: "full" | "half" | "area"
  setBoardType: (
    value: "full" | "half" | "area"
  ) => void

  onBack: () => void
}

export default function BoardHeader({
  boardId,
  boardName,
  setBoardName,
  boardType,
  setBoardType,
  onBack,
}: Props) {
  return (
    <>
      <div className="flex items-center justify-between mb-8">

        <PageHeader
          title={
            boardId
              ? "Editar pizarra"
              : "Nueva pizarra"
          }
          description="Diseña y organiza tus jugadas."
        />

        <Button
          variant="outline"
          onClick={onBack}
        >
          ← Volver
        </Button>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <Input
          label="Nombre"
          value={boardName}
          onChange={(e) =>
            setBoardName(e.target.value)
          }
          placeholder="Ej. Presión alta"
        />

        <div>

          <label className="block text-sm font-medium mb-2">
            Tipo de pizarra
          </label>

          <select
            value={boardType}
            onChange={(e) =>
              setBoardType(
                e.target.value as
                  | "full"
                  | "half"
                  | "area"
              )
            }
            className="w-full rounded-xl border border-[var(--border)] px-4 py-2.5 bg-white"
          >
            <option value="full">
              Campo completo
            </option>

            <option value="half">
              Medio campo
            </option>

            <option value="area">
              Situación de área
            </option>

          </select>

        </div>

      </div>
    </>
  )
}