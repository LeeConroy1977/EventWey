import { useNavigate } from "react-router-dom";
import { useCreateUserContext } from "../contexts/CreateUserContext";
const useHandleCreateUserClick = () => {
    const navigate = useNavigate();
    const { resetCreateUser } = useCreateUserContext();
    const handleCreateUserClick = () => {
        navigate(`/auth/sign-up`);
        resetCreateUser();
    };
    return handleCreateUserClick;
};
export default useHandleCreateUserClick;
