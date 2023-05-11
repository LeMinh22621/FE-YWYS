import http from "../utils/http";

const roomApi = {
    getBackgrondListByThemeId(themeId, config)
    {
        return http.get(`/room/backgrounds?theme_id=${themeId}`,config);
    },
    getRandomMotivationQuote(config)
    {
        return http.get('/room/shuffle-motivational-quote', config);
    }
}
export default roomApi;