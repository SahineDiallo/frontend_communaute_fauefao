import { useState, useMemo } from 'react';
import { User, Lock, Mail, Building } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { AuthLayout } from '../AuthLayout';
import { InputWithIcon } from '../ui/InputWithIcon';
import authImage from '../../assets/auth_image.jpg';
import StepIndicator from '../ui/stepIndicator';

type Step = 'basic' | 'security' | 'other';

interface CountryOption {
  label: string;
  value: string;
  error?: string;
}

export default function SignupPage() {
  const [step, setStep] = useState<Step>('basic');
  const [showPassword, setShowPassword] = useState(false);
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
    general: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSuccess, setIsSuccess] = useState(false); // State to track successful registration

  const countries = useMemo(() => countryList().getData(), []);

  // const stepLabels = [
  //   { label: 'Informations de base', value: 'basic' },
  //   { label: 'Sécurité', value: 'security' },
  //   { label: 'Autres informations', value: 'other' },
  // ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCountryChange = (option: CountryOption | null) => {
    setFormData((prev) => ({ ...prev, country: option }));
    setErrors((prev) => ({ ...prev, country: { label: '', value: '' } }));
  };

  const handleBioChange = (content: string) => {
    setFormData((prev) => ({ ...prev, bio: content }));
    setErrors((prev) => ({ ...prev, bio: '' }));
  };

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Partial<typeof formData> = {};

    if (currentStep === 'basic') {
      if (!formData.username) newErrors.username = "Le nom d'utilisateur est requis";
      if (!formData.first_name) newErrors.first_name = 'Le prénom est requis';
      if (!formData.last_name) newErrors.last_name = 'Le nom de famille est requis';
      if (!formData.country)
        newErrors.country = { label: '', value: '', error: 'Le pays est requis' };
    } else if (currentStep === 'security') {
      if (!formData.password) newErrors.password = 'Le mot de passe est requis';
      if (formData.password !== formData.re_password)
        newErrors.re_password = 'Les mots de passe ne correspondent pas';
      if (!formData.email) newErrors.email = "L'email est requis";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    } else if (currentStep === 'other') {
      if (!formData.bio) newErrors.bio = 'La biographie est requise';
      if (!formData.organisation) newErrors.organisation = "L'organisation est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(step)) return;

    const newFormData = {
      ...formData,
      country: formData?.country?.value,
      biographie: formData.bio,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/comptes/api/signup/step/${step}/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newFormData),
        },
      );

      const data = await response.json();
      if (response.ok) {
        if (step === 'basic') setStep('security');
        else if (step === 'security') setStep('other');
      } else {
        setErrors(data);
      }
    } catch (error) {
      console.error('Error during backend validation:', error);
      setErrors({ general: 'Une erreur est survenue, veuillez réessayer plus tard.' });
    }
  };

  const handlePrevious = () => {
    if (step === 'security') setStep('basic');
    else if (step === 'other') setStep('security');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep('other')) {
      try {
        const newFormData = {
          ...formData,
          country: formData?.country?.value,
          biographie: formData.bio,
        };

        const response = await fetch('http://localhost:8000/comptes/api/signup/step/other/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newFormData),
        });

        if (response.ok) {
          setIsSuccess(true); // Set success state to true
        } else {
          const data = await response.json();
          setErrors(data);
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        setErrors({ general: 'Une erreur est survenue, veuillez réessayer plus tard.' });
      }
    }
  };

  return (
    <AuthLayout imageSrc={authImage} imageAlt="Image communaute de pratique">
      {isSuccess ? (
        // Success Message
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#EF8450] mb-4">
            Inscription réussie !
          </h2>
          <p className="text-gray-700">
            Un email a été envoyé à <strong>{formData.email}</strong>. Veuillez vérifier
            votre boîte de réception pour activer votre compte.
          </p>
        </div>
      ) : (
        // Registration Form
        <>
          <StepIndicator step={step} />

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {step === 'basic' && (
              <>
                <InputWithIcon
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  id="username"
                  name="username"
                  label="Nom d'utilisateur"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  error={errors.username}
                />
                <InputWithIcon
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  id="first_name"
                  label="Prénom"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  error={errors.first_name}
                />
                <InputWithIcon
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  id="last_name"
                  label="Nom de famille"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
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
                    className={`${errors.country?.error ? 'border-red-500' : 'border-gray-300'} mt-1 rounded-none`}
                    classNamePrefix="react-select"
                  />
                  {errors.country?.error && (
                    <p className="mt-1 text-sm text-red-600">{errors.country?.error}</p>
                  )}
                </div>
              </>
            )}

            {step === 'security' && (
              <>
                <InputWithIcon
                  icon={<Lock className="h-5 w-5 text-gray-400" />}
                  id="password"
                  label="Mot de passe"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                  error={errors.password}
                />
                <InputWithIcon
                  icon={<Lock className="h-5 w-5 text-gray-400" />}
                  id="re_password"
                  name="re_password"
                  label="Confirmer mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.re_password}
                  onChange={handleChange}
                  required
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                  error={errors.re_password}
                />
                <InputWithIcon
                  icon={<Mail className="h-5 w-5 text-gray-400" />}
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
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
                        'insertdatetime media table paste code help wordcount',
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
                    }}
                    value={formData.bio}
                    onEditorChange={handleBioChange}
                  />
                  {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                </div>
                <InputWithIcon
                  icon={<Building className="h-5 w-5 text-gray-400" />}
                  id="organisation"
                  label="Organisation"
                  name="organisation"
                  type="text"
                  value={formData.organisation}
                  onChange={handleChange}
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
                  className="px-4 py-4 text-sm font-semibold text-[#EF8450] bg-white border border-[#EF8450] rounded-none shadow-sm hover:bg-[#EF8450] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
                >
                  Précédent
                </button>
              )}
              {step !== 'other' ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-4 py-4 text-sm font-semibold text-white bg-[#EF8450] rounded-none shadow-sm hover:bg-[#EF8450]/90 focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-4 py-4 text-sm font-semibold text-white bg-[#EF8450] rounded-none shadow-sm hover:bg-[#EF8450]/90 focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
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
        </>
      )}
    </AuthLayout>
  );
}