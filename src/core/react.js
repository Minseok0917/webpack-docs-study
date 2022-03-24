import render from '@/core/dom';


function h(tag,config,children){
	const isTextNode = children.every( text =>  ['string','number'].includes(typeof text));
	if( isTextNode ){
		children = [children.join('')];
	}
	return {
		tag,
		config,
		children
	}
}


export let getContainer;
const React = Object.freeze({
	createElement : function(type,config,...children){		
		getContainer ||= () => type(config);		
		if( typeof type === 'function'){
			return type(config,children);
		}
		return h(type,config,children);
	}
});

const states = [];
let currentStateCount = 0;

function useState(initState){
	const idx = currentStateCount;
	if( states.length === currentStateCount ){
		states[idx] = initState;
	}
	const state = states[idx];
	const setState = function(newState){
		const currentState = states[idx];
		if( currentState === newState ) return;
		else if(JSON.stringify(currentState) === JSON.stringify(newState)) return;
		states[idx] = newState;
		update();
	}
	currentStateCount++;
	return [state, setState];
}

function update(){
	currentStateCount = 0;
	render();
}

export default React;
export {
	useState
};