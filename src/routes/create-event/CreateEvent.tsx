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
  const { state, getUserAdminGroups, adminGroups, loading, setLoading } =
    useCreateEventContext();
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
    return <div>Loading...</div>;
  }

  if (state.isCreateEventIntro && userAdminCount === 0) {
    return <NoAdminGroups />;
  }
  if (state.isCreateEventIntro) {
    // @ts-ignore
    return <CreateEventIntro adminGroups={adminGroups} />;
  }

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <CreateEventTitle />;
      case 2:
        return <CreateEventDescription />;
      case 3:
        return <CreateEventImage />;
      case 4:
        return <CreateEventTime />;
      case 5:
        return <CreateEventTickets />;
      case 6:
        return <CreateEventCategory />;
      case 7:
        return <CreateEventTags />;
      case 8:
        return <CreateEventLocation />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center mobile:w-[100%] tablet:w-[94%] desktop:w-[66%] mobile:h-[100%] tablet:h-[74%] desktop:h-[80%] bg-bgPrimary tablet:mt-[4rem] desktop:mt-[4.4rem] rounded-lg">
      <main className="w-[100%] h-[100%]">{renderStep()}</main>
    </div>
  );
};

export default CreateEvent;
