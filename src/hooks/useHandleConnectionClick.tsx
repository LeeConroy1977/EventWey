import { useNavigate } from "react-router-dom";

const useHandleConnectionClick = () => {
  const navigate = useNavigate();

  const handleConnectionClick = (id: string | number) => {
    navigate(`/connection/${id}`);
  };

  return handleConnectionClick;
};

export default useHandleConnectionClick;
