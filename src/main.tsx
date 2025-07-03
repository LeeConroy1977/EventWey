import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

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
import { UserConnectionProvider } from "./contexts/UserConnectionContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScreenWidthProvider>
        <GroupProvider>
          <ModalProvider>
            <NotificationsProvider>
              <GroupsProvider>
                <EventsProvider>
                  <EventProvider>
                    <ConnectionProvider>
                      <UserProvider>
                        <UserConnectionProvider>
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
                        </UserConnectionProvider>
                      </UserProvider>
                    </ConnectionProvider>
                  </EventProvider>
                </EventsProvider>
              </GroupsProvider>
            </NotificationsProvider>
          </ModalProvider>
        </GroupProvider>
      </ScreenWidthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
