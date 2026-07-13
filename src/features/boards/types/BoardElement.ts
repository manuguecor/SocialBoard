export type BoardElement = {
  id: number

  type:
    | "player"
    | "ball"
    | "arrow"
    | "line"
    | "cone"

  team?: "blue" | "red"

  x?: number
  y?: number

  points?: number[]

}