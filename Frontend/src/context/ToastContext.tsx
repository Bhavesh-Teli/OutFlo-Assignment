"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import { Toast, type ToastType } from "../components/Toast"

interface ToastContextProps {
  showToast: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

interface ToastItem {
  id: string
  message: string
  type: ToastType
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
