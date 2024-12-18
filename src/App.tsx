import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import UserLayout from "./layouts/UserLayout";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Events from "./pages/Events";
import Groups from "./pages/Groups";
import UserEvents from "./pages/UserEvents";
import UserConnection from "./pages/UserConnection";
import ConnectionRequests from "./pages/ConnectionRequests";
import UserGroups from "./pages/UserGroups";
import Event from "./pages/Event";
import GroupLayout from "./layouts/GroupLayout";
import GroupDetails from "./pages/GroupDetails";
import GroupEvents from "./pages/GroupEvents";
import GroupMembers from "./pages/GroupMembers";
import GroupChat from "./pages/GroupChat";
import VistorLayout from "./layouts/VistorLayout";
import ConnectionLayout from "./layouts/connection-layout/ConnectionLayout";
import ConnectionEvents from "./routes/connection-events/ConnectionEvents";
import ConnectionGroups from "./routes/connection-groups/ConnectionGroups";
import ConnectionConnections from "./routes/connection-connections/ConnectionConnections";
import ProfileLayout from "./layouts/profile-layout/ProfileLayout";
import ProfileEvents from "./routes/user-profile-events/ProfileEvents";
import ProfileGroups from "./routes/user-profile-groups/ProfileGroups";
import ProfileConnections from "./routes/user-profile-connections/ProfileConnections";
import ProfileSettings from "./routes/user-profile-settings/ProfileSettings";
import CreateGroupLayout from "./layouts/create-group-layout/CreateGroupLayout";
import CreateGroupIntro from "./routes/create-group/CreateGroupIntro";
import CreateGroupName from "./routes/create-group/CreateGroupName";
import CreateGroupDescription from "./routes/create-group/CreateGroupDescription";
import CreateGroupImage from "./routes/create-group/CreateGroupImage";
import CreateGroupCategory from "./routes/create-group/CreateGroupCategory";
import CreateGroupAccess from "./routes/create-group/CreateGroupAccess";
import CreateGroupLocation from "./routes/create-group/CreateGroupLocation";
import CreateGroup from "./routes/create-group/CreateGroup";

function App() {
  return (
    <div className="w-[100%] min-h-screen font-poppins">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />

          <Route path="/" element={<VistorLayout />}>
            <Route path="events" element={<Events />} />
            <Route path="groups" element={<Groups />} />
          </Route>

          <Route path="user" element={<UserLayout />}>
            <Route index element={<Navigate to="events" replace />} />
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

          <Route path="user/profile" element={<ProfileLayout />}>
            <Route index element={<Navigate to="events" replace />} />
            <Route path="events" element={<ProfileEvents />} />
            <Route path="groups" element={<ProfileGroups />} />
            <Route path="connections" element={<ProfileConnections />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route path="user/events/:id" element={<Event />} />
          <Route path="user/messages" element={<Messages />} />
          <Route path="user/notifications" element={<Notifications />} />

          <Route path="connection/:id" element={<ConnectionLayout />}>
            <Route index element={<Navigate to="events" replace />} />
            <Route path="events" element={<ConnectionEvents />} />
            <Route path="groups" element={<ConnectionGroups />} />
            <Route path="connections" element={<ConnectionConnections />} />
          </Route>

          <Route path="/user/groups/:id" element={<GroupLayout />}>
            <Route index element={<Navigate to="details" replace />} />
            <Route path="details" element={<GroupDetails />} />
            <Route path="events" element={<GroupEvents />} />
            <Route path="members" element={<GroupMembers />} />
            <Route path="chat" element={<GroupChat />} />
          </Route>
          <Route path="create-group/intro" element={<CreateGroupIntro />} />

          <Route path="create-group" element={<CreateGroup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
