import { getContainer } from '@/core/react';


let $container;
let oldNode;
let debounceTimeout;


function render(node,container){
	if( debounceTimeout ) clearTimeout(debounceTimeout);
	debounceTimeout = setTimeout(()=>{
		if( $container && oldNode ){
			const newNode = getContainer();
			updateElement($container,oldNode,newNode);
			oldNode = newNode;			
			return;
		}
		$container = container;
		oldNode = node;
		$container.appendChild(createElement(node));
	},100);
}

function createElement(node){
	if( typeof node === 'string' || typeof node === 'number' ){ 
		return document.createTextNode(node);
	}else if( Array.isArray(node) ){
		return node.map(createElement);
	}

	const $element = document.createElement(node.tag);
	const children = node.children.map(createElement);
	

	Object.entries(node.config || {}).forEach(([key,value]) => $element[key] = value );
	children.forEach( $childElement => {
		if( Array.isArray($childElement) ){
			return $childElement.forEach( $childElementItem => $element.appendChild($childElementItem) )
		}
		return $element.appendChild($childElement);
	} );
	return $element;
}



function updateElement($container, oldNode, newNode, childIndex=0){
	if( Array.isArray(newNode) ){
		const max = Math.max(
			oldNode.length,
			newNode.length
		);
		for(let i=0; i<max; i++){
			updateElement(
				$container,
				oldNode[i],
				newNode[i],
				childIndex+i
			);
		}
		return;
	}
	{ // Create, Delete
		const isCreate = !oldNode && newNode;
		const isDelete = oldNode && !newNode;
		if( isCreate ){
			return $container.appendChild(createElement(newNode));
		}
		if(isDelete){
			return $container.removeChild($container.childNodes[childIndex]);
		}
	}
	{ // TextNode
		const oldNodeType = typeof oldNode;
		const newNodeType = typeof newNode;
		const isTextNode = ( oldNodeType === 'string'  && newNodeType === 'string' );
		if( isTextNode ){
			if( oldNode === newNode ) return;
			$container.textContent = newNode;
			return;
		}
	}
	{ // Node
		{  // Replace
			const isReplace = oldNode.tag !== newNode.tag;
			if( isReplace ){
				return $container.replaceChild(createElement(newNode),$container.childNodes[childIndex]);
			}
		}
		updateAttributes($container,oldNode,newNode,childIndex);
		{ // Recursion
			const max = Math.max(
				oldNode.children.length,
				newNode.children.length
			);
			for(let idx=0; idx<max; idx++){
				updateElement(
					$container.childNodes[childIndex],
					oldNode.children[idx],
					newNode.children[idx],
					idx
				);
			}
		}
	}
}
function updateAttributes($container, oldNode, newNode,childIndex){
	Object.entries(oldNode.config || {}).forEach( ([key,value]) => { // 이전 속성 값 초기화
		$container.childNodes[childIndex][key] = '';
	});		
	Object.entries(newNode.config || {}).forEach( ([key,value]) => {
		$container.childNodes[childIndex][key] = value;
	});
}

export default render;
