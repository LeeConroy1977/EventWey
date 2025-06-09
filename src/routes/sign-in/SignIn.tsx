import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import Button from '../../reuseable-components/Button';
import { useAuth } from '../../contexts/AuthContext';
import useHandleCreateUserClick from '../../hooks/useHandleCreateUserClick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignInUserCard from './SignInUserCard';
import { useUser } from '../../contexts/UserContext';

interface User {
  id: number;
  email: string;
  username?: string;
  role?: string;
}

const API = 'https://eventwey-backend.onrender.com';

// Configure Axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const SignIn = () => {
  const {
    isEmailValid,
    isPasswordValid,
    handleEmailValidation,
    handlePasswordValidation,
    handleValidation,
    isFormValid, 
    signIn,
    setError,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailBlur, setIsEmailBlur] = useState(false);
  const [isPasswordBlur, setIsPasswordBlur] = useState(false);
  const [signInUsers, setSignInUsers] = useState<User[] | null>(null);
  const [signInAdminUsers, setSignInAdminUsers] = useState<User[] | null>(null);
  const handleCreateUserClick = useHandleCreateUserClick();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,40}$/;

  const validationErrorMsg = {
    email: 'Must be a valid email',
    password: 'Password must be strong',
  };

  useEffect(() => {
    handleFetchAllUser();
  }, []);

  useEffect(() => {
    handleValidation(isEmailValid ?? false, isPasswordValid ?? false);
  }, [isEmailValid, isPasswordValid, handleValidation]);

  useEffect(() => {
    handleEmailValidation(email, emailRegex);
    handlePasswordValidation(password, passwordRegex);
  }, [email, password, handleEmailValidation, handlePasswordValidation]);

  function handleEmailBlur() {
    setIsEmailBlur(true);
  }

  function handlePasswordBlur() {
    setIsPasswordBlur(true);
  }

  const handleGoogleLogin = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const userData = parseJwt(token);

    try {
      const response = await axios.get(`${API}/auth/google/callback`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      const user = response.data;
      setUser(user); 
      navigate('/user/events');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setErrorMessage('Google sign-in failed. Please sign up first or try again.');
    }
  };

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Invalid token');
      return null;
    }
  };

  function resetInputs() {
    setEmail('');
    setPassword('');
  }

  async function handleFetchAllUser() {
    try {
      const response = await axios.get(`${API}/users`);
      const users = response?.data;
      setSignInUsers(users.sort((a,b) => a.id - b.id)?.slice(0, 3));
      const adminUsers = users.filter((user: User) => user.role === 'admin');
      setSignInAdminUsers(adminUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password); // Use AuthContext's signIn
      navigate('/user/events');
    } catch (error) {
      setErrorMessage('User cannot be found.');
      resetInputs();
    }
  };

  async function handleSignInAsUser(id: number) {
    const user = signInUsers?.find((user) => user.id === id);
    if (user) {
      try {
        await signIn(user.email, `Password#${user.id}`); 
        setUser(user);
        navigate('/user/events');
      } catch (error) {
        setErrorMessage('Failed to sign in as user');
      }
    }
  }

  async function handleSignInAsAdmin(id: number) {
    const user = signInAdminUsers?.find((user) => user.id === id);
    if (user) {
      try {
        await signIn(user.email, `Password#${user.id}`); 
        setUser(user);
        navigate('/user/events');
      } catch (error) {
        setErrorMessage('Failed to sign in as admin');
      }
    }
  }

  return (
    <GoogleOAuthProvider clientId="336072333198-60i3r0h35vhbnfatbbpej79389omj03p.apps.googleusercontent.com">
      <div className="flex flex-col items-center mobile:w-[100%] tablet:w-[94%] desktop:w-[66%] mobile:h-[100%] tablet:h-[74%] desktop:h-[80%] bg-bgPrimary tablet:mt-[4rem] desktop:mt-[4.4rem] rounded-lg">
        <main className="w-[100%] h-[100%] flex mobile:flex-col-reverse tablet:flex-row">
          <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center mobile:p-6 tablet:p-0">
            <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-0 tablet:mt-12 mobile:mr-auto tablet:mr-0">
              Sign in as an existing <span className="text-primary">user...</span>
            </h1>
            <div className="mobile:w-[100%] tablet:w-[80%] mobile:h-[200px] tablet:h-[32%] desktop:h-[30%] flex justify-around mobile:mt-8 tablet:mt-6 desktop:mt-8">
              {signInUsers?.map((user) => (
                <SignInUserCard
                  user={user}
                  key={user.id}
                  handleClick={handleSignInAsUser}
                />
              ))}
            </div>
            <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-12 tablet:mt-8 desktop:mt-16 mobile:mr-auto tablet:mr-0">
              Sign in as an admin <span className="text-primary">user...</span>
            </h1>
            <div className="mobile:w-[100%] tablet:w-[80%] mobile:h-[200px] tablet:h-[30%] flex justify-around mobile:mt-8 tablet:mt-6 desktop:mt-8">
              {signInAdminUsers?.map((user) => (
                <SignInUserCard
                  user={user}
                  key={user.id}
                  handleClick={handleSignInAsAdmin}
                />
              ))}
            </div>
          </section>

          <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center mobile:p-6 tablet:p-0">
            <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-6 tablet:mt-12 mobile:mr-auto tablet:mr-0">
              Sign in to your <span className="text-secondary">account...</span>
            </h1>
            <div className="w-full mobile:h-14 tablet:h-10 flex items-center justify-center">
              <p className="text-secondary mobile:text-[14px] tablet:text-[13px] desktop:text-[16px]">
                {errorMessage}
              </p>
            </div>
            <form
              className="mobile:w-[100%] tablet:w-[66%] desktop:w-[56%] desktop:h-[60%] xl-screen:h-[64%] flex flex-col items-center mobile:mt-0 tablet:mt-0 desktop:mt-10"
              onSubmit={handleSubmit}
            >
              <div className="w-[100%] flex flex-row items-center justify-between mt-3">
                <label
                  htmlFor="email"
                  className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px] text-primary font-semibold ml-2 mr-auto"
                >
                  Email
                </label>
                <p className="mobile:text-[11px] tablet:text-[9px] desktop:text-[11px] text-secondary font-semibold mr-2 ml-auto">
                  {isEmailValid === false && isEmailBlur ? validationErrorMsg.email : null}
                </p>
              </div>
              <input
                className={`w-[100%] mobile:h-[40px] tablet:h-[2.1rem] desktop:h-[2.4rem] xl-screen:h-[2.7rem] border-[1px] border-gray-200 rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px] desktop:placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${
                  isEmailValid === true
                    ? 'border-primary'
                    : isEmailValid === false && isEmailBlur
                    ? 'border-secondary'
                    : 'border-gray-200'
                }`}
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailBlur(false);
                }}
                onBlur={handleEmailBlur}
                required
              />
              <div className="w-[100%] flex flex-row items-center justify-between mt-3">
                <label
                  htmlFor="password"
                  className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px] text-primary font-semibold ml-2 mr-auto"
                >
                  Password
                </label>
                <p className="mobile:text-[11px] tablet:text-[9px] desktop:text-[11px] text-secondary font-semibold mr-2 ml-auto">
                  {isPasswordValid === false && isPasswordBlur ? validationErrorMsg.password : null}
                </p>
              </div>
              <input
                className={`w-[100%] mobile:h-[40px] tablet:h-[2.1rem] desktop:h-[2.4rem] xl-screen:h-[2.7rem] border-[1px] border-gray-200 rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px] desktop:placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${
                  isPasswordValid === true
                    ? 'border-primary'
                    : isPasswordValid === false && isPasswordBlur
                    ? 'border-secondary'
                    : 'border-gray-200'
                }`}
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordBlur(false);
                }}
                onBlur={handlePasswordBlur}
                required
              />
              <div className="w-[100%] flex items-center justify-center mobile:mt-8 tablet:mt-14 desktop:mt-10 xl-screen:mt-12">
                <Button
                  px="px-12"
                  py="py-3"
                  bgColour={isFormValid ? 'bg-primary' : 'bg-gray-300'}
                  isDisabled={!isFormValid}
                  handleClick={handleSubmit}
                >
                  Sign In
                </Button>
              </div>
              <h3 className="text-textPrimary mobile:text-[14px] desktop:text-[20px] font-bold mobile:mt-6 tablet:mt-6 desktop:mt-12">
                Or sign in with Google
              </h3>
              <div className="mt-8 xl-screen:mt-12">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => setErrorMessage('Google login failed')}
                />
              </div>
            </form>
            <h2 className="text-textPrimary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px] font-semibold mobile:mt-6 tablet:mt-12 desktop:mt-6">
              Don't have an account?{' '}
              <span
                className="text-secondary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px] font-semibold cursor-pointer"
                onClick={handleCreateUserClick}
              >
                Sign up
              </span>
            </h2>
          </section>
        </main>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;