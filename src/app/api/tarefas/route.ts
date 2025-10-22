//rotas de requisições api que não usa id

import { createTarefa, getAllTarefas } from "@/controllers/TarefaController";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try{
        //requisição http -> front -> request -> backend
        const tarefas = await getAllTarefas(); //busca todos os usuarios no bd
        return NextResponse.json({success:true, data: tarefas});
    } catch (error){
        return NextResponse.json({success: false, error:error})
    }
}

export async function POST(req:NextRequest) { //pega o conteudo do html 
    try {
        const data = await req.json(); //converter o html em json 
        const novoTarefa = await createTarefa(data);
        return NextResponse.json({success:true, data:novoTarefa});
    } catch (error) {
        
    }
    
}