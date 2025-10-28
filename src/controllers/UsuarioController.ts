import Usuario, { IUsuario } from "@/models/Usuario";
import connectMongo from "../services/mongodb"


//getAll
export const getAllUsuario = async() =>{
    await connectMongo(); //estabelece conexão ???
    const Usuarios = await Usuario.find([]); //listar todos os usuários da coleção
    return Usuarios;
};

//getOne
export const getOneusuario = async(id:string) =>{
    await connectMongo(); //estabelece conexão
    const usuario = await Usuario.findById(id); //listar todos os usuários da coleção
    return usuario;
};

//create
export const createUsuario = async(data: Partial<IUsuario>) =>{
    await connectMongo();
    const novoUsuario = new Usuario(data); // cria um Equipamento a partir do Schema
    const novoUsuarioId = novoUsuario.save();
    return novoUsuarioId; //retorna o novo usuário já com o ID
};

//update
export const updateUsuario = async(id:string, data: Partial<IUsuario>) =>{
    await connectMongo();
    const UsuarioAtualizado = await Usuario.findByIdAndUpdate(id, data, {new:true});
    return UsuarioAtualizado; //retorna o novo usuário Atualizado
};

//delete
export const deleteUsuario = async(id: string) =>{
    await connectMongo();
    await Usuario.findByIdAndDelete(id);
};

//metodo de autencação de usuário (login) a senha é comparada
export async function autenticaUsuario(email: string, senha: string) {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return null;

  const senhaValida = await usuario.compareSenha(senha);
  if (!senhaValida) return null;

  return usuario;
}