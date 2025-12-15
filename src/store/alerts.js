export default {
	namespaced: true,
	state: {
		messages: [],
		autoIncrement: 0
	},
	getters: {
		all: state => state.messages
	},
	mutations: {
		add: (state, { text, timeout }) => state.messages.push({ id: ++state.autoIncrement, text, timeout }),
		remove: (state, id) => {
			for (let i = 0; i < state.messages.length; i++) {
				if (state.messages[i].id === id) {
					state.messages.splice(i, 1);
					break;
				}
			}
		}
	},
	actions: {
		add({ commit, state }, payload) {
			commit('add', payload);
			const id = state.autoIncrement;
			if ("timeout" in payload) {
				setTimeout(() => {
					commit('remove', id);
				}, payload.timeout);
			}
		},
		remove({ commit }, { id }) {
			commit('remove', id);
		}
	}
}