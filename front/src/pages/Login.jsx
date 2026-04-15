import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from '../services/api.js'
import { saveUser } from "../utils/auth";
import { toast } from "react-toastify";


export default function Login(){
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function handleLogin(e){

        e.preventDefault()

        try{
            const {data} = await api.post("/login", {
                email,
                senha
            })
            // console.log(data)
            saveUser(data)
            toast.success("Seu login foi efeitivado")

            const tipo = data.usuario?.tipoUsuario || data.tipoUsuario

            console.log("Tipo usuario:", data.usuario.tipoUsuario)

            if(data.usuario.tipoUsuario === "ADMIN"){
                // console.log("Entrando como ADMIN")
                navigate("/admin")
            }else{
                // console.log("Entrando como USER")
                navigate("/dashboard")
            }
            
            }catch(error){
                // console.error(error)
                toast.error("O email e/ou a senha incorretos")
            }
        }

    return(

        <div className="h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-x1 shadow w-96 space-y-4">

                <h1 className="text-x1 font-bold text-center">
                    Login
                </h1>

                <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                onChange={e=>setEmail(e.target.value)}
                />

                <input
                type="password"
                placeholder="Senha"
                className="w-full border p-2 rounded"
                onChange={e=>setSenha(e.target.value)}
                />

                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    Entrar
                </button>

                <p className="text-center text-sm text-gray-600">
                    Ainda não tem conta?
                    <Link
                        to="/register"
                        className="text-blue-600 ml-1 hover:underline">
                            Cadastre-se
                    </Link>
                    <Link 
                        className="flex flex-col items-center text-black-600 ml-1 hover:underline"
                        to="/esqueci-senha">
                            Esqueci minha senha
                    </Link>
                </p>
                <p>
            
                </p>
                    
            </form>

        </div>
    )
}
