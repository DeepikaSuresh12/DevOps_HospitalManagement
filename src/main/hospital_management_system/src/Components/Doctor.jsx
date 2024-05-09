import React,{ useEffect, useState } from 'react'
import DoctorService from '../Service/Doctor';
import { Modal,Backdrop, Box, Fade, TextField } from '@mui/material';



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

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState({
      name: "",
      department: ""
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [findModalOpen, setFindModalOpen] = useState(false);
    const [findDoctor, setFindDoctor] = useState("");
    const [foundDoctor, setFoundDoctor] = useState(null);
    const [deleteConfirmationOpen, setdeleteConfirmationOpen] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);
    

      useEffect(() => {
        GetDoctor();
      }, []);
    
      const GetDoctor = () => {
        DoctorService.GetallDoctor()
          .then((response) => {
            setDoctors(response.data);
            
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const handleDelete = (did) => {
        setDoctorToDelete(did);
        setdeleteConfirmationOpen(true);
      };
      const confirmDelete = () => {
        if (doctorToDelete) {
          DoctorService.DeleteDoctor(doctorToDelete)
            .then(() => {
              setDoctors(
                doctors.filter((doctor) => doctor.did !== doctorToDelete)
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
      const handleUpdateOpen = (doctor) => {
        setSelectedDoctor(doctor);
        setModalOpen(true);
      };
    
      const handleFind = () => {
        setFindModalOpen(true);
      };
    
      const handleFindClose = () => {
        setFindModalOpen(false);
        setFoundDoctor(null);
        setFindDoctor("");
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDoctor.did){
          // Update student
          DoctorService.UpdateDoctor(selectedDoctor.did, selectedDoctor)
            .then(() => {
              setDoctors(
                doctors.map((c) =>
                  c.did === selectedDoctor.did ? selectedDoctor : c
                )
              );
              setModalOpen(false);
              setDoctors();
            })
            .catch((error) => {
              console.log(error);
            });
        }else {
            DoctorService.CreateDoctor(selectedDoctor)
              .then(() => {
                setModalOpen(false);
                setDoctors();
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        };
        const handleFindDoctor = (e) => {
            e.preventDefault();
            DoctorService.GetDoctorById(findDoctor)
              .then((response) => {
                setFoundDoctor(response.data);
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
        <h3 className="text-dark">Doctor Records</h3>
        <br />
        {/* Buttons */}
        <div data-testid="Insertbtn">
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary ms-4 px-2"
        >
          Insert Doctor
        </button>
        </div>
        <div data-testid="Findbtn">
        <button
          onClick={handleFind}
          className="btn btn-warning    px-2 mr-2 ms-4 "
        >
          Find Doctor
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
                    placeholder="Enter Doctor Name"
                    name="name"
                    className="form-control mb-4"
                    value={selectedDoctor?.name || ""}
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        name: e.target.value,
                      })
                    }
                    required
                  />

        <TextField
                    type="text"
                    placeholder="Enter Department"
                    name="department"
                    className="form-control mb-4"
                    value={selectedDoctor?.department || ""}
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        department: e.target.value,
                      })
                    }
                    required
                  />

                  <center>
                    <button
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
              <form onSubmit={handleFindDoctor}>
                <select
                  className="form-control"
                  value={findDoctor || ""}
                  onChange={(e) => setFindDoctor(Number(e.target.value))}
                >
                  <option value="">Select Doctor...</option>
                  {doctors.map((option) => (
                    <option key={option} value={option.did}>
                      {option.did}
                    </option>
                  ))}
                </select>
                <button className="btn btn-success" type="submit">
                  Find Doctor
                </button>
              </form>
              <button className="btn btn-secondary" onClick={handleFindClose}>
                Close
              </button>
              {foundDoctor && (
                <div>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Doctor Name</th>
                        <th>Doctor description</th>
                        <th> ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{foundDoctor.name}</td>
                        <td>{foundDoctor.department}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </Box>
          </Fade>
        </Modal>

        <table className="table table-bordered text-primary">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Doctor name</th>
              <th>doctor Department </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.did}>
                <td>{doctor.did}</td>
                <td>{doctor.name}</td>
                <td>{doctor.department}</td>

                {/* Other table data */}
                <td>
                   <div data-testid="Updatebtn">
                  <button
                    onClick={() => handleUpdateOpen(doctor)}
                    className="btn btn-primary"
                  >
                    Update
                  </button> 
                  </div> 
                  <div data-testid="Deletebtn">
                  <button
                    onClick={() => handleDelete(doctor.did)}
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
                  onClick={confirmDelete}
                  className="btn btn-danger px-5 ms-2"
                >
                  Delete
                </button>
                <button
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
  );
};

export default Doctor
