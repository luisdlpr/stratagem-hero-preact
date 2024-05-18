/**
 * Main page for SPA
 */
import { useEffect, useState } from 'preact/hooks'
import InputLogger from '@components/InputLogger'
import { Direction } from '@components/Arrow'

/**
 * Main component for page
 */
export function App() {
  const [inputs, setInputs] = useState<Direction[]>([])

  useEffect(() => {
    const inputHandler = (e: KeyboardEvent) => {
      /**
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

      if (e.key in keyCodeToDirection) {
        setInputs((cur: Direction[]) => [...cur, keyCodeToDirection[e.key]])
      }

      console.log(e.key, keyCodeToDirection[e.key] || 'non-directional')
    }

    document.addEventListener('keydown', inputHandler)

    return () => {
      document.removeEventListener('keydown', inputHandler)
    }
  }, [setInputs])

  return (
    <div>
      <InputLogger value={inputs} />
    </div>
  )
}
