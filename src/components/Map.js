//https://www.youtube.com/watch?v=jD6813wGdBA
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker,Popup } from "react-leaflet";
import { Icon } from 'leaflet';
import '../styles/Map.scss';


function Map ({ latitude, longitude }) {
    const myApiKey = "f0a01cf0c1c041c39129c5bce3664588";

    if (!latitude || !longitude) return null;

    const position = [latitude, longitude];

    const customIcon = new Icon ({
        iconUrl: require("../assets/location-marker.png"), //flaticon.com
        iconSize: [38, 38] // size of the icon
    })


    return (
        <div className="map-container">
            <MapContainer center={position} zoom={13}>
                <TileLayer
                    attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
                    url= {`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myApiKey}`}
                />
                <Marker position={position} icon={customIcon}>
                    <Popup>You are here</Popup>

                </Marker>

            </MapContainer>
        </div>

    )

}

export default Map; 