import { useNavigate } from "react-router-dom";
import { useCreateGroupContext } from "../contexts/CreateGroupContext";
const useHandleGroupClick = () => {
    const navigate = useNavigate();
    const { resetGroup } = useCreateGroupContext();
    const handleGroupClick = (id) => {
        resetGroup();
        navigate(`/user/groups/${id}`);
    };
    return handleGroupClick;
};
export default useHandleGroupClick;
