import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  

  // STATE-ek
  const [pizza, setPizza] = useState([]);
  const [message, setMessage] = useState("");
  const [nev, setNev] = useState("");
  const [ar, setAr] = useState("");
  const [editNev, setEditNev] = useState(null);

  // READ – betöltés
  useEffect(() => {
    fetchPizza();
  }, []);

  const fetchPizza = async () => {
    const res = await axios.get("/api/api.php");
    setPizza(res.data.readData);
    setMessage(res.data.status);
  };

  // CREATE / UPDATE
  const submit = async () => {
    let res;

    if (editNev) {
      res = await axios.put("/api/api.php", {
        oldNev: editNev,
        nev: nev,
        ar: ar
      });
      setEditNev(null);
    } else {
      res = await axios.post("/api/api.php", {
        nev: nev,
        ar: ar
      });
    }

    setMessage(res.data.status);
    setNev("");
    setAr("");
    fetchPizza();
  };

  // UPDATE – űrlap feltöltése
  const editPizza = (p) => {
    setEditNev(p.nev);
    setNev(p.nev);
    setAr(p.ar);
  };

  // DELETE
  const deletePizza = async (nev) => {
    if (!confirm("Biztosan törlöd ezt a pizzát?")) return;
    const res = await axios.delete("/api/api.php", {
      data: { nev }
    });
    setMessage(res.data.status);
    fetchPizza();
  };

  return (
    <>
      {/* NAV */}
      <header className ="nav">
    <div className ="container">
      <nav className ="menu">
        <a href="index.html">Főoldal</a>
        <a href="javascript.html">JavaScript CRUD</a>
        <a href="react.html">React CRUD</a>
        <a href="spa.html">SPA</a>
        <a href="fetchapi.html">Fetch API</a>
        <a href="axios.html" className="active">Axios</a>
        <a href="oojs.html">OOJS</a>
      </nav>
    </div>
  </header>

      <div className="container">

        {/* HERO */}
        <section className="hero">
          <div className="card">
            <h1 className="h1">React + Axios – CRUD</h1>
          </div>
        </section>

        {/* ÜZENET */}
        <p className="muted"></p>

        {/* ŰRLAP */}
        <div className="card">
          <h3>{editNev ? "Kategória szerkesztése" : "Új kategória"}</h3>

          <div className="form">
            <div className="span2">
              <label>Kategória</label>
              <input
                type="text"
                value={nev}
                onChange={(e) => setNev(e.target.value)}
              />
            </div>

            <div className="span2">
              <label>Ár (Ft)</label>
              <input
                type="number"
                value={ar}
                onChange={(e) => setAr(e.target.value)}
              />
            </div>

            <div className="span4">
              <button className="btn primary" onClick={submit}>
                {editNev ? "Mentés" : "Hozzáadás"}
              </button>
            </div>
          </div>
        </div>

        {/* TÁBLA */}
        <div className="card">
          <h3>Kategória lista</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Név</th>
                <th>Ár</th>
                <th>Művelet</th>
              </tr>
            </thead>
            <tbody>
              {pizza.map((p) => (
                <tr key={p.nev}>
                  <td>{p.nev}</td>
                  <td>{p.ar} Ft</td>
                  <td className="row-actions">
                    <button
                      className="btn"
                      onClick={() => editPizza(p)}
                    >
                      Szerkeszt
                    </button>
                    <button
                      className="btn danger"
                      onClick={() => deletePizza(p.nev)}
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <strong>Készítette: Oskola Milán - GXRHGB Papp Zsigmond - YHXBSP</strong>
        </div>

      </div>
    </>
  );
}

export default App;