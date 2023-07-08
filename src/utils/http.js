import axios from 'axios'
import { getToken } from './auth'
import { TOKEN_KEY } from './auth'
class Http{
    constructor()
    {
        this.instance = axios.create(
            {
                baseURL: 'http://localhost:8089/api/v1',
                // baseURL: 'http://10.20.2.7:8089/api/v1',
                // baseURL:'http://192.168.1.17:8089/api/v1',
                // baseURL:'http://192.168.1.151:8089/api/v1',
                // baseURL: 'https://8355-113-23-114-34.ngrok-free.app/api/v1',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Permissions-Policy': 'ch-ua-form-factor',
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Credentials': true,
                    // "Access-Control-Allow-Headers": "*",
                    // 'Access-Control-Allow-Methods': '*',
                }
            }
        )
        this.instance.interceptors.response.use(
            response => {
                const result = {
                    ...response.data,
                    status: response.status
                }
                return result;
            },
            error => {
                // eslint-disable-next-line
                if(error.response.status === 403){
                    localStorage.removeItem(TOKEN_KEY);
                }
                return Promise.reject(error.response.data)
            }
        )
        this.instance.interceptors.request.use(
            (config) => {
                const token = getToken();
                if(token)
                {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error.response)
            }
        )
    }

    get(url, config = null)
    {
        return this.instance.get(url, config)
    }

    post(url, data, config = null)
    {
        return this.instance.post(url, data, config)
    }

    put(url, data, config = null)
    {
        return this.instance.put(url, data, config)
    }

    patch(url, data, config = null)
    {
        return this.instance.patch(url, data, config)
    }

    delete(url, data, config = null)
    {
        return this.instance.delete(
                    url,
                    {
                        data,
                        ...config
                    } 
                )
    }
}

const http = new Http();
export default http;