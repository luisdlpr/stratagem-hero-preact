/**
 * Main page for SPA
 */
import { useEffect, useState } from 'preact/hooks'
import InputLogger from '@components/InputLogger'
import InputHandler from '@components/InputHandler'
import StratagemDisplay from '@components/StratagemDisplay'
import Direction from '@util/Direction'
import stratagems, { StratagemInfo } from '@util/StratagemInfo'

/**
 * Main component for page
 */
export function App() {
  const [inputs, setInputs] = useState<Direction[]>([])
  const [gameStrats, setGameStrats] = useState<StratagemInfo[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameTimer, setGameTimer] = useState<number>(30)

  useEffect(() => {
    if (gameTimer) {
      let triggerNextSecond = setTimeout(() => {
        setGameTimer((prev) => prev - 1)
      }, 1000)

      return () => {
        clearTimeout(triggerNextSecond)
      }
    }
  }, [gameTimer])

  useEffect(() => {
    if (gameTimer <= 0) {
      setGameStrats([])
      setInputs([])
    }
  }, [gameTimer, gameStrats])

  useEffect(() => {
    setGameStrats([...stratagems, ...stratagems])
  }, [])

  const handleCorrectInput = () => {
    setInputs([])
    setGameStrats((prev) => {
      const copy = [...prev]
      copy.pop()
      return copy
    })
    setScore((prev) => prev + 1000)
  }

  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div>
        <div>Score: {score}</div>
        <div>Time: {gameTimer}</div>
        <StratagemDisplay
          inputs={inputs}
          setInputs={setInputs}
          stratagems={gameStrats}
          handleCorrectInput={handleCorrectInput}
        />
        <InputLogger value={inputs} />
        <InputHandler
          inputs={inputs}
          setInputs={setInputs}
          allowed={gameTimer > 0 && gameStrats.length > 0}
        />
      </div>
    </main>
  )
}
