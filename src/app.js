import React from '@/core/react';
import {
	TheHeader,
	TheFooter,
} from '@/components/template';



function App(){
	let a = 0;
	setInterval(function(){
		a++;
	},1000);
	return (
		<div id="App">
			{ a }
			<TheHeader />
			<TheFooter />
		</div>
	);
}



export default App;