import { Outlet, useParams } from "react-router-dom";
import ConnectionNavBar from "./ConnectionNavBar";
import ConnectionWrapper from "./ConnectionWrapper";
import { useEffect } from "react";
import { useConnection } from "../../contexts/ConnectionContext";
import ConnectionBio from "./ConnectionBio";
import ConnectionAboutMe from "./ConnectionAboutMe";

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
    getConnectionById(Number(id));
    getConnectionConnections(Number(id));
    getConnectionEvents(Number(id));
    getConnectionGroups(Number(id));
  }, [id]);

  return (
    <div className="w-full min-[100%] flex flex-col items-center bg-bgSecondary">
      <ConnectionWrapper />
      <main className="w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary">
        <section className="relative w-[34%] h-[100%] flex flex-col items-center justify-start p-6">
          <img
            src={connection?.profileImage}
            alt=""
            className="absolute top-[-5.8rem] left-[7rem] rounded-full w-[200px] h-[200px] border-[10px] border-white"
          />
          <h1 className="mt-[6.5rem] font-semibold text-[26px]">
            {connection?.username}
          </h1>
          <ConnectionBio connection={connection} />
          <ConnectionAboutMe connection={connection} />
        </section>
        <section className="flex flex-col justify-start items-start w-[66%] h-[100%] p-6">
          <ConnectionNavBar />
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default ConnectionLayout;
