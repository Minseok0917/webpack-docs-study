import React, { useState } from '@/core/react';

export default function(){
	const [count,setCount] = useState(0);
	const clickHandle = function(){
		setCount(count+1);
	}

	return (
		<header className="border py-2" onclick={clickHandle}>
			{
				count
			}
		</header>
	);
}