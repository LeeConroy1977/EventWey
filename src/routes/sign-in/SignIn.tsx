import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import Button from "../../reuseable-components/Button";
import { useSignInContext } from "../../contexts/SignInContext";
import useHandleCreateUserClick from "../../hooks/useHandleCreateUserClick";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignInUserCard from "./SignInUserCard";

const SignIn = ({}) => {
  const { user, setUser } = useUser();
  const [googleSignIn, setGoogleSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailBlur, setIsEmailblur] = useState(false);
  const [isPasswordBlur, setIsPasswordblur] = useState(false);
  const [signInUsers, setSignInUsers] = useState<User | null>();
  const [signInAdminUsers, setSignInAdminUsers] = useState<User | null>();
  const {
    isEmailValid,
    isPasswordValid,
    loading,
    error,
    checkIfUserExists,
    handleEmailValidation,
    handlePasswordValidation,
    handleValidation,
    isFormValid,
    handleFindUser,
  } = useSignInContext();
  const handleCreateUserClick = useHandleCreateUserClick();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,40}$/;

  const validationErrorMsg = {
    email: "Must be a valid email",
    password: "Password must be strong",
  };

  useEffect(() => {
    handleFetchAllUser();
  }, []);

  useEffect(() => {
    handleValidation(isEmailValid, isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  useEffect(() => {
    handleEmailValidation(email, emailRegex);
    handlePasswordValidation(password, passwordRegex);
  }, [email, password]);

  function handleEmailBlur() {
    setIsEmailblur(true);
  }

  function handlePasswordBlur() {
    setIsPasswordblur(true);
  }

  const handleGoogleLogin = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const user = parseJwt(token);

    try {
      const response = await axios.get(`http://localhost:3000/users`, {
        params: { email: user.email },
      });

      if (response.data.length === 0) {
        setErrorMessage("Google account not registered. Please sign up first.");
      } else {
        const existingUser = response.data[0];

        setUser(existingUser);
        navigate("/user/events");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setErrorMessage(
        "An error occurred during Google sign-in. Please try again."
      );
    }
  };

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Invalid token");
      return null;
    }
  };

  async function handleFetchAllUser() {
    const response = await axios.get(`http://localhost:3000/users`, {
      params: {},
    });

    const users = response?.data;
    setSignInUsers(users?.slice(0, 3));
    const adminUsers = users.filter((user) => user.role === "admin");
    setSignInAdminUsers(adminUsers);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await handleFindUser(email, password);
    if (!user) {
      setErrorMessage("User cannot be found.");
      return;
    }
    setUser(user);
    navigate("/user/events");
  };

  async function handleSignInAsUser(id) {
    const user = signInUsers.find((user) => user.id === id);

    setUser(user);
    navigate("/user/events");
  }

  async function handleSignInAsAdmin(id) {
    const user = signInAdminUsers.find((user) => user.id === id);

    setUser(user);
    navigate("/user/events");
  }

  return (
    <GoogleOAuthProvider clientId="336072333198-60i3r0h35vhbnfatbbpej79389omj03p.apps.googleusercontent.com">
      <div className="flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary  mt-[6rem] rounded-lg">
        <main className="w-[100%] h-[100%] flex">
          <section className="w-[50%] h-[100%] flex flex-col items-center">
            <h1 className="text-textPrimary text-[28px] font-bold mt-12">
              Sign in as an existing{" "}
              <span className="text-primary">user...</span>
            </h1>
            <div className="w-[80%] h-[30%] flex justify-around  mt-8">
              {signInUsers?.map((user) => {
                return (
                  <SignInUserCard
                    user={user}
                    key={user.id}
                    handleClick={handleSignInAsUser}
                  />
                );
              })}
            </div>
            <h1 className="text-textPrimary text-[28px] font-bold mt-12">
              Sign in as an admin{" "}
              <span className="text-secondary">user...</span>
            </h1>
            <div className="w-[80%] h-[30%] flex justify-around  mt-8">
              {signInAdminUsers?.map((user) => {
                return (
                  <SignInUserCard
                    user={user}
                    key={user.id}
                    handleClick={handleSignInAsAdmin}
                  />
                );
              })}
            </div>
          </section>

          <section className="w-[50%] h-[100%] flex flex-col items-center ">
            <h1 className="text-textPrimary text-[28px] font-bold mt-12">
              Sign in to your <span className="text-secondary">account...</span>
            </h1>
            <p>{errorMessage}</p>
            <form className="w-[56%] h-[60%] flex flex-col items-center mt-16">
              <div className="w-[100%] flex flex-row items-center justify-between mt-3">
                <label
                  htmlFor="email"
                  className="text-[12px] text-primary font-semibold ml-2 mr-auto "
                >
                  Email
                </label>

                <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
                  {isEmailValid === false && isEmailBlur ? (
                    <p>{validationErrorMsg.email}</p>
                  ) : isEmailValid === true ? null : null}
                </p>
              </div>

              <input
                className={`w-[100%] h-[2.4rem] border-[1px] rounded-lg px-2 placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none  ${
                  isEmailValid === true
                    ? "border-primary"
                    : isEmailValid && isEmailBlur === false
                    ? "border-secondary"
                    : isEmailValid === null
                    ? "border-gray-200"
                    : null
                } `}
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailblur(false);
                }}
                onBlur={() => handleEmailBlur()}
                required
              />

              <div className="w-[100%] flex flex-row items-center justify-between mt-3">
                <label
                  htmlFor="password"
                  className="text-[12px] text-primary font-semibold ml-2 mr-auto "
                >
                  Password
                </label>
                <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
                  {isPasswordValid === false ||
                  (isPasswordValid === null &&
                    isPasswordBlur &&
                    password !== "") ? (
                    <p>{validationErrorMsg.password}</p>
                  ) : isPasswordValid === true ? null : null}
                </p>
              </div>

              <input
                className={`w-[100%] h-[2.4rem] border-[1px] rounded-lg px-2 placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${
                  isPasswordValid === true
                    ? "border-primary"
                    : isPasswordValid === false
                    ? "border-secondary"
                    : isPasswordValid === null
                    ? "border-gray-200"
                    : null
                }`}
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordblur(false);
                }}
                onBlur={() => handlePasswordBlur()}
                required
              />
              <div className="w-[100%] flex items-center justify-center mt-10">
                <Button
                  px="px-12"
                  py="py-3"
                  bgColour={isFormValid ? "bg-primary" : "bg-gray-300"}
                  isDisabled={!isFormValid}
                  handleClick={(e) => handleSubmit(e)}
                >
                  Sign In
                </Button>
              </div>
              <h3 className="text-textPrimary text-[20px] font-bold mt-12">
                Or sign up with google
              </h3>
              <div className="mt-8">
                <GoogleLogin onSuccess={handleGoogleLogin} onError={() => {}} />
              </div>
            </form>

            <h2 className="text-textPrimary text-[16px] font-semibold mt-6 ">
              Don't have an account?{" "}
              <span
                className="text-secondary text-[16px] font-semibold cursor-pointer"
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
