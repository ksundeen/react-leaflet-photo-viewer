import React, { useState, useRef } from "react";
import {
  MapContainer,
  Marker,
  Tooltip,
  CircleMarker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "./App.css";
import { Icon } from "leaflet";
// <a href="https://www.flaticon.com/free-icons/car" title="car icons">Car icons created by Freepik - Flaticon</a>
import tripData from "./data/familytrips";

const carIcon = new Icon({
  iconUrl: require("../node_modules/leaflet/dist/images/car.png"),
  iconSize: [40, 40],
});

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      // map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here!</Popup>
    </Marker>
  );
}

// function TooltipCircle(props) {
//   return (
//     <CircleMarker
//       center={props.center}
//       pathOptions={{ fillColor: "blue" }}
//       radius={20}
//     >
//       <Tooltip permanent={true}>{props.year}</Tooltip>
//     </CircleMarker>
//   );
// }

function ClickPhoto(props) {
  // const { pic, alt } = props;
  return (
    <a href={props.pic} target="_blank">
      <img className="photo" src={props.pic} alt={props.alt}></img>
    </a>
  );
}

function App() {
  // const [activeTrip, setActiveTrip] = useState(null);
  return (
    <MapContainer center={[43.796, -90.073]} zoom={5} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Adds a circle marker with tooltip */}
      {/* {tripData.features.map((location) => (
        <TooltipCircle
          center={[
            location.geometry.coordinates[1] + 0.05,
            location.geometry.coordinates[0] + 0.05,
          ]}
          year={location.properties.year}
        />
      ))} */}

      {tripData.features.map((location) => (
        <Marker
          key={location.properties.id}
          position={[
            location.geometry.coordinates[1],
            location.geometry.coordinates[0],
          ]}
          icon={carIcon}
        >
          <Tooltip
            permanent={true}
            position={[
              location.geometry.coordinates[1] + 0.05,
              location.geometry.coordinates[0] + 0.05,
            ]}
            opacity={0.8}
          >
            {location.properties.year}
          </Tooltip>
          <Popup>
            <div>
              <h2>{location.properties.name}</h2>
              <p>{location.properties.description}</p>
              {location.properties.img_srcs.map((imgSrc) => (
                <ClickPhoto key={imgSrc.id} pic={imgSrc.pic} alt={imgSrc.alt} />
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
      <LocationMarker />
    </MapContainer>
  );
}

export default App;
