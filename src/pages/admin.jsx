import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Admin() {

  const navigate = useNavigate();

  const [record, setRecord] = useState([]);

  const [name, setName] = useState("");
  const [fname, setFName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [diseas, setDiseas] = useState("");
  const [bil, setBil] = useState("");
  const [admitted, setAdmitted] = useState("");
  const [discharged, setDischarged] = useState("");
  const [doctorN, setDoctorN] = useState("");
  const [totalD, setTotalD] = useState("");

  const [editingId, setEditingId] = useState(null);


  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");


    if (!token || role !== "admin") {

      alert("Admin access required");

      navigate("/login");

      return;

    }


    getRecord();

  }, []);


  const getRecord = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/patient"
      );

      setRecord(res.data);

    } catch (err) {

      console.log(err);

    }

  };


  const clearForm = () => {

    setName("");
    setFName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setDiseas("");
    setBil("");
    setAdmitted("");
    setDischarged("");
    setDoctorN("");
    setTotalD("");

    setEditingId(null);

  };


  const addPatient = async () => {

    try {

      const token =
        localStorage.getItem("token");


      await axios.post(
        "http://localhost:5000/api/patient",
        {
          name,
          fname,
          phone: Number(phone),
          email,
          address,
          diseas,
          bill: Number(bil),
          admitd: admitted,
          discharged,
          dctrnm: doctorN,
          tdues: Number(totalD)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      alert("New patient added");

      clearForm();

      getRecord();

    } catch (err) {

      console.log(err);

    }

  };


  const editRecord = (pat) => {

    setEditingId(pat._id);

    setName(pat.name || "");
    setFName(pat.fname || "");
    setPhone(pat.phone || "");
    setEmail(pat.email || "");
    setAddress(pat.address || "");
    setDiseas(pat.diseas || "");
    setBil(pat.bill || "");
    setAdmitted(pat.admitd || "");
    setDischarged(pat.discharged || "");
    setDoctorN(pat.dctrnm || "");
    setTotalD(pat.tdues || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  const updateRecord = async () => {

    if (!editingId) {
      return;
    }


    try {

      const token =
        localStorage.getItem("token");


      await axios.put(
        `http://localhost:5000/api/patient/${editingId}`,
        {
          name,
          fname,
          phone: Number(phone),
          email,
          address,
          diseas,
          bill: Number(bil),
          admitd: admitted,
          discharged,
          dctrnm: doctorN,
          tdues: Number(totalD)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      alert("Patient Updated");

      clearForm();

      getRecord();

    } catch (err) {

      console.log(err);

    }

  };


  const deleteRecord = async (id) => {

    try {

      const token =
        localStorage.getItem("token");


      await axios.delete(
        `http://localhost:5000/api/patient/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      alert("Record deleted");

      getRecord();

    } catch (err) {

      console.log(err);

    }

  };


  return (

    <div className="admin-page">

      <div className="admin-heading">

        <span>ADMIN PANEL</span>

        <h1>
          Hospital Management
        </h1>

        <p>
          Add, update and manage patient records.
        </p>

      </div>


      {/* PATIENT FORM */}

      <div className="patient-form-card">

        <div className="form-title">

          <div className="form-icon">
            +
          </div>

          <div>

            <h2>
              {editingId
                ? "Edit Patient"
                : "Add New Patient"}
            </h2>

            <p>
              Enter patient information below
            </p>

          </div>

        </div>


        <div className="form-grid">

          <div>
            <label>Patient Name</label>

            <input
              type="text"
              value={name}
              placeholder="Patient name"
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>


          <div>
            <label>Father Name</label>

            <input
              type="text"
              value={fname}
              placeholder="Father name"
              onChange={(e) =>
                setFName(e.target.value)
              }
            />
          </div>


          <div>
            <label>Phone</label>

            <input
              type="number"
              value={phone}
              placeholder="Phone number"
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          </div>


          <div>
            <label>Email</label>

            <input
              type="email"
              value={email}
              placeholder="Email address"
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>


          <div>
            <label>Address</label>

            <input
              type="text"
              value={address}
              placeholder="Patient address"
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />
          </div>


          <div>
            <label>Disease</label>

            <input
              type="text"
              value={diseas}
              placeholder="Disease"
              onChange={(e) =>
                setDiseas(e.target.value)
              }
            />
          </div>


          <div>
            <label>Bill</label>

            <input
              type="number"
              value={bil}
              placeholder="Bill amount"
              onChange={(e) =>
                setBil(e.target.value)
              }
            />
          </div>


          <div>
            <label>Total Dues</label>

            <input
              type="number"
              value={totalD}
              placeholder="Total dues"
              onChange={(e) =>
                setTotalD(e.target.value)
              }
            />
          </div>


          <div>
            <label>Admitted Date</label>

            <input
              type="date"
              value={admitted}
              onChange={(e) =>
                setAdmitted(e.target.value)
              }
            />
          </div>


          <div>
            <label>Discharged Date</label>

            <input
              type="date"
              value={discharged}
              onChange={(e) =>
                setDischarged(e.target.value)
              }
            />
          </div>


          <div>
            <label>Doctor Name</label>

            <input
              type="text"
              value={doctorN}
              placeholder="Doctor name"
              onChange={(e) =>
                setDoctorN(e.target.value)
              }
            />
          </div>

        </div>


        <div className="form-buttons">

          {!editingId && (

            <button
              className="add-btn"
              onClick={addPatient}
            >
              + Add Patient
            </button>

          )}


          {editingId && (

            <button
              className="update-btn"
              onClick={updateRecord}
            >
              ✓ Update Patient
            </button>

          )}


          <button
            className="cancel-btn"
            onClick={clearForm}
          >
            Clear
          </button>

        </div>

      </div>


      {/* RECORDS */}

      <section className="admin-records">

        <div className="records-heading">

          <div>
            <span>PATIENT DATABASE</span>

            <h2>
              Patient Records
            </h2>
          </div>

          <div className="record-count">
            {record.length} Records
          </div>

        </div>


        <div className="admin-card-grid">

          {record.map((pat) => (

            <div
              className="admin-patient-card"
              key={pat._id}
            >

              <div className="admin-patient-header">

                <div className="small-avatar">

                  {pat.name
                    ? pat.name
                        .charAt(0)
                        .toUpperCase()
                    : "P"}

                </div>

                <div>

                  <h3>{pat.name}</h3>

                  <span>
                    Patient
                  </span>

                </div>

              </div>


              <div className="admin-patient-details">

                <p>
                  <b>Father:</b> {pat.fname}
                </p>

                <p>
                  <b>Phone:</b> {pat.phone}
                </p>

                <p>
                  <b>Disease:</b> {pat.diseas}
                </p>

                <p>
                  <b>Doctor:</b> {pat.dctrnm}
                </p>

                <p>
                  <b>Bill:</b> Rs. {pat.bill}
                </p>

                <p>
                  <b>Dues:</b> Rs. {pat.tdues}
                </p>

              </div>


              <div className="admin-card-buttons">

                <button
                  className="edit-btn"
                  onClick={() =>
                    editRecord(pat)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteRecord(pat._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* PAGE NAVIGATION */}

      <div className="page-navigation admin-navigation">

        <Link to="/">
          ← Home
        </Link>

        <Link to="/login">
          Login →
        </Link>

      </div>

    </div>

  );
}