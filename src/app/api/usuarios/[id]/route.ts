//rotas que precisam do id (patch ou put, delte, get(one))

import { deleteUsuario, getOneusuario, updateUsuario } from "@/controllers/UsuarioController";
import { error } from "console";
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
        const usuarioAtualizado = await updateUsuario(id, data);
        if (!usuarioAtualizado) {
            return NextResponse.json({success:false, error: "Not Found"});
        } 
        //usuario foi encontrado e atualizado
        return NextResponse.json({success: true, data: usuarioAtualizado});
    } catch (error) {
        //quando não consegue conexão com o bd
        return NextResponse.json({success: false, error:error});
    }
}

//get (one)
export async function GET({params}:{params:Parametro}) {
    try {
        const {id} = params;
        const usuario = await getOneusuario(id);
        if (!usuario) {
            return NextResponse.json({success: false, error: "Not Found"});
        }
        //usuario foi encontrado e atualizado
        return NextResponse.json({success:true, data: usuario});
    } catch (error) {
        //quando nao consegue conexão com o bd
        return NextResponse.json({success: false, error: error});
    }
}

//DELETE 
export async function DELETE({params}:{params:Parametro}) {
    try {
        const {id} = params;
        await deleteUsuario(id);
        return NextResponse.json({success:true, data:{}});
    } catch (error) {
        return NextResponse.json({success:false, error: error});
    }
}