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
    <div className="center">
      <h2>Login</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
