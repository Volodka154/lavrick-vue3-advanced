import http from '@/api/http';

export async function all(){
	//let { data } = await http.get('products/all.php');
	//return data;
	const data = [
		{
			id: 0,
			title: "Смартфон 1",
			price: 5000,
			rest: 5,
		}, 
		{
			id: 1,
			title: "Смартфон 2",
			price: 5000,
			rest: 5,
		}, 
		{
			id: 2,
			title: "Смартфон 3",
			price: 5000,
			rest: 5,
		}		
	];

	return new Promise(resolve => {
		setTimeout(() => resolve(data), 1000)
	})
}