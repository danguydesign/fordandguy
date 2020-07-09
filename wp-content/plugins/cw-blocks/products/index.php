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
function cw_blocks_register_products_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'products-block',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	wp_register_style(
		'products-block-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	wp_register_style(
		'products-block',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'cw-blocks/products', array(
		'style' => 'products-block',
		'editor_style' => 'products-block-editor',
		'editor_script' => 'products-block',
        'render_callback' => 'products_block_render_html'
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
add_action( 'init', 'cw_blocks_register_products_block' );

function products_block_render_html( $attributes, $content ) {

    return html_entity_decode($content);

}

// For last orders
function products_block_render_html_lod( $attributes, $content ) {

    //do_action('cwtp_get_scores');

    $xml = new SimpleXMLElement($content);

    for ($i=0; $i<count($xml->ul[0]->li); $i++) {

        $product_id = url_to_postid($xml->ul[0]->li[$i]->article[0]->a[0]['href']);

        $last_order_date = strtotime(str_replace('/', '-', cw_get_last_order_date( $product_id )));

        if ($last_order_date != false) {

            $message = 'Order by <strong>' . date('D jS M', $last_order_date) . '</strong> for Christmas delivery';

        }
        else {

            $message = '<img class="product-card__lod-icon" src="https://cewe-photoworld.com/wp-content/themes/photoworld/images/sleigh-red.png" /> Check last order dates for Christmas delivery!';

        }

        //if ($xml->ul[0]->li[$i]->article[0]->a[0]['href'] == '/photo-gifts') {

            //$message = '<img class="product-card__lod-icon" src="https://cewe-photoworld.com/wp-content/themes/photoworld/images/sleigh-red.png" /> Check last order dates for Christmas delivery!';

        //}

        $holder = $xml->ul[0]->li[$i]->article[0]->a[0]->addChild('p', $message);
        $holder->addAttribute('class', 'product-card__lod');

    }

    $content = $xml->asXML();

    return html_entity_decode($content);

}

?>