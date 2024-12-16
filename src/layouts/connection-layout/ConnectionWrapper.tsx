import { useConnection } from "../../contexts/ConnectionContext";

const ConnectionWrapper = () => {
  const { connection } = useConnection();
  return (
    <div className="w-[100%] h-[28rem] flex justify-center items-center bg-bgPrimary">
      <div className="relative w-[66%] h-[100%] flex items-center justify-center">
        <img
          src={connection?.profileBackgroundImage}
          alt=""
          className="w-[100%] h-[100%] "
        />
      </div>
    </div>
  );
};

export default ConnectionWrapper;
