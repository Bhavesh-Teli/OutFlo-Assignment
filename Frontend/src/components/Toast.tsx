"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

export type ToastType = "success" | "error" | "info"

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow time for fade-out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = {
    success: "bg-green-100 border-green-500 text-green-800",
    error: "bg-red-100 border-red-500 text-red-800",
    info: "bg-blue-100 border-blue-500 text-blue-800",
  }[type]

  const icon = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1-5a1 1 0 100 2 1 1 0 000-2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  }[type]

  return (
    <div
      className={`fixed top-4 right-4 flex items-center p-4 mb-4 rounded-lg border ${bgColor} transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3">{icon}</div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-opacity-20 hover:bg-gray-500"
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
