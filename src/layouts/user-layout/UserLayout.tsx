import { Outlet } from "react-router-dom";
import UserWrapper from "./UserWrapper";
import UserEventsPreview from "./UserEventsPreview";
import UserConnectionPreview from "./UserConnectionPreview";
import UserGroupsPreview from "./UserGroupsPreview";
import EventsOptions from "../../components/OptionsContainer";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNotifications } from "../../contexts/NotificationsContext";
import NotificationsPreview from "./NotificationsPreview";

const UserLayout: React.FC = () => {
  const { isMobile } = useScreenWidth();
  const { getUserNotifications, user, getConnectionRequest } = useUser();
  const {
    mainNotification,
    setMainNotification,
    userNotifications,
    patchNotification,
  } = useNotifications();
  const isNotificationPageActive = location.pathname.startsWith(
    "/user/notifications"
  );

  useEffect(() => {
    if (!isNotificationPageActive && userNotifications?.length > 0) {
      setMainNotification(userNotifications[0]);
    }
  }, [isNotificationPageActive !== true]);

  useEffect(() => {
    if (user) {
      getUserNotifications(user?.id);
    }
  }, [user]);

  useEffect(() => {
    if (userNotifications?.length > 0 && !mainNotification) {
      setMainNotification(userNotifications[0]);
      getConnectionRequest(user?.id);
    }
  }, [userNotifications, handleNotificationClick]);

  useEffect(() => {
    if (userNotifications?.length > 0) {
      const primaryNotification = userNotifications[0].id;
      patchNotification(primaryNotification);
    }
  }, []);

  function handleNotificationClick(id: number) {
    const notification = userNotifications?.find(
      (notification) => notification.id === id
    );
    patchNotification(id);
    getUserNotifications(user.id);
    setMainNotification(notification);
  }

  console.log(userNotifications);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary mt-0 tablet:mt-6">
      {!isMobile && <UserWrapper />}
      <EventsOptions />
      <main className="w-full tablet:w-[94%] desktop:w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary ">
        {!isMobile && (
          <section className="w-[34%] tablet:w-[34%] desktop:w-[34%] h-[100%] flex flex-col items-center justify-start mt-8 ">
            {isNotificationPageActive &&
              mainNotification &&
              userNotifications && (
                <NotificationsPreview handleClick={handleNotificationClick} />
              )}
            {!isNotificationPageActive && (
              <>
                <UserEventsPreview />
                <UserConnectionPreview />
                <UserGroupsPreview />
              </>
            )}
          </section>
        )}

        <section className="flex flex-col justify-start items-start w-full tablet:w-[66%] desktop:w-[66%] h-[100%] tablet:pl-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default UserLayout;
