export interface IUseCountdownProps {
  type: 'time' | 'number'
  from?: number
  to?: number
  value?: number
  refreshRateMs?: number
  isPaused?: boolean
  incrementBy?: number
  onChange?: (data: ICountdownData) => void
  onEnd?: () => void
}

export interface ICountdownData {
  years: number
  asYears: number
  months: number
  asMonths: number
  weeks: number
  asWeeks: number
  days: number
  asDays: number
  hours: number
  asHours: number
  minutes: number
  asMinutes: number
  seconds: number
  asSeconds: number
  milliseconds: number
  asMilliseconds: number
}
