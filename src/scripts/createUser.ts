import mongoose from "mongoose";
import Usuario from "@/models/Usuario";
import "dotenv/config";

async function createUser() {
  await mongoose.connect(process.env.MONGO_URI!);

  const user = new Usuario({
    nome: "Admin Teste",
    email: "admin@teste.com",
    senha: "123456",
    funcao: "gerente",
  });

  await user.save();
  console.log("Usuário criado com sucesso!");
  await mongoose.disconnect();
}

createUser();
