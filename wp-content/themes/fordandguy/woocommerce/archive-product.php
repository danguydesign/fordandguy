<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action( 'woocommerce_before_main_content' );

?>
<header class="woocommerce-products-header">
	<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
		<h1 class="woocommerce-products-header__title page-title"><?php woocommerce_page_title(); ?></h1>
	<?php endif; ?>

	<?php
	/**
	 * Hook: woocommerce_archive_description.
	 *
	 * @hooked woocommerce_taxonomy_archive_description - 10
	 * @hooked woocommerce_product_archive_description - 10
	 */
	do_action( 'woocommerce_archive_description' );
	?>
</header>
<?php
if ( woocommerce_product_loop() ) {

	/**
	 * Hook: woocommerce_before_shop_loop.
	 *
	 * @hooked woocommerce_output_all_notices - 10
	 * @hooked woocommerce_result_count - 20
	 * @hooked woocommerce_catalog_ordering - 30
	 */
	do_action( 'woocommerce_before_shop_loop' );

	woocommerce_product_loop_start();

	if ( wc_get_loop_prop( 'total' ) ) {
		while ( have_posts() ) {
			the_post();

			/**
			 * Hook: woocommerce_shop_loop.
			 */
			do_action( 'woocommerce_shop_loop' );

			wc_get_template_part( 'content', 'product' );
		}
	}

	woocommerce_product_loop_end();

	/**
	 * Hook: woocommerce_after_shop_loop.
	 *
	 * @hooked woocommerce_pagination - 10
	 */
//	do_action( 'woocommerce_after_shop_loop' );
} else {
	/**
	 * Hook: woocommerce_no_products_found.
	 *
	 * @hooked wc_no_products_found - 10
	 */
	do_action( 'woocommerce_no_products_found' );
}
?>

<?php
/**
 * Hook: custom fields.
 */
	$term_id = get_queried_object()->term_id;
	$post_id = 'product_cat_'.$term_id;
	$custom_field = get_field('category_content_1', $post_id);
	$custom_field_img = get_field('category_image_1', $post_id);
	$custom_field_2 = get_field('category_content_2', $post_id);
	$custom_field_img_2 = get_field('category_image_2', $post_id);
?>

<div class="wp-block-group">
	<div class="wp-block-group__inner-container">

<!-- Bespoke block 1 -->

<?php if (!empty($custom_field)){  ?>

	<div class="wp-block-cw-blocks-feature feature feature--alignleft undefined" style="background:#fff;color:#222">
		<div class="feature__container">
			<div class="feature__content">
				<div class="feature__textbox">
					<div><?php echo $custom_field; ?> </div> <?php // Get Advanced Custom Field Value ?>
				</div>
			</div>
			<div class="feature__image">
				<img src="<?php echo $custom_field_img; ?>" alt="close up of kimono on hanger">
			</div>
		</div>
	</div>

<?php } ?>


<!-- Bespoke block 2 -->

<?php if (!empty($custom_field_2)){  ?>

		<div class="wp-block-cw-blocks-feature feature feature--alignleft undefined" style="background:#fff;color:#222">
			<div class="feature__container">
				<div class="feature__content">
					<div class="feature__textbox">
						<div><?php echo $custom_field_2; ?> </div> <?php // Get Advanced Custom Field Value ?>
					</div>
				</div>
				<div class="feature__image">
					<img src="<?php echo $custom_field_img_2; ?>" alt="close up of kimono on hanger">
				</div>
			</div>
		</div>

<?php } ?>


	</div>
</div>
<?php

/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
//do_action( 'woocommerce_after_main_content' );

/**
 * Hook: woocommerce_sidebar.
 *
 * @hooked woocommerce_get_sidebar - 10
 */
// do_action( 'woocommerce_sidebar' );

get_footer( 'shop' );
