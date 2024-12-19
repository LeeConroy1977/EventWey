import { useState, useEffect } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useUser } from "../../contexts/UserContext";
import { fetchAllUser } from "../../../utils/api";
import signupImage from "../../assets/images/signup.jpg";

const newUser = {
  email: "",
  username: "",
  password: "",
  googleId: null,
  backgroundImage: "",
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
  const { state, dispatch } = useCreateUserContext();
  const { createNewUser } = useUser();
  const [googleSignIn, setGoogleSignIn] = useState(false);
  const [error, setError] = useState(""); // State for error message
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    if (isUsernameValid && isEmailValid && isPasswordValid) {
      dispatch({
        type: "SET_FORM_VALID",
        payload: true,
      });
    } else {
      dispatch({
        type: "SET_FORM_VALID",
        payload: false,
      });
    }
  }, [isUsernameValid, isEmailValid, isPasswordValid, validateForm]);

  useEffect(() => {
    if (googleSignIn) {
      handleSubmit();
      setGoogleSignIn(false);
    }
  }, [googleSignIn]);

  const handleGoogleLogin = (credentialResponse) => {
    const token = credentialResponse.credential;
    console.log("Google JWT Token:", token);

    // Decode the JWT token to get user details
    const user = parseJwt(token);
    console.log("Google User Data:", user);

    // Update the reducer with Google user info
    dispatch({
      type: "SET_GOOGLE_USER",
      payload: {
        email: user.email,
        username: user.name,
        googleId: user.sub,
      },
    });

    setGoogleSignIn(true);

    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        console.error("Invalid token");
        return null;
      }
    };

    const checkIfUserExists = async () => {
      try {
        const users = await fetchAllUser();
        const existingUser = users.find(
          (user) =>
            user.email === state.email || user.username === state.username
        );
        return existingUser;
      } catch (error) {
        console.error("Error fetching users:", error);
        return null;
      }
    };

    const handleSubmit = async (e) => {
      if (e) e.preventDefault();

      const existingUser = await checkIfUserExists();
      if (existingUser) {
        setError("A user with this email or username already exists.");
        dispatch({
          type: "RESET_SIGNUP",
        });
        return;
      }

      const createdUser = {
        ...newUser,
        username: state.username,
        email: state.email,
        password: state.isGoogleUser ? null : state.password,
        googleId: state.googleId || null,
      };

      console.log("Submitting User Data:", createdUser);
      createNewUser(createdUser);
      dispatch({
        type: "START_USER_CREATION",
      });

      setError("");
    };

    function validateForm() {
      const usernameValid =
        state.username &&
        state.username.length >= 2 &&
        state.username.length <= 20;
      const emailValid = state.email && /\S+@\S+\.\S+/.test(state.email);
      const passwordValid = state.password && state.password.length > 7;

      setIsUsernameValid(usernameValid);
      setIsEmailValid(emailValid);
      setIsPasswordValid(passwordValid);
    }

    const handleBlur = (field) => {
      let errors = { ...validationErrors };

      if (field === "username") {
        if (!state.username) {
          errors.username = "Username is required";
        } else if (state.username.length < 2 || state.username.length > 20) {
          errors.username = "Must be between 2 and 20 characters";
        } else {
          errors.username = "";
        }
      }

      if (field === "email") {
        if (!state.email || !/\S+@\S+\.\S+/.test(state.email)) {
          errors.email = "Valid email is required";
        } else {
          errors.email = "";
        }
      }

      if (field === "password") {
        if (!state.password || state.password.length > 7) {
          errors.password = "Must be at least 6 characters";
        } else {
          errors.password = "";
        }
      }

      setValidationErrors(errors);
    };

    const handleInputChange = (field, value) => {
      dispatch({
        type: "SET_FIELD",
        payload: { field, value },
      });
      validateForm();
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
                Create a New Account...
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
                  {validationErrors.username && (
                    <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
                      {validationErrors.username}
                    </p>
                  )}
                </div>
                <input
                  className={`w-[100%] h-[2.4rem] border-[1px] rounded-lg px-2 placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${
                    validationErrors.username
                      ? "border-red-500"
                      : state.username.length >= 2 &&
                        state.username.length <= 20
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                  id="username"
                  type="text"
                  placeholder="Enter a username"
                  value={state.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  onBlur={() => handleBlur("username")}
                  required
                />

                <div className="w-[100%] flex flex-row items-center justify-between mt-3">
                  <label
                    htmlFor="email"
                    className="text-[12px] text-primary font-semibold ml-2 mr-auto "
                  >
                    Email
                  </label>
                  {validationErrors.email && (
                    <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <input
                  className={`w-[100%] h-[2.4rem] border-[1px] rounded-lg px-2 placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${
                    validationErrors.email
                      ? "border-red-500"
                      : state.email
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={state.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  required
                />

                <div className="w-[100%] flex flex-row items-center justify-between mt-3">
                  <label
                    htmlFor="password"
                    className="text-[12px] text-primary font-semibold ml-2 mr-auto "
                  >
                    Password
                  </label>
                  {validationErrors.password && (
                    <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                <input
                  className={`w-[100%] h-[2.4rem] border-[1px] rounded-lg px-2 placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${
                    validationErrors.password
                      ? "border-red-500"
                      : state.password.length >= 6
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={state.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onBlur={() => handleBlur("password")}
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
                  Or sign up with google
                </h3>
                <div className="mt-8">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {}}
                  />
                </div>
              </form>
              <h2 className="text-textPrimary text-[16px] font-semibold mt-6 ">
                Already have an account? Or want to
              </h2>
              <h2 className="text-textPrimary text-[16px] font-semibold mt-2 ">
                sign in as an existing user?{" "}
                <span className="text-secondary text-[16px] font-semibold cursor-pointer">
                  Sign In
                </span>
              </h2>
            </section>
          </main>
        </div>
      </GoogleOAuthProvider>
    );
  };
};
export default SignUp;
