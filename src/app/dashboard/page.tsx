"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardMembro from "./membro";
import DashboardGerente from "./gerente";

export default function Dashboard() {
  const router = useRouter();
  const [userFuncao, setUserFuncao] = useState<string | null>(null);

  useEffect(() => {
    const funcao = localStorage.getItem("funcao");
    if (!funcao) {
      router.push("/login");
    } else {
      setUserFuncao(funcao);
    }
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("funcao");
    router.push("/login");
  };

  const renderDashboard = () => {
    switch (userFuncao?.toLowerCase()) {
      case "membro":
        return <DashboardMembro />;
      case "gerente":
        return <DashboardGerente />;
      default:
        return <p>Carregando...</p>;
    }
  };

  return (
    <div>
      <header>
        <h1>Bem-vindo</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>{renderDashboard()}</main>
    </div>
  );
}
