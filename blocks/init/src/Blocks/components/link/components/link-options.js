import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { SelectControl, TextControl, Icon, ToggleControl } from '@wordpress/components';
import { icons, getOptionColors, getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const LinkOptions = (attributes) => {
	const { title } = manifest;

	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		options = options,
		linkShowControls = true,

		linkUse = checkAttr('linkUse', attributes, manifest, componentName),

		linkColor = checkAttr('linkColor', attributes, manifest, componentName),
		linkSize = checkAttr('linkSize', attributes, manifest, componentName),
		linkIsAnchor = checkAttr('linkIsAnchor', attributes, manifest, componentName),
		linkId = checkAttr('linkId', attributes, manifest, componentName),

		showLinkColor = true,
		showLinkSize = true,
		showLinkIsAnchor = true,
		showLinkId = true,

	} = attributes;

	if (!linkShowControls) {
		return null;
	}

	return (
		<>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={linkUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{linkUse &&
				<>
					{showLinkColor &&
						<ColorPaletteCustom
							label={
								<>
									<Icon icon={icons.color} />
									{__('Color', 'eightshift-frontend-libs')}
								</>
							}
							value={linkColor}
							colors={getOptionColors(getOptions(manifest, componentName, 'color', options))}
							onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
						/>
					}

					{showLinkSize &&
						<SelectControl
							label={
								<>
									<Icon icon={icons.textSize} />
									{__('Text size', 'eightshift-frontend-libs')}
								</>
							}
							value={linkSize}
							options={getOptions(manifest, componentName, 'size', options)}
							onChange={(value) => setAttributes({ [`${componentName}Size`]: value })}
						/>
					}

					{showLinkIsAnchor &&
						<ToggleControl
							label={__('Anchor', 'eightshift-frontend-libs')}
							checked={linkIsAnchor}
							onChange={(value) => setAttributes({ [`${componentName}IsAnchor`]: value })}
							help={__('Using anchor option will add JavaScript selector to the link. You must provide anchor destination inside link Url field. Example: #super-block.', 'eightshift-frontend-libs')}
						/>
					}

					{showLinkId &&
						<TextControl
							label={
								<>
									<Icon icon={icons.id} />
									{__('ID', 'eightshift-frontend-libs')}
								</>
							}
							value={linkId}
							onChange={(value) => setAttributes({ [`${componentName}Id`]: value })}
						/>
					}
				</>
			}

		</>
	);
};
