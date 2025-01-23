import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
import { useUser } from "../../contexts/UserContext";
import CreateEventDescription from "./CreateEventDescription";
import CreateEventImage from "./CreateEventImage";
import CreateEventIntro from "./CreateEventIntro";
import CreateEventTickets from "./CreateEventTickets";
import CreateEventTime from "./CreateEventTime";
import NoAdminGroups from "./NoAdminGroups";
import CreateEventTitle from "./CreateEventTitle";
import CreateEventCategory from "./CreateEventCategory";
import CreateEventTags from "./CreateEventTags";
import CreateEventLocation from "./CreateEventLocation";
const CreateEvent = () => {
    const { state, getUserAdminGroups, adminGroups, loading, setLoading } = useCreateEventContext();
    const { user } = useUser();
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                await getUserAdminGroups();
            }
            setLoading(false);
        };
        fetchData();
    }, [user, getUserAdminGroups]);
    const userAdminCount = adminGroups?.length;
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (state.isCreateEventIntro && userAdminCount === 0) {
        return _jsx(NoAdminGroups, {});
    }
    if (state.isCreateEventIntro) {
        return _jsx(CreateEventIntro, { adminGroups: adminGroups });
    }
    const renderStep = () => {
        switch (state.currentStep) {
            case 1:
                return _jsx(CreateEventTitle, {});
            case 2:
                return _jsx(CreateEventDescription, {});
            case 3:
                return _jsx(CreateEventImage, {});
            case 4:
                return _jsx(CreateEventTime, {});
            case 5:
                return _jsx(CreateEventTickets, {});
            case 6:
                return _jsx(CreateEventCategory, {});
            case 7:
                return _jsx(CreateEventTags, {});
            case 8:
                return _jsx(CreateEventLocation, {});
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "flex flex-col items-center mobile:w-[100%] tablet:w-[94%] desktop:w-[66%] mobile:h-[100%] tablet:h-[74%] desktop:h-[80%] bg-bgPrimary tablet:mt-[4rem] desktop:mt-[4.4rem] rounded-lg", children: _jsx("main", { className: "w-[100%] h-[100%]", children: renderStep() }) }));
};
export default CreateEvent;
