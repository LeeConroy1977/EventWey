import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminGroupCard from "./AdminGroupCard";
import createGroup2 from "../../assets/images/createGroup2.jpeg";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const CreateEventIntro = ({ adminGroups }) => {
    const { dispatch, setNewEvent, startEventCreation } = useCreateEventContext();
    const { isMobile } = useScreenWidth();
    function handleClick(id) {
        const selectedGroup = adminGroups.find((group) => group.id === id);
        setNewEvent((prevEvent) => (prevEvent = {
            ...prevEvent,
            groupId: selectedGroup.id,
            groupName: selectedGroup.name,
        }));
        startEventCreation();
    }
    return (_jsx("div", { className: "flex flex-col items-center mobile:w-[100%] tablet:w-[94%] desktop:w-[66%] mobile:h-[100%] tablet:h-[74%] desktop:h-[80%] bg-bgPrimary tablet:mt-[4rem] desktop:mt-[4.4rem] rounded-lg", children: _jsxs("main", { className: "w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0", children: [!isMobile && (_jsx("section", { className: "w-[50%] h-[100%] p-0", children: _jsx("img", { src: createGroup2, alt: "Sign Up", className: "w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg" }) })), _jsxs("section", { className: "mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ", children: [_jsx("h1", { className: "text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0", children: "Select the group hosting the event." }), _jsx("div", { className: "w-[100%] min-h-[90%] tablet:mt-4 desktop:mt-8 overflow-y-auto scrollbar-hide mobile:p-0 tablet:p-8", children: adminGroups.map((group) => {
                                return (_jsx(AdminGroupCard, { group: group, handleClick: handleClick }, group.id));
                            }) })] })] }) }));
};
export default CreateEventIntro;
