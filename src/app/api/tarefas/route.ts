//rotas de requisições api que não usa id

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Tarefa from "@/models/Tarefa";

const MONGO_URI = process.env.MONGO_URI;

export async function GET(req: NextRequest) {
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI not defined");

    await mongoose.connect(MONGO_URI);

    const tarefa = await Tarefa.find().sort({ criadoEm: -1 });

    return NextResponse.json({ success: true, tarefa });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI not defined");
    await mongoose.connect(MONGO_URI);

    const { titulo, descricao, criadoPor, criadoPorNome } = await req.json();

    if (!titulo || !descricao || !criadoPor || !criadoPorNome) {
      return NextResponse.json({ success: false, error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    const tarefa = new Tarefa({ titulo, descricao, criadoPor, criadoPorNome });
    await tarefa.save();

    return NextResponse.json({ success: true, tarefa });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}