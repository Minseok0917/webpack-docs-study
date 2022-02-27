/*

	가상돔을 사용하기 위한 곳

*/

let $app;
let oldNode;

function render(newNode,element){
	$app = element;
	oldNode = newNode();
	
	$app.appendChild(createElement(oldNode));
}

function createElement(node){
	if( typeof node === 'string'){
		return document.createTextNode(node);
	}

	const $element = document.createElement(node.tag);
	const children = node.children.map(createElement);

	Object.entries(node.config || {})
		.forEach(([attr,value]) => {
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

export default render;
