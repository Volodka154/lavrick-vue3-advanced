import store from '@/store';

export const hasEnternet = true;

export const interceptorsImitationSuccess = function(response) {
    if ('errorAlert' in response.config) {
        response.data = { res: true, data: response.data }
    }
    return response;
}
export const interceptorsImitationError = function(error) {
    let config = error.response.config;
    console.log(config)

    if ('errorAlert' in config) {
        store.dispatch('alerts/add', {
            text: 'Ошибка ответа от сервера ' + config.errorAlert.text,
            timeout: config.errorAlert.timeout,
            closable: config.errorAlert.closable
        });
        return { data: { res: false, data: null } };
    }
    // В случае, если это необрабатываемая ошибка, то она прокидывается дальше
    // Обрабатывать ее будет уже блок catch
    return Promise.reject(error);
}