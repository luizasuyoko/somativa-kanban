import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITarefa extends Document{
    _id: string;
    titulo: string;
    descricao: string;
    projetoAss: String;
    membroAtrib: string;
    status: string;
}

const TarefaSchema: Schema<ITarefa> = new Schema({
    titulo: { type: String, required: true},
    projetoAss:{type:String, required:true},
    membroAtrib: { type: String, required: true},
    status: { 
        type: String, 
        enum: ["A Fazer", "Em Andamento","Concluido"],
        default: "A Fazer"
    },
})

const Tarefa: Model<ITarefa> = mongoose.models.Usuario || mongoose.model<ITarefa>("Tarefa", TarefaSchema);

export default Tarefa;