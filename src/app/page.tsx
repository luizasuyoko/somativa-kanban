"use client";

export default function Home() {
  return (
    <div
      style={{paddingTop:"10pc",textAlign: "center",padding: "2rem",}}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Bem-Vindo à Nossa Agência!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
        Por favor, faça login para acessar o painel
      </p>
      <a
        href="/login"
        style={{
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        Login
      </a>
    </div>
  );
}
