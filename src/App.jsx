import { useState } from "react";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");
  // VEHICULES
  const [vehicleName, setVehicleName] = useState("");
const [vehicleType, setVehicleType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
const [vehicleEngine, setVehicleEngine] = useState("");
const [vehiclePhase, setVehiclePhase] = useState("");

const phasesByModel = {
  "206": ["Phase 1", "Phase 2"],
  "207": ["Phase 1", "Restylée"],
  "208": ["Phase 1", "Phase 2"],
  "308": ["Phase 1", "Phase 2", "Phase 3"],
  "607": ["Phase 1", "Phase 2"],
  "Clio": ["Clio 1", "Clio 2", "Clio 3", "Clio 4", "Clio 5"],
  "Megane": ["Megane 1", "Megane 2", "Megane 3", "Megane 4"],
  "Golf": ["Golf 4", "Golf 5", "Golf 6", "Golf 7", "Golf 8"],
  "A3": ["8L", "8P", "8V", "8Y"],
  "Serie 3": ["E36", "E46", "E90", "F30", "G20"]
};

const enginesByModel = {
  "206": ["1.1 Essence", "1.4 Essence", "1.6 HDI", "2.0 HDI"],
  "207": ["1.4 HDI", "1.6 HDI", "1.6 THP"],
  "208": ["1.2 PureTech", "1.6 BlueHDi"],
  "308": ["1.6 HDI", "2.0 HDI", "1.2 PureTech"],
  "607": ["2.2 HDI", "2.7 HDI V6", "3.0 V6"],
  "Clio": ["1.2 Essence", "1.5 dCi", "RS"],
  "Megane": ["1.5 dCi", "1.6 Essence", "RS"],
  "Golf": ["1.6 TDI", "2.0 TDI", "GTI"],
  "A3": ["1.9 TDI", "2.0 TDI", "1.8 TFSI"],
  "Serie 3": ["320d", "330d", "330i"]
};

  const modelsByBrand = {
    Peugeot: ["106", "206", "207", "208", "308", "407", "508", "607", "3008", "5008"],
    Renault: ["Clio", "Megane", "Scenic", "Laguna", "Twingo", "Captur", "Austral"],
    Citroën: ["C1", "C3", "C4", "C5", "Berlingo", "DS3"],
    BMW: ["Serie 1", "Serie 3", "Serie 5", "X1", "X3", "X5"],
    Mercedes: ["Classe A", "Classe C", "Classe E", "GLA", "GLE"],
    Audi: ["A1", "A3", "A4", "A6", "Q3", "Q5"],
    Volkswagen: ["Polo", "Golf", "Passat", "Tiguan", "Touareg"],
    Toyota: ["Yaris", "Corolla", "Prius", "RAV4"],
    Ford: ["Fiesta", "Focus", "Mondeo", "Kuga", "Mustang"]
  };
  const [vehicleKm, setVehicleKm] = useState("");
const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehiclePhoto, setVehiclePhoto] = useState("");

  function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setVehiclePhoto(reader.result);
    };

    reader.readAsDataURL(file);
  }
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
      type: vehicleType,
      brand: vehicleBrand,
      model: vehicleModel,
      phase: vehiclePhase,
      engine: vehicleEngine,
      km: parseFloat(vehicleKm || 0),
      plate: vehiclePlate,
      photo: vehiclePhoto
    };

    setVehicles([...vehicles, newVehicle]);
    setSelectedVehicle(newVehicle);

    setVehicleName("");
    setVehicleType("");
    setVehicleBrand("");
    setVehicleModel("");
    setVehicleEngine("");
    setVehiclePhase("");
    setVehicleKm("");
    setVehiclePlate("");
    setVehiclePhoto("");
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
  const [repairCategory, setRepairCategory] = useState("");
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
        category: repairCategory,
      },
    ]);

    setRepairName("");
    setRepairCost("");
    setRepairPlace("");
    setRepairCategory("");
  }

  const totalFuel = pleins.reduce((t, p) => t + p.prix, 0);
  const totalRepairs = repairs.reduce((t, r) => t + r.cost, 0);

  const totalGlobal =
    totalFuel +
    totalRepairs +
    parseFloat(insurance || 0) +
    parseFloat(ct || 0);

  if (currentView === "home") {
    return (
      <div className="container">
        <h1>🚘 Mon Garage</h1>
        <p style={{ textAlign: "center", color: "#666" }}>
          Choisis ce que tu veux gérer
        </p>

        <div style={{ display: "grid", gap: "20px", marginTop: "30px" }}>
          <div
            className="card"
            onClick={() => setCurrentView("vehicles")}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <h2>🚗 Mes véhicules</h2>
            <p>Voir et ajouter tes véhicules</p>
          </div>

          <div
            className="card"
            onClick={() => setCurrentView("fuel")}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <h2>⛽ Carburant</h2>
            <p>Suivre tes pleins et ta consommation</p>
          </div>

          <div
            className="card"
            onClick={() => setCurrentView("repairs")}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <h2>🔧 Réparations</h2>
            <p>Pièces, mécanique et entretien</p>
          </div>

          <div
            className="card"
            onClick={() => setCurrentView("costs")}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <h2>💸 Coûts</h2>
            <p>Assurance, CT et dépenses totales</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button
        onClick={() => setCurrentView("home")}
        style={{ marginBottom: "20px" }}
      >
        ⬅ Retour accueil
      </button>

      <h1>🚗 Garage Tracker</h1>

      <div className="card">
        <h2>🚘 Mes véhicules</h2>

        <select
  value={vehicleType}
  onChange={(e) => setVehicleType(e.target.value)}
>
  <option value="">Choisir un type</option>
  <option value="Auto">🚗 Auto</option>
  <option value="Moto">🏍️ Moto</option>
  <option value="Utilitaire">🚚 Utilitaire</option>
  <option value="Bateau">🚤 Bateau</option>
</select>

<input
          placeholder="Nom du véhicule (ex: Ma 607)"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
        />

        <select
  value={vehicleBrand}
  onChange={(e) => setVehicleBrand(e.target.value)}
>
  <option value="">Choisir une marque</option>
  <option value="Peugeot">Peugeot</option>
  <option value="Renault">Renault</option>
  <option value="Citroën">Citroën</option>
  <option value="DS">DS</option>
  <option value="Dacia">Dacia</option>
  <option value="Volkswagen">Volkswagen</option>
  <option value="Audi">Audi</option>
  <option value="BMW">BMW</option>
  <option value="Mercedes">Mercedes</option>
  <option value="Opel">Opel</option>
  <option value="Ford">Ford</option>
  <option value="Toyota">Toyota</option>
  <option value="Honda">Honda</option>
  <option value="Nissan">Nissan</option>
  <option value="Hyundai">Hyundai</option>
  <option value="Kia">Kia</option>
  <option value="Mazda">Mazda</option>
  <option value="Fiat">Fiat</option>
  <option value="Alfa Romeo">Alfa Romeo</option>
  <option value="Jeep">Jeep</option>
  <option value="Volvo">Volvo</option>
  <option value="Skoda">Skoda</option>
  <option value="Seat">Seat</option>
  <option value="Cupra">Cupra</option>
  <option value="Tesla">Tesla</option>
  <option value="Porsche">Porsche</option>
  <option value="Ferrari">Ferrari</option>
  <option value="Lamborghini">Lamborghini</option>
  <option value="Maserati">Maserati</option>
  <option value="Jaguar">Jaguar</option>
  <option value="Land Rover">Land Rover</option>
  <option value="Mini">Mini</option>
  <option value="Chevrolet">Chevrolet</option>
  <option value="Dodge">Dodge</option>
  <option value="Cadillac">Cadillac</option>
  <option value="Suzuki">Suzuki</option>
  <option value="Mitsubishi">Mitsubishi</option>
  <option value="Subaru">Subaru</option>
  <option value="Lexus">Lexus</option>
  <option value="Infiniti">Infiniti</option>
  <option value="Aston Martin">Aston Martin</option>
  <option value="Bentley">Bentley</option>
  <option value="Bugatti">Bugatti</option>
  <option value="Rolls-Royce">Rolls-Royce</option>
  <option value="McLaren">McLaren</option>
</select>

        <select
  value={vehicleModel}
  onChange={(e) => setVehicleModel(e.target.value)}
>
  <option value="">Choisir un modèle</option>
  {vehicleBrand && modelsByBrand[vehicleBrand]?.map((model) => (
    <option key={model} value={model}>
      {model}
    </option>
  ))}
</select>

        <select
  value={vehiclePhase}
  onChange={(e) => setVehiclePhase(e.target.value)}
>
  <option value="">Choisir une phase / génération</option>
  {vehicleModel && phasesByModel[vehicleModel]?.map((phase) => (
    <option key={phase} value={phase}>
      {phase}
    </option>
  ))}
</select>

<select
  value={vehicleEngine}
  onChange={(e) => setVehicleEngine(e.target.value)}
>
  <option value="">Choisir une motorisation</option>
  {vehicleModel && enginesByModel[vehicleModel]?.map((engine) => (
    <option key={engine} value={engine}>
      {engine}
    </option>
  ))}
</select>

<input
  placeholder="Immatriculation (ex: AB-123-CD)"
  value={vehiclePlate}
  onChange={(e) => setVehiclePlate(e.target.value.toUpperCase())}
/>

<input
  placeholder="Kilométrage actuel"
          value={vehicleKm}
          onChange={(e) => setVehicleKm(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
        />

        {vehiclePhoto && (
          <img
            src={vehiclePhoto}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              marginTop: "10px"
            }}
          />
        )}

        <button onClick={addVehicle}>Ajouter véhicule</button>

        {vehicles.map((vehicle) => (
  <div
    key={vehicle.id}
    onClick={() => setSelectedVehicle(vehicle)}
    style={{
      background: selectedVehicle?.id === vehicle.id ? "#e8f3ff" : "white",
      border: selectedVehicle?.id === vehicle.id ? "2px solid #007bff" : "1px solid #ddd",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
      marginBottom: "20px",
      cursor: "pointer"
    }}
  >
    {vehicle.photo && (
      <img
        src={vehicle.photo}
        alt={vehicle.model}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover"
        }}
      />
    )}

    <div style={{ padding: "20px" }}>
      <h3 style={{ margin: 0 }}>
        {vehicle.type}
        {vehicle.name}
      </h3>

      <p style={{ color: "#666", marginTop: "8px" }}>
        {vehicle.brand} {vehicle.model}
<br />
🧬 {vehicle.phase}
<br />
⚙️ {vehicle.engine}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px"
        }}
      >
        <span>📍 {vehicle.km} km
        <br />
        🔖 {vehicle.plate}</span>
        <span>
          {selectedVehicle?.id === vehicle.id ? "✅ Sélectionné" : "➡️ Voir"}
        </span>
      </div>
    </div>
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

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button
            type="button"
            onClick={() => setRepairCategory("Petite mécanique")}
            style={{
              background: repairCategory === "Petite mécanique" ? "#28a745" : "#ddd",
              color: repairCategory === "Petite mécanique" ? "white" : "black",
              flex: 1
            }}
          >
            🛢️ Petite mécanique
          </button>

          <button
            type="button"
            onClick={() => setRepairCategory("Grosse mécanique")}
            style={{
              background: repairCategory === "Grosse mécanique" ? "#dc3545" : "#ddd",
              color: repairCategory === "Grosse mécanique" ? "white" : "black",
              flex: 1
            }}
          >
            ⚙️ Grosse mécanique
          </button>
        </div>
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
            <strong>{r.category}</strong><br />
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
