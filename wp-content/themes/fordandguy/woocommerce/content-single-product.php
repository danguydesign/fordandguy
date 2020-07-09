<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked wc_print_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
?>

<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>

	<?php
	/**
	 * Hook: woocommerce_before_single_product_summary.
	 *
	 * @hooked woocommerce_show_product_sale_flash - 10
	 * @hooked woocommerce_show_product_images - 20
	 */
	do_action( 'woocommerce_before_single_product_summary' );
	?>

	<div class="summary entry-summary">
		<?php
		/**
		 * Hook: woocommerce_single_product_summary.
		 *
		 * @hooked woocommerce_template_single_title - 5
		 * @hooked woocommerce_template_single_rating - 10
		 * @hooked woocommerce_template_single_price - 10
		 * @hooked woocommerce_template_single_excerpt - 20
		 * @hooked woocommerce_template_single_add_to_cart - 30
		 * @hooked woocommerce_template_single_meta - 40
		 * @hooked woocommerce_template_single_sharing - 50
		 * @hooked WC_Structured_Data::generate_product_data() - 60
		 */
		do_action( 'woocommerce_single_product_summary' );
		?>

		<div class="col-full">

			<section class="accordion-cntr">
				<a class="accordion"><h3>Product Details</h3></a>
				<div class="acc-panel">
					<div class="acc-content">
						<?php echo apply_filters( 'the_content', $product->post->post_content ) ?>
					</div>
				</div>
				<hr>

				<a class="accordion"><h3>Size & fit</h3></a>
				<div class="acc-panel">
					<div class="acc-content">
						<p>
							<?php
							global $wp_query;
							$postid = $wp_query->post->ID;
							echo get_post_meta($postid, 'custom_size_info', true);
							wp_reset_query();
							?>
						</p>
						<?php //do_action( 'woocommerce_product_additional_information', $product ); ?>
						<!-- <a href="fordandguy/information/"><p>Read more</p></a> -->
					</div>
				</div>
				<hr>

				<a class="accordion"><h3>Delivery & returns</h3></a>
				<div class="acc-panel">
					<div class="acc-content">
						<p>If you need to return an item, please contact me within 14 days of delivery and ship items back within 30 days of delivery.</p>
						<p>Items are made to order so preparation times and shipping times will vary. We aim to dispatch orders within 5 days and send orders 1st class.</p>
						<p>For more information about returns and delivery <a href="https://fordandguy.co.uk/information/">Click Here</a>.</p>
					</div>
				</div>
				<hr>
			</section>

		</div>

	</div>


	<!-- Reviews -->
	<?php add_action( 'woocommerce_after_single_product_summary', 'comments_template', 50 ); ?>

	<?php
	/**
	 * Hook: woocommerce_after_single_product_summary.
	 *
	 * @hooked woocommerce_output_product_data_tabs - 10
	 * @hooked woocommerce_upsell_display - 15
	 * @hooked woocommerce_output_related_products - 20
	 */
	do_action( 'woocommerce_after_single_product_summary' );
	?>

</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>
