import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";

function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {doctors.map(doc => (
        <DoctorCard key={doc.id} doctor={doc} />
      ))}
    </div>
  );
}

export default PatientDashboard;