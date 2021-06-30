<?php

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

function my_theme_name_scripts() {
	wp_enqueue_style( 'main', get_stylesheet_directory_uri() . '/css/main.css' );
  wp_enqueue_script( 'my-scripts', get_stylesheet_directory_uri() . '/js/scripts.js', array(), null, true );

	// Remove storefront styles
	// wp_dequeue_style( 'storefront-style' );

	// Swap navigation script
	wp_dequeue_script( 'storefront-navigation'  );
	wp_enqueue_script( 'fordandguy-navigation', get_stylesheet_directory_uri() . '/js/navigation.js', array(), null, true );
	wp_enqueue_script( 'fordandguy-swiper-min', get_stylesheet_directory_uri() . '/js/swiper-bundle.min.js', array(), null, true );
	wp_enqueue_script( 'fordandguy-swiper', get_stylesheet_directory_uri() . '/js/swiper.js', array(), null, true );
}

// Custom exept length
function custom_exerpt_length() {
	return 25;
}

add_filter( 'woocommerce_get_stock_html', 'filter_get_stock_html', 10, 2 );
function filter_get_stock_html( $html, $product ) {
    $availability = $product->get_availability();

    if ( ! empty( $availability['availability'] ) ) {
        $class = esc_attr( $availability['class'] );
        $avail_text = wp_kses_post( $availability['availability'] );
        $stock_qty = $product->get_stock_quantity();

        if( $stock_qty == get_option( 'woocommerce_notify_low_stock_amount' ) ){ // reflects backend for Low stock threshold
            $class .= ' low-in-stock';
            $avail_text = __('Only ' . $stock_qty . ' left!' , 'woocommerce');
        }
        ob_start();

        // HTML reflection:

        ?><p class="stock <?php echo $class; ?>"><?php echo $avail_text; ?></p><?php

        $html = ob_get_clean();
    }
    return $html;
}

/**
 * Get HTML for a gallery image.
 *
 * Hooks: woocommerce_gallery_thumbnail_size, woocommerce_gallery_image_size and woocommerce_gallery_full_size accept name based image sizes, or an array of width/height values.
 *
 * @since 3.3.2
 * @param int  $attachment_id Attachment ID.
 * @param bool $main_image Is this the main image or a thumbnail?.
 * @return string
 */
function fg_get_gallery_image_html( $attachment_id, $main_image = false ) {
	$flexslider        = (bool) apply_filters( 'woocommerce_single_product_flexslider_enabled', get_theme_support( 'wc-product-gallery-slider' ) );
	$gallery_thumbnail = wc_get_image_size( 'gallery_thumbnail' );
	$thumbnail_size    = apply_filters( 'woocommerce_gallery_thumbnail_size', array( $gallery_thumbnail['width'], $gallery_thumbnail['height'] ) );
	$image_size        = apply_filters( 'woocommerce_gallery_image_size', $flexslider || $main_image ? 'woocommerce_single' : $thumbnail_size );
	$full_size         = apply_filters( 'woocommerce_gallery_full_size', apply_filters( 'woocommerce_product_thumbnails_large_size', 'full' ) );
	$thumbnail_src     = wp_get_attachment_image_src( $attachment_id, $thumbnail_size );
	$full_src          = wp_get_attachment_image_src( $attachment_id, $full_size );
	$alt_text          = trim( wp_strip_all_tags( get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ) ) );
	$image             = wp_get_attachment_image(
		$attachment_id,
		$image_size,
		false,
		apply_filters(
			'woocommerce_gallery_image_html_attachment_image_params',
			array(
				'title'                   => _wp_specialchars( get_post_field( 'post_title', $attachment_id ), ENT_QUOTES, 'UTF-8', true ),
				'data-caption'            => _wp_specialchars( get_post_field( 'post_excerpt', $attachment_id ), ENT_QUOTES, 'UTF-8', true ),
				'data-src'                => esc_url( $full_src[0] ),
				'data-large_image'        => esc_url( $full_src[0] ),
				'data-large_image_width'  => esc_attr( $full_src[1] ),
				'data-large_image_height' => esc_attr( $full_src[2] ),
				'class'                   => esc_attr( $main_image ? 'wp-post-image' : '' ),
			),
			$attachment_id,
			$image_size,
			$main_image
		)
	);

	return '<div data-thumb="' . esc_url( $thumbnail_src[0] ) . '" data-thumb-alt="' . esc_attr( $alt_text ) . '" class="woocommerce-product-gallery__image swiper-slide"><a href="' . esc_url( $full_src[0] ) . '">' . $image . '</a></div>';
}


function removestuff() {
	// Header
	remove_action('storefront_header', 'storefront_product_search', 40);
	remove_action('storefront_header', 'storefront_header_cart', 60);

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
	// Remobe product page short description
	remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20);

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

}

function addstuff() {
	// Header
	add_action('storefront_header', 'storefront_product_search', 35);
	add_action('storefront_header', 'storefront_header_cart', 40);

	// Product page
	add_action('woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 70);

	// ----- Footer logo -----
	add_theme_support( 'custom-logo', array(
		'height'      => 100,
		'width'       => 400,
		'flex-height' => true,
		'flex-width'  => true,
		'header-text' => array( 'site-title', 'site-description' ),
	) );

	add_shortcode( 'custom_product_description', 'custom_product_description' );

	add_action( 'wp_enqueue_scripts', 'my_theme_name_scripts', 99 );

	add_filter('excerpt_length', 'custom_exerpt_length');

}

add_action( 'init', 'removestuff', 1);
add_action( 'init', 'addstuff', 2);



?>
