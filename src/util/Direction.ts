/**
 * Defines valid input directions.
 */
enum Direction {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
}

/*
 * Map keycode strings from KeyboardEvents to Directions.
 */
export const keyCodeToDirection: { [key: string]: Direction } = {
  ArrowDown: Direction.down,
  s: Direction.down,
  ArrowLeft: Direction.left,
  a: Direction.left,
  ArrowRight: Direction.right,
  d: Direction.right,
  ArrowUp: Direction.up,
  w: Direction.up,
}

export default Direction
