import { useState, useEffect } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import signupImage from "../../assets/images/signup.jpg";
import useHandleSignInClick from "../../hooks/useHandleSignUpClick";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";


const newUser = {
  email: "",
  username: "",
  password: "",
  googleId: null,
  profileBackgroundImage: "",
  profileImage: "",
  bio: "",
  aboutMe: "",
  tags: [],
  connections: [],
  groups: [],
  events: [],
  messages: [],
  comments: [],
  receivedMessages: [],
  adminGroups: [],
  notifications: [],
  viewEventsStatus: "public",
  viewConnectionsStatus: "public",
  viewGroupsStatus: "public",
  viewTagsStatus: "public",
  viewProfileImage: "public",
  viewBioStatus: "public",
  aboutMeStatus: "public",
  role: "user",
};

const SignUp = () => {
  // @ts-ignore
  const {
    state,
    dispatch,
    checkIfUserExists,
    createNewUser,
    handleValidation,
    // @ts-ignore
    handleUsenameValidation,
    handleEmailValidation,
    handlePasswordValidation,
    // @ts-ignore
    isUsernameValid,
    // @ts-ignore
    isEmailValid,
    // @ts-ignore
    isPasswordValid,
    // @ts-ignore
    error,
  } = useCreateUserContext();
  const [googleSignIn, setGoogleSignIn] = useState(false);
  const handleSignInClick = useHandleSignInClick();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [isUsernameBlur, setIsUsernameblur] = useState(false);
  const [isEmailBlur, setIsEmailblur] = useState(false);
  const [isPasswordBlur, setIsPasswordblur] = useState(false);
  const [userExistsMessage, setUserExistsMessage] = useState("");
  const { isMobile } = useScreenWidth();

  const usernameRegex = /^.{2,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,40}$/;

  const validationErrorMsg = {
    username: "Must be between 2-20 characters",
    email: "Must be a valid email",
    password: "Password must be strong",
  };

  useEffect(() => {
    handleValidation(isUsernameValid, isEmailValid, isPasswordValid);
  }, [isUsernameValid, isEmailValid, isPasswordValid]);

  useEffect(() => {
    if (googleSignIn) {
      // @ts-ignore
      handleSubmit();
      setGoogleSignIn(false);
    }
  }, [googleSignIn]);

  useEffect(() => {
    handleUsenameValidation(username, usernameRegex);
    // @ts-ignore
    handleEmailValidation(email, emailRegex);
    // @ts-ignore
    handlePasswordValidation(password, passwordRegex);
  }, [email, username, password, resetInputs]);

  function handleUserNameBlur() {
    setIsUsernameblur(true);
  }

  function handleEmailBlur() {
    setIsEmailblur(true);
  }

  function handlePasswordBlur() {
    setIsPasswordblur(true);
  }
  // @ts-ignore
  const handleGoogleLogin = (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = parseJwt(token);

    setUsername(user.name);
    setEmail(user.email);
    setPassword(user.sub);
    setGoogleId(user.sub);

    setGoogleSignIn(true);
  };
  // @ts-ignore
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Invalid token");
      return null;
    }
  };

  function resetInputs() {
    setIsUsernameblur(false);
    setIsEmailblur(false);
    setIsPasswordblur(false);
    setUsername("");
    setEmail("");
    setPassword("");

    dispatch({ type: "RESET_SIGNUP" });
  }

  const handleSubmit = async (e: any) => {
    if (e) e.preventDefault();

    const existingUser = await checkIfUserExists(email);
    if (existingUser) {
      setUserExistsMessage("Email already in use!");
      resetInputs();
      return;
    }

    const createdUser = {
      ...newUser,
      username: username,
      email: email,
      password: googleId ? null : password,
      googleId: googleId || null,
    };
    // @ts-ignore
    createNewUser(createdUser);
    dispatch({
      type: "START_USER_CREATION",
    });
  };

  return (
    <GoogleOAuthProvider clientId="336072333198-60i3r0h35vhbnfatbbpej79389omj03p.apps.googleusercontent.com">
      <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[80%] desktop:w-[66%] tablet:h-[74%] desktop:h-[80%] bg-bgPrimary mobile:mt-0 tablet:mt-[4rem] desktop:mt-[4.4rem] xl-screen:mt-[4.8rem] rounded-lg">
        <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
          {!isMobile && (
            <section className="w-[50%] h-[100%] flex flex-col items-center">
              <img
                src={signupImage}
                alt=""
                className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
              />
            </section>
          )}

          <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ">
            <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-6 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
              Create a new <span className="text-secondary">account...</span>
            </h1>
            <div className="w-full mobile:h-14 tablet:h-10  flex items-center justify-center">
              <p className="text-secondary mobile:text-[14px] tablet:text-[13px] desktop:text-[16px]">
                {userExistsMessage}
              </p>
            </div>
            <form
              action="submit"
              className="mobile:w-[100%] tablet:w-[66%] desktop:w-[56%] desktop:h-[60%] xl-screen:h-[64%] flex flex-col items-center mobile:mt-0 tablet:mt-0 desktop:mt-10"
              onSubmit={handleSubmit}
            >
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <div className="w-[100%] flex flex-row items-center justify-between">
                <label
                  htmlFor="username"
                  className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px] text-primary font-semibold ml-2 mr-auto "
                >
                  Username
                </label>

                <p className="mobile:text-[11px] tablet:text-[9px]  desktop:text-[11px] text-secondary font-semibold mr-2 ml-auto">
                  {isUsernameValid === false ||
                  (isUsernameBlur && username.length < 2 && username !== "") ? (
                    <p>{validationErrorMsg.username}</p>
                  ) : null}
                </p>
              </div>
              <input
                className={`w-[100%] mobile:h-[40px] tablet:h-[2.1rem] desktop:h-[2.4rem] xl-screen:h-[2.7rem] border-[1px] border-gray-200 rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px] desktop:placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${
                  isUsernameValid === true
                    ? "border-primary"
                    : isUsernameValid === false
                    ? "border-secondary"
                    : isUsernameValid === null
                    ? "border-gray-200"
                    : null
                } `}
                id="username"
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsUsernameblur(false);
                }}
                onBlur={() => handleUserNameBlur()}
                required
              />

              <div className="w-[100%] flex flex-row items-center justify-between mt-3">
                <label
                  htmlFor="email"
                  className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px]  text-primary font-semibold ml-2 mr-auto "
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
                className={`w-[100%] mobile:h-[40px] tablet:h-[2.1rem] border-[1px] rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px]  desktop:placeholder:text-[12px] xl-screen:h-[2.7rem] text-textPrimary text-[14px] mt-1 focus:outline-none  ${
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
                  className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px]  text-primary font-semibold ml-2 mr-auto "
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
                className={`w-[100%] mobile:h-[40px] tablet:h-[2.1rem] border-[1px] rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px]  desktop:placeholder:text-[12px]  xl-screen:h-[2.7rem]  text-textPrimary text-[14px] mt-1 focus:outline-none ${
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
              <div className="w-[100%] flex items-center justify-center mobile:mt-8 desktop:mt-10 xl-screen:mt-12 ">
                <Button
                handleClick={handleSubmit}
                  px="px-12"
                  py="py-3"
                  bgColour={state.isFormValid ? "bg-primary" : "bg-gray-300"}
                  isDisabled={!state.isFormValid}
                >
                  Create an account
                </Button>
              </div>
              <h3 className="text-textPrimary mobile:text-[14px] desktop:text-[20px] font-bold mobile:mt-6 tablet:mt-6 desktop:mt-12">
                Or sign up with <span className="text-primary">Google...</span>
              </h3>
              <div className="mt-8 xl-screen:mt-12 ">
                <GoogleLogin onSuccess={handleGoogleLogin} onError={() => {}} />
              </div>
            </form>
            <h2 className="text-textPrimary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px] font-semibold mobile:mt-6 tablet:mt-8 desktop:mt-6 ">
              Already have an account? Or want to
            </h2>
            <h2 className="text-textPrimary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px]  font-semibold mt-2 ">
              sign in as an existing user?{" "}
              <span
                onClick={handleSignInClick}
                className="text-secondary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px]  font-semibold cursor-pointer"
              >
                Sign In
              </span>
            </h2>
          </section>
        </main>
      </div>
    </GoogleOAuthProvider>
  );
};
export default SignUp;
