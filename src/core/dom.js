import { getContainer } from '@/core/react';
/*

	가상돔을 사용하기 위한 곳

*/

let $container;
let oldNode;

function render(node,container){
	if( $container && oldNode ){
		oldNode = getContainer();
		return;
	}
	$container = container;
	oldNode = node;
}
export default render;

/*
function createElement(node){
	if( typeof node === 'string' || typeof node === 'number' ){
		return document.createTextNode(node);
	}

	const $element = document.createElement(node.tag);
	const children = node.children.map(createElement);


	Object.entries(node.config || {})
		.forEach(([attr,value]) => {
			const isHandle = attr.includes('on');
			if( isHandle ){
				return $element[attr] = value;
			}
			switch(attr){
				case 'className':
					$element.setAttribute('class',value);
					break;
				default :
					$element.setAttribute(attr,value);
			}
		});

	children.forEach( $childElement => $element.appendChild($childElement) );

	return $element;
}

export function updateElement(){
	


	render(renderNode,$root);
}
*/
