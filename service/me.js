import { useEffect } from "react";
import api from "./api";
import { jwtDecode } from "jwt-decode";

export const Me = async (token) => {

  //conversor de data unix
  const unixToDate = (timeUnix)  =>  {
    const date = new Date(timeUnix * 1000); 
    return date.toLocaleString('pt-BR');
  };

  function isTokenExpired(token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp === undefined) {
          return false;
        }
        console.log(decoded)

        const dataHoraLogin = unixToDate(decoded.iat);
        const dataHoraExpireToken = unixToDate(decoded.exp);
        console.log('Hora de login:', dataHoraLogin);
        console.log('Hora que o token expira:', dataHoraExpireToken); 

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return true; 
      }
    }

    const storedToken = localStorage.getItem('token');
    if (!storedToken || isTokenExpired(storedToken)) {
      console.log('Token inválido ou expirado!');
      setToken(null); 
      navigate('/login')
      return
    } 
          if (!storedToken || isTokenExpired(storedToken)) {
            console.log('Token inválido ou expirado!');
            setToken(null); 
            navigate('/login')
            return
          } 

    
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

