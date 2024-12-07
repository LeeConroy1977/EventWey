import { useNavigate } from "react-router-dom";

const useHandleGroupClick = () => {
  const navigate = useNavigate();

  const handleGroupClick = (id: string | number) => {
    navigate(`/user/groups/${id}`);
  };

  return handleGroupClick;
};

export default useHandleGroupClick;
