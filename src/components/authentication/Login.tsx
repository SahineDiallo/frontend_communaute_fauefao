import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { AuthLayout } from '../AuthLayout';
import { InputWithIcon } from '../ui/InputWithIcon';
import authImage from '../../assets/auth_image.jpg';
import useAuth from '../../hooks/useAuth'; // Import the useAuth hook

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const { login, error, isLoading } = useAuth(); // Use the useAuth hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password); // Call the login function
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <AuthLayout imageSrc={authImage} imageAlt="Person working on laptop">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
        <p className="mt-2 text-sm text-gray-600">
          Connectez-vous pour continuer sur les communautés!
        </p>
      </div>
      <div className='p-4'>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <InputWithIcon
          icon={<User className="h-5 w-5 text-gray-400" />}
          id="email"
          name="email"
          label="Email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputWithIcon
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          id="password"
          name="password"
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
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
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Rester connecté
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm py-2 font-medium text-[#EF8450] hover:text-[#EF8450]/80"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-[#EF8450] px-4 py-4 text-md font-semibold text-white shadow-sm hover:bg-[#EF8450]/90 focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
        
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Vous n'avez pas de compte ?{' '}
        <Link
          to="/register"
          className="font-medium text-[#EF8450] hover:text-[#EF8450]/80"
        >
          S'inscrire maintenant
        </Link>
      </p>

      <p className="mt-8 text-center text-xs text-gray-500">
        © 2025 Communautés FAUEFAO
      </p>
    </AuthLayout>
  );
}