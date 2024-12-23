import { Outlet, useParams } from "react-router-dom";
import ConnectionNavBar from "./ConnectionNavBar";
import ConnectionWrapper from "./ConnectionWrapper";
import { useEffect } from "react";
import { useConnection } from "../../contexts/ConnectionContext";
import ConnectionBio from "./ConnectionBio";
import ConnectionAboutMe from "./ConnectionAboutMe";
import ConnectionTags from "./ConnectionTags";

const ConnectionLayout = () => {
  const { id } = useParams();
  const {
    connection,
    getConnectionById,
    getConnectionConnections,
    getConnectionEvents,
    getConnectionGroups,
  } = useConnection();

  useEffect(() => {
    getConnectionById(id);
    getConnectionConnections(id);
    getConnectionEvents(id);
    getConnectionGroups(id);
  }, [id]);

  return (
    <div className="w-full min-[100%] flex flex-col items-center bg-bgSecondary">
      <ConnectionWrapper />
      <main className="w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary">
        <section className="relative w-[34%] h-[100%] flex flex-col items-center justify-start pr-6">
          <img
            src={connection?.profileImage}
            alt=""
            className="absolute top-[-5.8rem] left-[7rem] rounded-full w-[200px] h-[200px] border-[10px] border-white"
          />

          <ConnectionBio connection={connection} />
          <ConnectionAboutMe connection={connection} />
          <ConnectionTags connection={connection} />
        </section>
        <section className="flex flex-col justify-start items-start w-[66%] h-[100%] pl-6">
          <div className=" w-[100%] h-[4rem] flex justify-between items-center px-4 mt-[2.5rem] ">
            <h1 className=" font-semibold text-[26px]">
              {connection?.username}
            </h1>
            <button className=" py-3 px-12 flex justify-center items-center mt-auto mb-3 text-primary text-[14px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary">
              Connect
            </button>
          </div>
          <ConnectionNavBar />
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default ConnectionLayout;
