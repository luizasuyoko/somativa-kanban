"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

 //componente client-side

export default function Login(){
    //campo para digitação do email
    const [email, setEmail] = useState("");
    //campo para digitação da senha
    const [senha, setSenha] = useState("");
    //campo mssg erro 
    const [erro, setErro] = useState("");

    //controle das rotas de navegação
    const route = useRouter();

    //método pra enviar o login 
    const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setErro("");
  console.log("Attempting login with:", { email, senha });

  try {
    const resposta = await fetch("/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!resposta.ok) {
      const errorData = await resposta.json().catch(() => null);
      const msg =
        errorData?.error ||
        errorData?.message ||
        `Erro HTTP ${resposta.status}`;
      throw new Error(msg);
    }

    const data = await resposta.json(); // ✅ Only read once
    console.log("Login response:", data);

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("funcao", data.usuario.funcao);
      route.push("/dashboard");
    } else {
      setErro(data.error || "Falha de login");
    }
  } catch (error) {
    console.error("Erro de Login", error);
    setErro("Erro de Servidor: " + (error instanceof Error ? error.message : String(error)));
  }
};

    //ReactDom
    return(
        <div className="center">
            <h2>Login</h2>
            {erro && <p style={{color:"red"}}>{erro}</p>}
            <form onSubmit={handleLogin}>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="senha">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}