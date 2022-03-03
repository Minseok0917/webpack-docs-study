import { getContainer } from '@/core/react';
/*

	가상돔을 사용하기 위한 곳

*/

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


/*

	생성 : oldNode 에는 없고 newNode에는 존재 
	수정 : Text 변경., config 데이터 변경
	삭제 : oldNode에는 있으나 newNode에는 없음

*/

/*
	node 타입 
	- undefined : node 값이 존재하지 않음 ( 추가,삭제여부를 파악할 때 사용)
	- string, number : text 
	- object : element structor

	Node Object 처리 
	- tag : 서로 다를 시 새로운 객체로 바꿔야한다.
	- config : config 값이 다를 경우 기존 속성값을 변환시켜줘야한다.
	- children : 재귀로 위에 로직 반복

*/
function updateElement($container, oldNode, newNode, childIndex=0){
	// console.log($container,oldNode,newNode);
	{ // Create, Delete
		const isCreate = !oldNode && newNode;
		const isDelete = oldNode && !newNode;
		console.log(isCreate,isDelete);
		if( isCreate ){
			return;
		}
		if(isDelete){
			return;
		}
	}
	{ // TextNode
		const oldNodeType = typeof oldNode;
		const newNodeType = typeof newNode;
		const isTextNode = (
			oldNodeType === 'string' || oldNodeType === 'number' &&
			newNodeType === 'string' || newNodeType === 'number' 
		);
		if( isTextNode){
			return;
		}
	}
	{ // Node
		{  // Replace
			const isReplace = oldNode.tag !== newNode.tag;
			if( isReplace ){
				return;
			}
		}
		// updateAttributes();
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

export default render;
