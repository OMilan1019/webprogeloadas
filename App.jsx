import { useState } from "react";

/* ===============================
   Pizza árkalkulátor
================================ */
function PizzaCalculator() {
  const [size, setSize] = useState(1000);
  const [cheese, setCheese] = useState(false);
  const [ham, setHam] = useState(false);
  const [mushroom, setMushroom] = useState(false);
  const [spicy, setSpicy] = useState(false);

  const total =
    size +
    (cheese ? 300 : 0) +
    (ham ? 400 : 0) +
    (mushroom ? 250 : 0) +
    (spicy ? 150 : 0);

  return (
    <div className="card calculator">
      <h3>🍕 Pizza árkalkulátor</h3>

      <div className="field">
        <label>Méret</label>
        <select value={size} onChange={e => setSize(Number(e.target.value))}>
          <option value={1000}>Kicsi (1000 Ft)</option>
          <option value={1500}>Közepes (1500 Ft)</option>
          <option value={2000}>Nagy (2000 Ft)</option>
        </select>
      </div>

      <label className="pizza-option">
        <input type="checkbox" checked={cheese}
          onChange={e => setCheese(e.target.checked)} />
        Extra sajt (+300 Ft)
      </label>

      <label className="pizza-option">
        <input type="checkbox" checked={ham}
          onChange={e => setHam(e.target.checked)} />
        Sonka (+400 Ft)
      </label>

      <label className="pizza-option">
        <input type="checkbox" checked={mushroom}
          onChange={e => setMushroom(e.target.checked)} />
        Gomba (+250 Ft)
      </label>

      <label className="pizza-option">
        <input type="checkbox" checked={spicy}
          onChange={e => setSpicy(e.target.checked)} />
        Csípős szósz (+150 Ft)
      </label>

      <div className="badge ok">
        Összesen: <strong>{total} Ft</strong>
      </div>
    </div>
  );
}

/* ===============================
   Szempontonkénti csillagos értékelés
================================ */
function OrderRating() {
  const [price, setPrice] = useState(0);
  const [courier, setCourier] = useState(0);
  const [delivery, setDelivery] = useState(0);

  const values = [price, courier, delivery];
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum === 0 ? 0 : Math.round(sum / values.length);

  function label() {
    if (avg === 5) return "⭐⭐⭐⭐⭐ Kiváló élmény";
    if (avg === 4) return "⭐⭐⭐⭐ Nagyon jó";
    if (avg === 3) return "⭐⭐⭐ Átlagos";
    if (avg === 2) return "⭐⭐ Gyenge";
    if (avg === 1) return "⭐ Rossz";
    return "Nincs értékelés";
  }

  function Stars({ value, onChange }) {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            className={`star ${n <= value ? "active" : ""}`}
            onClick={() => onChange(n)}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="card">
      <h3>⭐ Rendelés értékelése</h3>

      <div className="rating-row">
        <span>Kedvező ár</span>
        <Stars value={price} onChange={setPrice} />
      </div>

      <div className="rating-row">
        <span>Udvarias futár</span>
        <Stars value={courier} onChange={setCourier} />
      </div>

      <div className="rating-row">
        <span>Pontos kiszállítás</span>
        <Stars value={delivery} onChange={setDelivery} />
      </div>

      <div className="badge ok">
        Értékelés: <strong>{label()}</strong>
      </div>

      <button
        className="btn danger"
        type="button"
        onClick={() => {
          setPrice(0);
          setCourier(0);
          setDelivery(0);
        }}
      >
        Értékelés törlése
      </button>
    </div>
  );
}

/* ===============================
   FŐ APP 
================================ */
function App() {
  return (
    <>
      <header className="nav">
        <div className="container">
          <nav className="menu">
            <a href="index.html">Főoldal</a>
            <a href="javascript.html">JavaScript CRUD</a>
            <a href="react.html">React CRUD</a>
            <a href="spa.html" className="active">SPA</a>
            <a href="fetchapi.html">Fetch API</a>
            <a href="axios.html">Axios</a>
            <a href="oojs.html">OOJS</a>
          </nav>
        </div>
      </header>

      <main className="container hero">
        <div className="card">
          <h2 className="h1">🍕 Pizzéria – SPA alkalmazás</h2>
        </div>

        <div className="grid two-col">
          <PizzaCalculator />
          <OrderRating />
        </div>
      </main>

      <footer className="footer">
        <strong> Készítette: Oskola Milán - GXRHGB Papp Zsigmond – YHXBSP</strong>
      </footer>
    </>
  );
}

export default App;
