<?php
/**
 * Plugin Name:       Weather Block
 * Description:       This block show the current weather
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       weather-block
 *
 * @package           weather-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 function weatherBlockRendering($attributes){

	if(!empty($attributes['token']) && !empty($attributes['location']) ){

		$token = $attributes['token'];

		$location = $attributes['location'];

		$json = file_get_contents('https://api.weatherapi.com/v1/current.json?key='.$token.'&q='.$location.'&aqui=no');
		
		$obj = json_decode($json);

		ob_start();

?>

	<div class="weather-card-wrapper" <?php if(!empty($attributes['backgroundColor'] )){ ?> style="<?= 'background :'.$attributes['backgroundColor']; ?>" <?php } ?>>

		<img src="<?= $obj->current->condition->icon; ?>" width="100">

		<span style="margin:auto; font-size:25px;"><?= $obj->current->temp_c; ?> °C</span>

		<span style="margin:auto; font-size:25px;"><?= $obj->location->name; ?></span>

		<span style="margin:auto; font-size:25px;"><?= $obj->current->condition->text; ?> C</span>

	</div>

<?php

	$output = ob_get_contents();

	ob_clean();

	return $output;

	}

 }


function weather_block_weather_block_block_init() {
	register_block_type( __DIR__ . '/build', array('render_callback'=>'weatherBlockRendering') );
}
add_action( 'init', 'weather_block_weather_block_block_init' );
