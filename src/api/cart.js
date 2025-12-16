import http from '@/api/http';

const hasEnternet = false;
const ERR_PROBABILITY = 0.3;

export async function load(token){
	if (hasEnternet) {
		let { data } = await http.get('cart/load.php', { 
			params: { token },
			errorAlert: {
				text: 'при загрузке страницы',
				closable: true
			}
		});
		return data;
	} else {
		const rand = Math.random();
		const data = {
			cart: [{id: 1, cnt: 1},{id: 2, cnt: 2}],
			token: "token: 5ty6ty#r3R",
			needUpdate: false
		};
		return new Promise((resolve, reject) => {
			setTimeout(() => { 
				rand > ERR_PROBABILITY ? resolve(data) : reject(data);
			}, 1000);
		})
	}
}

export async function add(token, id){
	if (hasEnternet) {
		let { data } = await http.get(`cart/add.php?token=${token}&id=${id}`, {
			errorAlert: {
				text: 'при добавлении товара',
				timeout: 5000
			}
		});
		return data;
	} else {
		const rand = Math.random();
		return new Promise((resolve, reject) => {
			setTimeout(() => { 
				rand > ERR_PROBABILITY ? resolve(true) : reject(false);
			}, 500);
		})
	}
}

export async function remove(token, id){
	if (hasEnternet) {
		let { data } = await http.get(`cart/remove.php?token=${token}&id=${id}`, {
			errorAlert: {
				text: 'при удалении товара',
				timeout: 5000
			}
		});
		return data;
	} else {
		const rand = Math.random();
		return new Promise((resolve, reject) => {
			setTimeout(() => { 
				rand > ERR_PROBABILITY ? resolve(true) : reject(false);
			}, 500);
		})
	}
}

export async function change(token, id, cnt){
	if (hasEnternet) {
		let { data } = await http.get(`cart/change.php?token=${token}&id=${id}&cnt=${cnt}`, {
			errorAlert: {
				text: 'при изменении количества товара',
				timeout: 5000
			}
		});
		return data;
	} else {
		const rand = Math.random();
		return new Promise((resolve, reject) => {
			setTimeout(() => { 
				rand > ERR_PROBABILITY ? resolve(true) : reject(false);
			}, 500);
		})
	}
}