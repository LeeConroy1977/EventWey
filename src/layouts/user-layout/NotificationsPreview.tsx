import { useNotifications } from "../../contexts/NotificationsContext";
import { timeSince } from "../../../utils/timeSince";
import { Notification } from "../../types/notifications";

const NotificationsPreview: React.FC<{
  notifications: Notification[]
  handleClick: (id: number) => void;
}> = ({ handleClick , notifications}) => {
  const {
    // notificationState: { userNotifications },
  } = useNotifications();
  const notificationsCount = notifications?.filter(
    (notification) => notification.isRead === false
  );

  return (
    <div className="w-[100%] h-[600px]  flex flex-col rounded-lg bg-white p-4 xl-screen:p-6 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary tablet:text-[14px] desktop:text-[16px] xl-screen:text-[18px]">
          Notifications (
          <span className="text-primary">
            {notificationsCount?.length || 0}
          </span>
          )
        </h3>
      </div>
      <div className="mt-4 space-y-4  overflow-y-scroll">
        {notifications &&
          notifications.map((notification) => {
            return (
              <div
                onClick={() => handleClick(notification?.id)}
                className="min-h-[80px] bg-gray-50  p-4 cursor-pointer border-b-[1px] border-gray-200 rounded-lg"
                key={notification.id}>
                {
                  <>
                    <p className="text-[11px] ">
                      {timeSince(notification.createdAt)}
                    </p>
                    <p
                      className={`text-[14px] mt-1 ${
                        notification.isRead
                          ? "font-medium text-textPrimary"
                          : "font-semibold text-primary"
                      }`}>
                      {notification.message}
                    </p>
                  </>
                }
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NotificationsPreview;
