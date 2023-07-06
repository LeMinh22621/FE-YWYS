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
    deleteBackgroundById(backgroundId, config)
    {
        return http.delete(`/admin/backgrounds/${backgroundId}`, config);
    },
    updateBackground(backgroundId, data, config)
    {
        return http.patch(`/admin/backgrounds/${backgroundId}`, data, config);
    },
    /**
     * Theme
     */
    addNewTheme(data, config)
    {
        return http.post(`/admin/theme`, data, config);
    },
    updateTheme(themeId, data, config)
    {
        return http.patch(`/admin/themes/${themeId}`, data, config);
    },
    deleteThemeById(themeId, config)
    {
        return http.delete(`/admin/themes/${themeId}`, config);
    },
    /**
     * Motivational Quote
     */
    getAllMotivationalQuotes(config){
        return http.get(`/admin/motivational-quotes`, config);
    },
    addNewMotivationalQuote(data, config){
        return http.post(`/admin/motivational-quotes-add`, data, config);
    },
    deletQuoteById(quoteId, config){
        return http.delete(`/admin/motivational-quotes/${quoteId}`, config);
    },
    updateMotivationalQuote(quoteId, data, config){
        return http.patch(`/admin/motivational-quotes/${quoteId}`, data, config);
    }
}
export default adminApi;