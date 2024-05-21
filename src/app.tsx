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
  const [strats, setStrats] = useState<StratagemInfo[]>([])

  useEffect(() => {
    setStrats([...stratagems, ...stratagems])
  }, [])

  const handleCorrectInput = () => {
    setInputs([])
    setStrats((prev) => {
      const copy = [...prev]
      copy.pop()
      return copy
    })
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
        <StratagemDisplay
          inputs={inputs}
          setInputs={setInputs}
          stratagems={strats}
          handleCorrectInput={handleCorrectInput}
        />
        <InputLogger value={inputs} />
        <InputHandler inputs={inputs} setInputs={setInputs} />
      </div>
    </main>
  )
}
