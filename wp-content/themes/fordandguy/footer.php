<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package storefront
 */

?>

		</div><!-- .col-full -->
	</div><!-- #content -->

	<?php do_action( 'storefront_before_footer' ); ?>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="col-full">
			<div class="footer-row">

				<div class="footer-row__col">
					<?php
					   $custom_logo_id = get_theme_mod( 'custom_logo' );
					   $image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
					      ?>
					<img src="<?php echo $image[0]; ?>" alt="footer logo" class="footer-logo">
					<?php wp_nav_menu( array(
					    'menu' => 'footer-1'
					));
					?>
				</div>
				<div class="footer-row__col">
					<strong>products</strong>
					<?php wp_nav_menu( array(
							'menu' => 'footer-2'
					));
					?>
				</div>
				<div class="footer-row__col">
					<strong>help & info</strong>
					<?php wp_nav_menu( array(
							'menu' => 'footer-3'
					));
					?>
				</div>
				<div class="footer-row__col">
					<strong>social</strong>
					<div class="footer-social">
						<a href="https://www.instagram.com/fordandguy/" class="footer-icon" target="_blank">
							<p class="visually-hidden">Instagram</p>
							<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		  					<path d="M6.89 2.234h10.22c2.578 0 4.668 2.1 4.668 4.692v10.148c0 2.592-2.09 4.692-4.667 4.692H6.889c-2.577 0-4.667-2.1-4.667-4.692V6.926c0-2.592 2.09-4.692 4.667-4.692zM0 17.074C0 20.9 3.085 24 6.89 24h10.22c3.806 0 6.89-3.1 6.89-6.926V6.926C24 3.1 20.915 0 17.11 0H6.89C3.083 0 0 3.1 0 6.926v10.148zm18.35-4.978c0-3.508-2.83-6.351-6.318-6.351-3.49 0-6.318 2.843-6.318 6.35 0 3.508 2.829 6.352 6.318 6.352 3.489 0 6.317-2.844 6.317-6.351zm-10.413 0c0-2.274 1.833-4.117 4.095-4.117 2.261 0 4.095 1.843 4.095 4.117s-1.834 4.117-4.095 4.117c-2.262 0-4.095-1.843-4.095-4.117zm10.476-4.979c.841 0 1.524-.686 1.524-1.532s-.683-1.532-1.524-1.532c-.842 0-1.524.686-1.524 1.532s.682 1.532 1.524 1.532z"></path>
							</svg>
						</a>

						<a href="https://www.facebook.com/FordandGuy/" class="footer-icon" target="_blank">
							<p class="visually-hidden">Facebook</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
							</svg>
						</a>

						<a href="https://www.etsy.com/shop/fordandguy" class="footer-icon" target="_blank">
							<p class="visually-hidden">Etsy</p>
							<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="24" height="24" viewBox="0 0 94 94" xml:space="preserve">
								<path d="M89,0H5C2.239,0,0,2.238,0,5v84c0,2.762,2.239,5,5,5h84c2.762,0,5-2.238,5-5V5C94,2.238,91.762,0,89,0z M80.561,68.665
									c-0.623,5.169-1.272,10.336-1.854,15.513c-0.214,1.924-0.14,1.913-2.113,1.887c-15.069-0.187-30.139-0.432-45.208-0.517
									c-5.401-0.028-10.801,0.325-16.203,0.497c-0.715,0.023-1.43,0.003-2.279,0.003c0-1.499,0-2.952,0-4.641
									c1.927-0.382,3.969-0.757,5.997-1.196c0.836-0.179,1.661-0.438,2.452-0.756c1.192-0.479,1.939-1.366,2.111-2.676
									c0.082-0.614,0.202-1.23,0.208-1.846c0.102-11.244,0.245-22.49,0.261-33.732c0.01-6.983-0.168-13.967-0.281-20.947
									c-0.064-3.954-1.113-5.187-4.967-5.922c-1.639-0.311-3.294-0.558-4.916-0.936c-0.392-0.093-0.947-0.57-0.977-0.91
									c-0.118-1.273-0.048-2.563-0.048-3.954c21.614,0.362,43.11,1.271,64.805-0.602c-0.452,7.338-0.909,14.69-1.372,22.171
									c-1.312,0-2.517,0.104-3.682-0.056c-0.415-0.059-0.936-0.696-1.075-1.169c-0.662-2.188-1.151-4.435-1.815-6.622
									c-0.387-1.273-0.912-2.521-1.514-3.707c-1.355-2.692-3.393-4.138-6.617-4.085c-7.75,0.137-15.506,0.042-23.26,0.047
									c-1.973,0-2.031,0.067-2.033,1.998c-0.01,8.709-0.017,17.422-0.023,26.13c-0.004,0.478,0,0.953,0,1.553
									c3.426,0,6.669,0.051,9.906-0.022c2.1-0.046,4.196-0.254,6.289-0.424c2.865-0.238,3.885-1.075,4.605-3.84
									c0.541-2.074,1.021-4.168,1.488-6.261c0.187-0.825,0.562-1.206,1.467-1.141c1.14,0.083,2.288,0.02,3.598,0.02
									c0,0.762,0.004,1.446-0.001,2.13c-0.069,8.175-0.157,16.347-0.185,24.523c-0.004,1.084-0.254,1.519-1.422,1.525
									c-3.437,0.024-3.432,0.073-4.244-3.284c-0.29-1.205-0.584-2.411-0.9-3.605c-0.729-2.764-2.787-3.779-5.379-3.864
									c-4.873-0.16-9.753-0.21-14.629-0.304c-0.133,0-0.268,0.069-0.529,0.144c-0.025,0.538-0.071,1.099-0.071,1.657
									c-0.012,7.273-0.017,14.551-0.021,21.822c-0.002,4.521,1.699,6.715,6.234,6.844c6.975,0.199,13.966,0.056,20.944-0.157
									c4.219-0.129,7.109-2.601,8.918-6.272c1.475-2.998,2.822-6.062,4.07-9.16c0.553-1.373,1.27-2.011,2.755-1.783
									c0.647,0.104,1.32,0.019,2.229,0.019C81.023,64.84,80.79,66.754,80.561,68.665z"/>
							</svg>
						</a>


					</div>
				</div>
			</div>

			<div class="copyright">
				<p>© fordandguy 2020</p>
			</div>

			<?php
			/**
			 * Functions hooked in to storefront_footer action
			 *
			 * @hooked storefront_footer_widgets - 10
			 * @hooked storefront_credit         - 20
			 */
			//do_action( 'storefront_footer' );
			?>

		</div><!-- .col-full -->
	</footer><!-- #colophon -->

	<?php do_action( 'storefront_after_footer' ); ?>

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
