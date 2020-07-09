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
  wp_enqueue_style( 'mystyle', get_stylesheet_directory_uri() . '/css/style.css' );
  wp_enqueue_style( 'product', get_stylesheet_directory_uri() . '/css/product-page.css' );
  wp_enqueue_style( 'type', get_stylesheet_directory_uri() . '/css/type.css' );
  wp_enqueue_style( 'site-header', get_stylesheet_directory_uri() . '/css/site-header.css' );
  //wp_enqueue_style( 'fordandguy', get_stylesheet_directory_uri() . '/css/fordandguy.css' );
  // wp_enqueue_script( 'script-name', get_template_directory_uri() . '/js/swiper.js', array(), '1.0.0', true );
  wp_enqueue_script( 'my-scripts', get_stylesheet_directory_uri() . '/js/scripts.js', array(), null, true );
}

add_action( 'wp_enqueue_scripts', 'my_theme_name_scripts', 99 );

remove_action( 'storefront_loop_post', 'storefront_post_header', 10 );


// Remove default product page tabs
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 )


?>
