<?php

defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function cw_blocks_register_product_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'product-block',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	wp_register_style(
		'product-block-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	wp_register_style(
		'product-block',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

   wp_enqueue_script( 'wp-api-fetch' );

	register_block_type( 'cw-blocks/product', array(
		'style' => 'product-block',
		'editor_style' => 'product-block-editor',
		'editor_script' => 'product-block',
        'render_callback' => 'product_block_render_html'
	) );

} 
add_action( 'init', 'cw_blocks_register_product_block' );


function my_custom_product_api_response( $product ) {

    $id = $product['product']['id'];

    // Adding your custom field:
    //$product['product']['custom_field_name'] = get_post_meta( $id, 'custom_field_name', true );

    return $product;
}

add_filter( 'woocommerce_api_product_response', 'my_custom_product_api_response' );


function product_block_render_html( $attributes, $block ) {

//($attributes);

    //if ($attributes->sku) {

    //do_action('cwtp_get_scores');

   // var_dump($attributes);

    $permalink = $attributes['linkUrl'];
    $button = $attributes['linkText'];
    $title = $attributes['title'];
    $image_src = $attributes['imageUrl'];
    $image_alt = $attributes['imageAlt'];
    $tab_src = $attributes['tabUrl'];
    $tab_alt = $attributes['tabAlt'];
    $price = $attributes['price'];
    $sku = $attributes['sku'];
    $content = $attributes['content'];

    $product = false;
    $product_id = false;

    if ($sku != '') {

        $product_id = wc_get_product_id_by_sku($sku);

        if ($product_id) {

            $product = wc_get_product($product_id);

        }

    }

    // Image
    if (trim($image_src) == "") {

        if ($product != false) {


            $image_size = apply_filters( 'single_product_archive_thumbnail_size', 'woocommerce_thumbnail' );

            $image = $product->get_image( $image_size );

        }
        else {

            $image = '<img src="https://cewe-photoworld.com/images/placeholder-600x400.jpg" alt="placeholder">';

        }

    }
    else {

        $image = '<img src="' . $image_src . '" alt="'. $image_alt .'">';

    }

    // Permalink
    if (trim($permalink) == "" && $product != false) {

        $permalink = $product->get_permalink();

    }

    // Title
    if (trim($title) == "" && $product != false) {

        $title = $product->get_title();

    }

    // Content
    if (trim($content) == "" && $product != false) {

        $content = get_field('product_tagline', $product_id);

    }

    // Price
    if (trim($price) == "" && $product != false) {

        $price = $product->get_price_html();

    }

    // Link Text
    if (trim($button) == "") {

        $button = 'View Product';

    }

    $output = '<li class="product-card cw-grid-item"><article class="product-card__container">';

    $output .= '<a class="product-card__link" href="' . $permalink . '" title="' . $title . '">';

    $output .= '<header class="product-card__image">' . $image . '</header>';

    $output .= '<section class="product-card__summary">';
    $output .= '<h3 class="product-card__title">' . $title . '</h3>';
    //$output .=  do_action('cwtp_get_rating_image', $product_sku );

    $output .= apply_filters('cwtp_get_rating_image', '', $sku);

    $output .= '<p class="product-card__subtitle">' . $content . '</p>';
    $output .= '</section>';

    $output .= '<footer class="product-card__details">';
    $output .= '<strong class="product-card__price">' . $price . '</strong>';
    $output .= '<span class="product-card__button">' . $button . '</span>';
    $output .= '</footer>';

    $output .= '</a>';

	$output .= '</article></li>';

    return html_entity_decode($output);

}



?>