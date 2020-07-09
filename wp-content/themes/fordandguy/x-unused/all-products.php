<?php
/*
* Template Name: All Products
*/
get_header();

$show_default_orderby    = 'menu_order' === apply_filters( 'woocommerce_default_catalog_orderby', get_option( 'woocommerce_default_catalog_orderby', 'menu_order' ) );
$catalog_orderby_options = apply_filters(
  'woocommerce_catalog_orderby',
  array(
    'menu_order' => __( 'Default sorting', 'woocommerce' ),
  //  'popularity' => __( 'Sort by popularity', 'woocommerce' ),
  //  'rating'     => __( 'Sort by average rating', 'woocommerce' ),
    'date'       => __( 'Sort by latest', 'woocommerce' ),
    'price'      => __( 'Sort by price: low to high', 'woocommerce' ),
    'price-desc' => __( 'Sort by price: high to low', 'woocommerce' ),
  )
);

$default_orderby = wc_get_loop_prop( 'is_search' ) ? 'relevance' : apply_filters( 'woocommerce_default_catalog_orderby', get_option( 'woocommerce_default_catalog_orderby', '' ) );
$orderby         = isset( $_GET['orderby'] ) ? wc_clean( wp_unslash( $_GET['orderby'] ) ) : $default_orderby; // WPCS: sanitization ok, input var ok, CSRF ok.

if ( wc_get_loop_prop( 'is_search' ) ) {
  $catalog_orderby_options = array_merge( array( 'relevance' => __( 'Relevance', 'woocommerce' ) ), $catalog_orderby_options );

  unset( $catalog_orderby_options['menu_order'] );
}

if ( ! $show_default_orderby ) {
  unset( $catalog_orderby_options['menu_order'] );
}

if ( ! wc_review_ratings_enabled() ) {
  unset( $catalog_orderby_options['rating'] );
}

if ( ! array_key_exists( $orderby, $catalog_orderby_options ) ) {
  $orderby = current( array_keys( $catalog_orderby_options ) );
}
?>

<div class="custom-sorting">
  <?php
  wc_get_template(
    'loop/orderby.php',
    array(
      'catalog_orderby_options' => $catalog_orderby_options,
      'orderby'                 => $orderby,
      'show_default_orderby'    => $show_default_orderby,
    )
  );
  ?>
</div>

<?php
$order_by = ( ! empty( $_GET['orderby'] ) ) ? $_GET['orderby'] : '';

if ( 'price' === $order_by ) {
  $meta_key = '_regular_price';
  $order = 'ASC';
}
if ( 'price-desc' === $order_by ) {
  $meta_key = '_regular_price';
  $order = 'DESC';
}
if ( 'rating' === $order_by ) {
  $meta_key = '_wc_average_rating';
  $order = 'DESC';
}
if ( 'popularity' === $order_by ) {
  $meta_key = '_wc_review_count';
  $order = 'DESC';
}

$args = array(
  'post_type' => 'product',
  'meta_key' => '',
  'orderby' => 'meta_value',
  'order' => $order,
);

$result = new WP_Query( $args );

?>

<div class="wc-block-grid">
  <ul class="wc-block-grid__products">
    <?php
    if ( $result->have_posts() ) {
      while ( $result->have_posts() ) : $result->the_post();
      $default_img = '<img src=" . site_url() . /wp-content/uploads/woocommerce-placeholder.png "/>';
      $img = ( get_the_post_thumbnail() ) ? get_the_post_thumbnail() : $default_img;
     ?>
    <li class="wc-block-grid__product">
      <a href="<?php the_permalink();?>" class="wc-block-grid__product-link">
        <div class=""><?php echo $img; ?></div>
        <h2 class="woocommerce-loop-product__title"><?php the_title(); ?></h2>
        <span class="price">
          <span class="wc-block-grid__product-price">
            <?php $price = get_post_meta( get_the_ID(), '_price', true ); ?>
            <span class=""><?php echo wc_price( $price ); ?></span>
          </span>
        </span>
      </a>
    </li>
    <?php
      endwhile;
    }
    ?>
  </ul>
</div>





<?php get_footer(); ?>
