import axios from "axios";

const baseURL = "http://localhost:1235/";

const DoctorService = {
  
    GetallDoctor: () => axios.get(`${baseURL}GetAllDoctor`),

    GetDoctorId: () => axios.get(`${baseURL}IdList1`),

    GetDoctorById: (doctorId) =>
    axios.get(`${baseURL}GetDoctorById/${doctorId}`),

    UpdateDoctor: (doctorId, doctor) =>
    axios.put(`${baseURL}UpdateDoctor/${doctorId}`, doctor),

    CreateDoctor: (doctor) => axios.post(`${baseURL}CreateDoctor`, doctor),

    DeleteDoctor: (doctorId) =>
    axios.delete(`${baseURL}DeleteDoctor/${doctorId}`),
};

export default DoctorService;
