const stats = [
  { num: "70+", label: "Realized Projects" },
  { num: "5+",  label: "Years of Experience" },
  { num: "98%",  label: "Client Satisfaction" },
  { num: "23+",  label: "Countries Served" },
];

export default function HomeStatsSection() {
  return (
    <div className="lt-stats-band">
      <div className="brelyx-container">
        <div className="lt-stats-grid">
          {stats.map(({ num, label }) => (
            <div key={label} className="lt-stats-item">
              <div className="lt-stats-num">{num}</div>
              <div className="lt-stats-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
