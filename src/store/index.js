import { createStore } from 'vuex';

import cart from './cart';
import products from './products';
import user from './user';
import alerts from './alerts';
import { addResponseHandler } from '@/api/http';

const store = createStore({
	modules: {
		cart,
		products,
		user,
		alerts
	},
	strict: process.env.NODE_ENV !== 'production'
});

addResponseHandler(
	function(response) {
		if ('errorAlert' in response.config) {
			response.data = { res: true, data: response.data }
		}
		return response;
	},
	function(error) {

		let config = error.response.config;

		if ('errorAlert' in config) {
			store.dispatch('alerts/add', {
				text: 'Ошибка ответа от сервера ' + config.errorAlert.text,
				timeout: config.errorAlert.timeout,
				closable: config.errorAlert.closable
			});
			return { data: { res: false, data: null } };
		}
		// В случае, если нет интернета, то errorAlert не установится и прокинет ошибку дальше
		// Обрабатывать ее будет уже блок catch
		return Promise.reject(error);
	}
);

export default store;