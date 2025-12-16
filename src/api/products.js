import http from '@/api/http';
import { hasEnternet } from '@/api/enternet-access';

export async function all(){
	if (hasEnternet) {
		let { data } = await http.get('products/all.php');
		return data;
	}
	const data = [
		
		{
			id: 0,
			title: "Телефон 1",
			price: 3000,
			rest: 5,
		}, 
		{
			id: 1,
			title: "Телефон 2",
			price: 4000,
			rest: 5,
		}, 
		{
			id: 2,
			title: "Телефон 3",
			price: 5000,
			rest: 5,
		}		
	];

	return new Promise(resolve => {
		setTimeout(() => resolve(data), 1000)
	})
}