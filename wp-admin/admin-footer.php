<?php
/**
 * WordPress Administration Template Footer
 *
 * @package WordPress
 * @subpackage Administration
 */

// don't load directly
if ( !defined('ABSPATH') )
	die('-1');
?>

<div class="clear"></div></div><!-- wpbody-content -->
<div class="clear"></div></div><!-- wpbody -->
<div class="clear"></div></div><!-- wpcontent -->

<div id="wpfooter">
	<?php
	/**
	 * Fires after the opening tag for the admin footer.
	 *
	 * @since 2.5.0
	 */
	do_action( 'in_admin_footer' );
	?>
	<p id="footer-left" class="alignleft">
		<?php
<<<<<<< HEAD
=======
		$text = sprintf( __( 'Thank you for creating with <a href="%s">WordPress</a>.' ), __( 'https://wordpress.org/' ) );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		/**
		 * Filter the "Thank you" text displayed in the admin footer.
		 *
		 * @since 2.8.0
<<<<<<< HEAD
		 * @param string The content that will be printed.
		 */
		echo apply_filters( 'admin_footer_text', '<span id="footer-thankyou">' . __( 'Thank you for creating with <a href="http://wordpress.org/">WordPress</a>.' ) . '</span>' );
=======
		 *
		 * @param string $text The content that will be printed.
		 */
		echo apply_filters( 'admin_footer_text', '<span id="footer-thankyou">' . $text . '</span>' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		?>
	</p>
	<p id="footer-upgrade" class="alignright">
		<?php
		/**
		 * Filter the version/update text displayed in the admin footer.
		 *
<<<<<<< HEAD
		 * @see core_update_footer() WordPress prints the current version and update information,
		 *	using core_update_footer() at priority 10.
		 *
		 * @since 2.3.0
		 * @param string The content that will be printed.
=======
		 * WordPress prints the current version and update information,
		 * using core_update_footer() at priority 10.
		 *
		 * @since 2.3.0
		 *
		 * @see core_update_footer()
		 *
		 * @param string $content The content that will be printed.
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		 */
		echo apply_filters( 'update_footer', '' );
		?>
	</p>
	<div class="clear"></div>
</div>
<?php
/**
 * Print scripts or data before the default footer scripts.
 *
 * @since 1.2.0
<<<<<<< HEAD
 * @param string The data to print.
 */
do_action('admin_footer', '');
=======
 *
 * @param string $data The data to print.
 */
do_action( 'admin_footer', '' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

/**
 * Prints any scripts and data queued for the footer.
 *
 * @since 2.8.0
 */
<<<<<<< HEAD
do_action('admin_print_footer_scripts');
=======
do_action( 'admin_print_footer_scripts' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

/**
 * Print scripts or data after the default footer scripts.
 *
<<<<<<< HEAD
 * @since 2.8.0
 *
 * @param string $GLOBALS['hook_suffix'] The current admin page.
 */
do_action("admin_footer-" . $GLOBALS['hook_suffix']);
=======
 * The dynamic portion of the hook name, $GLOBALS['hook_suffix'],
 * refers to the global hook suffix of the current page.
 *
 * @since 2.8.0
 *
 * @param string $hook_suffix The current admin page.
 */
do_action( "admin_footer-" . $GLOBALS['hook_suffix'] );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

// get_site_option() won't exist when auto upgrading from <= 2.7
if ( function_exists('get_site_option') ) {
	if ( false === get_site_option('can_compress_scripts') )
		compression_test();
}

?>

<div class="clear"></div></div><!-- wpwrap -->
<script type="text/javascript">if(typeof wpOnload=='function')wpOnload();</script>
</body>
</html>
