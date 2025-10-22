//rotas que precisam do id (patch ou put, delte, get(one))

import { deleteTarefa, getOneTarefa, updateTarefa } from "@/controllers/TarefaController";
import { NextRequest, NextResponse } from "next/server";

//criar uma interface, parametro == id: string
interface Parametro{
    id:string;
}

//patch
export async function PATCH(req: NextRequest, {params}:{params: Parametro}){
    try {
        const {id} = params; 
        const data = await req.json();
        const tarefaAtualizado = await updateTarefa(id, data);
        if (!tarefaAtualizado) {
            return NextResponse.json({success:false, error: "Not Found"});
        } 
        //usuario foi encontrado e atualizado
        return NextResponse.json({success: true, data: tarefaAtualizado});
    } catch (error) {
        //quando não consegue conexão com o bd
        return NextResponse.json({success: false, error:error});
    }
}

//get (one)
export async function GET({params}:{params:Parametro}) {
    try {
        const {id} = params;
        const tarefa = await getOneTarefa(id);
        if (!tarefa) {
            return NextResponse.json({success: false, error: "Not Found"});
        }
        //usuario foi encontrado e atualizado
        return NextResponse.json({success:true, data: tarefa});
    } catch (error) {
        //quando nao consegue conexão com o bd
        return NextResponse.json({success: false, error: error});
    }
}

//DELETE 
export async function DELETE({params}:{params:Parametro}) {
    try {
        const {id} = params;
        await deleteTarefa(id);
        return NextResponse.json({success:true, data:{}});
    } catch (error) {
        return NextResponse.json({success:false, error: error});
    }
}