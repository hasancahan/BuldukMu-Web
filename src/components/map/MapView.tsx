import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { motion } from 'framer-motion';
import { MapPin, Crosshair } from 'lucide-react';
import { Button } from '../ui/Button';
import type { LostItem, Location } from '../../types';

interface MapViewProps {
  items: LostItem[];
  center?: Location;
  onLocationSelect?: (location: Location) => void;
  selectable?: boolean;
}

export function MapView({ items, center, onLocationSelect, selectable = false }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Bu kısmı gerçek API key ile değiştirin
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: center ? { lat: center.lat, lng: center.lng } : { lat: 41.0082, lng: 28.9784 }, // İstanbul default
          zoom: 12,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ weight: '2.00' }]
            },
            {
              featureType: 'all',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#9c9c9c' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        setMap(mapInstance);
        setLoading(false);

        // Add markers for items
        items.forEach(item => {
          const marker = new google.maps.Marker({
            position: { lat: item.location.lat, lng: item.location.lng },
            map: mapInstance,
            title: item.title,
            icon: {
              url: 'data:image/svg+xml;base64,' + btoa(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#3B82F6" stroke="white" stroke-width="2"/>
                  <circle cx="16" cy="16" r="4" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32)
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-2 max-w-xs">
                <h3 class="font-semibold text-gray-900">${item.title}</h3>
                <p class="text-sm text-gray-600 mt-1">${item.description}</p>
                <p class="text-xs text-gray-500 mt-2">${item.location.address}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });
        });

        // Handle map clicks for location selection
        if (selectable && onLocationSelect) {
          mapInstance.addListener('click', async (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
              const geocoder = new google.maps.Geocoder();
              try {
                const response = await geocoder.geocode({
                  location: event.latLng
                });

                if (response.results[0]) {
                  const location: Location = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    address: response.results[0].formatted_address,
                    city: response.results[0].address_components.find(
                      component => component.types.includes('administrative_area_level_1')
                    )?.long_name || ''
                  };
                  onLocationSelect(location);
                }
              } catch (error) {
                console.error('Geocoding error:', error);
              }
            }
          });
        }
      }
    });

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: 'Mevcut konum',
          city: ''
        });
      });
    }
  }, [center, items, onLocationSelect, selectable]);

  const goToUserLocation = () => {
    if (map && userLocation) {
      map.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
      map.setZoom(15);
    }
  };

  if (loading) {
    return (
      <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Harita yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="h-96 rounded-xl overflow-hidden shadow-lg" />
      
      {userLocation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-4 right-4"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={goToUserLocation}
          >
            <Crosshair className="w-4 h-4 mr-2" />
            Konumuma Git
          </Button>
        </motion.div>
      )}

      {selectable && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center text-sm text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            Haritada konum seçmek için tıklayın
          </div>
        </div>
      )}
    </div>
  );
}