import * as cartApi from '@/api/cart.js';

export default {
	async load({ commit, dispatch }){
		let savedToken = localStorage.getItem('cartToken');

		let token, needUpdate, cart = null;

		try {
			let res = await cartApi.load(savedToken);
			if (res) {
				({ token, needUpdate, cart } = res);
	
				if(needUpdate){
					localStorage.setItem('cartToken', token);
				}
					
				commit('set', { cart, token });
			}
		} catch(e) {
			console.error("Ошибка загрузки корзины", e);
			dispatch("alerts/add", { 
				text: "Ошибка загрузки корзины",
				closable: true
			}, { root: true });
		}
	},
	async add({ state, getters, commit, dispatch }, { id }){
		if(getters.canAdd(id)){
			commit('startProccess', id);
			try {
				let res = await cartApi.add(state.token, id)

				console.log("res", res);
				if(res === true){
					commit('add', { id });		
				}	
			} catch(e) {
				console.error("Ошибка добавления товара", e);
				dispatch("alerts/add", {
					text: "Ошибка добавления товара", 
					timeout: 5000, 
				}, { root: true });
			} finally {
				commit('endProccess', id);
			}
		}
	},
	async remove({ state, getters, commit, dispatch }, { id }){
		if(getters.canUpdate(id)){
			commit('startProccess', id);
			try {
				let res = await cartApi.remove(state.token, id)

				if(res === true){
					commit('remove', { ind: getters.index(id) });
				}
			} catch(e) {
				console.error("Ошибка удаления товара", e);
				dispatch("alerts/add", { 
					text: "Ошибка удаления товара", 
					timeout: 5000, 
				}, { root: true });
			} finally {
				commit('endProccess', id);
			}
		}
	},
	async setCnt({ state, getters, commit, dispatch }, { id, cnt }){
		if(getters.canUpdate(id)){
			commit('startProccess', id);
			try {
				let validCnt = Math.max(1, cnt);
				let res = await cartApi.change(state.token, id, validCnt)
				
				if(res === true){
					commit('setCnt', { ind: getters.index(id), cnt: validCnt });
				}
			} catch(e) {
				console.error("Ошибка изменения количества товара", e);
				dispatch("alerts/add", { 
					text: "Ошибка изменения количества товара", 
					timeout: 5000, 
				}, { root: true });
			} finally {
				commit('endProccess', id);
			}
		}
	}
}