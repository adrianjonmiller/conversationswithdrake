<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * Please see /external/starkers-utilities.php for info on Starkers_Utilities::get_template_parts()
 *
 * @package 	WordPress
 * @subpackage 	Starkers
 * @since 		Starkers 4.0
 */
?>
<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>


<?php
			$args = array( 'post_type' => 'post', 'order' => 'DES', 'orderby' => 'date', 'showposts' => 5, 'paged' => 'paged' );
			$loop = new WP_Query( $args );?>
			<?php while ( $loop->have_posts() ) : $loop->the_post();?>
			<article class="module">
				<h3>	<?php the_title(); ?> </h3>
				<?php the_content(); ?>
			</article>
<?php endwhile; ?>

<nav>
	<?php previous_posts_link('&laquo; Newer') ?>
  <?php next_posts_link('Older &raquo;') ?>
 </nav>

</div>

<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>