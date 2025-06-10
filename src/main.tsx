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
import { CreateUserProvider } from "./contexts/CreateUserContext";

import { ModalProvider } from "./contexts/ModalContext";
import { CreateEventProvider } from "./contexts/CreateEventContext";
import { EventModalProvider } from "./contexts/EventModelContext";
import { ScreenWidthProvider } from "./contexts/ScreenWidthContext";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScreenWidthProvider>
        <ModalProvider>
          <NotificationsProvider>
            <GroupsProvider>
              <GroupProvider>
                <EventsProvider>
                  <EventProvider>
                    <UserProvider>
                      <ConnectionsProvider>
                        <ConnectionProvider>
                          <UserProvider>
                            <CreateGroupProvider>
                              <CreateEventProvider>
                                <CreateUserProvider>
                                  <AuthProvider>
                                    <EventModalProvider>
                                      <App />
                                    </EventModalProvider>
                                  </AuthProvider>
                                </CreateUserProvider>
                              </CreateEventProvider>
                            </CreateGroupProvider>
                          </UserProvider>
                        </ConnectionProvider>
                      </ConnectionsProvider>
                    </UserProvider>
                  </EventProvider>
                </EventsProvider>
              </GroupProvider>
            </GroupsProvider>
          </NotificationsProvider>
        </ModalProvider>
      </ScreenWidthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
