import http from "../utils/http";

const roomApi = {
    /**
     * Task Manager
     */
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
    }
}
export default roomApi;