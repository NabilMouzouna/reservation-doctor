import DoctorProfileCard from "./DoctorProfileCard";

function DoctorProfilePanel({ myDoctorCard, onDeleteCard }) {
  return (
    <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">My Profile Card</h2>
      {!myDoctorCard ? (
        <p className="mt-3 text-slate-600">No card yet. Click "Create My Card".</p>
      ) : (
        <DoctorProfileCard doctor={myDoctorCard} onDeleteCard={onDeleteCard} />
      )}
    </div>
  );
}

export default DoctorProfilePanel;
