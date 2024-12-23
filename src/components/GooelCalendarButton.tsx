import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Button from "../reuseable-components/Button";

interface Event {
  title: string;
  description: string[];
  date: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  location: {
    placename: string;
    lng: number;
    lat: number;
  };
}

const GoogleCalendarButton = ({ eventDetails }: { eventDetails: Event }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize the Google API client
  useEffect(() => {
    gapi.load("client:auth2", initClient);
  }, []);

  const initClient = () => {
    gapi.client
      .init({
        apiKey: "AIzaSyD6NGB4YafmcEzuhbhu6UccmoUyK-vDaec",
        clientId:
          "336072333198-60i3r0h35vhbnfatbbpej79389omj03p.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar",
      })
      .then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsAuthenticated(authInstance.isSignedIn.get());
      });
  };

  const handleSignIn = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then(() => {
      setIsAuthenticated(true);
    });
  };

  const handleSignOut = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut().then(() => {
      setIsAuthenticated(false);
    });
  };

  const addEventToGoogleCalendar = () => {
    const event = {
      summary: eventDetails.title,
      location: eventDetails.location.placename,
      description: eventDetails.description.join("\n"),
      start: {
        dateTime: eventDetails.date, // Ensure date is in ISO string format
        timeZone: "America/Los_Angeles", // Adjust timezone as needed
      },
      end: {
        dateTime: eventDetails.endDate, // Ensure endDate is in ISO string format
        timeZone: "America/Los_Angeles",
      },
    };

    gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        resource: event,
      })
      .then(
        (response) => {
          alert("Event added to Google Calendar!");
          console.log(response);
        },
        (error) => {
          console.error("Error adding event to Google Calendar", error);
          alert("Failed to add event to Google Calendar");
        }
      );
  };

  return (
    <div className="mt-auto mb-12">
      {!isAuthenticated ? (
        <Button handleClick={handleSignIn}>Login to Google</Button>
      ) : (
        <div className="mt-auto mb-12">
          <Button handleClick={addEventToGoogleCalendar}>
            Add to Google Calendar
          </Button>
          <Button handleClick={handleSignOut}>Sign Out</Button>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendarButton;
