/*

	가상돔을 사용하기 위한 곳

*/

let $app;
let oldNode;

function render(newNode,element){
	$app = element;
	oldNode = newNode();

}


export default render;
