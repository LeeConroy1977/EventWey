import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUser } from "../../contexts/UserContext";
import useHandleCreateEventClick from "../../hooks/useHandleCreateEventClick";
import Button from "../../reuseable-components/Button";
const UserWrapper = () => {
    const { user } = useUser();
    const handleCreateEventClick = useHandleCreateEventClick();
    const firstName = user?.username ? user.username.split(" ")[0] : "";
    function handleClick() {
        return handleCreateEventClick();
    }
    return (_jsx("div", { className: "w-[100%] tablet:h-[10rem] desktop:h-[10rem] xl-screen:h-[13rem] flex items-center justify-center   bg-[#F6F7F8]", children: _jsxs("div", { className: " tablet:w-[90%] desktop:w-[66%] h-[100%] flex items-center justify-center", children: [_jsxs("h1", { className: "text-[26px] font-bold ml-6 text-[#2C3E50]", children: ["Welcome, ", _jsx("span", { className: "text-[#5D9B9B]", children: firstName })] }), _jsx("div", { className: "ml-auto", children: _jsx(Button, { bgColour: "bg-secondary", px: "px-8", py: "py-3", handleClick: handleClick, children: "Create an event" }) })] }) }));
};
export default UserWrapper;
