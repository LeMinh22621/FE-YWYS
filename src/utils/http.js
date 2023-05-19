import axios from 'axios'
import { getToken } from './auth'
import { TOKEN_KEY } from './auth'
class Http{
    constructor()
    {
        this.instance = axios.create(
            {
                baseURL: 'http://localhost:8089/api/v1',
                headers: {
                    'Content-Type': 'application/json',
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
        this.instance.patch(url, data, config)
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