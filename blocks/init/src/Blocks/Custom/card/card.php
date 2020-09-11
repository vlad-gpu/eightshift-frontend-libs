<?php
/**
 * Template for the Card Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$heading   = $attributes['heading'] ?? '';
$paragraph = $attributes['paragraph'] ?? '';
$media     = $attributes['media'] ?? [];

$block_class = $attributes['blockClass'] ?? '';

?>

<div class="<?php echo esc_attr( $block_class ); ?>">

  <?php if ( ! empty( $media ) ) { ?>
    <div class="<?php echo esc_attr( "{$block_class}__media" ); ?>">
      <?php echo wp_kses_post( Components::render( 'image', [
          'blockClass' => $attributes['blockClass'] ?? '',
          'media'      => $media,
        ]
      ) );
      ?>
    </div>
  <?php } ?>

  <div class="<?php echo esc_attr( "{$block_class}__content" ); ?>">
    <?php if ( ! empty( $heading ) ) { ?>
      <div class="<?php echo esc_attr( "{$block_class}__heading" ); ?>">
        <?php echo wp_kses_post( $heading ); ?>
      </div>
    <?php } ?>

    <?php if ( ! empty( $paragraph ) ) { ?>
      <div class="<?php echo esc_attr( "{$block_class}__paragraph" ); ?>">
        <?php echo wp_kses_post( $paragraph ); ?>
      </div>
    <?php } ?>
  </div>

</div>
