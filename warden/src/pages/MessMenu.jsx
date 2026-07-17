import { useState } from 'react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const INITIAL = {
  Monday: { Breakfast: 'Poha + Tea', Lunch: 'Dal Rice Roti', Snacks: 'Sandwich', Dinner: 'Paneer + Naan' },
  Tuesday: { Breakfast: 'Idli Sambhar', Lunch: 'Rajma Chawal', Snacks: 'Samosa', Dinner: 'Mix Veg + Roti' },
  Wednesday: { Breakfast: 'Aloo Paratha', Lunch: 'Chole Rice', Snacks: 'Pasta', Dinner: 'Dal Makhani' },
  Thursday: { Breakfast: 'Bread Omelette', Lunch: 'Kadhi Rice', Snacks: 'Cutlet', Dinner: 'Veg Biryani' },
  Friday: { Breakfast: 'Upma', Lunch: 'Rice Sambhar', Snacks: 'Momos', Dinner: 'Shahi Paneer' },
  Saturday: { Breakfast: 'Chole Bhature', Lunch: 'Veg Pulao', Snacks: 'Pakora', Dinner: 'Butter Chicken / Paneer' },
  Sunday: { Breakfast: 'Puri Sabzi', Lunch: 'Special Thali', Snacks: 'Ice Cream', Dinner: 'Fried Rice' },
}

export default function MessMenu() {
  const [menu, setMenu] = useState(INITIAL)
  const [day, setDay] = useState('Monday')

  function update(meal, value) {
    setMenu((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: value } }))
  }

  function saveMenu() {
    localStorage.setItem('mess_menu', JSON.stringify(menu))
    alert('Mess menu saved')
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Mess Menu</h2>
          <p>Edit the weekly menu shown to residents.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '220px 1fr', gap: 18 }}>
        <div className="card" style={{ padding: 10 }}>
          {DAYS.map((d) => (
            <div
              key={d}
              onClick={() => setDay(d)}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                cursor: 'pointer',
                marginBottom: 2,
                fontSize: '0.85rem',
                fontWeight: d === day ? 700 : 500,
                background: d === day ? 'var(--gold)' : 'transparent',
                color: d === day ? '#1a1500' : 'var(--text)',
              }}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">{day}'s Menu</div>
          {Object.entries(menu[day]).map(([meal, value]) => (
            <div className="field" key={meal}>
              <label>{meal}</label>
              <input value={value} onChange={(e) => update(meal, e.target.value)} />
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-gold" onClick={saveMenu}>Save</button>
          </div>
        </div>
      </div>
    </>
  )
}
