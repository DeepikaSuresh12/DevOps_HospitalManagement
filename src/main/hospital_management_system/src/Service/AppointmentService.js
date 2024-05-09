import axios from "axios";

const baseURL = "http://localhost:1235/";

const AppointmentService = {
  
    GetAllAppointment: () => axios.get(`${baseURL}GetAllAppointment`),

    GetAppointmentById: (appointmentId) =>
    axios.get(`${baseURL}GetAppointmentById/${appointmentId}`),

    UpdateAppointment: (appointmentId, appointment) =>
    axios.put(`${baseURL}UpdateAppointment/${appointmentId}`, appointment),

    CreateAppointment: (appointment) => axios.post(`${baseURL}CreateAppointment`, appointment),

    DeleteAppointment: (appointmentId) =>
    axios.delete(`${baseURL}DeleteAppointment/${appointmentId}`),
};

export default AppointmentService;
