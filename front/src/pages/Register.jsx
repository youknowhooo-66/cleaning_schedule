import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register(){

    const navigate = useNavigate()

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [tipoUsuario, setTipoUsuario] = useState("USER")

    function validarSenha(senha){
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&]).{6,12}$/
        return regex.test(senha)
    }

    async function handleRegister(e) {
        
        e.preventDefault()

        if(nome.trim() === ""){
            toast.error("Nome não pode estar vazio")
            return
        }
        // if(!validarSenha(senha)){
        //           toast.error("Senha precisa ter 6-12 caracteres, 1 maiúscula, 1 número e 1 símbolo @#$%&")
        //     return
        // }

        try {
            await api.post("/usuario/register", {
                nome,
                email,
                senha,
                tipoUsuario: tipoUsuario
            });
            toast.success("Usuário criado com sucesso! :D")
            
            navigate("/")

        } catch(error) {
            if(error.response?.data){
            toast.error(error.response.data)
            }else{
            toast.error("Erro ao cadastrar usuário")
            }
        }
    }

    return(
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleRegister}
            className="bg-white p-8 rounded-x1 shadow w-96 space-y-4">
                <h1 className="text-x1 font-bold text-center">
                    Criar conta
                </h1>

                <input
                placeholder="Nome"
                className="w-full border p-2 rounded"
                value={nome}
                onChange={e=>setNome(e.target.value)}
                />

                <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Senha"
                className="w-full border p-2 rounded"
                value={senha}
                onChange={e=>setSenha(e.target.value)}
                />
                <select
                className="w-full border p-2 rounded"
                value={tipoUsuario}
                onChange={e=>setTipoUsuario(e.target.value)}
                >
                    <option value={'USER'}>Usuário</option>
                    <option value={'ADMIN'}>Administrador</option>
                </select>

                <button
                className="w-full bg-green-600 text-white p-2 rounded"
                >
                    Criar conta
                </button>

            </form>

        </div>

    )
    
}
