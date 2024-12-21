import { useState, useEffect } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import signupImage from "../../assets/images/signup.jpg";
import useHandleSignInClick from "../../hooks/useHandleSignUpClick";

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
  userGroups: [],
  userEvents: [],
  messages: [],
  receivedMessages: [],
  groupAdmin: [],
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
  const {
    state,
    dispatch,
    checkIfUserExists,
    createNewUser,
    handleValidation,
    handleUsenameValidation,
    handleEmailValidation,
    handlePasswordValidation,
    isUsernameValid,
    isEmailValid,
    isPasswordValid,
    error,
    loading,
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
      handleSubmit();
      setGoogleSignIn(false);
    }
  }, [googleSignIn]);

  useEffect(() => {
    handleUsenameValidation(username, usernameRegex);
    handleEmailValidation(email, emailRegex);
    handlePasswordValidation(password, passwordRegex);
  }, [email, username, password]);

  function handleUserNameBlur() {
    setIsUsernameblur(true);
  }

  function handleEmailBlur() {
    setIsEmailblur(true);
  }

  function handlePasswordBlur() {
    setIsPasswordblur(true);
  }

  const handleGoogleLogin = (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = parseJwt(token);

    setUsername(user.name);
    setEmail(user.email);
    setPassword(user.sub);
    setGoogleId(user.sub);

    setGoogleSignIn(true);
  };
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Invalid token");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const existingUser = await checkIfUserExists(email);
    if (existingUser) {
      return;
    }

    const createdUser = {
      ...newUser,
      username: username,
      email: email,
      password: googleId ? null : password,
      googleId: googleId || null,
    };

    console.log("Submitting User Data:", createdUser);
    createNewUser(createdUser);
    dispatch({
      type: "START_USER_CREATION",
    });
  };

  return (
    <GoogleOAuthProvider clientId="336072333198-60i3r0h35vhbnfatbbpej79389omj03p.apps.googleusercontent.com">
      <div className="flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary  mt-[6rem] rounded-lg">
        <main className="w-[100%] h-[100%] flex">
          <section className="w-[50%] h-[100%] flex flex-col items-center">
            <img
              src={signupImage}
              alt=""
              className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
            />
          </section>

          <section className="w-[50%] h-[100%] flex flex-col items-center ">
            <h1 className="text-textPrimary text-[28px] font-bold mt-12">
              Create a new <span className="text-secondary">account...</span>
            </h1>
            <form
              action="submit"
              className="w-[56%] h-[60%] flex flex-col items-center mt-16"
              onSubmit={handleSubmit}
            >
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <div className="w-[100%] flex flex-row items-center justify-between">
                <label
                  htmlFor="username"
                  className="text-[12px] text-primary font-semibold ml-2 mr-auto "
                >
                  Username
                </label>

                <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
                  {isUsernameValid === false ||
                  (isUsernameBlur && username.length < 2 && username !== "") ? (
                    <p>{validationErrorMsg.username}</p>
                  ) : null}
                </p>
              </div>
              <input
                className={`w-[100%] h-[2.4rem] border-[1px] border-gray-200 rounded-lg px-2 placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${
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
                  bgColour={state.isFormValid ? "bg-primary" : "bg-gray-300"}
                  isDisabled={!state.isFormValid}
                >
                  Create an account
                </Button>
              </div>
              <h3 className="text-textPrimary text-[20px] font-bold mt-12">
                Or sign up with <span className="text-primary">Google...</span>
              </h3>
              <div className="mt-8">
                <GoogleLogin onSuccess={handleGoogleLogin} onError={() => {}} />
              </div>
            </form>
            <h2 className="text-textPrimary text-[16px] font-semibold mt-6 ">
              Already have an account? Or want to
            </h2>
            <h2 className="text-textPrimary text-[16px] font-semibold mt-2 ">
              sign in as an existing user?{" "}
              <span
                onClick={handleSignInClick}
                className="text-secondary text-[16px] font-semibold cursor-pointer"
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
