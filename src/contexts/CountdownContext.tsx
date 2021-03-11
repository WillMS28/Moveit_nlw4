import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  resetCountdown: () => void
  startCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({  } as CountdownContextData) 

let countdownTimeout: NodeJS.Timeout

export function CountdownProider({ children }: CountdownProviderProps) {

  const { starNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60)
  const [isActive,setIsActive] = useState(false)
  const [hasFinished, setHasFinshed] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(0.1 * 60)
    setHasFinshed(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if ( isActive && time === 0 ) {
      setHasFinshed(true)
      setIsActive(false)
      starNewChallenge()
    }
  }, [isActive, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      resetCountdown,
      startCountdown
    }}>
      { children }

    </CountdownContext.Provider>
  )
}


