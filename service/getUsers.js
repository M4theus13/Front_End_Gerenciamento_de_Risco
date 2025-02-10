import api from "./api";
import { jwtDecode } from "jwt-decode";

export const GetUserInfo = async (token, setUserLogado, setUsersInfo) => {
  const decodedToken = jwtDecode(token);
  const userIdInfo = decodedToken.id; // Obtém o ID do usuário do token decodificado
  try {
      const response = await api.put(`/info-user/${userIdInfo}`, {},{
        headers: {Authorization : `Bearer ${token}`} 
      })
      setUserLogado(response.data.userLogado[0]) //seta as informações do usuário	logado
      setUsersInfo(response.data.usersInfo) //seta as informações dos usuários
  } catch (err) {
    console.log(err.message)
  }
}

