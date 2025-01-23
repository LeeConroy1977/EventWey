import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const { state, dispatch, checkIfUserExists, createNewUser, handleValidation, handleUsenameValidation, handleEmailValidation, handlePasswordValidation, isUsernameValid, isEmailValid, isPasswordValid, error, loading, } = useCreateUserContext();
    const [googleSignIn, setGoogleSignIn] = useState(false);
    const handleSignInClick = useHandleSignInClick();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [googleId, setGoogleId] = useState("");
    const [isUsernameBlur, setIsUsernameblur] = useState(false);
    const [isEmailBlur, setIsEmailblur] = useState(false);
    const [isPasswordBlur, setIsPasswordblur] = useState(false);
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
        }
        catch (e) {
            console.error("Invalid token");
            return null;
        }
    };
    const handleSubmit = async (e) => {
        if (e)
            e.preventDefault();
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
    return (_jsx(GoogleOAuthProvider, { clientId: "336072333198-60i3r0h35vhbnfatbbpej79389omj03p.apps.googleusercontent.com", children: _jsx("div", { className: "flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[80%] desktop:w-[66%] tablet:h-[74%] desktop:h-[80%] bg-bgPrimary mobile:mt-0 tablet:mt-[4rem] desktop:mt-[4.4rem] xl-screen:mt-[4.8rem] rounded-lg", children: _jsxs("main", { className: "w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0", children: [!isMobile && (_jsx("section", { className: "w-[50%] h-[100%] flex flex-col items-center", children: _jsx("img", { src: signupImage, alt: "", className: "w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg" }) })), _jsxs("section", { className: "mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ", children: [_jsxs("h1", { className: "text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0", children: ["Create a new ", _jsx("span", { className: "text-secondary", children: "account..." })] }), _jsxs("form", { action: "submit", className: "mobile:w-[100%] tablet:w-[66%] desktop:w-[56%] desktop:h-[60%] xl-screen:h-[64%] flex flex-col items-center mobile:mt-8 tablet:mt-6 desktop:mt-16", onSubmit: handleSubmit, children: [error && (_jsx("div", { className: "text-red-500 text-sm mb-4", children: error })), _jsxs("div", { className: "w-[100%] flex flex-row items-center justify-between", children: [_jsx("label", { htmlFor: "username", className: "mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px] text-primary font-semibold ml-2 mr-auto ", children: "Username" }), _jsx("p", { className: "mobile:text-[11px] tablet:text-[9px]  desktop:text-[11px] text-secondary font-semibold mr-2 ml-auto", children: isUsernameValid === false ||
                                                    (isUsernameBlur && username.length < 2 && username !== "") ? (_jsx("p", { children: validationErrorMsg.username })) : null })] }), _jsx("input", { className: `w-[100%] mobile:h-[40px] tablet:h-[2.1rem] desktop:h-[2.4rem] xl-screen:h-[2.7rem] border-[1px] border-gray-200 rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px] desktop:placeholder:text-[12px] text-textPrimary text-[14px] mt-1 focus:outline-none ${isUsernameValid === true
                                            ? "border-primary"
                                            : isUsernameValid === false
                                                ? "border-secondary"
                                                : isUsernameValid === null
                                                    ? "border-gray-200"
                                                    : null} `, id: "username", type: "text", placeholder: "Enter a username", value: username, onChange: (e) => {
                                            setUsername(e.target.value);
                                            setIsUsernameblur(false);
                                        }, onBlur: () => handleUserNameBlur(), required: true }), _jsxs("div", { className: "w-[100%] flex flex-row items-center justify-between mt-3", children: [_jsx("label", { htmlFor: "email", className: "mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px]  text-primary font-semibold ml-2 mr-auto ", children: "Email" }), _jsx("p", { className: "mobile:text-[11px] tablet:text-[9px]  desktop:text-[11px] text-secondary font-semibold mr-2 ml-auto", children: isEmailValid === false && isEmailBlur ? (_jsx("p", { children: validationErrorMsg.email })) : isEmailValid === true ? null : null })] }), _jsx("input", { className: `w-[100%] mobile:h-[40px] tablet:h-[2.1rem] border-[1px] rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px]  desktop:placeholder:text-[12px] xl-screen:h-[2.7rem] text-textPrimary text-[14px] mt-1 focus:outline-none  ${isEmailValid === true
                                            ? "border-primary"
                                            : isEmailValid && isEmailBlur === false
                                                ? "border-secondary"
                                                : isEmailValid === null
                                                    ? "border-gray-200"
                                                    : null} `, id: "email", type: "email", placeholder: "Enter your email", value: email, onChange: (e) => {
                                            setEmail(e.target.value);
                                            setIsEmailblur(false);
                                        }, onBlur: () => handleEmailBlur(), required: true }), _jsxs("div", { className: "w-[100%] flex flex-row items-center justify-between mt-3", children: [_jsx("label", { htmlFor: "password", className: "mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px]  text-primary font-semibold ml-2 mr-auto ", children: "Password" }), _jsx("p", { className: "mobile:text-[11px] tablet:text-[9px]  desktop:text-[11px] text-secondary font-semibold mr-2 ml-auto", children: isPasswordValid === false ||
                                                    (isPasswordValid === null &&
                                                        isPasswordBlur &&
                                                        password !== "") ? (_jsx("p", { children: validationErrorMsg.password })) : isPasswordValid === true ? null : null })] }), _jsx("input", { className: `w-[100%] mobile:h-[40px] tablet:h-[2.1rem] border-[1px] rounded-lg px-2 mobile:placeholder:text-[11px] tablet:placeholder:text-[10px]  desktop:placeholder:text-[12px]  xl-screen:h-[2.7rem]  text-textPrimary text-[14px] mt-1 focus:outline-none ${isPasswordValid === true
                                            ? "border-primary"
                                            : isPasswordValid === false
                                                ? "border-secondary"
                                                : isPasswordValid === null
                                                    ? "border-gray-200"
                                                    : null}`, id: "password", type: "password", placeholder: "Enter your password", value: password, onChange: (e) => {
                                            setPassword(e.target.value);
                                            setIsPasswordblur(false);
                                        }, onBlur: () => handlePasswordBlur(), required: true }), _jsx("div", { className: "w-[100%] flex items-center justify-center mobile:mt-8 desktop:mt-10 xl-screen:mt-12 ", children: _jsx(Button, { px: "px-12", py: "py-3", bgColour: state.isFormValid ? "bg-primary" : "bg-gray-300", isDisabled: !state.isFormValid, children: "Create an account" }) }), _jsxs("h3", { className: "text-textPrimary mobile:text-[14px] desktop:text-[20px] font-bold mobile:mt-6 tablet:mt-6 desktop:mt-12", children: ["Or sign up with ", _jsx("span", { className: "text-primary", children: "Google..." })] }), _jsx("div", { className: "mt-8 xl-screen:mt-12 ", children: _jsx(GoogleLogin, { onSuccess: handleGoogleLogin, onError: () => { } }) })] }), _jsx("h2", { className: "text-textPrimary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px] font-semibold mobile:mt-6 tablet:mt-8 desktop:mt-6 ", children: "Already have an account? Or want to" }), _jsxs("h2", { className: "text-textPrimary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px]  font-semibold mt-2 ", children: ["sign in as an existing user?", " ", _jsx("span", { onClick: handleSignInClick, className: "text-secondary mobile:text-[14px] desktop:text-[16px] xl-screen:text-[18px]  font-semibold cursor-pointer", children: "Sign In" })] })] })] }) }) }));
};
export default SignUp;
