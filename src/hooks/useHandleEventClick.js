import { useNavigate } from "react-router-dom";
const useHandleEventClick = () => {
    const navigate = useNavigate();
    const handleEventClick = (id) => {
        navigate(`/user/events/${id}`);
    };
    return handleEventClick;
};
export default useHandleEventClick;
