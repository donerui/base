import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useInterval } from '..'
import { ICountdownData, IUseCountdownProps } from './types'
import { diffCalculation } from './utils'

export function useCountdown ({
  from = dayjs().valueOf(),
  to = dayjs().add(10, 'seconds').valueOf(),
  type,
  refreshRateMs = 1000,
  isPaused = false,
  value, 
  incrementBy = 1,
  onChange,
  onEnd 
} : IUseCountdownProps): ICountdownData {
  const [mode, setMode] = useState<'countup' | 'countdown'>(to > from ? 'countup' : 'countdown')
  const [diff, setDiff] = useState(Math.abs(from - to))
  const [counter, setCounter] = useState(0)
  const [countdown, setCountdown] = useState(diffCalculation(value ?? counter, type))
  const [clear, setClear] = useState(false)

  useEffect(() => {
    setMode(to > from ? 'countup' : 'countdown')
    setDiff(Math.abs(from - to))
    setCounter(0)
  }, [from, to])

  useEffect(() => {
    const remaining = mode === 'countup' ? counter : diff - counter
    setCountdown(diffCalculation(value ?? remaining, type))
  }, [value, counter, to, type])

  useInterval(() => {
    setCounter(counter + (type === 'time' ? refreshRateMs : incrementBy))
  }, isPaused ? undefined : refreshRateMs, clear)

  useEffect(() => {
    const _clear = mode === 'countup'
      ? countdown.asMilliseconds >= diff
      : countdown.asMilliseconds <= 0
    setClear(_clear)
    if (_clear) {
      onEnd?.()
    } else {
      onChange?.(countdown)
    }
  }, [countdown])


  return countdown
}
