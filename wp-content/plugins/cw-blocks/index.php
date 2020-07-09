<?php

/**
 * Plugin Name: CEWE Blocks
 * Plugin URI: https://cewe-photoworld.com
 * Description: CEWE Blocks for Gutenburg
 * Version: 0.1.0
 * Author: the Gutenberg Team
 *
 * @package gutenberg-examples
 */

defined( 'ABSPATH' ) || exit;

add_theme_support( 'editor-color-palette', array(
    array(
        'name' => __( 'CEWE Red', 'themeLangDomain' ),
        'slug' => 'cewe-red',
        'color' => '#c30c15',
    ),
    array(
        'name' => __( 'CEWE Dark Grey', 'themeLangDomain' ),
        'slug' => 'cewe-dark-grey',
        'color' => '#222222',
    ),
    array(
        'name' => __( 'CEWE Light Grey', 'themeLangDomain' ),
        'slug' => 'cewe-light-grey',
        'color' => '#fafafa',
    ),
     array(
        'name' => __( 'CEWE Grey', 'themeLangDomain' ),
        'slug' => 'cewe-grey',
        'color' => '#efefef',
    ),
    array(
        'name' => __( 'CEWE White', 'themeLangDomain' ),
        'slug' => 'cewe-white',
        'color' => '#fff',
    ),
) );


function cw_block_categories( $categories, $post ) {

//~ if ( $post->post_type !== 'post' ) {
        //~ return $categories;
    //~ }

    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'cewe',
                'title' => 'CEWE'
            ),
        )
    );
}
add_filter( 'block_categories', 'cw_block_categories', 10, 2 );

add_action( 'admin_enqueue_scripts', 'cpw_load_admin_gutenburg_style' );
function cpw_load_admin_gutenburg_style() {
	wp_enqueue_style( 'cpw_gutenburg_css', plugins_url( 'style.css', __FILE__ ), false, '1.0.0' );
}

include 'feature/index.php';
include 'header/index.php';
include 'squares/index.php';
include 'products/index.php';
include 'wrapper/index.php';
include 'faq/index.php';
include 'faqs/index.php';
//include 'product/index.php';
//include 'shop/index.php';
