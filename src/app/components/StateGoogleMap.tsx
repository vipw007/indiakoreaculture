import React, { useEffect, useRef } from 'react';

interface Place {
  name: string;
  location?: { lat: number; lng: number };
  category?: string;
  distanceFromHub?: number;
}

interface StateGoogleMapProps {
  places: Place[];
  stateName: string;
  hubLocation?: { lat: number; lng: number };
}

declare global {
  interface Window {
    google: any;
  }
}

export function StateGoogleMap({ places, stateName, hubLocation }: StateGoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleApiKey = "AIzaSyDLHiQrphl5_maE1ovvNWHLjA6gXBPb7mM";

  useEffect(() => {
    let map: any;
    let markers: any[] = [];

    const initMap = async () => {
      // 1. Load the Google Maps JS API using the recommended dynamic import
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&v=weekly&libraries=marker,places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      if (!mapRef.current || !window.google) return;

      // 2. Import required libraries
      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker");

      const defaultCenter = hubLocation || { lat: 20.5937, lng: 78.9629 };
      
      // 3. Initialize the Map
      map = new Map(mapRef.current, {
        center: defaultCenter,
        zoom: 8,
        mapId: "DEMO_MAP_ID", // Required for Advanced Markers
        disableDefaultUI: false,
        clickableIcons: false,
      });

      const bounds = new window.google.maps.LatLngBounds();
      const infoWindow = new window.google.maps.InfoWindow();

      // 4. Add Central Hub Marker
      const hubPin = new PinElement({
        background: "#0ea5e9",
        borderColor: "#ffffff",
        glyphColor: "#ffffff",
        scale: 1.2,
      });

      const hubMarker = new AdvancedMarkerElement({
        map,
        position: defaultCenter,
        title: `${stateName} Hub`,
        content: hubPin.element,
      });
      markers.push(hubMarker);
      bounds.extend(defaultCenter);

      hubMarker.addListener("gmp-click", () => {
        infoWindow.setContent(`<div style="padding: 8px; font-family: sans-serif;"><strong>${stateName} Hub</strong><br/>Main Entry Point</div>`);
        infoWindow.open(map, hubMarker);
      });

      // 5. Add Place Markers
      places.forEach((place) => {
        if (place.location && place.location.lat && place.location.lng) {
          const color = getMarkerColor(place.category);
          const pin = new PinElement({
            background: color,
            borderColor: "#ffffff",
            glyphColor: "#ffffff",
            scale: 1.0,
          });

          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: Number(place.location.lat), lng: Number(place.location.lng) },
            title: place.name,
            content: pin.element,
          });
          markers.push(marker);

          bounds.extend(place.location);

          marker.addListener("gmp-click", () => {
            infoWindow.setContent(`
              <div style="padding: 12px; font-family: sans-serif; min-width: 150px;">
                <div style="font-weight: bold; font-size: 14px; color: #1e293b;">${place.name}</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 2px;">${place.category || 'Tourist Spot'}</div>
                <div style="font-size: 12px; font-weight: bold; color: #f97316; margin-top: 6px; border-top: 1px solid #f1f5f9; pt-2;">
                  ${place.distanceFromHub ? `📍 ${place.distanceFromHub} km from Hub` : ''}
                </div>
              </div>
            `);
            infoWindow.open(map, marker);
          });

          // Draw Polyline
          new window.google.maps.Polyline({
            path: [defaultCenter, place.location],
            geodesic: true,
            strokeColor: "#94a3b8",
            strokeOpacity: 0.4,
            strokeWeight: 2,
            map: map,
          });
        }
      });

      if (markers.length > 1) {
        map.fitBounds(bounds);
      }
    };

    initMap();

    function getMarkerColor(category?: string) {
      switch (category) {
        case 'Beach': return '#fbbf24';
        case 'Religious': return '#f97316';
        case 'Nature': return '#22c55e';
        case 'Fort':
        case 'Historical': return '#8b5cf6';
        default: return '#ef4444';
      }
    }

    return () => {
      // Cleanup markers if needed
      markers.forEach(m => m.map = null);
    };
  }, [places, stateName, hubLocation]);

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative bg-gray-100">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 text-xs space-y-2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0ea5e9]"></div>
          <span className="font-bold">Central Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
          <span>Beach</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
          <span>Religious</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
          <span>Nature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
          <span>Historical / Fort</span>
        </div>
      </div>
    </div>
  );
}
