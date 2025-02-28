import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { JumbotronToolbar as JumbotronToolbarComponent } from '../../../components/jumbotron/components/jumbotron-toolbar';
import manifest from './../manifest.json';

export const JumbotronToolbar = ({ attributes, setAttributes }) => {
	const {
		blockName,
	} = manifest;

	return (
		<JumbotronToolbarComponent
			{...props(attributes, blockName, '', true)}
			setAttributes={setAttributes}
		/>
	);
};
