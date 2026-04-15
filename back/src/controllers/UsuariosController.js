import bcrypt from "bcrypt";
import crypto from "crypto";
import prisma from "../config/prisma.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";

export async function criarUsuario(req, res) {
  try {
    console.log("📥 Requisição recebida em /usuarios:", req.body);

    const { nome, email, senha, tipoUsuario } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        message: "Nome, email e senha são obrigatórios",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Email inválido" });
    }

    if (senha.length < 6) {
      return res.status(400).json({
        message: "A senha deve ter pelo menos 6 caracteres",
      });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        tipoUsuario,
      },
    });

    console.log("✅ Usuário criado:", usuario);

    return res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipoUsuario: usuario.tipoUsuario,
    });
  } catch (error) {
    console.error("❌ ERRO COMPLETO:", error);

    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Email já cadastrado",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const payload = {
      id: usuario.id,
      tipoUsuario: usuario.tipoUsuario,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return res.json({
      accessToken,
      refreshToken,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
      },
    });
  } catch (error) {
    console.error("❌ ERRO LOGIN:", error);
    return res.status(500).json({ message: error.message });
  }
}

export async function esqueciSenha(req, res) {
  try {
    const { email } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        resetToken: token,
        resetTokenExpires: new Date(Date.now() + 3600000), // 1h
      },
    });

    console.log("Token de recuperação:", token);

    return res.json({
      message: "Email de recuperação enviado",
    });
  } catch (error) {
    console.error("❌ ERRO ESQUECI SENHA:", error);
    return res.status(500).json({ message: error.message });
  }
}

export async function resetarSenha(req, res) {
  try {
    const { token, senha, confirmarSenha } = req.body;

    if (senha !== confirmarSenha) {
      return res.status(400).json({
        message: "Senhas não coincidem",
      });
    }

    const usuario = await prisma.usuario.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!usuario) {
      return res.status(400).json({
        message: "Token inválido ou expirado",
      });
    }

    const hash = await bcrypt.hash(senha, 10);

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        senha: hash,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return res.json({
      message: "Senha atualizada com sucesso",
    });
  } catch (error) {
    console.error("❌ ERRO RESET SENHA:", error);
    return res.status(500).json({ message: error.message });
  }
}