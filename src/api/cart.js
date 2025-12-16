import http from '@/api/http';
import { hasEnternet, interceptorsImitationSuccess, interceptorsImitationError } from '@/api/enternet-access';

const ERR_PROBABILITY = 0.3;

export async function load(token){
	const errorAlert = {
		text: 'при загрузке страницы',
		closable: true,
		isCriticalError: true
	};

	if (hasEnternet) {
		let { data } = await http.get('cart/load.php', { 
			params: { token },
			errorAlert
		});
		return data;
	}

	const data = {
		cart: [{id: 1, cnt: 4},{id: 2, cnt: 2}],
		token: "token: 5ty6ty#r3R",
		needUpdate: false
	};
	return simulateApiResponse(errorAlert, data, data, 1000);
}

export async function add(token, id){
	const errorAlert = {
		text: 'при добавлении товара',
		timeout: 5000
	};

	if (hasEnternet) {
		let { data } = await http.get(`cart/add.php?token=${token}&id=${id}`, {
			errorAlert
		});
		return data;
	}

	return simulateApiResponse(errorAlert, true, false, 500);
}

export async function remove(token, id){
	const errorAlert = {
		text: 'при удалении товара',
		timeout: 5000
	};

	if (hasEnternet) {
		let { data } = await http.get(`cart/remove.php?token=${token}&id=${id}`, {
			errorAlert
		});
		return data;
	}

	return simulateApiResponse(errorAlert, true, false, 500);
}

export async function change(token, id, cnt){
	const errorAlert = {
		text: 'при изменении количества товара',
		timeout: 5000
	};

	if (hasEnternet) {
		let { data } = await http.get(`cart/change.php?token=${token}&id=${id}&cnt=${cnt}`, {
			errorAlert
		});
		return data;
	}

	return simulateApiResponse(errorAlert, true, false, 500);
}

async function simulateApiResponse(errorAlert, dataSuccess, dataError, timeout) {
	const rand = Math.random();
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (rand > ERR_PROBABILITY) {
				let { data: dataFromInterceptors } = interceptorsImitationSuccess({ 
					config: { errorAlert },
					data: dataSuccess
				});
				resolve(dataFromInterceptors);
			} else {
				let { data: dataFromInterceptors } = interceptorsImitationError({ 
					response: {
						config: { errorAlert },
						data: dataError
					}
				});
				resolve(dataFromInterceptors);
			}
		}, timeout);
	})
}