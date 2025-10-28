//classe de modelagem de dados para usuarios 
//mongoose -> vai ajudar na modelagem da classe
import mongoose, { Document, Model, Schema } from "mongoose";

//import do bcrypt
import bcrypt from "bcrypt";

//atributos
export interface IUsuario extends Document{
    _id: string;
    nome: string;
    email: string;
    senha: string; //permite que a senha retorne nula
    funcao: string;
    compareSenha(senhaUsuario: string):Promise<boolean>;
    //devolve para o usuario apenas a booleana de comparação da senha
}

//construtor(Schema)
const UsuarioSchema: Schema<IUsuario> = new Schema({
    nome: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    senha: {type: String, required:true},
    funcao: {
        type: String, 
        enum: ["gerente","membro"],
        required:true
    },
})

UsuarioSchema.pre<IUsuario>("save", async function (next) {
  if (!this.isModified("senha") || !this.senha) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

//criptografar
//método para criptografar a senha antes de enviar para o bd
UsuarioSchema.pre<IUsuario>("save", async function (next) {
    if (!this.isModified('senha') || !this.senha) return next; 
    try{
       const salt = await bcrypt.genSalt(10); //todas as senhas usao o mesmo padrao
       this.senha = await bcrypt.hash(this.senha, salt); 
       next();
    }catch (error:any){
        next(error);
    }
})

//método para comparar senha antes de fazer o login
//quando faz o login (cpmara a senha digitada e criptografada com a senha criptografada do banco)
UsuarioSchema.methods.compareSenha = function (senhaUsuario:string):Promise<boolean>{
    return bcrypt.compare(senhaUsuario, this.senha);
}

//toMap <=> fromMap
const Usuario: Model<IUsuario> = mongoose.models.Usuario || mongoose.model<IUsuario>("Usuario", UsuarioSchema);

//componente reutilizável
export default Usuario;