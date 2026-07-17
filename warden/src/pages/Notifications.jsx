const NOTIFICATIONS = [
  { text: 'Aarav Sharma raised a new complaint: Water leakage.', time: '10 min ago' },
  { text: 'Kabir Singh requested leave for 12–14 Jul.', time: '1 hr ago' },
  { text: 'Visitor pass approved for Ishaan Patel.', time: '3 hr ago' },
  { text: 'Monthly hostel meeting scheduled for 5 Jul.', time: '1 day ago' },
]

export default function Notifications() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2>Notifications</h2>
          <p>Recent activity across the hostel.</p>
        </div>
      </div>

      <div className="card">
        {NOTIFICATIONS.map((n, i) => (
          <div className="row-line" key={i}>
            <div>{n.text}</div>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{n.time}</div>
          </div>
        ))}
      </div>
    </>
  )
}
