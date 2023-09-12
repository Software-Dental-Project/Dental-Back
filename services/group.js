const groupByTreatmentDetail = treatmentAppointments => {
    const grouped = new Map();
  
    treatmentAppointments.forEach(treatmentAppointment => {
        const treatmentDetailId = treatmentAppointment.treatmentDetail._id.toString();
    
        if (!grouped.has(treatmentDetailId)) {
        grouped.set(treatmentDetailId, []);
        }
    
        grouped.get(treatmentDetailId).push(treatmentAppointment);
    });
  
    const result = Array.from(grouped).map(([treatmentDetailId, appointments]) => {
        const treatment = appointments[0].treatmentDetail.consultationResult.treatment.name;
        return {
            treatment: treatment,
            appointments: appointments,
        };
    });
    
    return result;
}

module.exports = {
    groupByTreatmentDetail
}