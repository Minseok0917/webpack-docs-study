const h = (tag,props,children) => {
	return {
		tag,
		props,
		children
	}
}


const React = {
	createElement:(type,props,...children)=>{
		// console.log(document.createElement,type);
		switch(typeof type){
			case 'function':
				console.log(type,props,children);
				return type(props);
			case 'string':
				console.log(type,props,children);
				return h(type,props,children);
		}
		// console.log('type : ',type);
		// console.log('props : ',props);
		// console.log('children : ',children);
		
		// const element = document.createElement(type);
	}
}

function line(props){
	return (
		<p>{props.value}</p>
	);
}

function Welcome(props){
	const clickHandle = function(){
		console.log('click')
	};
	const style = {
		margin:0
	};
	return (
		<div className="add" style={style} onclick={clickHandle}>
			TEXT
			<h1>{props.name}</h1>
			<line value="1" />
			<line value="2" />
			<line value="3" />
		</div>
	);
}


export default function(){
	return (
		<Welcome name="Minseok" />
	);
};



/*
 Welcom = Function(props)
 - div 
 	- 



*/