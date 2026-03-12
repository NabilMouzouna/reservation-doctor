function DoctorDashboardHeader({ myDoctorCard, patientsCount }) {
  return (
    <div className="mb-6 rounded-3xl bg-gradient-to-r from-cyan-600 to-emerald-600 p-6 text-white shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
        Doctor Control Hub
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {myDoctorCard?.name
            ? `Welcome back, ${myDoctorCard.name}`
            : "Ici vous gerez vos patients"}
        </h1>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-white/20 px-3 py-1">Patients: {patientsCount}</span>
          <span className="rounded-full bg-white/20 px-3 py-1">
            Plan: {myDoctorCard?.plan || "Not set"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboardHeader;
