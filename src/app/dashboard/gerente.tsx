// app/dashboard/gerente.tsx
"use client";

import { useState } from "react";

export default function DashboardGerente() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const funcao = localStorage.getItem("funcao");
    const nome = localStorage.getItem("nome") || "Gestor";

    try {
      const res = await fetch("/api/tasks/createTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao, criadoPor: funcao, criadoPorNome: nome }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Tarefa criada com sucesso!");
        setTitulo("");
        setDescricao("");
      } else {
        setMessage(data.error || "Falha ao criar tarefa");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erro de servidor");
    }
  };

  return (
    <div>
      <h2>Área do Gestor</h2>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição da tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button type="submit">Criar Tarefa</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
