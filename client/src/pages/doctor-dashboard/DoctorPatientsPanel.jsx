function DoctorPatientsPanel({ patients }) {
  return (
    <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Patients to Manage</h2>
      {patients.length === 0 ? (
        <p className="mt-3 text-slate-600">No patients found.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {patients.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
            >
              <div>
                <p className="font-semibold text-slate-900">{p.name}</p>
                <p className="text-sm text-slate-500">{p.email}</p>
              </div>
              <button
                type="button"
                className="rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-700"
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorPatientsPanel;
