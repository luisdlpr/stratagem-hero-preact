import { Dispatch, StateUpdater, useEffect, useState } from 'preact/hooks'
import Arrow, { Direction } from './Arrow'
import machineGunSprite from '/machine_gun.webp'

export class StratagemInfo {
  image: string
  pattern: Direction[]

  constructor(image: string, pattern: Direction[]) {
    this.image = image
    this.pattern = pattern
  }

  checkCorrect(inputs: Direction[]) {
    return inputs.every((direction, idx) => this.pattern[idx] == direction)
  }
}

/*
 * Stratagem challenge component, handles tracking user input.
 */
export function Stratagem({
  stratagemInfo,
  inputs,
  backgroundColor,
}: {
  stratagemInfo: StratagemInfo
  inputs: Direction[]
  backgroundColor: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor,
      }}
    >
      <img src={stratagemInfo.image} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {stratagemInfo.pattern.map((direction, idx) => (
          <Arrow
            key={`pattern-input-${idx}`}
            opacity={inputs[idx] == stratagemInfo.pattern[idx] ? 100 : 10}
            direction={direction}
          />
        ))}
      </div>
    </div>
  )
}

const machineGun = new StratagemInfo(machineGunSprite, [
  Direction.down,
  Direction.up,
  Direction.left,
  Direction.down,
  Direction.up,
  Direction.right,
  Direction.down,
  Direction.up,
])

/*
 * Controller for stratagem...
 */
export default function StratagemDisplay({
  inputs,
  setInputs,
}: {
  inputs: Direction[]
  setInputs: Dispatch<StateUpdater<Direction[]>>
}) {
  const regularBackground = 'rgba(0, 0, 0, 0.1)'
  const [backgroundColor, setBackgroundColor] =
    useState<string>(regularBackground)

  const toggleIncorrectBackground = () => {
    const incorrectBackground = 'rgba(100, 0, 0, 0.5)'
    setBackgroundColor(incorrectBackground)
    setTimeout(() => {
      setBackgroundColor(regularBackground)
    }, 500)
  }

  useEffect(() => {
    if (!machineGun.checkCorrect(inputs)) {
      setInputs([])
      toggleIncorrectBackground()
    }
  }, [inputs, setInputs])

  return (
    <Stratagem
      inputs={inputs}
      stratagemInfo={machineGun}
      backgroundColor={backgroundColor}
    />
  )
}
