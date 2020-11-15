import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import manifest from '../manifest.json';

const { options } = manifest;

export const LinkToolbar = (attributes) => {
	const {
		setAttributes,
		linkShowControls = true,

		linkUse,
		linkAlign,

		showLinkAlign = true,
	} = attributes;

	if (!linkShowControls) {
		return null;
	}

	return (
		<Fragment>
			{linkUse &&
				<Fragment>
					{showLinkAlign &&
						<AlignmentToolbar
							value={linkAlign}
							options={options.aligns}
							onChange={(value) => setAttributes({ linkAlign: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};