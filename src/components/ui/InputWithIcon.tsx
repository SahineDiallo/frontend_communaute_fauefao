import React from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
  showPassword?: boolean
  togglePassword?: () => void
  error?: string
}

export function InputWithIcon({ icon, showPassword, togglePassword, ...props }: InputWithIconProps) {
  return (
    <div className="relative">
      <div className={`${props.error && 'bottom-7'} pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3`}>
        {icon}
      </div>
      <input
        {...props}
        className={`${props.error ? "border-red-500" : "border-gray-300"} block w-full border  pl-10 pr-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#EF8450] focus:outline-none focus:ring-1 focus:ring-[#EF8450] sm:text-sm`}
      />
      {props.error && <p className="text-red-500 text-sm mt-1">{props.error}</p>}
      {togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          tabIndex={-1}
          className={`${props.error && 'bottom-7'} absolute inset-y-0 right-0 flex items-center pr-3`}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 pointer-events-none" tabIndex={-1} />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 pointer-events-none" tabIndex={-1} />
          )}
        </button>
      )}
    </div>
  )
}

