import React from "react";
import ReactDOM from "react-dom/client"; // Use the new createRoot from react-dom/client
import App from "./App";
import "./index.css"; // Your styles, if any
import { ConnectionsProvider } from "./contexts/ConnectionsContext"; // Assuming your context file is named ConnectionsContext.tsx
import { GroupsProvider } from "./contexts/GroupsContext"; // Same for GroupsContext.tsx
import { EventProvider } from "./contexts/EventContext"; // Same for EventContext.tsx
import { EventsProvider } from "./contexts/EventsContext"; // Same for EventsContext.tsx
import { UserProvider } from "./contexts/UserContext"; // Same for UserContext.tsx
import { BrowserRouter } from "react-router-dom";
import { GroupProvider } from "./contexts/GroupContext";
import { ConnectionProvider } from "./contexts/ConnectionContext";

// Create a root element to render the app
const root = ReactDOM.createRoot(document.getElementById("root")!); // Ensure that 'root' element exists in your index.html

// Render the App inside the root element with all context providers
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
                    <App />
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
