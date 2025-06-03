import type React from "react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, action }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
      {icon && <div className="mx-auto mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
