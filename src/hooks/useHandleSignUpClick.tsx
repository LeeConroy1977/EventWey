import { useNavigate } from "react-router-dom";

const useHandleSignInClick = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate(`/auth/sign-in`);
  };

  return handleSignInClick;
};

export default useHandleSignInClick;
