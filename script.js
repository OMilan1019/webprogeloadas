const api = "api.php";

/* ===============================
   R – READ (alap betöltés)
   Oldal indulásakor az első 20 rekord
   =============================== */
window.onload = function () {
    fetchRendeles();
};

function fetchRendeles() {
    document.getElementById("addedit").innerText = "Új rendelés";

    fetch(api)
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerText = data.status;

            const tabla = document.getElementById("rendelesTable");
            tabla.innerHTML = "";

            if (!data.readData || !Array.isArray(data.readData)) {
                return;
            }

            data.readData.forEach(r => {
                tabla.innerHTML += `
                <tr>
                    <td>${r.az ?? "-"}</td>
                    <td>${r.pizzanev}</td>
                    <td>${r.darab}</td>
                    <td>${r.felvetel}</td>
                    <td>${r.kiszallitas}</td>
                    <td class="row-actions">
                        <button class="btn"
                            onclick='editRendeles(${JSON.stringify(r)})'>
                            Szerkeszt
                        </button>
                        <button class="btn danger"
                            onclick='deleteRendeles(${r.az})'>
                            Töröl
                        </button>
                    </td>
                </tr>`;
            });
        })
        .catch(err => {
            document.getElementById("message").innerText =
                "Hiba az adatok betöltésekor";
            console.error(err);
        });
}

/* ===============================
   R – READ (keresés dátum alapján)
   =============================== */
function keres() {
    const felvetelTol = document.getElementById("felvetel_tol").value;
    const kiszallitasIg = document.getElementById("kiszallitas_ig").value;

    let url = api;

    if (felvetelTol && kiszallitasIg) {
        url += `?felvetel_tol=${encodeURIComponent(felvetelTol)}&kiszallitas_ig=${encodeURIComponent(kiszallitasIg)}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerText = data.status;

            const tabla = document.getElementById("rendelesTable");
            tabla.innerHTML = "";

            if (!data.readData || data.readData.length === 0) {
                tabla.innerHTML = `
                    <tr>
                        <td colspan="6">Nincs találat</td>
                    </tr>`;
                return;
            }

            data.readData.forEach(r => {
                tabla.innerHTML += `
                <tr>
                    <td>${r.az ?? "-"}</td>
                    <td>${r.pizzanev}</td>
                    <td>${r.darab}</td>
                    <td>${r.felvetel}</td>
                    <td>${r.kiszallitas}</td>
                    <td class="row-actions">
                        <button class="btn"
                            onclick='editRendeles(${JSON.stringify(r)})'>
                            Szerkeszt
                        </button>
                        <button class="btn danger"
                            onclick='deleteRendeles(${r.az})'>
                            Töröl
                        </button>
                    </td>
                </tr>`;
            });
        })
        .catch(err => {
            document.getElementById("message").innerText =
                "Hiba a keresés során";
            console.error(err);
        });
}

/* ===============================
   C – CREATE / U – UPDATE
   =============================== */
document.getElementById("rendelesForm")
    .addEventListener("submit", saveRendeles);

function saveRendeles(e) {
    e.preventDefault();

    const az = document.getElementById("id").value;

    const data = {
        az: az,
        pizzanev: document.getElementById("pizzanev").value,
        darab: document.getElementById("darab").value,
        felvetel: document.getElementById("felvetel").value,
        kiszallitas: document.getElementById("kiszallitas").value
    };

    const method = az ? "PUT" : "POST";

    fetch(api, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.status;
        document.getElementById("rendelesForm").reset();
        document.getElementById("id").value = "";
        fetchRendeles();
    })
    .catch(err => {
        document.getElementById("message").innerText =
            "Hiba mentés közben";
        console.error(err);
    });
}

/* ===============================
   U – UPDATE (űrlap feltöltése)
   =============================== */
function editRendeles(r) {
    document.getElementById("addedit").innerText =
        "Rendelés szerkesztése";

    document.getElementById("id").value = r.az;
    document.getElementById("pizzanev").value = r.pizzanev;
    document.getElementById("darab").value = r.darab;
    document.getElementById("felvetel").value = r.felvetel;
    document.getElementById("kiszallitas").value = r.kiszallitas;
}

/* ===============================
   D – DELETE
   =============================== */
function deleteRendeles(az) {
    if (!confirm("Biztosan törlöd a rendelést?")) return;

    fetch(api, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ az })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.status;
        fetchRendeles();
    })
    .catch(err => {
        document.getElementById("message").innerText =
            "Hiba törlés közben";
        console.error(err);
    });
}