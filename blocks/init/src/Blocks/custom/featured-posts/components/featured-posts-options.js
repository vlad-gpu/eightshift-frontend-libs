import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import _ from 'lodash';
import { useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { PanelBody, SelectControl, RangeControl, ToggleControl, Icon, Spinner } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import manifest from '../manifest.json';
import { CustomSelect } from '@eightshift/frontend-libs/scripts/components';

const { attributes: reset, options } = manifest;

export const FeaturedPostsOptions = ({ attributes, setAttributes }) => {
	const {
		query: queryProps,
		query: {
			postType,
			taxonomy,
			terms,
			posts,
		},
		showItems,
		itemsPerLine,
		excludeCurrentPost,
	} = attributes;

	// Fetch all post types.
	// Filter allowed post types defined in the block manifest.
	const postTypeOptions = useSelect((select) => {
		const { getPostTypes } = select('core');

		const items = getPostTypes() ?? [];

		const data = items.filter((element) => manifest.allowed.postTypes.find((item) => element.slug === item)) ?? [];

		return data.map((item) => {
			return {
				label: item.labels.name,
				value: item.slug,
				taxonomies: item.taxonomies,
			};
		}) ?? [];
	});

	// Fetch all taxonomies based on the postType selected.
	// Filter allowed taxonomies defined in the block manifest.
	const taxonomyOptions = useSelect((select) => {
		const { getTaxonomy } = select('core');

		const availableTaxonomies = postTypeOptions.filter((element) => element.value === postType) ?? [];

		const taxonomiesList = availableTaxonomies.length ? availableTaxonomies[0].taxonomies : [];

		const allowedTaxonomies = taxonomiesList.filter((element) => {
			return manifest.allowed.taxonomies.find((item) => {
				return element === item;
			});
		}) ?? [];

		const data = allowedTaxonomies.map((element) => getTaxonomy(element)) ?? [];

		
		if (!data.length) {
			return [];
		}

		return [
			{
				label: __('No Filter used', 'eightshift-frontend-libs'),
				value: '',
			},
			...data.map((item) => {
				return {
					label: item.labels.name,
					value: item.slug,
				};
			}),
		];
	});

	// Fetch all taxonomy terms based on the selected taxonomy and postType.
	const termsOptions = useSelect((select) => {
		const { getEntityRecords } = select('core');

		const termsList = getEntityRecords(
			'taxonomy',
			taxonomy,
			{
				per_page: -1,
			}
		) ?? [];

		return [
			{
				label: __('No Filter used', 'eightshift-frontend-libs'),
				value: '',
			},
			...termsList.map((item) => {
				return {
					label: item.name,
					value: item.id,
				};
			}),
		];
	});

	// Fetch all posts based on the selected postType.
	const postsOptions = useSelect((select) => {
		const { getEntityRecords } = select('core');

		const termsList = getEntityRecords(
			'postType',
			postType,
			{
				per_page: -1,
			}
		) ?? [];

		return [
			{
				label: __('No Filter used', 'eightshift-frontend-libs'),
				value: '',
			},
			...termsList.map((item) => {
				return {
					label: item.title.rendered,
					value: item.id,
				};
			}),
		];
	});

	return (
		<PanelBody title={__('Featured Posts', 'eightshift-frontend-libs')}>

			{postTypeOptions ?
				<SelectControl
					label={__('Filter By Post Type', 'eightshift-frontend-libs')}
					help={__('Select main section of content to filter from.', 'eightshift-frontend-libs')}
					value={postType}
					options={postTypeOptions}
					onChange={(value) => {
						setAttributes({
							query: {
								postType: value,
								taxonomy: '',
								terms: [],
								posts: [],
							},
						});
					}}
				/> :
				<Spinner />
			}

			{(postTypeOptions && taxonomyOptions) ?
				<SelectControl
					label={sprintf(__('Filter by %s available taxonomies', 'eightshift-frontend-libs'), _.startCase(_.toLower(postType)))}
					help={sprintf(__('If `No Filter` value is selected your %s posts will not be filtered by any category.', 'eightshift-frontend-libs'), _.startCase(_.toLower(postType)))}
					value={taxonomy}
					options={taxonomyOptions}
					onChange={(value) => {
						setAttributes({
							query: {
								...queryProps,
								taxonomy: value,
								terms: [],
								posts: [],
							},
						});
					}}
				/> :
				<Spinner />
			}

			{(taxonomyOptions && taxonomy) &&
				<CustomSelect
					label={sprintf(__('Filter by %s taxonomy', 'eightshift-frontend-libs'), _.startCase(_.toLower(taxonomy)))}
					help={sprintf(__('If `No Filter` value is selected your %s posts will not be filtered.', 'eightshift-frontend-libs'), _.startCase(_.toLower(taxonomy)))}
					options={termsOptions}
					value={terms}
					multiple={true}
					onChange={(value) => {
						setAttributes({
							query: {
								...queryProps,
								terms: value[0] ? value : [],
								posts: [],
							},
						});
					}}
				/>
			}

			{(postTypeOptions && !taxonomy) &&
				<CustomSelect
					label={sprintf(__('Filter by %s articles', 'eightshift-frontend-libs'), _.startCase(_.toLower(postType)))}
					help={sprintf(__('If `No Filter` value is selected your %s articles will not be filtered.', 'eightshift-frontend-libs'), _.startCase(_.toLower(postType)))}
					options={postsOptions}
					value={posts}
					multiple={true}
					onChange={(value) => {
						setAttributes({
							query: {
								...queryProps,
								terms: [],
								posts: value,
							},
						});
					}}
				/>
			}

			<hr />

			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.itemsPerRow} />
						{__('Items per one row', 'eightshift-frontend-libs')}
					</Fragment>
				}
				help={__('Option to change the number of items showed in one row.', 'eightshift-frontend-libs')}
				allowReset={true}
				value={itemsPerLine}
				onChange={(value) => setAttributes({ itemsPerLine: value })}
				min={options.itemsPerLine.min}
				max={options.itemsPerLine.max}
				step={options.itemsPerLine.step}
				resetFallbackValue={reset.itemsPerLine.default}
			/>

			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.totalItems} />
						{__('Show items', 'eightshift-frontend-libs')}
					</Fragment>
				}
				help={__('Option to change the number of items to show in total.', 'eightshift-frontend-libs')}
				allowReset={true}
				value={showItems}
				onChange={(value) => setAttributes({ showItems: value })}
				step={1}
			/>

			<ToggleControl
				label={__('Exclude current post', 'eightshift-frontend-libs')}
				checked={excludeCurrentPost}
				help={__('This options can only be used in post single pages.', 'eightshift-frontend-libs')}
				onChange={(value) => setAttributes({ excludeCurrentPost: value })}
			/>

		</PanelBody>
	);
};
