import React from '@/core/react';
import {
	TheHeader,
	TheFooter,
} from '@/components/template';

import { Link } from '@/plugins/router';


function App(){
	
	return (
		<div id="App">
			<Link src="/header">Header</Link>
			<TheHeader />
			<TheFooter />
		</div>
	);
}



export default App;