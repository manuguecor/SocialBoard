"use client"

import Button from "@/components/ui/Button"

type Props = {
  boardId: string | null

  selectedId: number | null

  onDeleteSelected: () => void

  onClear: () => void

  onSave: () => void
}

export default function BoardFooter({
  boardId,
  selectedId,
  onDeleteSelected,
  onClear,
  onSave,
}: Props) {

  return (

    <div className="mt-8 flex justify-between">

      <div className="flex gap-3">

        <Button
          variant="danger"
          onClick={onClear}
        >
          Limpiar
        </Button>

        {selectedId && (

          <Button
            variant="outline"
            onClick={onDeleteSelected}
          >
            Eliminar seleccionado
          </Button>

        )}

      </div>

      <Button
        variant="success"
        onClick={onSave}
      >
        {boardId
          ? "Guardar cambios"
          : "Crear pizarra"}
      </Button>

    </div>

  )
}