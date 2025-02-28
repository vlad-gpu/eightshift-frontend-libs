<?php

/**
 * Template for the Jumbotron Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$jumbotronUse = Components::checkAttr('jumbotronUse', $attributes, $manifest, $componentName);
if (!$jumbotronUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$jumbotronContentPosition = Components::checkAttr('jumbotronContentPosition', $attributes, $manifest, $componentName);

$jumbotronClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$contentClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'content'),
]);

$contentWrapClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'content-wrap'),
]);

?>

<div class="<?php echo \esc_attr($jumbotronClass); ?>">
	<?php
	echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'image',
		array_merge(
			Blocks::props($attributes, 'image'),
			[
				'blockClass' => $componentClass,
				'imageUsePlaceholder' => true,
				'imageBg' => true,
			]
		)
	);
	?>

	<div class="<?php echo \esc_attr($contentClass); ?>" data-position="<?php echo \esc_attr($jumbotronContentPosition); ?>">
		<div class="<?php echo \esc_attr($contentWrapClass); ?>">
			<?php
			echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				'heading',
				array_merge(
					Blocks::props($attributes, 'heading'),
					[
						'blockClass' => $componentClass
					]
				)
			);

			echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				'paragraph',
				array_merge(
					Blocks::props($attributes, 'paragraph'),
					[
						'blockClass' => $componentClass
					]
				)
			);

			echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				'button',
				array_merge(
					Blocks::props($attributes, 'button'),
					[
						'blockClass' => $componentClass
					]
				)
			);
			?>
		</div>
	</div>

</div>
