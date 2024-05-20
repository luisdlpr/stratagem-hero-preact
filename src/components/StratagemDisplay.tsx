import Arrow, { Direction } from './Arrow'
import machineGunSprite from '/machine_gun.webp'

/*
 * Stratagem challenge component, handles tracking user input.
 */
export function Stratagem({
  image,
  pattern,
  inputs,
}: {
  image: string
  pattern: Direction[]
  inputs: Direction[]
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <img src={image} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {pattern.map((direction, idx) => (
          <Arrow
            key={`pattern-input-${idx}`}
            opacity={inputs[idx] == pattern[idx] ? 100 : 10}
            direction={direction}
          />
        ))}
      </div>
    </div>
  )
}

/*
 * Controller for stratagem...
 */
export default function StratagemDisplay({ inputs }: { inputs: Direction[] }) {
  return (
    <Stratagem
      inputs={inputs}
      image={machineGunSprite}
      pattern={[
        Direction.down,
        Direction.up,
        Direction.left,
        Direction.down,
        Direction.up,
        Direction.right,
        Direction.down,
        Direction.up,
      ]}
    />
  )
}
