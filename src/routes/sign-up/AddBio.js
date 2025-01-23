import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import Button from "../../reuseable-components/Button";
import { useUser } from "../../contexts/UserContext";
import signUpImage4 from "../../assets/images/signUp4.jpg";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const AddBio = () => {
    const { user } = useUser();
    const { isMobile } = useScreenWidth();
    const { patchUser, nextStep } = useCreateUserContext();
    const [isValidBio, setIsValidBio] = useState(null);
    const [bio, setBio] = useState("");
    useEffect(() => {
        handlePreviewBio();
    }, [bio]);
    function handlePreviewBio() {
        if (bio.length > 2 && bio.length < 50) {
            setIsValidBio(true);
        }
        else {
            setIsValidBio(false);
        }
    }
    function handleSubmit() {
        if (isValidBio) {
            patchUser("bio", bio);
        }
        nextStep();
    }
    return (_jsx("div", { className: "flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg", children: _jsxs("main", { className: "w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0", children: [!isMobile && (_jsx("section", { className: "w-[50%] h-[100%] flex flex-col items-center overflow-hidden", children: _jsx("img", { src: signUpImage4, alt: "Sign Up", className: "w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg" }) })), _jsxs("section", { className: "mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ", children: [_jsx("h1", { className: "text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0", children: "Add a profile bio" }), _jsx("h2", { className: " mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8", children: "* Describe yourself in less than 50 characters" }), _jsx("div", { className: "mobile:w-[100%] tablet:w-[80%] h-[34%] rounded-lg bg-gray-100 border-2 border-gray-200 mt-10 overflow-hidden", children: _jsx("p", { className: "text-[16px] font-medium p-6", children: bio }) }), _jsx("div", { className: "mobile:w-[100%] tablet:w-[70%] h-[1rem] flex text-[12px] text-secondary mobile:mt-8 tablet:mt-6 desktop:mt-[3rem] xl-screen:mt-[4rem]", children: _jsx("p", { className: " mobile:mr-auto tablet:mr-0 tablet:ml-auto mr-2 font-semibold mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] text-secondary", children: isValidBio === false && bio.length > 50
                                    ? "bio must be between 2-40 characters."
                                    : "" }) }), _jsx("input", { value: bio, type: "text", className: "mobile:w-[100%] tablet:w-[70%] h-[3rem] xl-screen:h-[3.4] border-[2px] border-gray-200 rounded-lg pl-4 mt-[1rem] mobile:placeholder:text-[12px] desktop:placeholder:text-[14px] focus:outline-none mobile:text-[14px] desktop:text-[16px]", placeholder: "Add a bio...", onChange: (e) => setBio(e.target.value) }), _jsx("div", { className: "mt-auto mobile:mb-[70px] tablet:mb-8 desktop:mb-12", children: _jsx(Button, { handleClick: handleSubmit, isDisabled: !isValidBio, bgColour: isValidBio ? "bg-secondary" : "bg-gray-300", py: "py-3", px: "px-12", fontSize: "text-14px", children: "Add bio" }) })] })] }) }));
};
export default AddBio;
