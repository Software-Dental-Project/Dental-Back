const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");

console.log("Dental backend api started")
connection();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const UserRoutes = require("./routes/userRoutes");
const ClinicRoutes = require("./routes/clinicRoutes");
app.use("/api/users", UserRoutes);
app.use("/api/clinics", ClinicRoutes);

app.get("/test-route", (req, res) => {
    return res.status(200).json({
        "id": 1,
        "name": "Jose Lopez"
    });
});

app.listen(port, () => {
    console.log("Node server running in port:", port)
});