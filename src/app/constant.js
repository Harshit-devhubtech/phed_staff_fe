export const reportColumns = [
    { label: "S.NO.", key: "serialNumber" },
    { label: "Job Id", key: "id" },
    { label: "Pickup location", key: "source_hydrant_center.address" },
    { label: "Drop location", key: "destination.address" },
    { label: "Pickup Date", key: "accepted_time" },
    { label: "Pickup time", key: "accepted_time" },
    { label: "End Date", key: "complete_time" },
    { label: "End time", key: "complete_time" },
    { label: "Trip Duration", key: "trip_duration" },
    { label: "Name", key: "user.name" },
    { label: "Number", key: "user.mobile" },
    { label: "Tanker Number", key: "vehicle.registration_number" },
    { label: "Distance", key: "total_distance" },
    { label: "Amount", key: "amount" },
    { label: "Remarks", key: "remark" }
];

export const revenueReportColumns = [
    { label: "S.NO.", key: "serialNumber" },
    { label: "Vendor", key: "name" },
    { label: "Tanker Number", key: "tankers_number" },
    { label: "Trip", key: "bookings_count" },
    { label: "Distance", key: "total_distance" },
];