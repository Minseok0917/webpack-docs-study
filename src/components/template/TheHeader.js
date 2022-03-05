import React, { useState } from '@/core/react';

function Moo(){
	const [todos,setTodo] = useState([]);
	const [count,setCount] = useState(0);

	function addItem(){
		setTodo([...todos,{
			name:count
		}]);
		setCount(count+1);
	}

	const items = todos.map( todoItem => <p>{todoItem.name}</p> );

	return (
		<div>
			<p>length : {items.length}</p>
			<button onclick={addItem}>ADD Todo</button>
			{items}
		</div>
	);
}


export default function(){
	return (
		<header className="border py-2">
			<p>Header</p>
			<p></p>
			<Moo />
		</header>
	);
}