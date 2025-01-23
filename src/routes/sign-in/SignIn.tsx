import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import Button from "../../reuseable-components/Button";
import { useSignInContext } from "../../contexts/SignInContext";
import useHandleCreateUserClick from "../../hooks/useHandleCreateUserClick";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignInUserCard from "./SignInUserCard";

const SignIn = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailBlur, setIsEmailblur] = useState(false);
  const [isPasswordBlur, setIsPasswordblur] = useState(false);
  // @ts-ignore
  const [signInUsers, setSignInUsers] = useState<User | null>();
  // @ts-ignore
  const [signInAdminUsers, setSignInAdminUsers] = useState<User | null>();
  const {
    isEmailValid,
    isPasswordValid,
    handleEmailValidation,
    handlePasswordValidation,
    handleValidation,
    isFormValid,
    handleFindUser,
  } = useSignInContext();
  const handleCreateUserClick = useHandleCreateUserClick();
  const navigate = useNavigate();

  const API = "https://eventwey.glitch.me";

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
    // @ts-ignore
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
      const response = await axios.get(``, {
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
    const response = await axios.get(`${API}/users`, {
      params: {},
    });

    const users = response?.data;
    setSignInUsers(users?.slice(0, 3));
    // @ts-ignore
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
    // @ts-ignore
    setUser(user);
    navigate("/user/events");
  };
  // @ts-ignore
  async function handleSignInAsUser(id) {
    // @ts-ignore
    const user = signInUsers.find((user) => user.id === id);

    setUser(user);
    navigate("/user/events");
  }
  // @ts-ignore
  async function handleSignInAsAdmin(id) {
    // @ts-ignore
    const user = signInAdminUsers.find((user) => user.id === id);

    setUser(user);
    navigate("/user/events");
  }

  return (
    <GoogleOAuthProvider clientId="336072333198-60i3r0h35vhbnfatbbpej79389omj03p.apps.googleusercontent.com">
      <div className="flex flex-col items-center mobile:w-[100%] tablet:w-[94%] desktop:w-[66%] mobile:h-[100%] tablet:h-[74%] desktop:h-[80%] bg-bgPrimary tablet:mt-[4rem]   desktop:mt-[4.4rem] rounded-lg">
        <main className="w-[100%] h-[100%] flex mobile:flex-col-reverse tablet:flex-row">
          <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center mobile:p-6 tablet:p-0">
            <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-0  tablet:mt-12 mobile:mr-auto tablet:mr-0">
              Sign in as an existing{" "}
              <span className="text-primary">user...</span>
            </h1>
            <div className="mobile:w-[100%] tablet:w-[80%] mobile:h-[200px] tablet:h-[32%] desktop:h-[30%] flex justify-around  mobile:mt-8 tablet:mt-6 desktop:mt-8">
              {signInUsers?.map((user: any) => {
                return (
                  <SignInUserCard
                    user={user}
                    key={user.id}
                    handleClick={handleSignInAsUser}
                  />
                );
              })}
            </div>
            <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-12 tablet:mt-8 desktop:mt-16 mobile:mr-auto tablet:mr-0">
              Sign in as an admin <span className="text-primary">user...</span>
            </h1>
            <div className="mobile:w-[100%] tablet:w-[80%] mobile:h-[200px] tablet:h-[30%] flex justify-around  mobile:mt-8 tablet:mt-6 desktop:mt-8">
              {signInAdminUsers?.map((user: any) => {
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

          <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center mobile:p-6 tablet:p-0 ">
            <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2  tablet:mt-12 mobile:mr-auto tablet:mr-0">
              Sign in to your <span className="text-secondary">account...</span>
            </h1>
            <p>{errorMessage}</p>
            <form className="mobile:w-[100%] tablet:w-[66%] desktop:w-[56%] desktop:h-[60%] xl-screen:h-[64%] flex flex-col items-center mobile:mt-8 tablet:mt-6 desktop:mt-16">
              <div className="w-[100%] flex flex-row items-center justify-between mt-3">
                <label
                  htmlFor="email"
                  className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px] text-primary font-semibold ml-2 mr-auto "
                >
                  Email
                </label>

                <p className="mobile:text-[11px] tablet:text-[9px]  desktop:text-[11px] text-secondary font-semibold mr-2 ml-auto">
                  {isEmailValid === false && isEmailBlur ? (
                    <p>{validationErrorMsg.email}</p>
                  ) : isEmailValid === true ? null : null}
                </p>
              </div>

              <input
                className={`w-[100%] mobile:h-[40px] tablet:h-[2.1rem] desktop:h-[2.4rem] xl-screen:h-[2.7rem] border-[1px] border-gray-200 rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px] desktop:placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none  ${
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
                  className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px] text-primary font-semibold ml-2 mr-auto "
                >
                  Password
                </label>
                <p className="mobile:text-[11px] tablet:text-[9px]  desktop:text-[11px] text-secondary font-semibold mr-2 ml-auto">
                  {isPasswordValid === false ||
                  (isPasswordValid === null &&
                    isPasswordBlur &&
                    password !== "") ? (
                    <p>{validationErrorMsg.password}</p>
                  ) : isPasswordValid === true ? null : null}
                </p>
              </div>

              <input
                className={`w-[100%] mobile:h-[40px] tablet:h-[2.1rem] desktop:h-[2.4rem] xl-screen:h-[2.7rem] border-[1px] border-gray-200 rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px] desktop:placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${
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
              <div className="w-[100%] flex items-center justify-center mobile:mt-8 tablet:mt-14 desktop:mt-10 xl-screen:mt-12 ">
                <Button
                  px="px-12"
                  py="py-3"
                  bgColour={isFormValid ? "bg-primary" : "bg-gray-300"}
                  isDisabled={!isFormValid}
                  // @ts-ignore
                  handleClick={(e: any) => handleSubmit(e)}
                >
                  Sign In
                </Button>
              </div>
              <h3 className="text-textPrimary mobile:text-[14px] desktop:text-[20px] font-bold mobile:mt-6 tablet:mt-6 desktop:mt-12">
                Or sign up with google
              </h3>
              <div className="mt-8 xl-screen:mt-12 ">
                <GoogleLogin onSuccess={handleGoogleLogin} onError={() => {}} />
              </div>
            </form>

            <h2 className="text-textPrimary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px] font-semibold mobile:mt-6 tablet:mt-12 desktop:mt-6 ">
              Don't have an account?{" "}
              <span
                className="text-secondary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px]  font-semibold cursor-pointer"
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
