import React, { useState } from '@/core/react';

function Moo(){
	const [count,setCount] = useState(0);
	function clickHandle(){
		setCount(count+1);
	}
	const title = count%2 === 0 ? <h1>짝수</h1> : <h2>홀수</h2>

	return (
		<div>
			<button onclick={clickHandle}>ADD COUNT</button>
			<p>{count}</p>
			{title}
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