import type React from "react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", color = "text-blue-600" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 ${color} ${sizeClasses[size]}`}></div>
    </div>
  )
}
