<?php

// ----- Footer logo -----
add_theme_support( 'custom-logo', array(
	'height'      => 100,
	'width'       => 400,
	'flex-height' => true,
	'flex-width'  => true,
	'header-text' => array( 'site-title', 'site-description' ),
) );

function removestuff() {
  remove_action('storefront_page', 'storefront_page_header', 10);
	remove_action( 'woocommerce_before_shop_loop', 'storefront_woocommerce_pagination', 30 );
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );
	remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
	remove_action( 'woocommerce_after_shop_loop', 'woocommerce_catalog_ordering', 10 );
	remove_action( 'woocommerce_after_shop_loop', 'woocommerce_result_count', 20 );

	// Remove default product page tabs
	remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
	// Remove prduct page tags
	remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
	remove_action( 'storefront_loop_post', 'storefront_post_header', 10 );

	// Disable REST API link tag (remove if anything breaks)
	remove_action('wp_head', 'rest_output_link_wp_head', 10);
	// Disable oEmbed Discovery Links (remove if anything breaks)
	remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
	// Disable REST API link in HTTP headers (remove if anything breaks)
	remove_action('template_redirect', 'rest_output_link_header', 11, 0);

	// Remove post categories (and maybe product categories)
	function wpse120418_unregister_categories() {
    register_taxonomy( 'category', array() );
	}
	add_action( 'init', 'wpse120418_unregister_categories' );

	// disable flexslider js
	function flex_dequeue_script() {
	    wp_dequeue_script( 'flexslider' );
	}
	add_action( 'wp_print_scripts', 'flex_dequeue_script', 100 );

	// disable zoom jquery js file
	function zoom_dequeue_script() {
	    wp_dequeue_script( 'zoom' );
	}
	add_action( 'wp_print_scripts', 'zoom_dequeue_script', 100 );

	// // disable photoswipe js file
	// function photoswipe_dequeue_script() {
	//     wp_dequeue_script( 'photoswipe-ui-default' );
	// }
	// add_action( 'wp_print_scripts', 'photoswipe_dequeue_script', 100 );

}

add_action( 'init', 'removestuff', 1);

function custom_product_description($atts){
    global $product;

    try {
        if( is_a($product, 'WC_Product') ) {
            return wc_format_content( $product->get_description("shortcode") );
        }

        return "Product description shortcode run outside of product context";
    } catch (Exception $e) {
        return "Product description shortcode encountered an exception";
    }
}
add_shortcode( 'custom_product_description', 'custom_product_description' );

function my_theme_name_scripts() {
	wp_enqueue_style( 'main', get_stylesheet_directory_uri() . '/css/main.css' );
  wp_enqueue_script( 'my-scripts', get_stylesheet_directory_uri() . '/js/scripts.js', array(), null, true );

	// Remove storefront styles
	// wp_dequeue_style( 'storefront-style' );

	// Swap navigation script
	wp_dequeue_script( 'storefront-navigation'  );
	wp_enqueue_script( 'fordandguy-navigation', get_stylesheet_directory_uri() . '/js/navigation.js', array(), null, true );

}

add_action( 'wp_enqueue_scripts', 'my_theme_name_scripts', 99 );

// Custom exept length
function custom_exerpt_length() {
	return 25;
}
add_filter('excerpt_length', 'custom_exerpt_length');

?>
