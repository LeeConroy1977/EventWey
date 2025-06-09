import { useNotifications } from "../../contexts/NotificationsContext";

const NotificationsPreview: React.FC<{
  handleClick: (id: number) => void;
}> = ({ handleClick }) => {
  const { userNotifications } = useNotifications();
  const notificationsCount = userNotifications?.filter(
    (notification) => notification.isRead === false
  );
  return (
    <div className="w-[100%] min-h-[600px]  flex flex-col rounded-lg bg-white p-4 xl-screen:p-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary tablet:text-[14px] desktop:text-[16px] xl-screen:text-[18px]">
          Notifications (
          <span className="text-primary">{notificationsCount?.length}</span>)
        </h3>
      </div>
      <div className="mt-4 space-y-4">
        {userNotifications &&
          userNotifications.map((notification) => {
            return (
              <div
                onClick={() => handleClick(notification.id)}
                className="bg-gray-50  p-2 cursor-pointer border-b-[1px] border-gray-200"
                key={notification.id}>
                {
                  <>
                    <p className="text-[11px] ">{notification.createdAt}</p>
                    <p
                      className={`text-[14px] ${
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
