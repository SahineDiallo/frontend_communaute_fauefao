'use client'

import { useState } from 'react'
import {Link} from 'react-router-dom'
import { User, Lock } from 'lucide-react'
import { AuthLayout } from '../AuthLayout'
import { InputWithIcon } from '../ui/InputWithIcon'


export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission to Django backend
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <AuthLayout
      imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%2016.40.59-LeWy743UdmkZ3dvYuVLoWiO3Kpjh8b.png"
      imageAlt="Person working on laptop"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
        <p className="mt-2 text-sm text-gray-600">
          Connectez-vous pour continuer sur MJ Business!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <InputWithIcon
          icon={<User className="h-5 w-5 text-gray-400" />}
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur"
          required
        />
        <InputWithIcon
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300 text-[#EF8450] focus:ring-[#EF8450]"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Rester connecté
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm font-medium text-[#EF8450] hover:text-[#EF8450]/80">
            Mot de passe oublié ?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-[#EF8450] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#EF8450]/90 focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
        >
          Se connecter
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Vous n'avez pas de compte ?{' '}
        <Link to="/register" className="font-medium text-[#EF8450] hover:text-[#EF8450]/80">
          S'inscrire maintenant
        </Link>
      </p>

      <p className="mt-8 text-center text-xs text-gray-500">
      © 2025 Communautés FAUEFAO!
      </p>
    </AuthLayout>
  )
}

