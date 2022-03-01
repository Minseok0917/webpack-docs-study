import { getContainer } from '@/core/react';
/*

	가상돔을 사용하기 위한 곳

*/

let $container;
let oldNode;
let debounceTimeout;


function debounce(callback){
	if( debounceTimeout ) clearTimeout(debounceTimeout);
	debounceTimeout = setTimeout(callback,100);
}

function render(node,container){
	if( debounceTimeout ) clearTimeout(debounceTimeout);
	debounceTimeout = setTimeout(()=>{
		if( $container && oldNode ){
			oldNode = getContainer();
			$container.appendChild(createElement(oldNode));
			return;
		}
		$container = container;
		oldNode = node;
		$container.appendChild(createElement(node));
	},100);
}

function createElement(node){
	// node type 이 string | number 일 경우 Text 이다.
	if( typeof node === 'string' || typeof node === 'number' ){ 
		return document.createTextNode(node);
	}
	const $element = document.createElement(node.tag);
	const children = node.children.map(createElement);

	/*
		node.config 값이 undefined 일 수도 있다. 
		undefined 일 경우 값이 {} 가 될 수 있게 설정했고
		element 객체에 값을 추가해 준다.
	*/

	Object.entries(node.config || {}).forEach(([key,value]) => $element[key] = value );
	children.forEach( $childElement => $element.appendChild($childElement) );
	return $element;
}

export default render;
