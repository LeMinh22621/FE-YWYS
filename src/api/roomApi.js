import http from "../utils/http";

const roomApi = {
    /**
     * Room
     */
    updateRoom(roomId, data, config){
        return http.patch(`/room/update-room-apart/${roomId}`, data, config);
    },
    getDetailRoom(roomId, config)
    {
        return http.get(`/room?room_id=${roomId}`, config);
    },
    createRoom(data, config){
        return http.post(`/room/create-room`, data, config)
    },
    getMyRoomList(userId, config){
        return http.get(`/room/${userId}/my-rooms`, config);
    },
    deleteRoomByRoomId(roomId, config)
    {
        return http.delete(`/room/delete/${roomId}`, config);
    },
    getPublichRoomOrderByMembers(config)
    {
        return http.get(`/room/public-rooms`, config);
    },
    /**
     * Task Manager
     */
    getListTaskManagerByRoomId(roomId, config)
    {
        return http.get(`/room/task-manager-list?room_id=${roomId}`, config);
    },
    getTaskManagerById(taskManagerId, config)
    {
        return http.get(`/room/task-manager?task_manager_id=${taskManagerId}`, config);
    },
    createTaskManager(data, config) {
        return http.post('/room/create-task-manager', data, config)
    },
    updateTaskManager(taskManagerId, data, config) {
        return http.patch(`/room/update-task-manager/${taskManagerId}`, data, config)
    },
    deleteTaskManager(taskManagerId, data, config)
    {
        return http.delete(`room/delete-task-manager/${taskManagerId}`, data, config);
    },
    /**
     * Task
     */
    // getTaskListByTaskManagerId(taskManagerId, config)
    // {
    //     return http.get(`/room/task-list?task_manager_id`)
    // },
    getTaskByID(taskId, config)
    {
        return http.get(`/room/task?task_id=${taskId}`, config);
    },
    createTask(data, config) {
        return http.post('/room/create-task', data, config)
    },
    updateTask(taskId, data, config) {
        return http.patch(`/room/update-task/${taskId}`, data, config)
    },
    deleteTask(taskId, data, config)
    {
        return http.delete(`room/delete-task/${taskId}`, data, config);
    },
    /**
     * Background
     */
    getBackgroundById(backgroundId, config){
        return http.get(`/room/background?background_id=${backgroundId}`, config)
    },
    getBackgrondListByThemeId(themeId, config)
    {
        return http.get(`/room/backgrounds?theme_id=${themeId}`,config);
    },
    /**
     * Motivational Quote
     */
    getRandomMotivationQuote(config)
    {
        return http.get('/room/shuffle-motivational-quote', config);
    },
    /**
     * Label
     */
    getLabelListByRoomId(roomId, config)
    {
        return http.get(`/room/labels?room_id=${roomId}`);
    },
    /**
     * Theme
     */
    getAllThemes(config)
    {
        return http.get(`/room/themes`, config);
    }
}
export default roomApi;