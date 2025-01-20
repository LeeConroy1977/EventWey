import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useModal } from "./contexts/ModalContext";
import useHandleSignInClick from "./hooks/useHandleSignUpClick";
import useHandleCreateUserClick from "./hooks/useHandleCreateUserClick";
import { useUser } from "./contexts/UserContext";

interface PrivateRouteProps {
  allowedRoutes: string[];
  user: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const { showModal, hideModal } = useModal();
  const { user } = useUser();
  const handleCreateUserClick = useHandleCreateUserClick();
  const handleSignInClick = useHandleSignInClick();

  if (!user) {
    showModal(
      <div className="w-[100%] h-[100%] flex flex-col items-center  ">
        <h1 className="text-[36px] font-bold text-secondary mt-4">EventWey</h1>
        <h1 className="text-[34px] font-bold text-textPrimary mt-[8rem]">
          You must be logged in to view this page!.
        </h1>
        <h2 className="text-[30px] font-semibold text-textPrimary mt-16 cursor-pointer">
          Sign in to your{" "}
          <span
            className="text-primary font-bold cursor-pointer"
            onClick={() => {
              handleSignInClick();
              hideModal();
            }}
          >
            account
          </span>{" "}
          or log in as an{" "}
          <span
            onClick={() => {
              handleSignInClick();
              hideModal();
            }}
            className="text-primary font-bold"
          >
            existing
          </span>{" "}
          user...
        </h2>
        <h2 className="text-[30px] font-semibold text-textPrimary mt-16 cursor-pointer">
          Sign up and create a{" "}
          <span
            className="text-primary font-bold"
            onClick={() => {
              handleCreateUserClick();
              hideModal();
            }}
          >
            new account...
          </span>
        </h2>
      </div>
    );
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
