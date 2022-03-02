import React, { useState } from '@/core/react';

function Moo(){
	const [count,setCount] = useState(0);
	function clickHandle(){
		setCount(count+1);
	}
	return (
		<div>
			<button onclick={clickHandle}>ADD COUNT</button>
			<p>{count}</p>
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