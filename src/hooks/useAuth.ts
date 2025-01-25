import { useState, useEffect, useCallback } from 'react'; // Add useCallback
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User } from '../types'; // Import the User type
import { loginSuccess, logout } from '../store/features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/';

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Get JWT tokens
      const tokenResponse = await fetch('http://127.0.0.1:8000/api/v1/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Identifiants incorrects. Veuillez réessayer.');
      }

      const tokenData = await tokenResponse.json();
      const { access: token, refresh: refreshToken } = tokenData;

      // Step 2: Fetch user info
      const userResponse = await fetch('http://127.0.0.1:8000/api/v1/auth/users/me/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Impossible de récupérer les informations utilisateur.');
      }

      const userData = await userResponse.json();

      // Map the backend user object to the User type
      const user: User = {
        pkId: userData.pkId,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        full_name: userData.full_name,
        email: userData.email,
        country: userData.country,
        dateJoined: userData.date_joined,
        profile: {
          pkId: userData.profile.pkId,
          image_url: userData.profile.image_url,
        },
      };

      // Step 3: Save tokens and user info to Redux
      dispatch(loginSuccess({ user, token, refreshToken }));

      // Step 4: Save tokens to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Step 5: Redirect to home or dashboard
      navigate(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur s’est produite. Veuillez réessayer.');
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Wrap logoutUser in useCallback
  const logoutUser = useCallback(() => {
    // Clear Redux state
    dispatch(logout());

    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    // Redirect to login page
    navigate('/login');
  }, [dispatch, navigate]);
  const decodeToken = (token: string) => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (err) {
      console.error("error", err)
      throw new Error('Failed to decode token');
    }
  };
  // Wrap refreshTokenFunc in useCallback
  const refreshTokenFunc = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/auth/jwt/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      const newToken = data.access;

      // Update the token in localStorage and Redux
      localStorage.setItem('token', newToken);
      dispatch(loginSuccess({ token: newToken }));

      return newToken;
    } catch (err) {
      console.error(err)
      throw new Error('Failed to refresh token');
    }
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      // Set a timer to refresh the token 5 minutes before it expires
      const tokenExpiration = decodeToken(token).exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiration = tokenExpiration - currentTime;

      if (timeUntilExpiration > 0) {
        const refreshTimeout = setTimeout(() => {
          refreshTokenFunc().catch((err) => {
            console.error('Failed to refresh token:', err);
            logoutUser(); // Use the memoized logoutUser
          });
        }, timeUntilExpiration - 5 * 60 * 1000); // Refresh 5 minutes before expiration

        return () => clearTimeout(refreshTimeout);
      } else {
        logoutUser(); // Use the memoized logoutUser
      }
    }
  }, [logoutUser, refreshTokenFunc]); // Add refreshTokenFunc to the dependency array

  return { login, logout: logoutUser, refreshToken: refreshTokenFunc, error, isLoading };
};

export default useAuth;