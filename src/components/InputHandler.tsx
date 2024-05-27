import Arrow from '@components/Arrow'
import { Dispatch, StateUpdater, useCallback, useEffect } from 'preact/hooks'
import Direction from '@util/Direction'

/*
 * Compare given direction to last direction input.
 * @param {Direction[]} inputs    array of user directional inputs.
 * @param {Direction}   direction directional input to compare to.
 */
function isLastInput(inputs: Direction[], direction: Direction) {
  return inputs[inputs.length - 1] === direction
}

/**
 * Button component that adds input on click.
 * @param {
 *  direction: Direction  direction of arrow to render
 *  addInput: (Direction) => void callback to add directional input to user inputs.
 *  highlight: (boolean) boolean controlling border color of arrow button.
 * } 'props'
 */
export function ArrowButton({
  direction,
  addInput,
  highlight,
}: {
  direction: Direction
  addInput: (direction: Direction) => void
  highlight: boolean
}) {
  return (
    <button
      type="button"
      className="arrowButton"
      onClick={() => addInput(direction)}
      style={{ borderColor: highlight ? 'gold' : 'black', margin: '5px' }}
    >
      <Arrow direction={direction} opacity={100} />
    </button>
  )
}

/*
 * Map keycode strings from KeyboardEvents to Directions.
 */
const keyCodeToDirection: { [key: string]: Direction } = {
  ArrowDown: Direction.down,
  s: Direction.down,
  ArrowLeft: Direction.left,
  a: Direction.left,
  ArrowRight: Direction.right,
  d: Direction.right,
  ArrowUp: Direction.up,
  w: Direction.up,
}

/*
 * Handles user input with on screen controls and listener for keyboard input.
 * @param {setInputs} Dispatch<StateUpdater<Direction[]>> state updater for input list.
 * @param {inputs} Direction[]                            state for input list.
 */
export default function InputHandler({
  setInputs,
  inputs,
  allowed,
}: {
  setInputs: Dispatch<StateUpdater<Direction[]>>
  inputs: Direction[]
  allowed: boolean
}) {
  const addInput = useCallback(
    (direction: Direction) => {
      if (allowed) {
        setInputs((cur: Direction[]) => [...cur, direction])
      }
    },
    [setInputs, allowed]
  )

  const inputButtons = {
    up: (
      <ArrowButton
        direction={Direction.up}
        addInput={addInput}
        highlight={isLastInput(inputs, Direction.up)}
      />
    ),
    left: (
      <ArrowButton
        direction={Direction.left}
        addInput={addInput}
        highlight={isLastInput(inputs, Direction.left)}
      />
    ),
    down: (
      <ArrowButton
        direction={Direction.down}
        addInput={addInput}
        highlight={isLastInput(inputs, Direction.down)}
      />
    ),
    right: (
      <ArrowButton
        direction={Direction.right}
        addInput={addInput}
        highlight={isLastInput(inputs, Direction.right)}
      />
    ),
  }

  /*
   * Handle keyboard input
   */
  useEffect(() => {
    const inputHandler = (e: KeyboardEvent) => {
      if (e.key in keyCodeToDirection) {
        addInput(keyCodeToDirection[e.key])
      }
    }

    document.addEventListener('keydown', inputHandler)

    return () => {
      document.removeEventListener('keydown', inputHandler)
    }
  }, [addInput])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>{inputButtons.up}</div>
      <div>
        {inputButtons.left}
        {inputButtons.down}
        {inputButtons.right}
      </div>
    </div>
  )
}
