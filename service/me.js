import api from "./api";
import { jwtDecode } from "jwt-decode";

export const Me = async (token, setUserLogado) => {

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id; 
  try {

      const response = await api.put(`/me/${userId}`, {},{
        headers: {Authorization : `Bearer ${token}`} 
      })
      setUserLogado(response.data.userLogado[0]) 
    } catch (err) {
      console.log(err)
    }
}