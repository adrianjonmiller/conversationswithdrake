<?php
/**
 * The Template for displaying all single posts
 *
 * Please see /external/starkers-utilities.php for info on Starkers_Utilities::get_template_parts()
 *
 * @package 	WordPress
 * @subpackage 	Starkers
 * @since 		Starkers 4.0
 */
?>
<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

	<article class="module post">
		<h3 class="post-header"><span><?php the_title(); ?></span></h3>
		<?php the_content(); ?>
		<time class="post-date" datetime="<?php the_time( 'Y-m-d' ); ?>" pubdate><?php the_date(); ?> <?php the_time(); ?></time>
	</article>
<a href="<?php print $_SERVER['HTTP_REFERER'];?>">&lt;&lt; Back</a>

<?php endwhile; ?>

<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>