const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

console.log("Dental backend api started");

const uri = process.env.MONGO_URI || "mongodb+srv://joserodrigolopez:xK22YDi1adZJdw25@mongodbdeployed.nr8iyxd.mongodb.net/dental_back";

connection(uri);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserRoutes = require("./routes/userRoutes");
const ClinicRoutes = require("./routes/clinicRoutes");
const PersonDataRoutes = require("./routes/personDataRoutes");
const CampusRoutes = require("./routes/campusRoutes");
const SpecialityRoutes = require("./routes/specialityRoutes");
const DoctorRoutes = require("./routes/doctorRoutes");
const CampusDoctorRoutes = require("./routes/campusDoctorRoutes");
app.use("/api/users", UserRoutes);
app.use("/api/clinics", ClinicRoutes);
app.use("/api/personData", PersonDataRoutes);
app.use("/api/campuses", CampusRoutes);
app.use("/api/specialities", SpecialityRoutes);
app.use("/api/doctors", DoctorRoutes);
app.use("/api/campusesdoctors", CampusDoctorRoutes);

app.get("/test-route", (req, res) => {
    return res.status(200).json({
        "id": 1,
        "name": "Jose Lopez"
    });
});

app.listen(port, () => {
    console.log("Node server running in port:", port);
});