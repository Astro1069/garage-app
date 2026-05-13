import { useState } from "react";
import "./App.css";

function App() {
  const [km, setKm] = useState("");
  const [litres, setLitres] = useState("");
  const [prix, setPrix] = useState("");
  const [pleins, setPleins] = useState([]);

  const [repairName, setRepairName] = useState("");
  const [repairCost, setRepairCost] = useState("");
  const [repairPlace, setRepairPlace] = useState("");
  const [repairs, setRepairs] = useState([]);

  const [insurance, setInsurance] = useState("");
  const [ct, setCt] = useState("");

  function addFuel() {
    if (!km || !litres || !prix) return;

    setPleins([
      ...pleins,
      {
        km: parseFloat(km),
        litres: parseFloat(litres),
        prix: parseFloat(prix),
      },
    ]);

    setKm("");
    setLitres("");
    setPrix("");
  }

  function fuelConso(index) {
    if (index === 0) return "Premier plein";

    const distance = pleins[index].km - pleins[index - 1].km;
    const conso = (pleins[index].litres / distance) * 100;

    return conso.toFixed(2) + " L/100";
  }

  function addRepair() {
    if (!repairName || !repairCost) return;

    setRepairs([
      ...repairs,
      {
        name: repairName,
        cost: parseFloat(repairCost),
        place: repairPlace,
      },
    ]);

    setRepairName("");
    setRepairCost("");
    setRepairPlace("");
  }

  const totalFuel = pleins.reduce((t, p) => t + p.prix, 0);
  const totalRepairs = repairs.reduce((t, r) => t + r.cost, 0);

  const totalGlobal =
    totalFuel +
    totalRepairs +
    parseFloat(insurance || 0) +
    parseFloat(ct || 0);

  return (
    <div className="container">
      <h1>🚗 Garage Tracker</h1>

      <div className="card">
        <h2>⛽ Carburant</h2>
        <input placeholder="Kilométrage" value={km} onChange={(e) => setKm(e.target.value)} />
        <input placeholder="Litres" value={litres} onChange={(e) => setLitres(e.target.value)} />
        <input placeholder="Prix (€)" value={prix} onChange={(e) => setPrix(e.target.value)} />
        <button onClick={addFuel}>Ajouter plein</button>

        {pleins.map((p, i) => (
          <div key={i} className="item">
            {p.km} km - {p.prix}€ → {fuelConso(i)}
          </div>
        ))}
      </div>

      <div className="card">
        <h2>🔧 Réparations</h2>
        <input placeholder="Nom réparation" value={repairName} onChange={(e) => setRepairName(e.target.value)} />
        <input placeholder="Prix (€)" value={repairCost} onChange={(e) => setRepairCost(e.target.value)} />
        <input placeholder="Garage / Maison" value={repairPlace} onChange={(e) => setRepairPlace(e.target.value)} />
        <button onClick={addRepair}>Ajouter réparation</button>

        {repairs.map((r, i) => (
          <div key={i} className="item">
            {r.name} - {r.cost}€ ({r.place})
          </div>
        ))}
      </div>

      <div className="card">
        <h2>📄 Assurance</h2>
        <input placeholder="Prix annuel" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
      </div>

      <div className="card">
        <h2>✅ Contrôle technique</h2>
        <input placeholder="Prix CT" value={ct} onChange={(e) => setCt(e.target.value)} />
      </div>

      <div className="total-card">
        <h2>💸 Coût total voiture</h2>
        <h1>{totalGlobal.toFixed(2)} €</h1>
      </div>
    </div>
  );
}

export default App;
