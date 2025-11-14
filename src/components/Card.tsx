'use client'

interface CardProps {
  title: string
  value: string | number
  icon: string
  gradient: string
}

export function Card({ title, value, icon, gradient }: CardProps) {
  return (
    <div className={`glass p-6 rounded-lg glow-effect bg-gradient-to-br ${gradient}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )
}
