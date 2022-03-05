import render from '@/core/dom';
/*

	JSX 구조가 트랜스파일링 되고 함수형태로 바뀐다.
	트랜스파일링 되면  "React.createElement(type,config,...children)" 이런 형식으로 컴파일 된다.

	= type 의 타입은 Function | String 일 수도 있다.
	Fucntion 인 경우는 컴포넌트(JSX 문법으로 만든 함수)를 사용했을 경우 함수를 실행해야 return 값을 받을수 있다.
	String 인 경우는 Element 를 사용 했을 경우 Tag 이름으로 나온다.

	= config 의 타입은 Object 이다.
	속성(attribute)값과 props 데이터를 가지고 있다.

	= children 의 타입은 Object 이다.
	React.createELement 3번째 인자부터는 자식요소의 갯수만큼 늘어난다.
	아래 코드와 같은 경우는 자식요소가 3개 이므로 3, 4, 5 번째의 인자의 값으로 들어가게 된다.
	인자가 자식요소에 비례해 많아지기 때문에 js spread 연산자를 사용해서 배열로 묶어주는게 좋다.
	``` html
	<div>
		A
		<p>B</p>
		<p>C</p>
	</div>
	```

	가상돔을 사용하기 위해 최상위부터 하위까지 Object 구조 형태의 데이터를 만들어준다.
*/ 

function h(tag,config,children){
	const isTextNode = children.every( text =>  ['string','number'].includes(typeof text));
	// const isArray = children.some(  )
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
			return type(config);
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