import { useEffect, useState } from 'react'

interface CountdownProps {
  targetDate: string // ISO date string
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Azerbaijan timezone is UTC+4
      const now = new Date()
      const azerbaijanOffset = 4 * 60 * 60 * 1000 // 4 hours in milliseconds
      const azerbaijanTime = new Date(now.getTime() + azerbaijanOffset)

      const target = new Date(targetDate + 'T00:00:00+04:00') // Assume target date is in Azerbaijan time
      const difference = target.getTime() - azerbaijanTime.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const { days, hours, minutes, seconds } = timeLeft

  return (
    <div className="flex items-center justify-center gap-4 text-center font-display">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-black md:text-4xl">{days.toString().padStart(2, '0')}</div>
        <div className="text-sm text-slate-600">Days</div>
      </div>
      <div className="text-2xl font-bold text-black md:text-3xl">:</div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-black md:text-4xl">{hours.toString().padStart(2, '0')}</div>
        <div className="text-sm text-slate-600">Hours</div>
      </div>
      <div className="text-2xl font-bold text-black md:text-3xl">:</div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-black md:text-4xl">{minutes.toString().padStart(2, '0')}</div>
        <div className="text-sm text-slate-600">Minutes</div>
      </div>
      <div className="text-2xl font-bold text-black md:text-3xl">:</div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-black md:text-4xl">{seconds.toString().padStart(2, '0')}</div>
        <div className="text-sm text-slate-600">Seconds</div>
      </div>
    </div>
  )
}

export default Countdown