/**
 * Main page for SPA
 */
import { useMemo, useEffect, useState } from 'preact/hooks'
import InputLogger from '@components/InputLogger'
import InputHandler from '@components/InputHandler'
import StratagemDisplay from '@components/StratagemDisplay'
import Direction from '@util/Direction'
import stratagems, { StratagemInfo } from '@util/StratagemInfo'
import shuffleArray from './util/shuffleArray'
import DiscordHandler from './util/DiscordHandler'

type GameState = {
  stratagemLineup: StratagemInfo[]
  score: number
  gameTimer: number
}

/**
 * Main component for page
 */
export function App() {
  const [inputs, setInputs] = useState<Direction[]>([])
  const [discordReady, setDiscordReady] = useState<string>('')
  const [gameStart, setGameStart] = useState<boolean>(false)
  const [gameState, setGameState] = useState<GameState>({
    stratagemLineup: [],
    score: 0,
    gameTimer: 0,
  })

  const [noTimeLeft, noStratagemsLinedUp, gameOverScreenActive] = useMemo(
    () => [
      gameState.gameTimer <= 0,
      gameState.stratagemLineup.length <= 0,
      gameState.gameTimer <= 0 && gameState.stratagemLineup.length <= 0,
    ],
    [gameState]
  )

  const startGame = () => {
    setGameState({
      stratagemLineup: shuffleArray<StratagemInfo>([...stratagems]).slice(0, 6),
      score: 0,
      gameTimer: 30,
    })
    setInputs([])
  }

  const handleReplay = () => {
    if (gameOverScreenActive) {
      startGame()
    }
  }

  const handleCorrectInput = () => {
    // callback when a correct stratagem is called
    setInputs([])
    setGameState((prev) => {
      const stratagemLineup = [...prev.stratagemLineup]
      stratagemLineup.pop()

      return {
        ...prev,
        stratagemLineup,
        score: prev.score + 1000,
      }
    })
  }

  useEffect(() => {
    // decrement timer
    let triggerNextSecond = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        gameTimer: prev.gameTimer > 0 ? prev.gameTimer - 1 : 0,
      }))
    }, 1000)

    return () => {
      clearTimeout(triggerNextSecond)
    }
  }, [])

  useEffect(() => {
    if (!gameOverScreenActive && noTimeLeft) {
      setGameState((prev) => ({
        ...prev,
        stratagemLineup: [],
      }))
      setInputs([])
    } else if (!gameOverScreenActive && noStratagemsLinedUp) {
      setGameState((prev) => ({
        ...prev,
        gameTimer: 0,
        score: prev.score + 100 * prev.gameTimer,
      }))
    }
  }, [gameOverScreenActive, noTimeLeft, noStratagemsLinedUp])

  useEffect(() => {
    const discordHandler = new DiscordHandler()
    discordHandler.init().then(() => {
      setDiscordReady({
        auth: discordHandler.discordAuth,
        channel: discordHandler.discordChannel,
        participants: discordHandler.discordParticipants,
      })
    })
  }, [])

  useEffect(() => {
    console.log(discordReady)
  }, [discordReady])

  useEffect(() => {
    if (gameStart) {
      startGame()
    }
  }, [gameStart])

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
      {gameStart ? (
        <div>
          <div
            style={{
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <div>Score: {gameState.score}</div>
            <div>Time: {gameState.gameTimer}</div>
            {gameOverScreenActive && (
              <a
                onClick={() => {
                  handleReplay()
                }}
              >
                Play Again?
              </a>
            )}
          </div>
          <StratagemDisplay
            inputs={inputs}
            setInputs={setInputs}
            stratagems={gameState.stratagemLineup}
            handleCorrectInput={handleCorrectInput}
          />
          <InputLogger value={inputs} />
          <InputHandler
            inputs={inputs}
            setInputs={setInputs}
            allowed={
              gameState.gameTimer > 0 && gameState.stratagemLineup.length > 0
            }
          />
        </div>
      ) : (
        <div>
          <button type="button" onClick={() => setGameStart(true)}>
            Start Game
          </button>
        </div>
      )}
    </main>
  )
}
