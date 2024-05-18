/**
 * Contains InputLogger component.
 */
import Arrow, { Direction } from '@components/Arrow'

/**
 * Component to display users past inputs
 */
export default function InputLogger({ value }: { value: Direction[] }) {
  return (
    <div>
      {value.map((val, idx) => (
        <Arrow key={`logged_input_${idx}`} direction={val} />
      ))}
    </div>
  )
}
