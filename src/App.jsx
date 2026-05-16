import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import { supabase } from "./supabase";

function App() {
  const [user, setUser] = useState(null);

  const [vehicleName, setVehicleName] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleEngine, setVehicleEngine] = useState("");
  const [vehicleKm, setVehicleKm] = useState("");
  const [vehiclePhoto, setVehiclePhoto] = useState("");

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchVehicles();
    }
  }, [user]);

  async function fetchVehicles() {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Erreur fetch véhicules:", error);
        return;
      }

      setVehicles(data || []);
    } catch (err) {
      console.log("Erreur inattendue:", err);
    }
  }

  const brands = [
  "Peugeot",
  "Renault",
  "Citroën",
  "DS",
  "BMW",
  "Mercedes",
  "Audi",
  "Volkswagen",
  "Seat",
  "Cupra",
  "Skoda",
  "Toyota",
  "Honda",
  "Nissan",
  "Ford",
  "Opel",
  "Fiat",
  "Alfa Romeo",
  "Volvo",
  "Tesla",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Maserati",
  "Jaguar",
  "Land Rover",
  "Mini",
  "Chevrolet",
  "Dodge",
  "Subaru"
];

  const modelsByBrand = {
  Peugeot: ["106", "206", "207", "208", "308", "407", "508", "607", "3008", "5008"],
  Renault: ["Clio", "Megane", "Laguna", "Scenic", "Twingo", "Captur"],
  Citroën: ["C1", "C2", "C3", "C4", "C5", "Berlingo", "DS3"],
  DS: ["DS3", "DS4", "DS7"],
  BMW: ["Serie 1", "Serie 3", "Serie 5", "X1", "X3", "X5", "M3", "M5"],
  Mercedes: ["Classe A", "Classe C", "Classe E", "CLA", "GLA", "GLE", "AMG GT"],
  Audi: ["A1", "A3", "A4", "A5", "A6", "Q3", "Q5", "RS3", "RS6"],
  Volkswagen: ["Polo", "Golf", "Passat", "Tiguan", "Touareg"],
  Seat: ["Ibiza", "Leon", "Ateca"],
  Cupra: ["Leon", "Formentor"],
  Skoda: ["Fabia", "Octavia", "Superb"],
  Toyota: ["Yaris", "Corolla", "Supra", "RAV4"],
  Honda: ["Civic", "Accord", "CR-V", "Type R"],
  Nissan: ["Micra", "Qashqai", "350Z", "370Z", "GTR"],
  Ford: ["Fiesta", "Focus", "Mondeo", "Mustang", "Kuga"],
  Opel: ["Corsa", "Astra", "Insignia"],
  Fiat: ["500", "Punto", "Tipo"],
  "Alfa Romeo": ["MiTo", "Giulietta", "Giulia", "Stelvio"],
  Volvo: ["V40", "XC40", "XC60", "XC90"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Porsche: ["911", "Cayenne", "Panamera", "Macan"],
  Ferrari: ["488", "F8", "Roma", "SF90"],
  Lamborghini: ["Huracan", "Aventador", "Urus"],
  Maserati: ["Ghibli", "Levante", "GranTurismo"],
  Jaguar: ["XE", "XF", "F-Type"],
  "Land Rover": ["Range Rover", "Defender", "Discovery"],
  Mini: ["Cooper", "Countryman"],
  Chevrolet: ["Camaro", "Corvette"],
  Dodge: ["Challenger", "Charger"],
  Subaru: ["Impreza", "WRX", "BRZ"]
};

  const enginesByModel = {
  "206": ["1.1 Essence", "1.4 Essence", "1.6 HDI", "2.0 HDI"],
  "607": ["2.2 HDI", "2.7 HDI", "3.0 V6"],
  "Clio": ["1.2 Essence", "1.5 dCi", "RS"],
  "Megane": ["1.5 dCi", "1.9 dCi", "RS"],
  "Golf": ["1.6 TDI", "2.0 TDI", "GTI", "R"],
  "A3": ["1.9 TDI", "2.0 TDI", "S3"],
  "Serie 3": ["320d", "330d", "330i", "M3"],
  "Mustang": ["2.3 EcoBoost", "5.0 V8"],
  "911": ["Carrera", "Turbo", "GT3"],
  "Model 3": ["Standard", "Long Range", "Performance"],
  "GTR": ["3.8 V6"],
  "Supra": ["2.0 Turbo", "3.0 Turbo"],
  "M5": ["4.4 V8"],
  "RS6": ["4.0 V8"],
  "Huracan": ["5.2 V10"],
  "Aventador": ["6.5 V12"],
  "Corvette": ["6.2 V8"]
};

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setVehiclePhoto(reader.result);
    };

    reader.readAsDataURL(file);
  }

  async function addVehicle() {
    if (!vehicleName || !vehicleBrand || !vehicleModel) {
      alert("Remplis au moins nom + marque + modèle 😅");
      return;
    }

    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          user_id: user.id,
          name: vehicleName,
          brand: vehicleBrand,
          model: vehicleModel,
          year: vehicleYear,
          engine: vehicleEngine,
          photo: vehiclePhoto,
          km: vehicleKm
        }
      ])
      .select();

    if (error) {
      console.log("Erreur ajout véhicule:", error);
      alert(error.message);
      return;
    }

    setVehicles([data[0], ...vehicles]);

    setVehicleName("");
    setVehicleBrand("");
    setVehicleModel("");
    setVehicleYear("");
    setVehicleEngine("");
    setVehicleKm("");
    setVehiclePhoto("");
  }

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="container">
      <h1>🚗 Mon Garage Premium</h1>

      <div className="card">
        <h2>Ajouter un véhicule</h2>

        <input
          placeholder="Nom du véhicule"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
        />

        <select
          value={vehicleBrand}
          onChange={(e) => {
            setVehicleBrand(e.target.value);
            setVehicleModel("");
            setVehicleEngine("");
          }}
        >
          <option value="">Choisir une marque</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          value={vehicleModel}
          onChange={(e) => {
            setVehicleModel(e.target.value);
            setVehicleEngine("");
          }}
        >
          <option value="">Choisir un modèle</option>
          {vehicleBrand &&
            modelsByBrand[vehicleBrand]?.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
        </select>

        <select
          value={vehicleYear}
          onChange={(e) => setVehicleYear(e.target.value)}
        >
          <option value="">Choisir une année</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={vehicleEngine}
          onChange={(e) => setVehicleEngine(e.target.value)}
        >
          <option value="">Choisir une motorisation</option>
          {vehicleModel &&
            enginesByModel[vehicleModel]?.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
        </select>

        <input
          placeholder="Kilométrage"
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
            alt="preview"
            style={{
              width: "100%",
              maxHeight: "250px",
              objectFit: "cover",
              borderRadius: "15px",
              marginTop: "15px"
            }}
          />
        )}

        <button onClick={addVehicle}>Ajouter véhicule</button>
      </div>

      <div className="card">
        <h2>Mes véhicules</h2>

        {vehicles.length === 0 ? (
          <p>Aucun véhicule ajouté 🚘</p>
        ) : (
          vehicles.map((vehicle) => {
            const currentYear = new Date().getFullYear();
            const age = currentYear - vehicle.year;

            let badge = "";

            if (age >= 30) {
              badge = "🏆 Véhicule de collection";
            } else if (age >= 20) {
              badge = "🔥 Youngtimer";
            }

            return (
              <div
                key={vehicle.id}
                style={{
                  background: "white",
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "15px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                }}
              >
                {vehicle.photo && (
                  <img
                    src={vehicle.photo}
                    alt={vehicle.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "15px",
                      marginBottom: "15px"
                    }}
                  />
                )}

                <h3>{vehicle.name}</h3>
                <p>{vehicle.brand} {vehicle.model}</p>
                <p>📅 {vehicle.year}</p>
                <p>⚙️ {vehicle.engine}</p>
                <p>📍 {vehicle.km} km</p>

                {badge && <strong>{badge}</strong>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
