import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useModal } from "./contexts/ModalContext";
import useHandleSignInClick from "./hooks/useHandleSignUpClick";
import useHandleCreateUserClick from "./hooks/useHandleCreateUserClick";
import { useUser } from "./contexts/UserContext";
const PrivateRoute = () => {
    const { showModal, hideModal } = useModal();
    const { user } = useUser();
    const handleCreateUserClick = useHandleCreateUserClick();
    const handleSignInClick = useHandleSignInClick();
    if (!user) {
        showModal(_jsxs("div", { className: "w-[100%] h-[100%] flex flex-col items-center  ", children: [_jsx("h1", { className: "text-[36px] font-bold text-secondary mt-4", children: "EventWey" }), _jsx("h1", { className: "text-[34px] font-bold text-textPrimary mt-[8rem]", children: "You must be logged in to view this page!." }), _jsxs("h2", { className: "text-[30px] font-semibold text-textPrimary mt-16 cursor-pointer", children: ["Sign in to your", " ", _jsx("span", { className: "text-primary font-bold cursor-pointer", onClick: () => {
                                handleSignInClick();
                                hideModal();
                            }, children: "account" }), " ", "or log in as an", " ", _jsx("span", { onClick: () => {
                                handleSignInClick();
                                hideModal();
                            }, className: "text-primary font-bold", children: "existing" }), " ", "user..."] }), _jsxs("h2", { className: "text-[30px] font-semibold text-textPrimary mt-16 cursor-pointer", children: ["Sign up and create a", " ", _jsx("span", { className: "text-primary font-bold", onClick: () => {
                                handleCreateUserClick();
                                hideModal();
                            }, children: "new account..." })] })] }));
        return _jsx(Navigate, { to: "/" });
    }
    return _jsx(Outlet, {});
};
export default PrivateRoute;
