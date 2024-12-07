import { useNavigate } from "react-router-dom";

const useHandleEventClick = () => {
  const navigate = useNavigate();

  const handleEventClick = (id: string | number) => {
    navigate(`/user/events/${id}`);
  };

  return handleEventClick;
};

export default useHandleEventClick;
