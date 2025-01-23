import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
import EventMapContainer from "../../components/EventMapContainer";
import { useUser } from "../../contexts/UserContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const defaultLocation = {
    placename: "Weymouth",
    lng: -2.4512,
    lat: 50.6105,
};
const CreateGroupLocation = () => {
    const { nextStep, setNewGroup, newGroup, createGroup, finishCreateGroup, resetGroup, } = useCreateGroupContext();
    const [groupLocation, setGroupLocation] = useState(defaultLocation);
    const { user } = useUser();
    const { isMobile } = useScreenWidth();
    const handleLocationSelect = (lat, lng, placename) => {
        setGroupLocation({ placename, lat, lng });
    };
    async function handleSubmit() {
        if (!user || !user.id) {
            console.error("User is not logged in or missing an ID.");
            return;
        }
        const updatedGroup = {
            ...newGroup,
            location: { ...groupLocation },
            creationDate: new Date().toISOString(),
            groupAdmin: [user.id],
            members: [user.id],
        };
        setNewGroup(updatedGroup);
        try {
            await createGroup(updatedGroup);
            resetGroup();
            finishCreateGroup();
        }
        catch (error) {
            console.error("Failed to create group:", error);
        }
    }
    console.log(groupLocation);
    return (_jsx("div", { className: "flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg", children: _jsxs("main", { className: "w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0", children: [!isMobile && (_jsx("section", { className: "w-[50%] h-[100%] flex flex-col items-center overflow-hidden", children: _jsx(EventMapContainer, { lng: defaultLocation.lng, lat: defaultLocation.lat, placename: defaultLocation.placename, onLocationSelect: handleLocationSelect }) })), _jsxs("section", { className: "mobile:w-[100%] tablet:w-[50%] tablet:h-[100%] flex flex-col items-center ", children: [_jsx("h1", { className: "text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0", children: "Add a group location" }), _jsx("h2", { className: " mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8", children: "* Click on the map and select your group location." }), isMobile && (_jsx("section", { className: "w-[100%] h-[360px] mt-6 flex flex-col items-center overflow-hidden", children: _jsx(EventMapContainer, { lng: defaultLocation.lng, lat: defaultLocation.lat, placename: defaultLocation.placename, onLocationSelect: handleLocationSelect }) })), _jsxs("div", { className: "mobile:w-[100%] tablet:w-[70%] py-6 mobile:mt-0 desktop:mt-8", children: [_jsx("p", { className: "mobile:text-[14px] desktop:text-[16px]  text-textPrmary font-semibold  mr-auto ml-2 mt-6", children: "Place name" }), _jsx("div", { className: "w-[100%] h-[3rem] mobile:text-[14px] desktop:text-[16px] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg ", children: groupLocation.placename }), _jsx("p", { className: "mobile:text-[14px] desktop:text-[16px]  text-textPrmary font-semibold  mr-auto ml-2 mt-8", children: "Longitude" }), _jsx("div", { className: "w-[100%] h-[3rem] mobile:text-[14px] desktop:text-[16px] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg", children: groupLocation.lng }), _jsx("p", { className: "mobile:text-[14px] desktop:text-[16px]  text-textPrmary font-semibold  mr-auto ml-2 mt-8", children: "Latitude" }), _jsx("div", { className: "w-[100%] h-[3rem] mobile:text-[14px] desktop:text-[16px] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg", children: groupLocation.lat })] }), _jsx("div", { className: "mobile:mt-6 desktop:mt-auto mobile:mb-[70px] tablet:mb-8 desktop:mb-12", children: _jsx(Button, { handleClick: handleSubmit, bgColour: "bg-secondary", py: "py-3", px: "px-12", fontSize: "text-14px", children: "Submit group" }) })] })] }) }));
};
export default CreateGroupLocation;
