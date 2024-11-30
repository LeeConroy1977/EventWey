import React, { useEffect, useRef, useState } from "react";

interface EventMapContainerProps {
  lat: number | null | undefined;
  lng: number | null | undefined;
  placename?: string;
}

const EventMapContainer: React.FC<EventMapContainerProps> = ({
  lat,
  lng,
  placename,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Function to load the Google Maps script
    const loadGoogleMapsScript = () => {
      if (typeof window.google !== "undefined" && window.google.maps) {
        setIsScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsScriptLoaded(true);
      script.onerror = () => console.error("Failed to load Google Maps API");
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current) return;

    // Validate lat and lng before initializing the map
    if (typeof lat !== "number" || typeof lng !== "number") {
      console.error("Invalid latitude or longitude values:", { lat, lng });
      return;
    }

    // Initialize the map once the script is loaded
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 15,
    });

    new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: placename || "Event Location",
    });
  }, [isScriptLoaded, lat, lng, placename]);

  return (
    <div className="w-[100%] min-h-[400px] flex flex-col rounded-lg bg-white mt-8 ">
      <div
        ref={mapRef}
        className="w-full h-[400px] rounded-lg"
        style={{ minHeight: "400px" }}
      />
    </div>
  );
};

export default EventMapContainer;
