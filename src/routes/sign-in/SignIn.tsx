import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import Button from "../../reuseable-components/Button";

const SignIn = ({
  isEmailValid,
  isPasswordValid,
  loading,
  error,
  checkIfUserExists,
  handleEmailValidation,
  handlePasswordValidation,
  handleValidation,
  isFormValid,
}) => {
  const [googleSignIn, setGoogleSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [isEmailBlur, setIsEmailblur] = useState(false);
  const [isPasswordBlur, setIsPasswordblur] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,40}$/;

  const validationErrorMsg = {
    email: "Must be a valid email",
    password: "Password must be strong",
  };

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

  const handleGoogleLogin = (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = parseJwt(token);

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
  return (
    <GoogleOAuthProvider clientId="336072333198-60i3r0h35vhbnfatbbpej79389omj03p.apps.googleusercontent.com">
      <div className="flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary  mt-[6rem] rounded-lg">
        <main className="w-[100%] h-[100%] flex">
          <section className="w-[50%] h-[100%] flex flex-col items-center"></section>

          <section className="w-[50%] h-[100%] flex flex-col items-center ">
            <h1 className="text-textPrimary text-[28px] font-bold mt-12">
              Sign in to your account...
            </h1>
            <form
              action="submit"
              className="w-[56%] h-[60%] flex flex-col items-center mt-16"
              // onSubmit={handleSubmit}
            >
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
                >
                  Create an account
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

export default SignIn;
