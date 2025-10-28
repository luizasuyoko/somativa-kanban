// app/dashboard/membro.tsx
"use client";

import { useEffect, useState } from "react";

interface Task {
  _id: string;
  titulo: string;
  descricao: string;
  criadoPorNome: string;
  criadoEm: string;
}

export default function DashboardMembro() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/tasks/getTasks");
        const data = await res.json();
        if (data.success) {
          setTasks(data.tasks);
        }
      } catch (err) {
        console.error("Erro ao carregar tasks", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <p>Carregando tarefas...</p>;

  return (
    <div>
      <h2>Área do Membro</h2>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa disponível.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.titulo}</strong> - {task.descricao} <br />
              <small>Criado por: {task.criadoPorNome} em {new Date(task.criadoEm).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
