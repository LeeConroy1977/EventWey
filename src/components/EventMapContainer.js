import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const EventMapContainer = ({ lat, lng, placename, onLocationSelect, }) => {
    const mapRef = useRef(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    useEffect(() => {
        const loadGoogleMapsScript = () => {
            if (typeof window.google !== "undefined" && window.google.maps) {
                setIsScriptLoaded(true);
                return;
            }
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => setIsScriptLoaded(true);
            script.onerror = () => console.error("Failed to load Google Maps API");
            document.body.appendChild(script);
        };
        loadGoogleMapsScript();
    }, []);
    useEffect(() => {
        if (!isScriptLoaded || !mapRef.current)
            return;
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
            window.google.maps.event.addListener(newMap, "click", (event) => {
                const clickedLat = event.latLng.lat();
                const clickedLng = event.latLng.lng();
                geocoder.geocode({ location: event.latLng }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        const clickedPlaceName = results[0].formatted_address || "Unknown Location";
                        onLocationSelect(clickedLat, clickedLng, clickedPlaceName);
                    }
                    else {
                        console.error("Geocoder failed due to: " + status);
                    }
                });
            });
        }
        else {
            if (marker && lat !== null && lng !== null) {
                const newLatLng = new window.google.maps.LatLng(lat, lng);
                marker.setPosition(newLatLng);
                map.setCenter(newLatLng);
                marker.setTitle(placename || "Event Location");
            }
        }
    }, [isScriptLoaded, map, lat, lng, placename, marker, onLocationSelect]);
    return (_jsx("div", { className: "w-full h-full flex flex-col rounded-lg bg-white ", children: _jsx("div", { ref: mapRef, className: "w-full h-full rounded-lg", style: { height: "100%" } }) }));
};
export default EventMapContainer;
