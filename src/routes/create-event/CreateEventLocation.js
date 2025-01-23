import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Button from "../../reuseable-components/Button";
import EventMapContainer from "../../components/EventMapContainer";
import { useUser } from "../../contexts/UserContext";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
const defaultLocation = {
    placename: "Weymouth",
    lng: -2.4512,
    lat: 50.6105,
};
const CreateEventLocation = () => {
    const { nextStep, setNewEvent, newEvent, createEvent, finishCreateEvent, resetEvent, } = useCreateEventContext();
    const [eventLocation, setEventLocation] = useState(defaultLocation);
    const { user } = useUser();
    const handleLocationSelect = (lat, lng, placename) => {
        setEventLocation({ placename, lat, lng });
    };
    async function handleSubmit() {
        if (!user || !user.id) {
            console.error("User is not logged in or missing an ID.");
            return;
        }
        const updatedEvent = {
            ...newEvent,
            location: { ...eventLocation },
            creationDate: new Date().toISOString(),
        };
        setNewEvent(updatedEvent);
        try {
            await createEvent(updatedEvent);
            resetEvent();
            finishCreateEvent();
        }
        catch (error) {
            console.error("Failed to create Event:", error);
        }
    }
    console.log(eventLocation);
    return (_jsx("div", { className: "flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg", children: _jsxs("main", { className: "w-full h-full flex", children: [_jsx("section", { className: "w-[50%] h-[100%] flex flex-col items-center overflow-hidden", children: _jsx(EventMapContainer, { lng: defaultLocation.lng, lat: defaultLocation.lat, placename: defaultLocation.placename, onLocationSelect: handleLocationSelect }) }), _jsxs("section", { className: "w-[50%] h-[100%] flex flex-col items-center rounded-lg", children: [_jsx("h1", { className: "text-textPrimary text-[32px] font-semibold mt-12", children: "Add an event location" }), _jsx("h2", { className: "w-[70%] text-textPrimary text-[16px] font-semibold mt-8", children: "* Click on the map and select your event location." }), _jsxs("div", { className: "w-[70%] py-6 mt-8", children: [_jsx("p", { className: "  text-textPrmary font-semibold  mr-auto ml-2 mt-6", children: "Place name" }), _jsx("div", { className: "w-[100%] h-[3rem] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg ", children: eventLocation.placename }), _jsx("p", { className: "  text-textPrmary font-semibold  mr-auto ml-2 mt-8", children: "Longitude" }), _jsx("div", { className: "w-[100%] h-[3rem] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg", children: eventLocation.lng }), _jsx("p", { className: "  text-textPrmary font-semibold  mr-auto ml-2 mt-8", children: "Latitude" }), _jsx("div", { className: "w-[100%] h-[3rem] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg", children: eventLocation.lat })] }), _jsx("div", { className: "mt-auto mb-12", children: _jsx(Button, { handleClick: handleSubmit, bgColour: "bg-secondary", py: "py-3", px: "px-12", fontSize: "text-14px", children: "Submit group" }) })] })] }) }));
};
export default CreateEventLocation;
