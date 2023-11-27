import axios from 'axios';
import { UserListaRequestDTO } from './dtos/NewUserListaDTO';

const IS_PROD = false;
const STATUS_OK = 200;

const apiInstance = axios.create({
    baseURL: IS_PROD ? '{{URL_PROD}}' : 'http://192.168.2.4:7151/gateway'
});

export const addUserLista = async (userListaDTO : UserListaRequestDTO) => {
    try {

        console.log('USUARIO PARA CRIAR', userListaDTO)
        console.log("Chamou o endpoint para criar uma nova lista na API");

        const response = await apiInstance.post('/permission/permission', userListaDTO);
        console.log('Resposta da API:', response.data);

        
        console.log('RETORNO DO BANCO', response)
        if (response.status === STATUS_OK) {
            return response.data;
        }

        return null;
    } catch (error) {
        console.error('Erro ao criar a lista na API:', error);
        return null;
    }
}