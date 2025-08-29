import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../../firebase";

const mapContainerStyle = {
    width: "100%",
    height: "500px",
};

const LiveTracking = () => {
    const [driverDetails, setDriverDetails] = useState(null);
    const { driverId } = useParams();
    const [location, setLocation] = useState(null);

    // Load Google Maps
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        // Fetch driver details from Firebase
        const currentDriver = localStorage.getItem("current_driver");
        setDriverDetails(JSON.parse(currentDriver));

        if (!driverId) return;

        // Reference the correct location path in Firebase
        const locationRef = ref(realtimeDb, `location/${driverId}`);

        // Attach the real-time listener
        const unsubscribe = onValue(locationRef, (snapshot) => {

            if (snapshot.exists()) {
                const data = snapshot.val();

                setLocation({
                    lat: parseFloat(data.latitude),
                    lng: parseFloat(data.longitude),
                });
            } else {
            }
        });

        // Properly clean up the listener when the component unmounts
        return () => {
            unsubscribe();
            localStorage.removeItem("current_driver");
            console.log("unsubscribe ==> ", unsubscribe);

        };
    }, [driverId]);

    const vehicleIcon = {
        url: "/apple-icon-57x57.png",
        // scaledSize: new window.google.maps.Size(40, 40), // Adjust the size of the icon
        // anchor: new window.google.maps.Point(20, 20), // Center the icon on the marker position
    };

    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <>
            {
                location ?
                    <>
                        <div className="bg-white rounded-2 shadow-md p-6 mb-6 max-w-4xl w-full shadow">
                            <div className="grid grid-cols-2 gap-4">
                                {
                                    driverDetails
                                        ? <div>
                                            <h2 className="text-xl font-semibold mb-4">Driver Details</h2>
                                            <div className="space-y-2 fw-bold">
                                                <p>Name :<span className="fw-normal px-3">{driverDetails?.driver?.name}</span></p>
                                                <p>Phone :<span className="fw-normal px-3">{driverDetails?.driver?.mobile}</span></p>
                                                <p>Vehicle Number :<span className="fw-normal px-3">{driverDetails?.vehicle?.vehicle_name}</span></p>
                                                <p>Source :<span className="fw-normal px-3">{driverDetails?.source_hydrant_center?.address}</span></p>
                                                <p>Destination :<span className="fw-normal px-3">{driverDetails?.destination?.address}</span></p>
                                                <p>Status :<span className="fw-normal px-3">{driverDetails?.status}</span></p>
                                            </div>
                                        </div>
                                        : <div className="fw-bold text-center"> No Driver Details Found</div>
                                }
                            </div>
                        </div>
                        <div className="bg-white rounded-2 shadow-sm p-6 mb-6 max-w-4xl w-full shadow">
                            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={location}>
                                <Marker icon={vehicleIcon} position={location} />
                            </GoogleMap>
                        </div>
                    </>
                    :
                    <div className="bg-white rounded-2 shadow-md p-6 mb-6 max-w-4xl w-full shadow">
                        <div className="text-center fw-bold"> No Details Found</div>
                    </div>
            }
        </>
    );
};

export default LiveTracking;
