import { Navigate, Route, Routes } from "react-router-dom";
import Messages from "./routes/messages/Messages";
import Notifications from "./routes/notifications/Notifications";
import UserEvents from "./routes/user-events/UserEvents";
import ConnectionRequests from "./routes/connection-requests/ConnectionRequests";
import Event from "./routes/event/Event";
import GroupLayout from "./layouts/group-layout/GroupLayout";
import ConnectionLayout from "./layouts/connection-layout/ConnectionLayout";
import ConnectionEvents from "./routes/connection-events/ConnectionEvents";
import ConnectionGroups from "./routes/connection-groups/ConnectionGroups";
import ConnectionConnections from "./routes/connection-connections/ConnectionConnections";
import ProfileLayout from "./layouts/profile-layout/ProfileLayout";
import ProfileEvents from "./routes/user-profile-events/ProfileEvents";
import ProfileGroups from "./routes/user-profile-groups/ProfileGroups";
import ProfileConnections from "./routes/user-profile-connections/ProfileConnections";
import ProfileSettings from "./routes/user-profile-settings/ProfileSettings";
import CreateGroup from "./routes/create-group/CreateGroup";
import CreateUser from "./routes/sign-up/CreateUser";
import SignIn from "./routes/sign-in/SignIn";
import PrivateRoute from "./PrivateRoute";
import CreateEvent from "./routes/create-event/CreateEvent";
import AppLayout from "./layouts/app-layout/AppLayout";
import LandingPage from "./routes/landing-page/LandingPage";
import VistorLayout from "./layouts/vistor-layout/VistorLayout";
import UserLayout from "./layouts/user-layout/UserLayout";
import UserGroups from "./routes/user-groups/UserGroups";
import UserConnection from "./routes/user-connections/UserConnection";
import GroupDetails from "./routes/group-details/GroupDetails";
import GroupEvents from "./routes/group-events/GroupEvents";
import GroupMembers from "./routes/group-members/GroupMembers";
import Events from "./routes/events/Events";
import Groups from "./routes/groups/Groups";
import { useUser } from "./contexts/UserContext";

function App() {
  const { user } = useUser();

  return (
    <div className="w-[100%] min-h-screen font-poppins">
      =
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />

          <Route path="/" element={<VistorLayout />}>
            <Route path="events" element={<Events />} />
            <Route path="groups" element={<Groups />} />
          </Route>

          <Route path="/user" element={<PrivateRoute />}>
            <Route element={<UserLayout />}>
              <Route index element={<Navigate to="events" replace />} />{" "}
              <Route path="events" element={<Events />} />
              <Route path="groups" element={<Groups />} />
              <Route path="my-events" element={<UserEvents />} />
              <Route path="my-groups" element={<UserGroups />} />
              <Route path="my-connections" element={<UserConnection />} />
              <Route
                path="my-connections/requests"
                element={<ConnectionRequests />}
              />
            </Route>
          </Route>

          <Route path="/user/profile" element={<PrivateRoute />}>
            <Route element={<ProfileLayout />}>
              <Route index element={<Navigate to="events" replace />} />
              <Route path="events" element={<ProfileEvents />} />
              <Route path="groups" element={<ProfileGroups />} />
              <Route path="connections" element={<ProfileConnections />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
          </Route>

          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />

          <Route path="/user/groups/:id" element={<PrivateRoute />}>
            <Route element={<GroupLayout />}>
              <Route index element={<Navigate to="details" replace />} />
              <Route path="details" element={<GroupDetails />} />
              <Route path="events" element={<GroupEvents />} />
              <Route path="members" element={<GroupMembers />} />
            </Route>
          </Route>
          <Route path="user/events/:id" element={<Event />} />

          <Route path="/connection/:id" element={<PrivateRoute />}>
            <Route element={<ConnectionLayout />}>
              <Route index element={<Navigate to="events" replace />} />
              <Route path="events" element={<ConnectionEvents />} />
              <Route path="groups" element={<ConnectionGroups />} />
              <Route path="connections" element={<ConnectionConnections />} />
            </Route>
          </Route>

          <Route path="/create-group" element={<PrivateRoute />}>
            <Route index element={<CreateGroup />} />
          </Route>

          <Route path="/create-event" element={<PrivateRoute />}>
            <Route index element={<CreateEvent />} />
          </Route>

          <Route path="/auth/sign-up" element={<CreateUser />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
