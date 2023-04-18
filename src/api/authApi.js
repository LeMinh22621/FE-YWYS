import http from "../utils/http";

const authApi = {
    login(data){
        return http.post("/auth/login", data);
    },
    register(data, config){
        return http.post('/auth/register', data, config);
    },
    checkExpiredToken(token){
        return http.get(`/auth/verify-token?token=${token}`);
    }
}
export default authApi;