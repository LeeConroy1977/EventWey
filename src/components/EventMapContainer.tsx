import React, { useEffect, useRef, useState } from "react";

interface EventMapContainerProps {
  lat: number | null | undefined;
  lng: number | null | undefined;
  placename?: string;
  onLocationSelect: (lat: number, lng: number, placename: string) => void;
}

const EventMapContainer: React.FC<EventMapContainerProps> = ({
  lat,
  lng,
  placename,
  onLocationSelect,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
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

    if (!map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: lat || 0, lng: lng || 0 },
        zoom: 15,
      });
      setMap(newMap);

      const newMarker = new window.google.maps.Marker({
        position: { lat: lat || 0, lng: lng || 0 },
        map: newMap,
        title: placename || "Event Location",
      });
      setMarker(newMarker);

      const geocoder = new window.google.maps.Geocoder();

      window.google.maps.event.addListener(newMap, "click", (event: any) => {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        geocoder.geocode(
          { location: event.latLng },
          (
            results: google.maps.GeocoderResult[],
            status: google.maps.GeocoderStatus
          ) => {
            if (status === "OK" && results[0]) {
              const clickedPlaceName =
                results[0].formatted_address || "Unknown Location";
              onLocationSelect(clickedLat, clickedLng, clickedPlaceName);
            } else {
              console.error("Geocoder failed due to: " + status);
            }
          }
        );
      });
    } else {
      if (marker && lat !== null && lng !== null) {
        const newLatLng = new window.google.maps.LatLng(lat, lng);
        marker.setPosition(newLatLng);
        map.setCenter(newLatLng);
        marker.setTitle(placename || "Event Location");
      }
    }
  }, [isScriptLoaded, map, lat, lng, placename, marker, onLocationSelect]);

  return (
    <div className="w-full h-full flex flex-col rounded-lg bg-white ">
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default EventMapContainer;
