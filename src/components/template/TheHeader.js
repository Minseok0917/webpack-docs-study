import React, { useState } from '@/core/react';

function Moo(){
	const [count,setCount] = useState(0);
	function clickHandle(){
		setCount(count+1);
		setCount(count+2);
		setCount(count+3);
		setCount(count+4);
	}
	return (
		<div>
			<button onclick={clickHandle}>ADD COUNT</button>
			<p>{count}</p>
		</div>
	);
}


export default function(){

	// console.log(countComponent);

	return (
		<header className="border py-2">
			<p>Header</p>
			<Moo />
		</header>
	);
}