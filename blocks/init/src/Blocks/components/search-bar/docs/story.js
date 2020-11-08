import React from 'react'; // eslint-disable-line no-unused-vars
import readme from './readme.md';
import manifest from './../manifest.json';
import { SearchBarEditor } from '../components/search-bar-editor';

export default {
	title: `Components|${manifest.title}`,
	parameters: {
		notes: readme,
	},
};

const props = manifest.example.attributes;

export const editor = () => (
	<SearchBarEditor {...props} />
);
