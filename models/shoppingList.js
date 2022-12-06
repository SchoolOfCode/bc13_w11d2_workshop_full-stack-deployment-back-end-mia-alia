import { pool } from '../db/index.js';

export async function getShoppingList() {
	const data = await pool.query('SELECT * FROM shopping;');
	console.log('The shopping list is', data.rows);
	return data.rows;
}

export async function postListItem(listItem) {
	const { item, completed } = listItem;
	const data = await pool.query(
		`INSERT INTO shopping (
      item,
      completed
    ) VALUES ($1,$2) RETURNING *;`,
		[item, completed]
	);
	return data.rows[0];
}

//sending PATCH request to modify or toggle 'completed' to be true or false
export async function patchListItem(id, completed) {
	const data = await pool.query(
		`UPDATE shopping 
		SET completed = $1
		where id = $2
    	RETURNING *;`,
		[completed, id]
	);
	return data.rows[0];
}
