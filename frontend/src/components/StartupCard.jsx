export default function StartupCard({ startup, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left w-full bg-white rounded-2xl shadow hover:shadow-lg transition p-5 border border-gray-100"
    >
      <div className="flex items-center gap-3">
        {/* Logo circle fallback */}
        <div className="h-12 w-12 rounded-full bg-gray-100 grid place-items-center overflow-hidden">
          {startup.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={startup.logo} alt={startup.name} className="h-12 w-12 object-cover" />
          ) : (
            <span className="text-gray-500 font-semibold text-sm">
              {startup.name?.[0] || 'S'}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{startup.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-gray-500">{startup.team_size || '—'}</p>
            <span className="text-xs rounded px-2 py-0.5 bg-gray-100 text-gray-500">
              {startup.country || '—'}
            </span>
          </div>
        </div>
      </div>

      {startup.description && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">{startup.description}</p>
      )}

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">{startup.business_model_type || '—'}</span>
        <span className="text-purple-600 font-medium">View details →</span>
      </div>
    </button>
  );
}
