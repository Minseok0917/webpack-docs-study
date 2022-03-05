import React, { useState } from '@/core/react';

function Moo(){
	const [todos,setTodo] = useState([]);
	const [count,setCount] = useState(0);
	console.log(todos);
	function addItem(){
		setTodo([...todos,{
			name:count
		}]);
		setCount(count+1);
	}

	function removeItem(todo){
		console.log(todos,todo,
			todos.filter( _todo => todo !== _todo )
		);
		setTodo([...todos.filter( _todo => todo !== _todo )])
	}

	const items = todos.map( todoItem =>(
		<div>
			<span>{todoItem.name}</span>
			<button onclick={()=>removeItem(todoItem)}>X</button>
		</div>
	) );

	return (
		<div>
			<p>length : {items.length}</p>
			<button onclick={addItem}>ADD Todo</button>
			<button>이배ㅔㄴ트 없음</button>
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