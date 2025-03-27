import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-gerenciamento-de-riscos.onrender.com'
}) 

export default api