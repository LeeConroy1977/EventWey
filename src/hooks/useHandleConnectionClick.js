import { useNavigate } from "react-router-dom";
const useHandleConnectionClick = () => {
    const navigate = useNavigate();
    const handleConnectionClick = (id) => {
        navigate(`/connection/${id}`);
    };
    return handleConnectionClick;
};
export default useHandleConnectionClick;
