import type React from "react"
import { Link } from "react-router-dom"
import { Target, MessageSquare, Users } from "lucide-react"

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">OutFlo</h1>
          <p className="text-xl text-gray-600 mb-8">AI-Powered Campaign Management & Outreach Tool</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/campaigns"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Manage Campaigns
            </Link>
            <Link
              to="/message-generator"
              className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors"
            >
              Generate Messages
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Campaign Management</h3>
            <p className="text-gray-600 mb-4">Create, manage, and track your outreach campaigns with ease</p>
            <Link
              to="/campaigns"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-md transition-colors"
            >
              View Campaigns
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Message Generator</h3>
            <p className="text-gray-600 mb-4">Generate personalized outreach messages using LinkedIn profile data</p>
            <Link
              to="/message-generator"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-md transition-colors"
            >
              Generate Messages
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lead Management</h3>
            <p className="text-gray-600 mb-4">Organize and track your LinkedIn leads and prospects</p>
            <button disabled className="inline-block bg-gray-100 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Sales Teams</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            OutFlo helps businesses grow by enabling them to book more meetings with their customers through AI-powered
            personalized outreach and efficient campaign management.
          </p>
        </div>
      </div>
    </div>
  )
}
