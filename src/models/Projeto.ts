import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProjeto extends Document{
    _id: string;
    titulo: string;
    descricao: string;
}

const ProjetoSchema: Schema<IProjeto> = new Schema({
    titulo: { type: String, required: true},
    descricao: { type: String, required: true }
})

const Projeto: Model<IProjeto> = mongoose.models.Projeto || mongoose.model<IProjeto>("Projeto", ProjetoSchema);

export default Projeto;