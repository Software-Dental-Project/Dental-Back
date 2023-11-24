const Event = require("../models/eventModel");
const Campus = require("../models/campusModel");

const createEventConsultation = async (req, res) => {
    let body = req.body;
    let userId = req.user.id;
    let patientId = req.query.idPatient;
    let doctorId = req.query.idDoctor;
    let eventId = req.query.idEvent;
    let campusId;

    try {
        const campus = await Campus.findOne({ user: userId });
      
        if (!campus) {
          return res.status(404).json({
            status: "Error",
            message: "No campus available..."
          });
        }
      
        campusId = campus._id;
      
    } catch (error) {
        return res.status(500).json({
          status: "error",
          error
        });
    }

    if (!body.date || !body.hour) {
        return res.status(400).json({
            "status": "error",
            "message": "Faltan datos"
        });
    }

    let bodyEvent = {
        patient: patientId,
        doctor: doctorId,
        campus: campusId,
        reason: body.consultationReason,
        date: body.date,
        status: body.status,
        hour: body.hour,
        typeEvent: "Consulta",
        eventId: eventId,
        treatmentDetail: "No",
        duration: body.duration
    }

    let event_to_save = new Event(bodyEvent);

    try {
        const eventStored = await event_to_save.save();

        if (!eventStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No event saved"
            });
        }

        const populatedEvent = await Event.findById(eventStored._id).populate([{ path: "patient", populate: { path: 'personData', select: 'names fatherLastName motherLastName'}, select: 'personData'}, { path: "doctor", populate: { path: 'personData', select: 'names fatherLastName motherLastName'}, select: 'personData'}, { path: 'campus', populate: { path: 'clinic', select: 'user -_id' }, select: 'user name' } ]).select('-__v');

        return res.status(200).json({
            "status": "success",
            "message": "Event registered",
            "event": populatedEvent
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving event",
            error
        });
    }
}

const createEventTreatmentAppointment = async (req, res) => {
    let body = req.body;
    let patientId = req.query.idPatient;
    let doctorId = req.query.idDoctor;
    let campusId = req.query.idCampus;
    let eventId = req.query.idEvent;
    let treatmentDetailId = req.query.idTreatmentDetail;

    let bodyEvent = {
        patient: patientId,
        doctor: doctorId,
        campus: campusId,
        reason: body.description,
        date: body.date,
        status: body.status,
        hour: body.hour,
        typeEvent: "Cita",
        eventId: eventId,
        treatmentDetail: treatmentDetailId,
        duration: body.duration
    }

    let event_to_save = new Event(bodyEvent);

    try {
        const eventStored = await event_to_save.save();

        if (!eventStored) {
            return res.status(500).json({
                "status": "error",
                "message": "No event saved"
            });
        }

        const populatedEvent = await Event.findById(eventStored._id).populate([{ path: "patient", populate: { path: 'personData', select: 'names fatherLastName motherLastName'}, select: 'personData'}, { path: "doctor", populate: { path: 'personData', select: 'names fatherLastName motherLastName'}, select: 'personData'}, { path: 'campus', populate: { path: 'clinic', select: 'user -_id' }, select: 'user name' } ]).select('-__v');

        return res.status(200).json({
            "status": "success",
            "message": "Event registered",
            "event": populatedEvent
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "message": "Error while saving event",
            error
        });
    }
}

const list = async (req, res) => {
    Event.find().populate([{ path: 'patient', populate: 'personData'}, { path: 'doctor', populate: 'personData'}, 'campus']).then(events => {
        if (!events) {
            return res.status(404).json({
                status: "Error",
                message: "No events avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            events
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const getAgendaBySede = async (req, res) => {
    let today = new Date().setHours(0,0,0,0);
    let userId = req.user.id;
    let campusId;

    try {
        const campus = await Campus.findOne({ user: userId });
      
        if (!campus) {
          return res.status(404).json({
            status: "Error",
            message: "No campus available..."
          });
        }
      
        campusId = campus._id;
      
    } catch (error) {
        return res.status(500).json({
          status: "error",
          error
        });
    }

    Event.find({ status: "Scheduled", date: today }).populate([{ path: "patient", populate: 'personData'}, { path: "doctor", populate: 'personData'}, { path: 'campus', match: { _id: campusId }}]).sort('hour').then(events => {
        events = events.filter(event => event.campus);

        if (events.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "Eventos no encontrados"
            });
        }

        return res.status(200).json({
            "status": "success",
            events
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const getEventsBySede = async (req, res) => {
    let userId = req.user.id;
    let campusId;

    try {
        const campus = await Campus.findOne({ user: userId });
      
        if (!campus) {
          return res.status(404).json({
            status: "Error",
            message: "No campus available..."
          });
        }
      
        campusId = campus._id;
      
    } catch (error) {
        return res.status(500).json({
          status: "error",
          error
        });
    }

    Event.find({ campus: campusId }).populate([{ path: "patient", populate: 'personData'}, { path: "doctor", populate: 'personData'}, 'campus']).sort([['date', -1], ['hour', 1]]).then(events => {
        if (events.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "Eventos no encontrados"
            });
        }

        return res.status(200).json({
            "status": "success",
            events
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const getEventsClinicBySede = async (req, res) => {
    let userId = req.user.id;
    let clinicId;

    try {
        const campus = await Campus.findOne({ user: userId });
      
        if (!campus) {
          return res.status(404).json({
            status: "Error",
            message: "No campus available..."
          });
        }
      
        clinicId = campus.clinic;
      
    } catch (error) {
        return res.status(500).json({
          status: "error",
          error
        });
    }

    Event.find().populate([{ path: "patient", populate: { path: 'personData', select: 'names fatherLastName motherLastName'}, select: 'personData'}, { path: "doctor", populate: { path: 'personData', select: 'names fatherLastName motherLastName'}, select: 'personData'}, { path: 'campus', populate: { path: 'clinic', match: { _id: clinicId }, select: 'user -_id' }, select: 'user name' } ]).sort([['date', -1], ['hour', 1]]).select('-__v').then(events => {
        events = events.filter(event => event.campus.clinic)

        if (events.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "Eventos no encontrados"
            });
        }

        return res.status(200).json({
            "status": "success",
            events
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const editEvent = (req, res) => {
    let id = req.query.idEvent;

    Event.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(async eventUpdated => {
        if (!eventUpdated) {
            return res.status(404).json({
                status: "error",
                mensaje: "Event not found"
            });
        }

        const populatedEvent = await Event.findById(eventUpdated._id).populate([{ path: "patient", populate: { path: 'personData', select: 'names fatherLastName motherLastName'}, select: 'personData'}, { path: "doctor", populate: { path: 'personData', select: 'names fatherLastName motherLastName'}, select: 'personData'}, { path: 'campus', populate: { path: 'clinic', select: 'user -_id' }, select: 'user name' } ]).select('-__v');

        return res.status(200).send({
            status: "success",
            event: populatedEvent
        });
    }).catch(() => {
        return res.status(404).json({
            status: "error",
            mensaje: "Error while finding and updating event"
        });
    });
}

module.exports = {
    createEventConsultation,
    createEventTreatmentAppointment,
    list,
    getAgendaBySede,
    getEventsBySede,
    getEventsClinicBySede,
    editEvent
}