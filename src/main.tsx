import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConnectionsProvider } from "./contexts/ConnectionsContext";
import { GroupsProvider } from "./contexts/GroupsContext";
import { EventProvider } from "./contexts/EventContext";
import { EventsProvider } from "./contexts/EventsContext";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import { GroupProvider } from "./contexts/GroupContext";
import { ConnectionProvider } from "./contexts/ConnectionContext";
import { CreateGroupProvider } from "./contexts/CreateGroupContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <EventsProvider>
          <EventProvider>
            <GroupsProvider>
              <GroupProvider>
                <ConnectionsProvider>
                  <ConnectionProvider>
                    <CreateGroupProvider>
                      <App />
                    </CreateGroupProvider>
                  </ConnectionProvider>
                </ConnectionsProvider>
              </GroupProvider>
            </GroupsProvider>
          </EventProvider>
        </EventsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
