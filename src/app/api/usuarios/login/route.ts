// app/api/usuarios/login/route.ts
import { autenticaUsuario } from "@/controllers/UsuarioController";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  if (!JWT_SECRET) {
    return NextResponse.json(
      { success: false, error: "JWT_SECRET não está definido" },
      { status: 500 }
    );
  }

  try {
    const { email, senha } = await req.json();

    if (!email || !senha) {
      return NextResponse.json(
        { success: false, error: "Usuário e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const usuario = await autenticaUsuario(email, senha);
    if (!usuario) {
      return NextResponse.json(
        { success: false, error: "Usuário ou senha inválidos" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: usuario._id, nome: usuario.nome, funcao: usuario.funcao },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      success: true,
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        funcao: usuario.funcao,
      },
    });
  } catch (error: any) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
