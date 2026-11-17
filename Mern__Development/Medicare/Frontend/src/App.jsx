import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Admin from "./pages/admin";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

function Navbar({ role }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">MediCare</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!localStorage.getItem("token") && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {role === "admin" && (
          <Link to="/admin" className="admin-link">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}


function Home({ patient }) {
  return (
    <div className="home-page">

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">
          <span className="hero-small">
            PROFESSIONAL HEALTHCARE
          </span>

          <h1>
            Caring for Patients,
            <br />
            Building Better Lives.
          </h1>

          <p>
            Modern healthcare management designed to make
            patient care easier, faster and more organized.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="hero-btn">
              Get Started
            </Link>

            <a href="#patients" className="hero-outline-btn">
              View Patients
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80"
            alt="Doctor"
          />
        </div>

      </section>


      {/* STORIES */}

      <section className="stories">

        <div className="section-title">
          <span>WHY CHOOSE US</span>
          <h2>Trusted Healthcare Experience</h2>
          <p>
            A simple hospital management system for doctors,
            nurses and administrators.
          </p>
        </div>

        <div className="story-grid">

          <div className="story-card">
            <div className="story-icon">♥</div>

            <h3>Patient First</h3>

            <p>
              Every patient record is organized so healthcare
              teams can focus on better patient care.
            </p>

            <strong>
              "The system keeps our patient information organized."
            </strong>

            <small>
              — Dr. Sarah Ahmed
            </small>
          </div>


          <div className="story-card">
            <div className="story-icon">+</div>

            <h3>Professional Care</h3>

            <p>
              Doctors and nurses can manage important patient
              information from one organized system.
            </p>

            <strong>
              "Simple, fast and easy to use."
            </strong>

            <small>
              — Dr. Hamza Khan
            </small>
          </div>


          <div className="story-card">
            <div className="story-icon">✓</div>

            <h3>Better Management</h3>

            <p>
              Administrators can add, update and remove
              patient records efficiently.
            </p>

            <strong>
              "It saves time in our daily administration."
            </strong>

            <small>
              — Hospital Administrator
            </small>
          </div>

        </div>

      </section>


      {/* PATIENT RECORDS */}

      <section className="patients-section" id="patients">

        <div className="section-title">
          <span>PATIENT INFORMATION</span>

          <h2>Patient Records</h2>

          <p>
            Available patient records are displayed below.
          </p>
        </div>


        <div className="patient-grid">

          {patient.length === 0 && (
            <div className="empty-record">
              No patient records available.
            </div>
          )}

          {patient.map((pat) => (

            <div className="patient-card" key={pat._id}>

              <div className="patient-card-top">

                <div className="patient-avatar">
                  {pat.name
                    ? pat.name.charAt(0).toUpperCase()
                    : "P"}
                </div>

                <div>
                  <h3>{pat.name}</h3>
                  <span>Patient Record</span>
                </div>

              </div>


              <div className="patient-info">

                <div>
                  <label>Father Name</label>
                  <p>{pat.fname}</p>
                </div>

                <div>
                  <label>Phone</label>
                  <p>{pat.phone}</p>
                </div>

                <div>
                  <label>Disease</label>
                  <p>{pat.diseas}</p>
                </div>

                <div>
                  <label>Doctor</label>
                  <p>{pat.dctrnm}</p>
                </div>

                <div>
                  <label>Bill</label>
                  <p>Rs. {pat.bill}</p>
                </div>

                <div>
                  <label>Total Dues</label>
                  <p>Rs. {pat.tdues}</p>
                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}


function App() {

  const [patient, setPatient] = useState([]);
  const [role, setRole] = useState(
    localStorage.getItem("userRole") || ""
  );


  useEffect(() => {

    const getPatient = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/patient"
        );

        setPatient(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    getPatient();


    const updateRole = () => {

      setRole(
        localStorage.getItem("userRole") || ""
      );

    };

    window.addEventListener(
      "authChanged",
      updateRole
    );

    return () => {

      window.removeEventListener(
        "authChanged",
        updateRole
      );

    };

  }, []);


  return (

    <BrowserRouter>

      <Navbar role={role} />

      <Routes>

        <Route
          path="/"
          element={<Home patient={patient} />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>


      <footer className="footer">

        <div>

          <h2>MediCare</h2>

          <p>
            Smart hospital management for better
            healthcare administration.
          </p>

        </div>


        <div>

          <h3>Contact Us</h3>

          <a href="mailto:aitzaza0322@gmail.com">
            aitzaza0322@gmail.com
          </a>

        </div>


        <div>

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>

        </div>

        <div className="footer-bottom">
          © 2026 MediCare Hospital System
        </div>

      </footer>

    </BrowserRouter>

  );
}

export default App;