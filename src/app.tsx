/**
 * Main page for SPA
 */
import { useState } from 'preact/hooks'
import InputLogger from '@components/InputLogger'
import { Direction } from '@components/Arrow'
import InputHandler from './components/InputHandler'
import StratagemDisplay from './components/StratagemDisplay'

/**
 * Main component for page
 */
export function App() {
  const [inputs, setInputs] = useState<Direction[]>([])

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
        <StratagemDisplay inputs={inputs} />
        <InputLogger value={inputs} />
        <InputHandler inputs={inputs} setInputs={setInputs} />
      </div>
    </main>
  )
}
