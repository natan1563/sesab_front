import axios from 'axios'
// Melhoria: utilizar .env
export const axiosClientViaCep = axios.create({ baseURL: 'https://viacep.com.br/ws' });
