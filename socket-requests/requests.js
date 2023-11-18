module.exports = (io) => {
    io.on('connection', (socket) => {
        io.emit('connectionSatisfactory');

        //Delete
        socket.on('doctorDeletedCampusInterface', (arg) => {
            io.emit('deletedDoctorInCampus', arg);
            io.emit('refreshDoctorsForDoctorsView', arg.validator);
            io.emit('deletedDoctorInCampusForDoctorProfileView', arg.validator);
        });
        socket.on('patientDeletedCampusInterface', (arg) => {
            io.emit('deletedPatientInCampus', arg);
            io.emit('refreshPatientsForPatientsView', arg.validator);
            io.emit('deletedPatientInCampusForPatientProfileView', arg.validator);
        });

        //Create
        socket.on('patientCreatedCampusInterface', (arg) => {
            io.emit('createdPatientInCampus', arg);
            io.emit('refreshPatientsForPatientsView', arg.validator);
        });
        socket.on('doctorCreatedCampusInterface', (arg) => {
            io.emit('createdDoctorInCampus', arg);
            io.emit('refreshDoctorsForDoctorsView', arg.validator);
        });
        socket.on('consultationResultCreatedCampusInterface', (arg) => {
            io.emit('createdConsultationResultInCampus', arg);
            io.emit('refreshConsultationResultsForConsultationDetailView', arg.validator);
        });
        socket.on('consultationCreatedCampusInterface', (arg) => {
            io.emit('createdConsultationInCampus', arg);
            io.emit('refreshHistoryForPatientProfileView', arg.validator);
            io.emit('refreshHistoryForDoctorProfileView', arg.validator);
            io.emit('refreshHistoryForHomeView', arg.validatorCampus);
            io.emit('refreshHistoryForHistoryView', arg.validatorCampus);
        });
        socket.on('treatmentDetailCreatedCampusInterface', (arg) => {
            io.emit('createdTreatmentDetailInCampus', arg);
            io.emit('createdTreatmentDetailInCampusForHistoryView', arg.validatorCampus);
            io.emit('createdTreatmentDetailInCampusForNewTreatmentDetailView', { validatorCampus: arg.validatorCampus, _id: arg.treatmentDetail._id});
        });
        socket.on('treatmentAppointmentCreatedCampusInterface', (arg) => {
            io.emit('createdTreatmentAppointmentInCampus', arg);
            io.emit('refreshTreatmentAppointmentsForTreatmentDetailView', arg.validator);
            io.emit('refreshHistoryForPatientProfileView', arg.validator);
            io.emit('refreshHistoryForDoctorProfileView', arg.validator);
            io.emit('refreshHistoryForHomeView', arg.validatorCampus);
            io.emit('refreshHistoryForHistoryView', arg.validatorCampus);
        });

        //Update
        socket.on('eventUpdatedCampusInterfaceFromAgenda', (arg) => {
            io.emit('updatedEventInCampus', arg);
            io.emit('refreshHistoryForHomeView', arg.validatorCampus);
        });
        socket.on('consultationResultUpdatedCampusInterface', (arg) => {
            io.emit('updatedConsultationResultInCampus', arg);
            io.emit('refreshConsultationResultsForConsultationDetailView', arg.validator);
            io.emit('updatedConsultationResultInCampusForConsultationResultDialog', arg.validatorConsultationResult);
        });
        socket.on('treatmentDetailUpdatedCampusInterface', (arg) => {
            io.emit('updatedTreatmentDetailInCampus', arg);
            io.emit('refreshTreatmentDetailsForTreatmentDetailView', arg.validator);
            io.emit('updatedTreatmentDetailInCampusForHistoryView', arg.validator);
        });
        socket.on('consultationUpdatedCampusInterface', (arg) => {
            io.emit('updatedConsultationInCampus', arg);
            io.emit('refreshConsultationsForConsultationDetailView', arg.validator);
        });
        socket.on('treatmentAppointmentUpdatedCampusInterface', (arg) => {
            io.emit('updatedTreatmentAppointmentInCampus', arg);
            io.emit('refreshTreatmentAppointmentsForTreatmentDetailView', arg.validator);
            io.emit('updatedTreatmentAppointmentInCampusForTreatmentAppointmentDialog', arg.validatorTreatmentAppointment);
        });
        socket.on('eventUpdatedCampusInterface', (arg) => {
            io.emit('updatedEventInCampus', arg);
            io.emit('refreshHistoryForHomeView', arg.validatorCampus);
            io.emit('refreshHistoryForHistoryView', arg.validatorCampus);
            io.emit('refreshHistoryForPatientProfileView', arg.validator);
            io.emit('refreshHistoryForDoctorProfileView', arg.validator);
        });
        socket.on('patientGeneralInfoUpdatedCampusInterface', (arg) => {
            io.emit('updatedPatientGeneralInfoInCampus', arg);
            io.emit('refreshPatientsForPatientProfileView', arg.validatorPersonData);
        });
        socket.on('patientImportantInfoUpdatedCampusInterface', (arg) => {
            io.emit('updatedPatientImportantInfoInCampus', arg);
            io.emit('refreshHistoryForHomeViewClinic', arg.validator);
            io.emit('updatedPatientImportantInfoInCampusForPatientsView', arg.validator);
            io.emit('refreshPatientsForPatientProfileView', arg.validatorPersonData);
            io.emit('updatedPatientImportantInfoInCampusForHistoryView', arg.validator);
            io.emit('refreshConsultationsForConsultationDetailView', arg.validator);
            io.emit('refreshTreatmentDetailsForTreatmentDetailView', arg.validator);
            io.emit('refreshHistoryForDoctorProfileView', arg.validator);
        });
        socket.on('doctorGeneralInfoUpdatedCampusInterface', (arg) => {
            io.emit('updatedDoctorGeneralInfoInCampus', arg);
            io.emit('refreshDoctorsForDoctorProfileView', arg.validatorPersonData);
        });
        socket.on('doctorImportantInfoUpdatedCampusInterface', (arg) => {
            io.emit('updatedDoctorImportantInfoInCampus', arg);
            io.emit('refreshHistoryForHomeViewClinic', arg.validator);
            io.emit('updatedDoctorImportantInfoInCampusForDoctorsView', arg.validator);
            io.emit('refreshDoctorsForDoctorProfileView', arg.validatorPersonData);
            io.emit('updatedDoctorImportantInfoInCampusForHistoryView', arg.validator);
            io.emit('refreshConsultationsForConsultationDetailView', arg.validator);
            io.emit('refreshTreatmentAppointmentsForTreatmentDetailView', arg.validator);
            io.emit('updatedDoctorImportantInfoInCampusForTreatmentAppointmentDialog', arg.validatorPersonData);
            io.emit('refreshHistoryForPatientProfileView', arg.validator);
        });
    });
}