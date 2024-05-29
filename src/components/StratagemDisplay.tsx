import { Dispatch, StateUpdater, useEffect, useState } from 'preact/hooks'
import Arrow from './Arrow'
import Direction from '@util/Direction'
import { StratagemInfo } from '@util/StratagemInfo'

/*
 * Stratagem challenge component, handles tracking user input.
 * @params {
 *  stratagemInfo: StratagemInfo;
 *  inputs: Direction[];
 *  backgroundColor: string
 * }  props
 */
export function Stratagem({
  stratagemInfo,
  inputs,
  backgroundColor,
}: {
  stratagemInfo: StratagemInfo | null
  inputs: Direction[]
  backgroundColor: string
}) {
  const mainStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor,
  }

  return (
    <>
      {stratagemInfo ? (
        <div style={mainStyle}>
          <img width={50} height={50} src={stratagemInfo.image} />
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
      ) : (
        <div style={{ ...mainStyle, justifyContent: 'center' }}>
          <div style={{ height: '50px', lineHeight: '50px' }}>
            Game Over
            {/*Game Over*/}
          </div>
        </div>
      )}
    </>
  )
}

export function GhostStratagem({
  stratagemInfo,
}: {
  stratagemInfo: StratagemInfo
}) {
  const mainStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    opacity: 0.1,
  }
  return stratagemInfo ? (
    <div style={mainStyle}>
      <img width={50} height={50} src={stratagemInfo.image} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {stratagemInfo.pattern.map((direction, idx) => (
          <Arrow
            key={`pattern-input-${idx}`}
            opacity={100}
            direction={direction}
          />
        ))}
      </div>
    </div>
  ) : (
    <div style={mainStyle}>
      <div style={{ height: '50px' }} />
    </div>
  )
}

/*
 * Controller for stratagem...
 */
export default function StratagemDisplay({
  inputs,
  setInputs,
  stratagems,
  handleCorrectInput,
}: {
  inputs: Direction[]
  setInputs: Dispatch<StateUpdater<Direction[]>>
  stratagems: StratagemInfo[]
  handleCorrectInput: () => void
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
    const handleIncorrectInput = () => {
      setInputs([])
      toggleIncorrectBackground()
    }

    if (stratagems.length) {
      if (!stratagems[stratagems.length - 1].checkCorrect(inputs)) {
        handleIncorrectInput()
      }
      if (stratagems[stratagems.length - 1].checkComplete(inputs)) {
        handleCorrectInput()
      }
    }
  }, [inputs, setInputs, stratagems, handleCorrectInput])

  return (
    <div>
      {stratagems.length ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <GhostStratagem stratagemInfo={stratagems[stratagems.length - 2]} />
          <Stratagem
            inputs={inputs}
            stratagemInfo={stratagems[stratagems.length - 1]}
            backgroundColor={backgroundColor}
          />
        </div>
      ) : (
        <Stratagem
          inputs={inputs}
          stratagemInfo={null}
          backgroundColor={backgroundColor}
        />
      )}
    </div>
  )
}
