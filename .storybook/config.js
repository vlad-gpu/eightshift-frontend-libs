/**
 * Load Blocks Styles.
 */
import './application-styles.scss';

/**
 * Load Storybook add-ons.
 */
import { configure } from '@storybook/react';

/**
 * Load Blocks.
 */
import { registerBlocks } from 'EighshiftBlocksRegisterBlocks';
import { Wrapper } from './../blocks/init/wrapper/wrapper';
import blocksSettings from './../blocks/init/manifest.json';

/**
 * Loading WP build files.
 */
window.wp.element = require('./../node_modules/@wordpress/element/build-module');
window.wp.compose = require('./../node_modules/@wordpress/compose/build-module');
window.wp.hooks = require('./../node_modules/@wordpress/hooks/build-module');
window.wp.components = require('./../node_modules/@wordpress/components/build-module');
window.wp.data = require('./../node_modules/@wordpress/data/build-module');
window.wp.coreData = require('./../node_modules/@wordpress/core-data/build-module');

/**
 * Manualy populate categories for blocks. This is generated in the PHP part of the real project.
 */
wp.data.dispatch( 'core/blocks').setCategories([
  {
    slug: 'eightshift',
    title: 'Eightshift',
    'icon': 'admin-settings',
  },
  {
    slug: 'common',
    title: 'Common',
  },
]
);

/**
 * Register Blocks.
 */
registerBlocks(
  require.context('./../blocks/init/custom', true, /manifest\.json$/),
  require.context('./../blocks/init/custom', true, /\-block.js$/),
  blocksSettings,
  Wrapper,
);

// Run all storybook stories.
configure([
  require.context("./../blocks/init/components", true, /docs\/story.js$/),
  require.context("./../blocks/init/custom", true, /docs\/story.js$/),
  require.context("./../blocks/init/wrapper", true, /docs\/story.js$/),
  require.context("./../blocks/playground", true, /story.js$/),
  require.context("./../components", true, /docs\/story.js$/),
], module);