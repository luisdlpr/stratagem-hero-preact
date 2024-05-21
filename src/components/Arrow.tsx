import up from '/up_arrow.webp'
import down from '/down_arrow.webp'
import left from '/left_arrow.webp'
import right from '/right_arrow.webp'
import Direction from '@util/Direction'

/**
 * Arrow component to display correct sprite image for each direction taken from
 * the Helldivers 2 game.
 * @param props: {
 *  direction: Direction - direction of arrow.
 *  opacity: Number - opacity value for arrow sprite.
 * }
 */
export default function Arrow({
  direction,
  opacity,
}: {
  direction: Direction
  opacity: Number
}) {
  const sprite = { up, down, left, right }
  return <img style={{ opacity: `${opacity}%` }} src={sprite[direction]} />
}
