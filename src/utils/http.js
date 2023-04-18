import axios from 'axios'

class Http{
    constructor()
    {
        this.instance = axios.create(
            {
                baseURL: 'http://localhost:8088/api/v1',
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
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                }
                return Promise.reject(error.response.data)
            }
        )
        this.instance.interceptors.request.use(
            config => {
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