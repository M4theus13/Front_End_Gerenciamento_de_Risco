import api from "./api";
import { jwtDecode } from "jwt-decode";

export const Me = async (token) => {

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id; 
  try {

      const response = await api.get(`/me/${userId}`,{
        headers: {Authorization : `Bearer ${token}`} 
      })

      return response.data.userLogado[0]
    } catch (err) {
      console.log(err)
    }
}