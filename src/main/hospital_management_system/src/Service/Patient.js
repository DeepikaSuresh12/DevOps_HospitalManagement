import axios from "axios";

const baseURL = "http://localhost:1235/";

const PatientService = {
  
    GetAllPatient: () => axios.get(`${baseURL}GetAllPatient`),

    GetPatientId: () => axios.get(`${baseURL}IdList2`),

    GetPatientById: (patientId) =>
    axios.get(`${baseURL}GetPatientById/${patientId}`),

    UpdatePatient: (patientId, patient) =>
    axios.put(`${baseURL}UpdatePatient/${patientId}`, patient),

    CreatePatient: (patient) => axios.post(`${baseURL}CreatePatient`, patient),

    DeletePatient: (patientId) =>
    axios.delete(`${baseURL}DeletePatient/${patientId}`),
};

export default PatientService;
