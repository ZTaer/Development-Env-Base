import React from 'react';
import HelloWordOther from './hello-word-other.component';
import { MainProps } from './index.model';
import './index.scss';

const HelloWord = (props: MainProps) => {
	const { value = 'HelloWord' } = props;

	return (
		<div className="hello-word">
			<h1>{value}</h1>
			<HelloWordOther />
		</div>
	);
};

export default HelloWord;
