//rotas de requisições api que não usa id

import { createUsuario, getAllUsuario } from "@/controllers/UsuarioController";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try{
        //requisição http -> front -> request -> backend
        const usuarios = await getAllUsuario(); //busca todos os usuarios no bd
        return NextResponse.json({success:true, data: usuarios});
    } catch (error){
        return NextResponse.json({success: false, error:error})
    }
}

export async function POST(req:NextRequest) { //pega o conteudo do html 
    try {
        const data = await req.json(); //converter o html em json 
        const novoUsuario = await createUsuario(data);
        return NextResponse.json({success:true, data:novoUsuario});
    } catch (error) {
        
    }
    
}