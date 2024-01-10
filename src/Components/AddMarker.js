import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import '../Styles/Map.css';

const AddMarker = () => {
    const [markers, setMarkers] = useState([]);
    const [visibleMarkers, setVisibleMarkers] = useState([]);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const response = await axios.get('http://localhost:10000/markers');
                setMarkers(response.data);
            } catch (error) {
                console.error('Error loading markers:', error);
            }
        };

        fetchMarkers();
    }, []);

    const saveMarkerToServer = async (newMarker) => {
        try {
            const response = await axios.post('http://localhost:10000/markers', newMarker);

            if (response.status === 201) {
                const savedMarker = response.data;
                setMarkers((prevMarkers) => [...prevMarkers, savedMarker]);
                setVisibleMarkers((prevVisibleMarkers) => [...prevVisibleMarkers, savedMarker]);
            } else {
                console.error('Error saving marker:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error saving marker:', error);
        }
    };

    const handleMapMove = () => {
        const bounds = map.getBounds();
        const markersInView = markers.filter(
            (marker) =>
                marker.position[0] >= bounds.getSouthWest().lat &&
                marker.position[0] <= bounds.getNorthEast().lat &&
                marker.position[1] >= bounds.getSouthWest().lng &&
                marker.position[1] <= bounds.getNorthEast().lng
        );
        setVisibleMarkers(markersInView);
    };

    const handleMapClick = (e) => {
        const inputTitle = prompt('Enter title:');
        const inputPhoto = prompt('Enter photo URL:');

        if (inputTitle !== null && inputPhoto !== null) {
            const newMarker = {
                position: [e.latlng.lat, e.latlng.lng],
                title: inputTitle,
                photo: inputPhoto,
            };

            saveMarkerToServer(newMarker);
        }
    };

    const map = useMapEvents({
        moveend: () => handleMapMove(),
        click: handleMapClick,
    });

    return (
        <>
            {visibleMarkers.map((marker) => (
                <Marker
                    key={marker._id}
                    position={marker.position}
                    icon={L.divIcon({
                        className: 'custom-marker',
                        iconSize: [30, 30],
                        html: '<div style="background-color: red; border-radius: 50%; width: 20px; height: 20px;"></div>',
                    })}
                >
                    <Popup>
                        <img src={marker.photo} alt={marker.title} style={{ maxWidth: '100%' }} />
                        <div>{marker.title}</div>
                    </Popup>
                </Marker>
            ))}
            {visibleMarkers.map((marker) => (
                <Popup autoClose={false} closeOnClick={true} key={marker._id} position={marker.position}>
                    <img src={marker.photo} alt={marker.title} style={{ maxWidth: '100%' }} />
                    <div>{marker.title}</div>
                </Popup>
            ))}
        </>
    );
};

export default AddMarker;
