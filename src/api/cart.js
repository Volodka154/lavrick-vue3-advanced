import http from '@/api/http';

const ERR_PROBABILITY = 0.3;

export async function load(token){
	/*
	let { data } = await http.get('cart/load.php', { params: { token }});
	return data;
	*/
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

export async function add(token, id){
	/*
	let { data } = await http.get(`cart/add.php?token=${token}&id=${id}`, {
		errorAlert: 'при добавлении товара'
	});
	return data;
	*/
	const rand = Math.random();
	const data = {
		cart: [{id: 1, cnt: 1},{id: 2, cnt: 2}],
		token: 1,
		needUpdate: false
	};
	const err = {
		errorAlert: 'при добавлении товара'
	}
	return new Promise((resolve, reject) => {
		setTimeout(() => { 
			rand > ERR_PROBABILITY ? resolve(true) : reject(false);
		}, 500);
	})
}

export async function remove(token, id){
	/*
	let { data } = await http.get(`cart/remove.php?token=${token}&id=${id}`, {
		errorAlert: 'при удалении товара'
	});
	return data;
	*/
	const rand = Math.random();
	const data = {
		cart: [{id: 1, cnt: 1},{id: 2, cnt: 2}],
		token: 1,
		needUpdate: false
	};
	const err = {
		errorAlert: 'при удалении товара'
	}
	return new Promise((resolve, reject) => {
		setTimeout(() => { 
			rand > ERR_PROBABILITY ? resolve(true) : reject(false);
		}, 500);
	})
}

export async function change(token, id, cnt){
	/*
	let { data } = await http.get(`cart/change.php?token=${token}&id=${id}&cnt=${cnt}`, {
		errorAlert: 'при изменении количества товара'
	});
	return data;
	*/
	const rand = Math.random();
	const data = {
		cart: [{id: 1, cnt: 1},{id: 2, cnt: 2}],
		token: 1,
		needUpdate: false
	};
	const err = {
		errorAlert: 'при изменении количества товара'
	}
	return new Promise((resolve, reject) => {
		setTimeout(() => { 
			rand > ERR_PROBABILITY ? resolve(true) : reject(false);
		}, 500);
	})
}