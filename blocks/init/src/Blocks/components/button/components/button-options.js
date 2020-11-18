import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { URLInput } from '@wordpress/block-editor';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { getPaletteColors, icons } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options, title } = manifest;

export const buttonColors = () => {
	const colors = getPaletteColors();

	return [
		colors.primary,
		colors.black,
	];
};

export const ButtonOptions = (attributes) => {
	const {
		setAttributes,
		label = title,
		buttonShowControls = true,

		buttonUse = checkAttr('buttonUse', attributes, manifest),

		buttonUrl = checkAttr('buttonUrl', attributes, manifest),
		buttonColor = checkAttr('buttonColor', attributes, manifest),
		buttonSize = checkAttr('buttonSize', attributes, manifest),
		buttonWidth = checkAttr('buttonWidth', attributes, manifest),
		buttonIsAnchor = checkAttr('buttonIsAnchor', attributes, manifest),
		buttonIsNewTab = checkAttr('buttonIsNewTab', attributes, manifest),
		buttonId = checkAttr('buttonId', attributes, manifest),

		showButtonUrl = true,
		showButtonColor = true,
		showButtonSize = true,
		showButtonWidth = true,
		showButtonIsAnchor = true,
		showButtonIsNewTab = true,
		showButtonId = true,
	} = attributes;

	if (!buttonShowControls) {
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
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={buttonUse}
				onChange={(value) => setAttributes({ buttonUse: value })}
			/>

			{buttonUse &&
				<Fragment>

					{showButtonUrl &&
						<URLInput
							label={__('Url', 'eightshift-frontend-libs')}
							value={buttonUrl}
							autoFocus={false}
							onChange={(value) => setAttributes({ buttonUrl: value })}
						/>
					}

					{showButtonColor &&
						<ColorPaletteCustom
							label={
								<Fragment>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}

								</Fragment>
							}
							value={buttonColor}
							colors={buttonColors()}
							onChange={(value) => setAttributes({ buttonColor: value })}
						/>
					}

					{showButtonSize &&
						<SelectControl
							label={__('Size', 'eightshift-frontend-libs')}
							value={buttonSize}
							options={options.sizes}
							onChange={(value) => setAttributes({ buttonSize: value })}
						/>
					}

					{showButtonWidth &&
						<SelectControl
							label={__('Width', 'eightshift-frontend-libs')}
							value={buttonWidth}
							options={options.widths}
							onChange={(value) => setAttributes({ buttonWidth: value })}
						/>
					}

					{showButtonIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'eightshift-frontend-libs')}
							checked={buttonIsAnchor}
							onChange={(value) => setAttributes({ buttonIsAnchor: value })}
							help={__('Using anchor option will add JavaScript selector to the button. You must provide anchor destination inside Button Url field. Example: #super-block.', 'eightshift-frontend-libs')}
						/>
					}

					{showButtonIsNewTab &&
						<ToggleControl
							label={__('New Tab', 'eightshift-frontend-libs')}
							checked={buttonIsNewTab}
							onChange={(value) => setAttributes({ buttonIsNewTab: value })}
						/>
					}

					{showButtonId &&
						<TextControl
							label={__('ID', 'eightshift-frontend-libs')}
							value={buttonId}
							onChange={(value) => setAttributes({ buttonId: value })}
						/>
					}
				</Fragment>
			}

		</Fragment>
	);
};
