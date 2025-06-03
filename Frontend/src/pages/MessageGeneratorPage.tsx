import type React from "react"
import { useState } from "react"
import { MessageSquare, Copy, RefreshCw } from "lucide-react"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useToast } from "../context/ToastContext"
import type { ProfileData } from "../types/ProfileData"
import { messageService } from "@/services/messageService"

export const MessageGeneratorPage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    job_title: "Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    summary:
      "Experienced in AI & ML with 5+ years in software development. Passionate about building scalable solutions and leading engineering teams.",
  })
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const generateMessage = async () => {
    setLoading(true)

    try {
      const response = await messageService.generatePersonalizedMessage(profileData)
      setGeneratedMessage(response.message)
      showToast("Message generated successfully", "success")
    } catch (err) {
      showToast("Failed to generate message. Please try again.", "error")
      console.error("Error generating message:", err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage)
      showToast("Message copied to clipboard", "success")
    } catch (err) {
      showToast("Failed to copy to clipboard", "error")
      console.error("Failed to copy to clipboard:", err)
    }
  }

  const clearForm = () => {
    setProfileData({
      name: "",
      job_title: "",
      company: "",
      location: "",
      summary: "",
    })
    setGeneratedMessage("")
  }

  const loadSampleData = (sample: "founder" | "sales") => {
    if (sample === "founder") {
      setProfileData({
        name: "Sarah Chen",
        job_title: "Founder & CEO",
        company: "InnovateTech",
        location: "Austin, TX",
        summary: "Serial entrepreneur with 10+ years in SaaS. Built and scaled 2 successful startups.",
      })
    } else {
      setProfileData({
        name: "Michael Rodriguez",
        job_title: "VP of Sales",
        company: "GrowthCorp",
        location: "New York, NY",
        summary: "Results-driven sales leader with expertise in B2B SaaS and team management.",
      })
    }
    showToast("Sample data loaded", "info")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">LinkedIn Message Generator</h1>
        <p className="text-gray-600 mt-2">Generate personalized outreach messages using AI</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Data Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">LinkedIn Profile Data</h2>
          <p className="text-gray-600 mb-6">
            Enter the LinkedIn profile information to generate a personalized message
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                id="job_title"
                value={profileData.job_title}
                onChange={(e) => handleInputChange("job_title", e.target.value)}
                placeholder="e.g., Software Engineer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                id="company"
                value={profileData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="e.g., TechCorp"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={profileData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., San Francisco, CA"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Summary
              </label>
              <textarea
                id="summary"
                value={profileData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                placeholder="Brief summary of their experience and background..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={generateMessage}
                disabled={loading || !profileData.name || !profileData.job_title || !profileData.company}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" color="text-white" />
                    Generating...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4" />
                    Generate Message
                  </>
                )}
              </button>
              <button
                onClick={clearForm}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Generated Message */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Message</h2>
          <p className="text-gray-600 mb-6">AI-generated personalized outreach message</p>

          {generatedMessage ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{generatedMessage}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copy Message
                </button>
                <button
                  onClick={generateMessage}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Fill in the profile data and click "Generate Message" to create a personalized outreach message.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sample Data */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Sample Profile Data</h2>
        <p className="text-gray-600 mb-6">Here are some example profiles you can use to test the message generator</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Tech Startup Founder</h4>
            <div className="text-sm space-y-1 mb-4">
              <p>
                <strong>Name:</strong> Sarah Chen
              </p>
              <p>
                <strong>Title:</strong> Founder & CEO
              </p>
              <p>
                <strong>Company:</strong> InnovateTech
              </p>
              <p>
                <strong>Location:</strong> Austin, TX
              </p>
              <p>
                <strong>Summary:</strong> Serial entrepreneur with 10+ years in SaaS. Built and scaled 2 successful
                startups.
              </p>
            </div>
            <button
              onClick={() => loadSampleData("founder")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Load Sample
            </button>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2">Sales Director</h4>
            <div className="text-sm space-y-1 mb-4">
              <p>
                <strong>Name:</strong> Michael Rodriguez
              </p>
              <p>
                <strong>Title:</strong> VP of Sales
              </p>
              <p>
                <strong>Company:</strong> GrowthCorp
              </p>
              <p>
                <strong>Location:</strong> New York, NY
              </p>
              <p>
                <strong>Summary:</strong> Results-driven sales leader with expertise in B2B SaaS and team management.
              </p>
            </div>
            <button
              onClick={() => loadSampleData("sales")}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Load Sample
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
