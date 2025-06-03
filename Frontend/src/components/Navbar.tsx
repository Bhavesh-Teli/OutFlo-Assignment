import type React from "react"
import { Link, useLocation } from "react-router-dom"

export const Navbar: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              OutFlo
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              to="/campaigns"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/campaigns")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Campaigns
            </Link>
            <Link
              to="/message-generator"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/message-generator")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Message Generator
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
