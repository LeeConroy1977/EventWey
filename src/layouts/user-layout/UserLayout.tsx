import { Outlet } from "react-router-dom";
import UserWrapper from "./UserWrapper";
import UserEventsPreview from "./UserEventsPreview";
import UserConnectionPreview from "./UserConnectionPreview";
import UserGroupsPreview from "./UserGroupsPreview";
import EventsOptions from "../../components/OptionsContainer";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNotifications } from "../../contexts/NotificationsContext";
import NotificationsPreview from "./NotificationsPreview";
import { useUserConnection } from "../../contexts/UserConnectionContext";
import { Notification } from "../../types/notifications";

const UserLayout: React.FC = () => {
  const { isMobile } = useScreenWidth();
  const { user } = useUser();

  const { getConnectionRequest, getSentConnectionRequest } =
    useUserConnection();
  const {
    notificationState: { userNotifications },
    patchNotification,
    getUserNotifications,
    setMainNotification,
    mainNotification,
  } = useNotifications();
  const isNotificationPageActive = location.pathname.startsWith(
    "/user/notifications"
  );

  const [optimisticNotifictions, setOptimisticNotifications] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    if (user) {
      getUserNotifications(user?.id);
      patchNotification(mainNotification?.id);
    }
  }, [user]);

  useEffect(() => {
    setOptimisticNotifications(userNotifications);
  }, [userNotifications]);

  function handleNotificationClick(id: number) {
    setOptimisticNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
    const selectedNotification = userNotifications.find(
      (notification: Notification) => notification.id === id
    );
    if (selectedNotification) {
      setMainNotification(selectedNotification);
      patchNotification(id);
    } else {
      console.warn(`Notification with id ${id} not found`);
      setMainNotification(null);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary mt-0 tablet:mt-6">
      {!isMobile && <UserWrapper />}
      <EventsOptions />
      <main className="w-full tablet:w-[94%] desktop:w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary ">
        {!isMobile && (
          <section className="w-[34%] tablet:w-[34%] desktop:w-[34%] h-[100%] flex flex-col items-center justify-start mt-8 ">
            {isNotificationPageActive && (
              <NotificationsPreview
                handleClick={handleNotificationClick}
                notifications={optimisticNotifictions}
              />
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
