import React, { useEffect, useState } from "react";
import AppointmentService from "../Service/AppointmentService";
import { Backdrop, Box, Fade, Modal, TextField } from "@mui/material";
import DoctorService from "../Service/Doctor";
import PatientService from "../Service/Patient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "0.25em",
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  p: 4,
};

const Appointment = () => {
  const [appointment, setAppointment] = useState([]);
  const [selectedAppointment, setselectedAppointment] = useState({
    appointmentDate: "",
    doctor: {
      did: "",
    },
    patient: {
      pid: "",
    },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [findModalOpen, setFindModalOpen] = useState(false);
  const [findAppointment, setFindAppointment] = useState("");
  const [foundAppointment, setFoundAppointment] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [drids, setDrIds] = useState([]);
  const [ptIds, setPtIds] = useState([]);

  useEffect(() => {
    GetAllAppointment();
    GetDrId();
    GetptId();
  }, []);

  const GetAllAppointment = () => {
    AppointmentService.GetAllAppointment()
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetDrId = () => {
    DoctorService.GetDoctorId()
      .then((response) => {
        setDrIds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetptId = () => {
    PatientService.GetPatientId()
      .then((response) => {
        setPtIds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    setAppointmentToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    if (appointmentToDelete) {
      AppointmentService.DeleteAppointment(appointmentToDelete)
        .then(() => {
          setAppointment(
            appointment.filter(
              (appointment) => appointment.id !== appointmentToDelete
            )
          );
          setDeleteConfirmationOpen(false);
          alert("Deleted Successfully !!!");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Error Deleting ... !!!");
        });
    }
  };

  const handleFind = () => {
    setFindModalOpen(true);
  };

  const handleFindClose = () => {
    setFindModalOpen(false);
    setFoundAppointment(null);
    setFindAppointment("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AppointmentService.CreateAppointment(selectedAppointment)
      .then(() => {
        alert("Created Successfully");
        setModalOpen(false);
        GetAllAppointment();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFindAppointment = (e) => {
    e.preventDefault();
    AppointmentService.GetAppointmentById(findAppointment)
      .then((response) => {
        setFoundAppointment(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Not found");
      });
  };

  return (
    <div>
      <br></br>
      <h3 className="text-dark">Appointment Records</h3>
      <br />
      {/* Buttons */}
      <div data-testid="Insertbtn">
      <button
      name="Insert Appointment"
        onClick={() => setModalOpen(true)}
        className="btn btn-primary ms-4 px-2"
      >
        Insert Appointment
      </button>
      </div>
      <div data-testid="Findbtn">
      <button
      name="Find Appointment"
        onClick={handleFind}
        className="btn btn-warning    px-2 mr-2 ms-4 "
      >
        Find Appointment
      </button>
      </div>
      <br />
      <br />

      {/* Insert / Update Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  placeholder="Enter Appointment Date"
                  name="appointmentDate"
                  className="form-control mb-4"
                  value={selectedAppointment?.appointmentDate || ""}
                  onChange={(e) =>
                    setselectedAppointment({
                      ...selectedAppointment,
                      appointmentDate: e.target.value,
                    })
                  }
                  required
                />

                <select
                name="patientId"
                  className="form-control mb-4"
                  value={selectedAppointment?.patient?.pid || ""}
                  onChange={(e) =>
                    setselectedAppointment({
                      ...selectedAppointment,
                      patient: {
                        ...selectedAppointment.patient,
                        pid: e.target.value,
                      },
                    })
                  }
                  required
                >
                  <option value="">Select Patient ID</option>
                  {ptIds.map((patientId) => (
                    <option key={patientId} value={patientId}>
                      {patientId}
                    </option>
                  ))}
                </select>

                <select
                name="doctorId"
                  className="form-control mb-4"
                  value={selectedAppointment?.doctor?.did || ""}
                  onChange={(e) =>
                    setselectedAppointment({
                      ...selectedAppointment,
                      doctor: {
                        ...selectedAppointment.doctor,
                        did: e.target.value,
                      },
                    })
                  }
                  required
                >
                    <option value="">Select Doctor ID</option>
                  {drids.map((doctorId) => (
                    <option key={doctorId} value={doctorId}>
                      {doctorId}
                    </option>
                  ))}
                </select>

                <center>
                  <button
                  name="submit"
                    style={{
                      width: "60%",
                      fontFamily: "cursive",
                      fontSize: "20px",
                    }}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                </center>
              </form>
              <br />
              <button
                style={{
                  width: "30%",
                  fontFamily: "cursive",
                  fontSize: "20px",
                }}
                className="btn btn-secondary "
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* Find  Model */}
      <Modal
        open={findModalOpen}
        onClose={handleFindClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={findModalOpen}>
          <Box sx={style}>
            <form onSubmit={handleFindAppointment}>
              <select
              name="Select"
                className="form-control"
                value={findAppointment || ""}
                onChange={(e) => setFindAppointment(Number(e.target.value))}
              >
                <option value="">Select Appointment...</option>
                {appointments.map((option) => (
                  <option key={option} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </select>
              <button
              name="findSubmit"
               className="btn btn-success" type="submit">
                Find Appointment
              </button>
            </form>
            <button className="btn btn-secondary" onClick={handleFindClose}>
              Close
            </button>
            {foundAppointment && (
              <div>
                <table className="table table-striped table-bordered" text-primary >
                  <thead>
                    <tr>
                      <th>Appointment Date</th>
                      <th>Patient Id</th>
                      <th>Patient Name</th>
                      <th>Dr Name</th>
                      <th>Dr Department</th>    
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{foundAppointment.appointmentDate}</td>
                      <td>{foundAppointment.patient.pid}</td>
                      <td>{foundAppointment.patient.name}</td>
                      <td>{foundAppointment.doctor.name}</td>
                      <td>{foundAppointment.doctor.department}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>

      <table className="table text-dark table-bordered">
        <thead>
          <tr>
            <th>Appointment Id</th>
            <th>Appointment Date</th>
            <th>Patient Name</th>
            <th>Patient EMail</th>
            <th>Patient Phone Number</th>
            <th>Doctor Name</th>
            <th>Department of Appointment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.patient.name}</td>
              <td>{appointment.patient.email}</td>
              <td>{appointment.patient.phoneNo}</td>
              <td>{appointment.doctor.name}</td>
              <td>{appointment.doctor.department}</td>
              {/* Other table data */}
              <td>
                <div div data-testid="Deletebtn">
                <button
                name="Delete"
                  onClick={() => handleDelete(appointment.id)}
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        aria-labelledby="delete-confirmation-modal-title"
        aria-describedby="delete-confirmation-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteConfirmationOpen}>
          <Box sx={style}>
            <h4>Are you sure you want to delete?</h4>
            <br />
            <div className="d-flex align-items-center justify-content-center">
              <button
              name="deleteConfirm"
                onClick={confirmDelete}
                className="btn btn-danger px-5 ms-2"
              >
                Delete
              </button>
              <button
              name="deleteCancel"
                onClick={() => setDeleteConfirmationOpen(false)}
                className="btn btn-secondary px-5 ms-2"
              >
                Cancel
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Appointment;
