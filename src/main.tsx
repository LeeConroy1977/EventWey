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
import { SignInProvider } from "./contexts/SignInContext";
import { ModalProvider } from "./contexts/ModalContext";
import { CreateEventProvider } from "./contexts/CreateEventContext";
import { EventModalProvider } from "./contexts/EventModelContext";
import { ScreenWidthProvider } from "./contexts/ScreenWidthContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScreenWidthProvider>
        <ModalProvider>
          <EventsProvider>
            <UserProvider>
              <EventProvider>
                <GroupsProvider>
                  <GroupProvider>
                    <ConnectionsProvider>
                      <ConnectionProvider>
                        <UserProvider>
                          <CreateGroupProvider>
                            <CreateEventProvider>
                              <CreateUserProvider>
                                <SignInProvider>
                                  <EventModalProvider>
                                    <App />
                                  </EventModalProvider>
                                </SignInProvider>
                              </CreateUserProvider>
                            </CreateEventProvider>
                          </CreateGroupProvider>
                        </UserProvider>
                      </ConnectionProvider>
                    </ConnectionsProvider>
                  </GroupProvider>
                </GroupsProvider>
              </EventProvider>
            </UserProvider>
          </EventsProvider>
        </ModalProvider>
      </ScreenWidthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
