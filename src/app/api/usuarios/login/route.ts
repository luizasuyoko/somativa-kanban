//criar o login do usuario

import { autenticaUsuario } from "@/controllers/UsuarioController";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//jwt (

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
        throw new Error("JWT_SECRET ão está definido nas variaveis locais");
}

//começar o método 
export async function POST(req: NextRequest){
    try {
        const {email, senha} = await req.json();

        //validar os dados 
        if (!email || !senha) {
            return NextResponse.json(
                {success:false, error: "Usuário e senha são obrigatórios "}
            );
        }
        //método de autenticação do usuário 
        const usuario = await autenticaUsuario(senha, email);
        //se não encontra um usuario 
        if (!usuario) {
            return NextResponse.json(
                {success:false, error:"Usuário ou Senha inválidos"}
            );
        }
        //se foi encontrado => gerar o token => acessar as proximas paginas 
        const token = jwt.sign(
            {id: usuario._id, nome: usuario.nome, funcao: usuario.funcao},
            JWT_SECRET as string,
            {expiresIn: "1h"}
        );
        return NextResponse.json({
            success:true, 
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                funcao: usuario.funcao
            }
        })
    } catch (error) {
        return NextResponse.json({success:false, error:error});
    }
    
}

