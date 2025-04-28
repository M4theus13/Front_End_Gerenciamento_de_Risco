import api from "./api";
import { jwtDecode } from "jwt-decode";

export const Users = async (token) => {

  const decodedToken = jwtDecode(token);
  const userIdInfo = decodedToken.id; // Obtém o ID do usuário do token decodificado
  try {

      const response = await api.put(`/users/${userIdInfo}`, {},{
        headers: {Authorization : `Bearer ${token}`} 
      })
      return response.data.users
    } catch (err) {
      console.log(err)
    }
}

