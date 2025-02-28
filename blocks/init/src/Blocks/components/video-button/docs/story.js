import React from 'react';
import readme from './readme.mdx';
import manifest from '../manifest.json';
import { VideoButtonEditor } from '../components/video-button-editor';

export default {
	title: `Components/${manifest.title}`,
	parameters: {
		docs: { 
			page: readme
		}
	},
};

const props = manifest.example.attributes;

export const editor = () => (
	<VideoButtonEditor {...props} />
);
