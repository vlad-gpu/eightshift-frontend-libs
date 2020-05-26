/* eslint-disable import/extensions, import/no-unresolved */

/**
 * This is the main entry point for Block Editor blocks scripts used for the `WordPress admin editor`.
 * This file registers blocks dynamically using `registerBlocks` helper method.
 * File names must follow the naming convention to be able to run dynamically.
 *
 * `src/blocks/custom/block_name/manifest.json`.
 * `src/blocks/custom/block_name/block_name.js`.
 *
 * Usage: `WordPress admin editor`.
 *
 
 */

import { registerBlocks } from '@eightshift/frontend-libs/scripts/editor';
import { dynamicImport } from '@eightshift/frontend-libs/scripts/helpers';
import { Wrapper } from './../../wrapper/wrapper';
import WrapperManifest from './../../wrapper/manifest.json';
import globalSettings from './../../manifest.json';

registerBlocks(
  globalSettings,
  Wrapper,
  WrapperManifest,
  require.context('./../../custom', true, /manifest\.json$/),
  require.context('./../../custom', true, /-block.js$/),
  require.context('./../../custom', true, /hooks.js$/),
  require.context('./../../custom', true, /variations.js$/),
  require.context('./../../custom', true, /transforms.js$/),
  require.context('./../../custom', true, /icons.js$/),
);

// Find all blocks hooks require hooks index.js inside it.
dynamicImport(require.context('./../../wrapper', true, /hooks\/index.js$/));
