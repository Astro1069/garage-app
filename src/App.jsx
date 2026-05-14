import { useState } from "react";
import "./App.css";

function App() {
  // VEHICULES
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleKm, setVehicleKm] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // ENTRETIEN
  const [lastOilKm, setLastOilKm] = useState("");
  const [oilInterval, setOilInterval] = useState(15000);
  const [lastOilDate, setLastOilDate] = useState("");

  function addVehicle() {
    if (!vehicleName || !vehicleBrand || !vehicleModel) return;

    const newVehicle = {
      id: Date.now(),
      name: vehicleName,
      brand: vehicleBrand,
      model: vehicleModel,
      km: parseFloat(vehicleKm || 0)
    };

    setVehicles([...vehicles, newVehicle]);
    setSelectedVehicle(newVehicle);

    setVehicleName("");
    setVehicleBrand("");
    setVehicleModel("");
    setVehicleKm("");
  }

  function nextOilChangeKm() {
    if (!lastOilKm) return null;
    return parseFloat(lastOilKm) + parseFloat(oilInterval);
  }

  function remainingKmOil() {
    if (!selectedVehicle || !lastOilKm) return null;
    return nextOilChangeKm() - selectedVehicle.km;
  }

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
        <h2>🚘 Mes véhicules</h2>

        <input
          placeholder="Nom du véhicule (ex: Ma 607)"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
        />

        <input
          placeholder="Marque"
          value={vehicleBrand}
          onChange={(e) => setVehicleBrand(e.target.value)}
        />

        <input
          placeholder="Modèle"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
        />

        <input
          placeholder="Kilométrage actuel"
          value={vehicleKm}
          onChange={(e) => setVehicleKm(e.target.value)}
        />

        <button onClick={addVehicle}>Ajouter véhicule</button>

        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="item"
            onClick={() => setSelectedVehicle(vehicle)}
            style={{ cursor: "pointer" }}
          >
            {vehicle.brand} {vehicle.model} - {vehicle.km} km
          </div>
        ))}
      </div>

      <div className="card">
        <h2>🔔 Entretien automatique</h2>

        <input
          placeholder="Dernière vidange à combien de km ?"
          value={lastOilKm}
          onChange={(e) => setLastOilKm(e.target.value)}
        />

        <input
          placeholder="Intervalle constructeur (km)"
          value={oilInterval}
          onChange={(e) => setOilInterval(e.target.value)}
        />

        <input
          type="date"
          value={lastOilDate}
          onChange={(e) => setLastOilDate(e.target.value)}
        />

        {selectedVehicle && remainingKmOil() !== null && (
          <div className="item">
            🔧 Prochaine vidange à {nextOilChangeKm()} km
            <br />
            ⚠️ Il reste {remainingKmOil()} km avant entretien
          </div>
        )}
      </div>

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
        <div style={{ display: "flex", gap: "10px", marginTop: "10px", marginBottom: "10px" }}>
  <button
    type="button"
    onClick={() => setRepairPlace("Maison")}
    style={{
      background: repairPlace === "Maison" ? "#28a745" : "#ddd",
      color: repairPlace === "Maison" ? "white" : "black",
      flex: 1
    }}
  >
    🏠 Maison
  </button>

  <button
    type="button"
    onClick={() => setRepairPlace("Garage")}
    style={{
      background: repairPlace === "Garage" ? "#007bff" : "#ddd",
      color: repairPlace === "Garage" ? "white" : "black",
      flex: 1
    }}
  >
    🔧 Garage
  </button>
</div>
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
