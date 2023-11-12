module.exports = (io) => {
    io.on('connection', (socket) => {
        io.emit('connectionSatisfactory');

        //Delete
        socket.on('doctorDeletedCampusInterface', (arg) => {
            io.emit('deletedDoctorInCampus', arg);
            io.emit('deletedDoctorInCampusForDoctorsView', arg.validator);
            io.emit('deletedDoctorInCampusForDoctorProfileView', arg.validator);
        });
        socket.on('patientDeletedCampusInterface', (arg) => {
            io.emit('deletedPatientInCampus', arg);
            io.emit('deletedPatientInCampusForPatientsView', arg.validator);
            io.emit('deletedPatientInCampusForPatientProfileView', arg.validator);
        });

        //Create
        socket.on('patientCreatedCampusInterface', (arg) => {
            io.emit('createdPatientInCampus', arg);
            io.emit('createdPatientInCampusForPatientsView', arg.validator);
        });
        socket.on('doctorCreatedCampusInterface', (arg) => {
            io.emit('createdDoctorInCampus', arg);
            io.emit('createdDoctorInCampusForDoctorsView', arg.validator);
        });
        socket.on('consultationResultCreatedCampusInterface', (arg) => {
            io.emit('createdConsultationResultInCampus', arg);
            io.emit('createdConsultationResultInCampusForConsultationView', arg.validator);
        });
        socket.on('consultationCreatedCampusInterface', (arg) => {
            io.emit('createdConsultationInCampus', arg);
            io.emit('createdConsultationInCampusForPatientProfileView', arg.validator);
            io.emit('createdConsultationInCampusForDoctorProfileView', arg.validator);
            io.emit('createdConsultationInCampusForAgendaView', arg.validatorCampus);
            io.emit('createdConsultationInCampusForHistoryView', arg.validatorCampus);
        });
        socket.on('treatmentDetailCreatedCampusInterface', (arg) => {
            io.emit('createdTreatmentDetailInCampus', arg);
            io.emit('createdTreatmentDetailInCampusForHistoryView', arg.validatorCampus);
            io.emit('createdTreatmentDetailInCampusForNewTreatmentDetailView', { validatorCampus: arg.validatorCampus, _id: arg.treatmentDetail._id});
        });
        socket.on('treatmentAppointmentCreatedCampusInterface', (arg) => {
            io.emit('createdTreatmentAppointmentInCampus', arg);
            io.emit('createdTreatmentAppointmentInCampusForTreatmentDetailView', arg.validator);
            io.emit('createdTreatmentAppointmentInCampusForPatientProfileView', arg.validator);
            io.emit('createdTreatmentAppointmentInCampusForDoctorProfileView', arg.validator);
            io.emit('createdTreatmentAppointmentInCampusForAgendaView', arg.validatorCampus);
            io.emit('createdTreatmentAppointmentInCampusForHistoryView', arg.validatorCampus);
        });

        //Update
        socket.on('eventUpdatedCampusInterfaceFromAgenda', (arg) => {
            io.emit('updatedEventInCampus', arg);
            io.emit('updatedEventInCampusForHomeView', arg.validatorCampus);
        });
        socket.on('consultationResultUpdatedCampusInterface', (arg) => {
            io.emit('updatedConsultationResultInCampus', arg);
            io.emit('updatedConsultationResultInCampusForConsultationDetailView', arg.validator);
            io.emit('updatedConsultationResultInCampusForConsultationResultDialog', arg.validatorConsultationResult);
        });
        socket.on('treatmentDetailUpdatedCampusInterface', (arg) => {
            io.emit('updatedTreatmentDetailInCampus', arg);
            io.emit('updatedTreatmentDetailInCampusForTreatmentDetailView', arg.validator);
            io.emit('updatedTreatmentDetailInCampusForHistoryView', arg.validator);
        });
        socket.on('consultationUpdatedCampusInterface', (arg) => {
            io.emit('updatedConsultationInCampus', arg);
            io.emit('updatedConsultationInCampusForConsultationDetailView', arg.validator);
        });
        socket.on('treatmentAppointmentUpdatedCampusInterface', (arg) => {
            io.emit('updatedTreatmentAppointmentInCampus', arg);
            io.emit('updatedTreatmentAppointmentInCampusForTreatmentDetailView', arg.validator);
            io.emit('updatedTreatmentAppointmentInCampusForTreatmentAppointmentDialog', arg.validatorTreatmentAppointment);
        });
        socket.on('eventUpdatedCampusInterface', (arg) => {
            io.emit('updatedEventInCampus', arg);
            io.emit('updatedEventInCampusForHomeView', arg.validatorCampus);
            io.emit('updatedEventInCampusForHistoryView', arg.validatorCampus);
            io.emit('updatedEventInCampusForPatientProfileView', arg.validator);
            io.emit('updatedEventInCampusForDoctorProfileView', arg.validator);
        });
        socket.on('patientGeneralInfoUpdatedCampusInterface', (arg) => {
            io.emit('updatedPatientGeneralInfoInCampus', arg);
            io.emit('updatedPatientGeneralInfoInCampusForPatientProfileView', arg.validatorPersonData);
        });
        socket.on('patientImportantInfoUpdatedCampusInterface', (arg) => {
            io.emit('updatedPatientImportantInfoInCampus', arg);
            io.emit('updatedPatientImportantInfoInCampusForHomeView', arg.validator);
            io.emit('updatedPatientImportantInfoInCampusForPatientsView', arg.validator);
            io.emit('updatedPatientImportantInfoInCampusForPatientProfileView', arg.validatorPersonData);
            io.emit('updatedPatientImportantInfoInCampusForHistoryView', arg.validator);
            io.emit('updatedPatientImportantInfoInCampusForConsultationDetailView', arg.validator);
            io.emit('updatedPatientImportantInfoInCampusForTreatmentDetailView', arg.validator);
            io.emit('updatedPatientImportantInfoInCampusForDoctorProfileView', arg.validator);
        });
        socket.on('doctorGeneralInfoUpdatedCampusInterface', (arg) => {
            io.emit('updatedDoctorGeneralInfoInCampus', arg);
            io.emit('updatedDoctorGeneralInfoInCampusForDoctorProfileView', arg.validatorPersonData);
        });
        socket.on('doctorImportantInfoUpdatedCampusInterface', (arg) => {
            io.emit('updatedDoctorImportantInfoInCampus', arg);
            io.emit('updatedDoctorImportantInfoInCampusForHomeView', arg.validator);
            io.emit('updatedDoctorImportantInfoInCampusForDoctorsView', arg.validator);
            io.emit('updatedDoctorImportantInfoInCampusForDoctorProfileView', arg.validatorPersonData);
            io.emit('updatedDoctorImportantInfoInCampusForHistoryView', arg.validator);
            io.emit('updatedDoctorImportantInfoInCampusForConsultationDetailView', arg.validator);
            io.emit('updatedDoctorImportantInfoInCampusForTreatmentDetailView', arg.validator);
            io.emit('updatedDoctorImportantInfoInCampusForTreatmentAppointmentDialog', arg.validatorPersonData);
            io.emit('updatedDoctorImportantInfoInCampusForPatientProfileView', arg.validator);
        });
    });
}