// src/controllers/usuarioController.js
import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt'


// READ ALL
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        ativo: true,
        tipoUsuario: true
      }
    });

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
export const buscarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await prismaClient.usuario.findUnique({
      where: { id: Number(id) }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, ativo, tipoUsuario } = req.body;

    let data = { nome, email, ativo, tipoUsuario };

    if (senha) {
      data.senha = await bcrypt.hash(senha, 10);
    }

    const usuario = await prismaClient.usuario.update({
      where: { id: Number(id) },
      data
    });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE (soft delete)
export const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    await prismaClient.usuario.update({
      where: { id: Number(id) },
      data: { ativo: false }
    });

    res.json({ message: 'Usuário desativado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};