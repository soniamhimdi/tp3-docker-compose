import { useState, useEffect } from "react";

// En dev : utilise la variable d'environnement
// En prod : utilise /api (chemin relatif, passera par nginx)
const API_URL = import.meta.env.VITE_API_URL || "/api";

function App() {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les tâches au démarrage
  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Impossible de contacter l'API");
        setLoading(false);
      });
  }, []);

  // Ajouter une tâche
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      const item = await res.json();
      setItems([item, ...items]);
      setNewTitle("");
    } catch (err) {
      setError("Erreur lors de l'ajout");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1>📝 Gestionnaire de tâches</h1>

      <form onSubmit={handleAdd} style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nouvelle tâche..."
          style={{ flex: 1, padding: "8px 12px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 16px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Ajouter
        </button>
      </form>

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
      {loading && <p>Chargement...</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item._id}
            style={{ padding: "12px", marginBottom: "8px", background: "#f5f5f5", borderRadius: "4px", borderLeft: "4px solid #007bff" }}
          >
            {item.title}
          </li>
        ))}
      </ul>

      {!loading && items.length === 0 && <p style={{ color: "#999" }}>Aucune tâche pour l'instant.</p>}
    </div>
  );
}

export default App;