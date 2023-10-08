module.exports = (io) => {
    io.on('connection', (socket) => {
        io.emit('connectionSatisfactory');
      
        //socket.on('patientModifiedCampusInterface', (arg) => {
            //io.emit('updatePatientsInCampus', arg);
        //});

        socket.on('doctorDeletedCampusInterface', (arg) => {
            io.emit('deletedDoctorInCampus', arg);
            io.emit('deletedDoctorInCampusForDoctorsView');
            io.emit('deletedDoctorInCampusForDoctorProfileView');
        });

        socket.on('patientDeletedCampusInterface', (arg) => {
            io.emit('deletedPatientInCampus', arg);
            io.emit('deletedPatientInCampusForPatientsView');
            io.emit('deletedPatientInCampusForPatientProfileView');
        });
    });
}