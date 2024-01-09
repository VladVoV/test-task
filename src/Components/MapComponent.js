import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import '../Styles/Map.css';
import AddMarker from './AddMarker';

const MapComponent = () => {
    const handleMarkerClick = (marker) => {
        console.log('Marker Clicked:', marker);
    };

    return (
        <div className="leaflet-container">
            <MapContainer center={[50.447, 30.523]} zoom={13} scrollWheelZoom={true} >
                <AddMarker onMarkerClick={handleMarkerClick}  />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
