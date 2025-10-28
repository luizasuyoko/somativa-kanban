"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await resposta.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("funcao", data.usuario.funcao);
        router.push("/dashboard");
      } else {
        setErro(data?.error || data?.message || "Falha de Login");
      }
    } catch (error) {
      console.error("Erro de Login:", error);
      setErro("Erro de servidor. Tente novamente.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <div
        style={{
          padding: "2rem",
          borderRadius: "8px",
          border: "1px solid lightgrey",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}>
          Login
        </h2>

        {erro && (
          <p
            style={{
              color: "red",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {erro}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "0.3rem", color: "#555" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid lightgrey",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "0.3rem", color: "#555" }}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid lightgrey",
                fontSize: "1rem",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid lightgrey",
              backgroundColor: "#fff",
              fontWeight: "bold",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
