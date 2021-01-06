import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const SearchBarEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		searchBarUse = checkAttr('searchBarUse', attributes, manifest, componentName),

		searchBarMethod = checkAttr('searchBarMethod', attributes, manifest, componentName),
		searchBarPostType = checkAttr('searchBarPostType', attributes, manifest, componentName),
		searchBarAction = checkAttr('searchBarAction', attributes, manifest, componentName),
		searchBarPlaceholder = checkAttr('searchBarPlaceholder', attributes, manifest, componentName),
	} = attributes;

	const searchClass = classnames(
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	);

	return (
		<Fragment>
			{searchBarUse &&
				<form
					role="search"
					method={searchBarMethod}
					className={searchClass}
					action={searchBarAction}
				>
					<input
						type="text"
						name="s"
						className={`${componentClass}__input`}
						placeholder={searchBarPlaceholder}
					/>
					<input type="hidden" name="post_type" value={searchBarPostType} />
				</form>
			}
		</Fragment>
	);
};