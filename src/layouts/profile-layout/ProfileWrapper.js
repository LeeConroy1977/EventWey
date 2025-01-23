import { jsx as _jsx } from "react/jsx-runtime";
const ProfileWrapper = ({ user }) => {
    return (_jsx("div", { className: "w-[100%] h-[12rem] tablet:h-[28rem] flex justify-center items-center bg-bgPrimary", children: _jsx("div", { className: "relative w-[100%] tablet-[94%] desktop:w-[66%] h-[100%] flex items-center justify-center", children: _jsx("img", { src: user?.profileBackgroundImage, alt: "", className: "w-[100%] h-[100%] " }) }) }));
};
export default ProfileWrapper;
