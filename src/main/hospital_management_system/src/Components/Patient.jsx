import React from 'react'
import PatientService from '../Service/Patient';
import { useState, useEffect } from "react";
import { Backdrop, Box, Fade, Link, Modal, TextField } from "@mui/material";

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


const Patient = () => {
  const [patients, SetPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({
    name: "",
    email: "",
    phoneNo: "",
    appointments: {
      id: 0,
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [findModalOpen, setFindModalOpen] = useState(false);
  const [findPatient, setFindPatient] = useState("");
  const [foundPatient, setFoundPatient] = useState(null);
  const [deleteConfirmationOpen, setdeleteConfirmationOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null)




  

  useEffect(() => {
    getAllPatients();
  }, []);

  const getAllPatients = () => {
    PatientService.GetAllPatient()
      .then((response) => {
        SetPatients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (pid) => {
    setPatientToDelete(pid);
    setdeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    if (patientToDelete) {
      PatientService.DeletePatient(patientToDelete)
        .then(() => {
          SetPatients(
            patients.filter((patient) => patient.pid !== patientToDelete)
          );
          setdeleteConfirmationOpen(false);
          alert(" Deleted Successfully !!!");
        })
        .catch((error) => {
          console.log(error);
          alert("Error Deleting ... !!!");
        });
    }
  };

  const handleUpdateOpen = (patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleFind = () => {
    setFindModalOpen(true);
  };

  const handleFindClose = () => {
    setFindModalOpen(false);
    setFoundPatient(null);
    setFindPatient("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPatient.pid) {
      // Update 
      PatientService.UpdatePatient(selectedPatient.pid, selectedPatient)
        .then(() => {
          SetPatients(
            patients.map((c) =>
              c.pid === selectedPatient.pid ? selectedPatient : c
            )
          );
          setModalOpen(false);
          getAllPatients();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
        // Create 
        PatientService.CreatePatient(selectedPatient)
          .then(() => {
            setModalOpen(false);
            getAllPatients();
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const handleFindPatient = (e) => {
        e.preventDefault();
        PatientService.GetPatientById(findPatient)
          .then((response) => {
            setFoundPatient(response.data);
          })
          .catch((error) => {
            console.log(error);
            alert("Not found");
          });
      };
  return (
    <div>
        <div>
        <br></br>
        <div data-testid="Patient Records">
        <h3 className="text-dark" >Patient Records</h3>
        </div>
        <br />
        {/* Buttons */}
        <div data-testid="Insertbtn">  
        <Link
          onClick={() => setModalOpen(true)}
          className="btn btn-primary ms-4 px-2" >
          Insert Patient
        </Link>
        </div>
        <div data-testid="Findbtn">
        <button
        name="Find Patient"
          onClick={handleFind}
          className="btn btn-warning px-2 mr-2 ms-4 "
        >
          Find Patient
        </button>
        </div>
        <br />
        <br />

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
                    placeholder="Enter Patient Name"
                    name="name"
                    className="form-control mb-4"
                    value={selectedPatient?.name || ""}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                  <TextField
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    className="form-control mb-4"
                    value={selectedPatient?.email || ""}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                  <TextField
                    type="number"
                    placeholder="Enter PhoneNo"
                    name="phoneNo"
                    className="form-control mb-4"
                    value={selectedPatient?.phoneNo || ""}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        phoneNo: e.target.value,
                      })
                    }
                    required
                  />
                
                  {/* Other text fields */}
                  <center>
                    <button
                      style={{
                        width: "60%",
                        fontFamily: "cursive",
                        fontSize: "20px",
                      }}
                      className="btn btn-primary"
                      type="submit"
                      name='submit'
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

        {/* Find  Modal */}
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
              <form onSubmit={handleFindPatient}>
                <select
                name="selectIdFind"
                  className="form-control"
                  value={findPatient || ""}
                  onChange={(e) => setFindPatient(Number(e.target.value))}
                >
                  <option value="">Select Patient...</option>
                  {patients.map((option) => (
                    <option key={option} value={option.pid}>
                      {option.pid}
                    </option>
                  ))}
                </select>
                <button name="findSubmit" className="btn btn-success" type="submit">
                  Find  Patient
                </button>
              </form>
              <button className="btn btn-secondary" onClick={handleFindClose}>
                Close
              </button>
              {foundPatient && (
                <div>
                  <table className="table table-striped table-bordered text-dark">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Email</th>
                        <th>PhoneNO</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{foundPatient.name}</td>
                        <td>{foundPatient.email}</td>
                        <td>{foundPatient.phoneNo}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </Box>
          </Fade>
        </Modal>

        <table className="table table-bordered text-dark">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Email</th>
              <th>PhoneNO</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.pid}>
                <td>{patient.pid}</td>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phoneNo}</td>
                {/* <td>{patient.appointments.id}</td> */}
                {/* <td>{patient.appointment.appointmentDate}</td> */}

                {/* Other table data */}
                <td>
                  <button
                    onClick={() => handleUpdateOpen(patient)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                  name="Delete"
                    onClick={() => handleDelete(patient.pid)}
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          open={deleteConfirmationOpen}
          onClose={() => setdeleteConfirmationOpen(false)}
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
                  onClick={() => setdeleteConfirmationOpen(false)}
                  className="btn btn-secondary px-5 ms-2"
                >
                  Cancel
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  )
}

export default Patient
