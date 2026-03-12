const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const doctors = [
    {
      id: 1,
      name: "Dr Ahmed",
      specialty: "Cardiologue",
      rating: 4.5,
      location: "Fes, Morocco",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Expert in heart diseases with 10 years experience."
    },
    {
      id: 2,
      name: "Dr Sara",
      specialty: "Dentiste",
      rating: 4.0,
      location: "Casablanca, Morocco",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      description: "Specialist in dental care and orthodontics."
    },
    {
      id: 3,
      name: "Dr Youssef",
      specialty: "Dermatologue",
      rating: 5.0,
      location: "Rabat, Morocco",
      photo: "https://randomuser.me/api/portraits/men/54.jpg",
      description: "Dermatology expert, skin care consultant."
    }
  ];

const patients = [
  { id: 1, name: "Amina El Idrissi", email: "amina@example.com" },
  { id: 2, name: "Yassine Benali", email: "yassine@example.com" },
  { id: 3, name: "Salma Ait", email: "salma@example.com" },
];

app.get("/api/doctors", (req, res) => {
 try{
  res.json(doctors)
 }
  catch{
    res.status(500).json({message:"server error"})
  }
});

app.get("/api/doctors/:id", (req, res) => {
  const id = Number(req.params.id);
  const doctor = doctors.find((doc) => doc.id === id);

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  return res.send(doctor);
});

app.get("/api/patients", (req, res) => {
  return res.json(patients);
});

app.post("/api/doctors", (req, res) => {
  const { name, location, specialty, photo, ownerKey, referralSource, plan } = req.body;

  if (!name || !location || !specialty || !photo || !ownerKey) {
    return res.status(400).json({ message: "name, location, specialty, photo and ownerKey are required" });
  }

  const alreadyHasCard = doctors.some((doc) => doc.ownerKey === ownerKey);
  if (alreadyHasCard) {
    return res.status(409).json({ message: "Each doctor can only create one card" });
  }

  const nextId = doctors.length ? Math.max(...doctors.map((doc) => doc.id)) + 1 : 1;

  const newDoctor = {
    id: nextId,
    name,
    location,
    description: `${specialty} based in ${location}.`,
    specialty,
    rating: 4.0,
    photo,
    ownerKey,
    isCustom: true,
    referralSource: referralSource || "",
    plan: plan || "Basic",
    isPremium: plan === "Premium" || plan === "VIP",
  };

  doctors.push(newDoctor);
  return res.status(201).json(newDoctor);
});

app.put("/api/doctors/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = doctors.findIndex((doc) => doc.id === id);
  const { ownerKey } = req.body;

  if (index === -1) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  const doctor = doctors[index];
  if (doctor.ownerKey && doctor.ownerKey !== ownerKey) {
    return res.status(403).json({ message: "You can only modify your own card" });
  }

  const updatedDoctor = {
    ...doctor,
    ...req.body,
    id,
  };

  doctors[index] = updatedDoctor;
  return res.json(updatedDoctor);
});

app.delete("/api/doctors/:id", (req, res) => {
  const id = Number(req.params.id);
  const { ownerKey } = req.body;
  const index = doctors.findIndex((doc) => doc.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  const doctor = doctors[index];
  if (doctor.ownerKey && doctor.ownerKey !== ownerKey) {
    return res.status(403).json({ message: "You can only delete your own card" });
  }

  doctors.splice(index, 1);
  return res.json({ message: "Doctor card deleted" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
