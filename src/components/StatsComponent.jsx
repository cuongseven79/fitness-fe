import { useState, useEffect } from 'react'
import { getDataDashboard } from '../api/homeService'

const StatsComponent = () => {

  const totalDuration = 15000 // 15 seconds
  const interval = 20 // Update approximately every 16 milliseconds for smoother animation

  const [statisData, setStatsData] = useState([
    { label: 'Programs', value: 0 },
    { label: 'Members', value: 0 },
    { label: 'Coachs', value: 0 },
    { label: 'Years of Experience', value: 0 },
  ])

  async function fetchStatistical() {
    const { statisData } = await getDataDashboard("/statistics");
    setStatsData(statisData.map(stat => ({ ...stat, currentValue: 0 }))) // Initialize currentValue to 0 for the animation
  }

  useEffect(() => {
    fetchStatistical()
  }, [])

  useEffect(() => {
    const steps = Math.ceil(totalDuration / interval)

    const intervalId = setInterval(() => {
      setStatsData((prevStatsData) =>
        prevStatsData.map((stat) => ({
          ...stat,
          currentValue: Math.min(
            stat.currentValue + Math.ceil(stat.value / steps),
            stat.value
          ),
        }))
      );
    }, interval);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [statisData]) // Depend on statisData so this effect runs whenever statisData changes

  return (
    <div className='grid grid-cols-2 gap-y-7 md:grid-cols-4 items-start text-center p-10'>
      {statisData.map((stat) => (
        <div
          className={`space-y-4 ${stat.label === 'Programs' ? 'border-none' : 'border-l'
            } ${stat.label === 'Working Trainers' ? 'md:border-l border-l-0 ' : 'border-l'}`}
          key={stat.label}
        >
          <h3 className='font-bold text-yellow-500 text-6xl'>
            {`${stat.currentValue ? stat.currentValue : 0}`}
          </h3>
          <p className='lg:text-xl font-semibold'>{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsComponent