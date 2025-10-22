import Tarefa, { ITarefa } from "../models/Tarefa";
import connectMongo from "../services/mongodb"


//getAll
export const getAllTarefas = async() =>{
    await connectMongo(); //estabelece conexão ???
    const Tarefas = await Tarefa.find([]); //listar todos os usuários da coleção
    return Tarefas;
};

//getOne
export const getOneTarefa = async(id:string) =>{
    await connectMongo(); //estabelece conexão
    const tarefa = await Tarefa.findById(id); //listar todos os usuários da coleção
    return tarefa;
};

//create
export const createTarefa = async(data: Partial<ITarefa>) =>{
    await connectMongo();
    const novoTarefa = new Tarefa(data); // cria um Equipamento a partir do Schema
    const novoTarefaId = novoTarefa.save();
    return novoTarefaId; //retorna o novo usuário já com o ID
};

//update
export const updateTarefa = async(id:string, data: Partial<ITarefa>) =>{
    await connectMongo();
    const TarefaoAtualizado = await Tarefa.findByIdAndUpdate(id, data, {new:true});
    return TarefaoAtualizado; //retorna o novo usuário Atualizado
};

//delete
export const deleteTarefa = async(id: string) =>{
    await connectMongo();
    await Tarefa.findByIdAndDelete(id);
};