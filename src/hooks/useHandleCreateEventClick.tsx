import { useNavigate } from "react-router-dom";
import { useCreateEventContext } from "../contexts/CreateEventContext";

const useHandleCreateEventClick = () => {
  const navigate = useNavigate();
  const { dispatch } = useCreateEventContext();

  const handleCreateEventClick = () => {
    navigate(`/create-event`);
    dispatch({ type: "RESTART_EVENT_CREATION" });
  };

  return handleCreateEventClick;
};

export default useHandleCreateEventClick;
