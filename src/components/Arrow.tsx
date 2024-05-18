import up from '/up_arrow.webp'
import down from '/down_arrow.webp'
import left from '/left_arrow.webp'
import right from '/right_arrow.webp'

export enum Direction {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
}

export default function Arrow({ direction }: { direction: Direction }) {
  const sprite = { up, down, left, right }
  return <img src={sprite[direction]} />
}
