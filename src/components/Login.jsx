import { useState } from "react";
import { supabase } from "../supabase";
import "../App.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUp() {
    if (!email || !password) {
      alert("Remplis email + mot de passe 😅");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Compte créé avec succès ✅ Vérifie ton email si confirmation activée.");
    }
  }

  async function signIn() {
    if (!email || !password) {
      alert("Remplis email + mot de passe 😅");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setUser(data.user);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "20px"
      }}
    >
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: "450px",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          textAlign: "center"
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>🔐 Garage Tracker</h1>
        <p style={{ color: "#666", marginBottom: "25px" }}>
          Connecte-toi pour retrouver ton garage 🚗
        </p>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <button
          onClick={signIn}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Connexion..." : "Connexion"}
        </button>

        <button
          onClick={signUp}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#16a34a",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
}

export default Login;
