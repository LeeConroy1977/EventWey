import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import UserLayout from "./layouts/UserLayout";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Events from "./pages/Events";
import Groups from "./pages/Groups";
import UserEvents from "./pages/UserEvents";
import UserConnection from "./pages/UserConnection";
import ConnectionRequests from "./pages/ConnectionRequests";
import UserGroups from "./pages/UserGroups";
import Event from "./pages/Event";
import Group from "./pages/Group";

function App() {
  return (
    <div className="w-[100%] min-h-screen font-poppins">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* <Route path="events" element={<Events />} /> */}
          <Route index element={<LandingPage />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/events/:id" element={<Event />} />
          <Route path="user/groups/:id" element={<Group />} />
          <Route path="user/messages" element={<Messages />} />
          <Route path="user/notifications" element={<Notifications />} />

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
