import { Router } from "express";
import { criarUsuario, 
         loginUsuario,
         esqueciSenha,
         resetarSenha,
         buscarUsuario,
         listarUsuarios,
         atualizarUsuario,
         deletarUsuario 
         } from "../controllers/UsuariosController.js"

export const usuarioRouter = Router();

usuarioRouter.post("/register", criarUsuario);

usuarioRouter.post("/login", loginUsuario);

usuarioRouter.post("/esqueci-senha", esqueciSenha);

usuarioRouter.post("/resetar-senha", resetarSenha);

usuarioRouter.get("/:id", buscarUsuario);

usuarioRouter.get("/", listarUsuarios);

usuarioRouter.put("/:id", atualizarUsuario);

usuarioRouter.delete("/:id", deletarUsuario);