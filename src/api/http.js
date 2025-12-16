import axios from 'axios';

const instance = axios.create({
	baseURL: '/randomapi2/',
	timeout: 10000
});

export function addErrorHandler(fn) {
	instance.interceptors.response.use(r => r, fn)
}
export default instance;