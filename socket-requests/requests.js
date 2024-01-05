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
        socket.on('presupuestDeletedCampusInterface', (arg) => {
            io.emit('deletedPresupuestInCampus', arg);
            io.emit('refreshPresupuestsForConsultationDetailView', arg.validator);
            io.emit('refreshPresupuestsForNewTreatmentDetailView', arg.validator);
            io.emit('deletedPresupuestInCampusForPresupuestDialog', arg.validatorPresupuest);
        });

        //Create
        socket.on('patientCreatedCampusInterface', (arg) => {
            io.emit('createdPatientInCampus', arg);
            io.emit('refreshPatientsForPatientsView', arg.validator);
            io.emit('createdPatientInCampusForNewPatientView', { validator: arg.validator, _id: arg.patient.patient._id});
        });
        socket.on('doctorCreatedCampusInterface', (arg) => {
            io.emit('createdDoctorInCampus', arg);
            io.emit('refreshDoctorsForDoctorsView', arg.validator);
            io.emit('createdDoctorInCampusForNewDoctorView', { validator: arg.validator, _id: arg.doctor.doctor._id});
        });
        socket.on('presupuestCreatedCampusInterface', (arg) => {
            io.emit('createdPresupuestInCampus', arg);
            io.emit('refreshPresupuestsForConsultationDetailView', arg.validator);
            io.emit('refreshPresupuestsForNewTreatmentDetailView', arg.validator);
        });
        socket.on('consultationCreatedCampusInterface', (arg) => {
            io.emit('createdConsultationInCampus', arg);
            io.emit('refreshHistoryForPatientProfileView', arg.validator);
            io.emit('refreshHistoryForDoctorProfileView', arg.validator);
            io.emit('refreshHistoryForHomeView', arg.validatorCampus);
            io.emit('refreshHistoryForHistoryView', arg.validatorCampus);
            io.emit('refreshHistoryForAgendaView', arg.validatorCampus);
            io.emit('createdConsultationInCampusForNewConsultationView', { validatorCampus: arg.validatorCampus, _id: arg.consultation._id});
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
            io.emit('refreshHistoryForAgendaView', arg.validatorCampus);
        });
        socket.on('paymentCreatedCampusInterface', (arg) => {
            io.emit('createdPaymentInCampus', arg);
            io.emit('refreshPaymentForConsultationDetailView', arg.validatorConsultation);
        });
        socket.on('imageCreatedCampusInterface', (arg) => {
            io.emit('createdImageInCampus', arg);
            io.emit('refreshImageForGetImagesDialog', arg.validatorConsultation);
        });

        //Update
        socket.on('eventUpdatedCampusInterfaceFromAgenda', (arg) => {
            io.emit('updatedEventInCampus', arg);
            io.emit('refreshHistoryForHomeView', arg.validatorCampus);
        });
        socket.on('presupuestUpdatedCampusInterface', (arg) => {
            io.emit('updatedPresupuestInCampus', arg);
            io.emit('refreshPresupuestsForConsultationDetailView', arg.validator);
            io.emit('refreshPresupuestsForNewTreatmentDetailView', arg.validator);
            io.emit('updatedPresupuestInCampusForPresupuestDialog', arg.validatorPresupuest);
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
            io.emit('refreshHistoryForAgendaView', arg.validatorCampus);
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
            io.emit('refreshHistoryForAgendaViewClinic', arg.validator);
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
            io.emit('refreshHistoryForAgendaViewClinic', arg.validator);
        });
        socket.on('paymentUpdatedCampusInterface', (arg) => {
            io.emit('updatedPaymentInCampus', arg);
            io.emit('refreshPaymentForConsultationDetailView', arg.validatorConsultation);
        });
        socket.on('imageUpdatedCampusInterface', (arg) => {
            io.emit('updatedImageInCampus', arg);
            io.emit('refreshImageForGetImagesDialog', arg.validatorConsultation);
            io.emit('refreshImageForGetImageDialog', arg.validatorImage);
        });
    });
}