
import Projeto, { IProjeto } from "@/models/Projeto";
import connectMongo from "../services/mongodb"


//getAll
export const getAllProjetos = async() =>{
    await connectMongo(); //estabelece conexão ???
    const Projetos = await Projeto.find([]); //listar todos os usuários da coleção
    return Projetos;
};

//getOne
export const getOneProjeto = async(id:string) =>{
    await connectMongo(); //estabelece conexão
    const projeto = await Projeto.findById(id); //listar todos os usuários da coleção
    return projeto;
};

//create
export const createProjeto = async(data: Partial<IProjeto>) =>{
    await connectMongo();
    const novoProjeto = new Projeto(data); // cria um Equipamento a partir do Schema
    const novoProjetoId = novoProjeto.save();
    return novoProjetoId; //retorna o novo usuário já com o ID
};

//update
export const updateProjeto = async(id:string, data: Partial<IProjeto>) =>{
    await connectMongo();
    const ProjetoAtualizado = await Projeto.findByIdAndUpdate(id, data, {new:true});
    return ProjetoAtualizado; //retorna o novo usuário Atualizado
};

//delete
export const deleteProjeto = async(id: string) =>{
    await connectMongo();
    await Projeto.findByIdAndDelete(id);
};