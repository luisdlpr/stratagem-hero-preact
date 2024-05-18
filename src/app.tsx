import { useEffect, useState } from 'preact/hooks'
import Arrow, { Direction } from './components/Arrow'

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

export function App() {
  const [inputs, setInputs] = useState<string[]>([])

  useEffect(() => {
    const inputHandler = (e: KeyboardEvent) => {
      setInputs((cur: string[]) => [...cur, e.key])
      console.log(e.key)
    }

    document.addEventListener('keydown', inputHandler)

    return () => {
      document.removeEventListener('keydown', inputHandler)
    }
  }, [setInputs])

  return (
    <div>
      {inputs.map((key, idx) => (
        <Arrow key={idx} direction={keyCodeToDirection[key]} />
      ))}
    </div>
  )
}
