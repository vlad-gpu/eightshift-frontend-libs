import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { SelectControl, Icon, ToggleControl } from '@wordpress/components';
import manifest from './../manifest.json';

const { attributes: defaults, options, title } = manifest;

export const HeadingOptions = (attributes) => {
	const {
		setAttributes,
		label = title,
		headingShowControls = true,

		headingUse = defaults.headingUse.default,

		headingColor = defaults.headingColor.default,
		headingSize = defaults.headingSize.default,

		showHeadingColor = true,
		showHeadingSize = true,
	} = attributes;

	if (!headingShowControls) {
		return null;
	}

	return (
		<Fragment>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
				checked={headingUse}
				onChange={(value) => setAttributes({ headingUse: value })}
			/>

			{headingUse &&
				<Fragment>
					{showHeadingColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-boilerplate')}
								</Fragment>
							}
							value={headingColor}
							onChange={(value) => setAttributes({ headingColor: value })}
						/>
					}

					{showHeadingSize &&
						<SelectControl
							label={__('Size', 'eightshift-boilerplate')}
							value={headingSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ headingSize: value })}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
