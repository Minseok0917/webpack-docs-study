import React from '@/core/react';

export function Link(props,children){
	function clickHandle(e){
		e.preventDefault();
		history.pushState({},'header',this.href);
	}

	return (
		<a href={props.src} onclick={clickHandle}>{children}</a>
	);
}
