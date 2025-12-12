export default {
	namespaced: true,
	state: {
		messages: []
	},
	getters: {
		all: state => state.messages
	},
	mutations: {
		add: (state, { id, text, timeout }) => state.messages.push({ id, text, timeout }),
		remove: (state, { id }) => {
			for (let i = 0; i < state.messages.length; i++) {

				let { id: idM }  = state.messages[i];

				if (id === idM) {
					state.messages.splice(i, 1);
					break;
				}
			}
		},
	},
	actions: {
		add({ commit }, payload) {
			if (!('id' in payload)) {
				payload.id = Math.random();
			}
			commit('add', payload);
			if ("timeout" in payload) {
				setTimeout(() => {
					commit('remove', payload);
				}, payload.timeout);
			}
		},
		remove({ commit }, payload) {
			commit('remove', payload)
		}
	}
}