'use client'

import { useState, useMemo } from 'react'
import { User, Lock, Mail, Building } from 'lucide-react'
import { Editor } from '@tinymce/tinymce-react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { AuthLayout } from '../AuthLayout'
import { InputWithIcon } from '../ui/InputWithIcon'
import authImage from "../../assets/auth_image.jpg"
import clsx from "clsx"

type Step = 'basic' | 'security' | 'other'

interface CountryOption {
  label: string
  value: string
  error?: string
}

export default function SignupPage() {
  const [step, setStep] = useState<Step>('basic')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    country: null as CountryOption | null,
    password: '',
    re_password: '',
    email: '',
    bio: '',
    organisation: '',
    general: "",
  })
  const [errors, setErrors] = useState<Partial<typeof formData>>({})

  const countries = useMemo(() => countryList().getData(), [])

  const stepLabels = [
    { label: "Informations de base", value: "basic" },
    { label: "Sécurité", value: "security" },
    { label: "Autres informations", value: "other" },
  ]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleCountryChange = (option: CountryOption | null) => {
    setFormData(prev => ({ ...prev, country: option }))
    setErrors(prev => ({ ...prev, country: {label: '', value: ""} }))
  }

  const handleBioChange = (content: string) => {
    setFormData(prev => ({ ...prev, bio: content }))
    setErrors(prev => ({ ...prev, bio: '' }))
  }

  const validateStep = (currentStep: Step): boolean => {
    console.log("we are validating the data of step", step)
    const newErrors: Partial<typeof formData> = {}

    if (currentStep === 'basic') {
      if (!formData.username) newErrors.username = 'Le nom d\'utilisateur est requis'
      if (!formData.first_name) newErrors.first_name = 'Le prénom est requis'
      if (!formData.last_name) newErrors.last_name = 'Le nom de famille est requis'
      if (!formData.country) newErrors.country = { label: '', value: '', error: 'Le pays est requis' };
    } else if (currentStep === 'security') {
      if (!formData.password) newErrors.password = 'Le mot de passe est requis'
      if (formData.password !== formData.re_password) newErrors.re_password = 'Les mots de passe ne correspondent pas'
      if (!formData.email) newErrors.email = 'L\'email est requis'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide'
    } else if (currentStep === 'other') {
      if (!formData.bio) newErrors.bio = 'La biographie est requise'
      if (!formData.organisation) newErrors.organisation = 'L\'organisation est requise'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    // Client-side validation
    if (!validateStep(step)) return;
  
    // Backend validation
    console.log("this is the form data", formData);
    try {
      const response = await fetch(`http://localhost:8000/comptes/api/signup/step/${step}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Move to the next step
        if (step === 'basic') setStep('security');
        else if (step === 'security') setStep('other');
      } else {
        // Backend validation failed, display errors
        setErrors(data); // Assuming `data` contains a dictionary of field errors
      }
    } catch (error) {
      console.error('Error during backend validation:', error);
      setErrors({ general: 'Une erreur est survenue, veuillez réessayer plus tard.' });
    }
  };
  

  const handlePrevious = () => {
    if (step === 'security') setStep('basic')
    else if (step === 'other') setStep('security')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep('other')) {
      // Handle form submission to Django backend
      console.log('Form submitted:', formData)
    }
  }

  return (
    <AuthLayout
      imageSrc={authImage}
      imageAlt="Image communaute de pratique"
    >
      {/* <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Inscription</h1>
        <p className="mt-2 text-sm text-gray-600">
          Créez votre compte communauté FAUEFAO
        </p>
      </div> */}

      {/* Step Indicator */}
      <div className="flex items-center justify-between my-11">
        {stepLabels.map((stepLabel, index) => (
          <div key={index} className="flex-1 text-center">
            <div
              className={clsx(
                "flex items-center justify-center w-10 h-10 mx-auto rounded-full text-white",
                step === stepLabel.value ? "bg-[#EF8450]" : "bg-gray-300"
              )}
            >
              {index + 1}
            </div>
            <p className={clsx(
              "mt-2 text-sm font-medium",
              step === stepLabel.value ? "text-[#EF8450]" : "text-gray-600"
            )}>
              {stepLabel.label}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {step === 'basic' && (
          <>
            <InputWithIcon
              icon={<User className="h-5 w-5 text-gray-400" />}
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nom d'utilisateur"
              required
              error={errors.username}
            />
            <InputWithIcon
              icon={<User className="h-5 w-5 text-gray-400" />}
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Prénom"
              required
              error={errors.first_name}
            />
            <InputWithIcon
              icon={<User className="h-5 w-5 text-gray-400" />}
              id="last_name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Nom"
              required
              error={errors.last_name}
            />
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Pays
              </label>
              <Select
                id="country"
                name="country"
                options={countries}
                value={formData.country}
                onChange={handleCountryChange}
                placeholder="Sélectionnez votre pays"
                className={`${errors.country?.error ? "border-red-500" : "border-gray-300"} mt-1 rounded-none`}
                classNamePrefix="react-select"
              />
              {errors.country?.error && <p className="mt-1 text-sm text-red-600">{errors.country?.error}</p>}
            </div>
          </>
        )}

        {step === 'security' && (
          <>
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
              error={errors.password}
            />
            <InputWithIcon
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              id="re_password"
              name="re_password"
              type={showPassword ? 'text' : 'password'}
              value={formData.re_password}
              onChange={handleChange}
              placeholder="Confirmer le mot de passe"
              required
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              error={errors.re_password}
            />
            <InputWithIcon
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              error={errors.email}
            />
          </>
        )}

        {step === 'other' && (
          <>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Biographie
              </label>
              <Editor
                apiKey="x4q1m92nzs9uet310vn5o6vqkd7wjkzyvjkugotsyjtsic6c"
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
                value={formData.bio}
                onEditorChange={handleBioChange}
              />
              {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
            </div>
            <InputWithIcon
              icon={<Building className="h-5 w-5 text-gray-400" />}
              id="organisation"
              name="organisation"
              type="text"
              value={formData.organisation}
              onChange={handleChange}
              placeholder="Organisation"
              required
              error={errors.organisation}
            />
          </>
        )}

        <div className="flex justify-between">
          {step !== 'basic' && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 text-sm font-semibold text-[#EF8450] bg-white border border-[#EF8450] rounded-none shadow-sm hover:bg-[#EF8450] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
            >
              Précédent
            </button>
          )}
          {step !== 'other' ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-4 py-2 text-sm font-semibold text-white bg-[#EF8450] rounded-none shadow-sm hover:bg-[#EF8450]/90 focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 text-sm font-semibold text-white bg-[#EF8450] rounded-none shadow-sm hover:bg-[#EF8450]/90 focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
            >
              S'inscrire
            </button>
          )}
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Vous avez déjà un compte ?{' '}
        <a href="/login" className="font-medium text-[#EF8450] hover:text-[#EF8450]/80">
          Se connecter
        </a>
      </p>

      <p className="mt-8 text-center text-xs text-gray-500">
        © 2025 Communautés FAUEFAO!
      </p>
    </AuthLayout>
  )
}

