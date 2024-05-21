/**
 * Contains InputLogger component.
 */
import Arrow from '@components/Arrow'
import Direction from '@util/Direction'

/**
 * Component to display users recent inputs.
 * @param {props} {value: Direction[]}  List of recent user inputs.
 */
export default function InputLogger({ value }: { value: Direction[] }) {
  const recentValues = [...value].reverse().slice(0, 10).reverse()
  return (
    <div
      style={{
        display: 'flex',
        marginTop: '30px',
        marginBottom: '30px',
        height: '30px',
        width: '270px',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
      }}
    >
      {recentValues.map((val, idx) => (
        <Arrow key={`logged_input_${idx}`} opacity={100} direction={val} />
      ))}
    </div>
  )
}
