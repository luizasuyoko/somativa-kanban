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
  const handleSubmit = async( e: React.FormEvent)=>{ //controle dos eventos do Formulário
        e.preventDefault(); //evita o recarreamento da pagina
        setErro(""); //limpa a mensagem de erro

        try {
            const resposta = await fetch(
                "api/usuarios/login",{
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({email, senha})
                }
            );
            //analisar a resposta da solicitação
            const data = await resposta.json()
            if (data.success){
                //armazenar as informações do usuario logado no localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("funcao", data.usuario.funcao);
                route.push("/dashboard");
            } else {
                const erroData = data.error();
                setErro(erroData.message || "Falha de Login");
            }
        } catch (error) {
            console.error("Erro de Login", error);
            setErro("Erro de Servidor: " +error);
        }
    }
  

    //ReactDom
    return(
    <div>
      <h1>Login</h1>
      {erro && <p>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Senha:</label>
        <input type="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}