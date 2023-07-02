import http from "../utils/http";

const adminApi = {
    /**
     * User account
     */
    getAllUserAccount(config)
    {
        return http.get(`/admin/accounts`, config);
    },
    deleteAccount(userId, config)
    {
        return http.delete(`/admin/delete/${userId}`, config);
    },
    saveUser(userId, data, config)
    {
        return http.patch(`/admin/update/${userId}`, data, config);
    },
    /**
     * Background
     */
    saveNewBackground(data, config)
    {
        return http.post(`/admin/background-upload`, data, config);
    },
}
export default adminApi;