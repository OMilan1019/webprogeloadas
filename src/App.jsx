import { useEffect, useState } from "react";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [vega, setVega] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  /* Betöltés pizza.txt-ből */
  useEffect(() => {
    fetch("/pizza.txt")
      .then(res => res.text())
      .then(text => {
        const rows = text
          .split("\n")
          .map(r => r.trim())
          .filter(r => r.length)
          .slice(1)              // fejléc eldobása
          .map(r => {
            const [nev, kat, veg] = r.split("\t");
            return {
              name: nev,
              category: kat,
              vega: veg === "1"
            };
          });

        setPizzas(rows);
      });
  }, []);

  /* CREATE / UPDATE */
  function savePizza() {
    if (!name || !category) return;

    if (editIndex === null) {
      setPizzas([...pizzas, { name, category, vega }]);
    } else {
      const copy = [...pizzas];
      copy[editIndex] = { name, category, vega };
      setPizzas(copy);
      setEditIndex(null);
    }

    setName("");
    setCategory("");
    setVega(false);
  }

  /* DELETE */
  function deletePizza(index) {
    setPizzas(pizzas.filter((_, i) => i !== index));
  }

  /* EDIT */
  function editPizza(index) {
    const p = pizzas[index];
    setName(p.name);
    setCategory(p.category);
    setVega(p.vega);
    setEditIndex(index);
  }

  return (
    <>
      {/* NAV – megszokott react-os */}
      <header className="nav">
        <div className="container">
          <nav className="menu">
            <a href="index.html">Főoldal</a>
            <a href="javascript.html">JavaScript CRUD</a>
            <a href="react.html" className="active">React CRUD</a>
            <a href="spa.html">SPA</a>
            <a href="fetchapi.html">Fetch API</a>
            <a href="axios.html">Axios</a>
            <a href="oojs.html">OOJS</a>
          </nav>
        </div>
      </header>

      <main className="container hero">
        <div className="card">
          <h2 className="h1">React CRUD – Pizzák</h2>
        </div>

        {/* ŰRLAP */}
        <div className="card form">
          <div className="span2">
            <label>Pizza neve</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Kategória</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">– válassz –</option>
              <option value="apród">Apród</option>
              <option value="lovag">Lovag</option>
              <option value="főnemes">Főnemes</option>
              <option value="király">Király</option>
            </select>
          </div>

          <div>
            <label>Vegetáriánus</label>
            <select
              value={vega ? "igen" : "nem"}
              onChange={e => setVega(e.target.value === "igen")}
            >
              <option value="nem">Nem</option>
              <option value="igen">Igen</option>
            </select>
          </div>

          <div className="span4 row-actions">
            <button className="btn primary" onClick={savePizza}>
              {editIndex === null ? "Hozzáadás" : "Mentés"}
            </button>
          </div>
        </div>

        {/* TÁBLÁZAT */}
        <table className="table card">
          <thead>
            <tr>
              <th>Név</th>
              <th>Kategória</th>
              <th>Vegetáriánus</th>
              <th>Művelet</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>
                  {p.vega ? (
                    <span className="badge ok">Igen</span>
                  ) : (
                    <span className="badge no">Nem</span>
                  )}
                </td>
                <td className="row-actions">
                  <button
                    className="btn ok btn-sm"
                    onClick={() => editPizza(i)}
                  >
                    Szerkeszt
                  </button>
                  <button
                    className="btn danger btn-sm"
                    onClick={() => deletePizza(i)}
                  >
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className="footer">
        <strong>Készítette: Oskola Milán - GXRHGB Papp Zsigmond – YHXBSP</strong>
      </footer>
    </>
  );
}

export default App;