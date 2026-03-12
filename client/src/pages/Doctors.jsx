import { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { getDoctors } from "../services/api";
import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import { isValidClerkPublishableKey } from "../utils/clerk";

const hasClerk = isValidClerkPublishableKey(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

function DoctorsView({ onLogout }) {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getDoctors().then((res) => {
      setDoctors(res.data);
      setFiltered(res.data);
    });
  }, []);

  const handleSearch = (value) => {
    const result = doctors.filter((doc) =>
      doc.specialty.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        onSearch={handleSearch}
        actionLabel="Logout"
        onActionClick={onLogout}
      />

      <h1 className="px-6 pt-36 text-3xl font-bold">Find Your Doctor</h1>

      <div className="grid gap-6 p-6 md:grid-cols-3">
        {filtered.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
}

function DoctorsWithClerk() {
  const { signOut } = useClerk();
  const handleLogout = () => {
    localStorage.removeItem("reservation-auth");
    localStorage.removeItem("reservation-role");
    signOut({ redirectUrl: "/" });
  };

  return <DoctorsView onLogout={handleLogout} />;
}

function DoctorsLocal() {
  const handleLogout = () => {
    localStorage.removeItem("reservation-auth");
    localStorage.removeItem("reservation-role");
    window.location.href = "/";
  };

  return <DoctorsView onLogout={handleLogout} />;
}

function Doctors() {
  return hasClerk ? <DoctorsWithClerk /> : <DoctorsLocal />;
}

export default Doctors;
