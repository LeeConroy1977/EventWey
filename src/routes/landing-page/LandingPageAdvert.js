import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import advertImage from "../../assets/images/main.jpeg";
import useHandleCreateUserClick from "../../hooks/useHandleCreateUserClick";
import Button from "../../reuseable-components/Button";
const LandingPageAdvert = () => {
    const handleCreateUserClick = useHandleCreateUserClick();
    return (_jsxs("div", { className: "w-[100%] h-[16rem] flex items-center justify-center  bg-bgSecondary mt-16 px-8 py-4 rounded-lg", children: [_jsxs("div", { className: "w-[50%] h-[100%] flex flex-col items-start justify-center", children: [_jsx("h1", { className: "text-textPrimary text-[24px] font-bold ", children: "Join EventWay" }), _jsx("p", { className: "text-[12px] font-medium mt-2 w-[80%]", children: "Explore local events happening in Weymouth, from music festivals to neighborhood meetups, and discover exciting opportunities to get involved." }), _jsx("div", { className: "mt-10", children: _jsx(Button, { bgColour: "bg-secondary", px: "px-12", py: "py-3", handleClick: handleCreateUserClick, children: "Sign up" }) })] }), _jsx("div", { className: "w-[44%] h-[100%]", children: _jsx("img", { src: advertImage, alt: "", className: "w-[100%] h-[100%] rounded-lg" }) })] }));
};
export default LandingPageAdvert;
