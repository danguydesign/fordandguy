<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package storefront
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section>
				<?php
				if ( have_posts() ) :

					get_template_part( 'front-page-loop' );

				endif;
				?>
			</section>

			<section>

				<?php

				// $args = array(
				// 	'post_type' => 'product'
				//
				// );
				//
				// // The Query
				// $the_query = new WP_Query( $args );
				//
				// // The Loop
				// if ( $the_query->have_posts() ) {
				//     echo '<ul class="products columns-3">';
				//     while ( $the_query->have_posts() ) {
				//         $the_query->the_post();
				//         //echo '<li>' . get_the_title() . '</li>';
				//
				// 				wc_get_template_part( 'content', 'product' );
				//     }
				//     echo '</ul>';
				// } else {
				//     // no posts found
				// }
				// /* Restore original Post Data */
				// wp_reset_postdata();

				?>


			</section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
// do_action( 'storefront_sidebar' );
get_footer();
