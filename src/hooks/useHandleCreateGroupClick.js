import { useNavigate } from "react-router-dom";
import { useCreateGroupContext } from "../contexts/CreateGroupContext";
const useHandleCreateGroupClick = () => {
    const navigate = useNavigate();
    const { dispatch } = useCreateGroupContext();
    const handleCreateGroupClick = () => {
        navigate(`/create-group`);
        dispatch({ type: "RESTART_GROUP_CREATION" });
    };
    return handleCreateGroupClick;
};
export default useHandleCreateGroupClick;
