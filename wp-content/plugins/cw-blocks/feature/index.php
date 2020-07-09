<?php

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
//~ add_action( 'init', 'gutenberg_examples_03_load_textdomain' );

//~ function gutenberg_examples_03_load_textdomain() {
	//~ load_plugin_textdomain( 'gutenberg-examples', false, basename( __DIR__ ) . '/languages' );
//~ }

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function cw_blocks_register_feature_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'feature-block',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	wp_register_style(
		'feature-block-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	wp_register_style(
		'feature-block',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'cw-blocks/feature', array(
		'style' => 'feature-block',
		'editor_style' => 'feature-block-editor',
		'editor_script' => 'feature-block',
	) );

	/*
	 * Pass already loaded translations to our JavaScript.
	 *
	 * This happens _before_ our JavaScript runs, afterwards it's too late.
	 */
	//~ wp_add_inline_script(
		//~ 'gutenberg-examples-03',
		//~ sprintf( 
			//~ 'var gutenberg_examples_03 = { localeData: %s };', 
			//~ json_encode( gutenberg_get_jed_locale_data( 'gutenberg-examples' ) ) 
		//~ ),
		//~ 'before'
	//~ );

} 
add_action( 'init', 'cw_blocks_register_feature_block' );