/**
 * Contains Direction enum and Arrow Component.
 */

import up from '/up_arrow.webp'
import down from '/down_arrow.webp'
import left from '/left_arrow.webp'
import right from '/right_arrow.webp'

/**
 * Defines valid input directions.
 */
export enum Direction {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
}

/**
 * Arrow component to display correct sprite image for each direction taken from
 * the Helldivers 2 game.
 * @param props: { direction: Direction }
 */
export default function Arrow({ direction }: { direction: Direction }) {
  const sprite = { up, down, left, right }
  return <img src={sprite[direction]} />
}
