import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios.get(`/api/doctors/${id}`)
      .then(res => setDoctor(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!doctor) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <div className="flex items-center gap-6">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{doctor.name}</h2>
            <p className="text-gray-500">{doctor.specialty}</p>
            <div className="flex items-center text-yellow-500 mt-1">
             {Array.from({length:5},(_,i)=>(
            <span key={i}>
               {i< Math.floor(doctor.rating)? "★" : "☆"}
            </span>
            ))}
            </div>
            <p className="text-gray-400 mt-1"> {doctor.location}</p>
          </div>
        </div>

        <p className="mt-6 text-gray-600">{doctor.description}</p>

        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg">
            <MessageCircle size={18} />
            Chat
          </button>

        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;