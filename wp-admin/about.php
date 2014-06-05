<?php
/**
 * About This Version administration panel.
 *
 * @package WordPress
 * @subpackage Administration
 */

/** WordPress Administration Bootstrap */
require_once( dirname( __FILE__ ) . '/admin.php' );

<<<<<<< HEAD
=======
wp_enqueue_style( 'wp-mediaelement' );
wp_enqueue_script( 'wp-playlist' );
add_action( 'admin_footer', 'wp_underscore_playlist_templates', 0 );

>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
$title = __( 'About' );

list( $display_version ) = explode( '-', $wp_version );

<<<<<<< HEAD
// Temporary 3.8 hack: We want to use user-profile for the color schemes but don't need the heavy zxcvbn.
wp_deregister_script( 'zxcvbn-async' );
wp_register_script( 'zxcvbn-async', false );
wp_enqueue_script( 'user-profile' );

include( ABSPATH . 'wp-admin/admin-header.php' );
?>
=======
include( ABSPATH . 'wp-admin/admin-header.php' );
?>
<!--[if lt IE 9]><script>document.createElement('audio');document.createElement('video');</script><![endif]-->
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
<div class="wrap about-wrap">

<h1><?php printf( __( 'Welcome to WordPress&nbsp;%s' ), $display_version ); ?></h1>

<<<<<<< HEAD
<div class="about-text"><?php printf( __( 'Thank you for updating to WordPress %s, the most beautiful WordPress&nbsp;yet.' ), $display_version ); ?></div>
=======
<div class="about-text"><?php printf( __( 'Thank you for updating! WordPress %s has lots of refinements we think you&#8217;ll love.' ), $display_version ); ?></div>
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

<div class="wp-badge"><?php printf( __( 'Version %s' ), $display_version ); ?></div>

<h2 class="nav-tab-wrapper">
	<a href="about.php" class="nav-tab nav-tab-active">
		<?php _e( 'What&#8217;s New' ); ?>
	</a><a href="credits.php" class="nav-tab">
		<?php _e( 'Credits' ); ?>
	</a><a href="freedoms.php" class="nav-tab">
		<?php _e( 'Freedoms' ); ?>
	</a>
</h2>

<div class="changelog point-releases">
<<<<<<< HEAD
	<h3><?php echo _n( 'Maintenance and Security Release', 'Maintenance and Security Releases', 3 ); ?></h3>
	<p><?php printf( _n( '<strong>Version %1$s</strong> addressed %2$s bug.',
		'<strong>Version %1$s</strong> addressed %2$s bugs.', 2 ), '3.8.3', number_format_i18n( 2 ) ); ?>
		<?php printf( __( 'For more information, see <a href="%s">the release notes</a>.' ), 'http://codex.wordpress.org/Version_3.8.3' ); ?>
 	</p>
	<p><?php printf( _n( '<strong>Version %1$s</strong> addressed some security issues and fixed %2$s bug.',
         '<strong>Version %1$s</strong> addressed some security issues and fixed %2$s bugs.', 9 ), '3.8.2', number_format_i18n( 9 ) ); ?>
		<?php printf( __( 'For more information, see <a href="%s">the release notes</a>.' ), 'http://codex.wordpress.org/Version_3.8.2' ); ?>
 	</p>
	<p><?php printf( _n( '<strong>Version %1$s</strong> addressed %2$s bug.',
		'<strong>Version %1$s</strong> addressed %2$s bugs.', 31 ), '3.8.1', number_format_i18n( 31 ) ); ?>
		<?php printf( __( 'For more information, see <a href="%s">the release notes</a>.' ), 'http://codex.wordpress.org/Version_3.8.1' ); ?>
=======
	<h3><?php echo _n( 'Maintenance Release', 'Maintenance Releases', 1 ); ?></h3>
	<p><?php printf( _n( '<strong>Version %1$s</strong> addressed %2$s bug.',
         '<strong>Version %1$s</strong> addressed %2$s bugs.', 34 ), '3.9.1', number_format_i18n( 34 ) ); ?>
		<?php printf( __( 'For more information, see <a href="%s">the release notes</a>.' ), 'http://codex.wordpress.org/Version_3.9.1' ); ?>
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
 	</p>
</div>

<div class="changelog">
<<<<<<< HEAD
	<h2 class="about-headline-callout"><?php _e( 'Introducing a modern new&nbsp;design' ); ?></h2>
	<img class="about-overview-img" src="<?php echo is_ssl() ? 'https://' : '//s.'; ?>wordpress.org/images/core/3.8/overview.png?1" />
	<div class="feature-section col three-col about-updates">
		<div class="col-1">
			<img src="<?php echo is_ssl() ? 'https://' : '//s.'; ?>wordpress.org/images/core/3.8/aesthetics.png?1" />
			<h3><?php _e( 'Modern aesthetic' ); ?></h3>
			<p><?php _e( 'The new WordPress dashboard has a fresh, uncluttered design that embraces clarity and simplicity.' ); ?></p>
		</div>
		<div class="col-2">
			<img src="<?php echo is_ssl() ? 'https://' : '//s.'; ?>wordpress.org/images/core/3.8/typography.png?1" />
			<h3><?php _e( 'Clean typography' ); ?></h3>
			<p><?php _e( 'The Open Sans typeface provides simple, friendly text that is optimized for both desktop and mobile viewing. It&#8217;s even open source, just like WordPress.' ); ?></p>
		</div>
		<div class="col-3 last-feature">
			<img src="<?php echo is_ssl() ? 'https://' : '//s.'; ?>wordpress.org/images/core/3.8/contrast.png?1" />
			<h3><?php _e( 'Refined contrast' ); ?></h3>
			<p><?php _e( 'We think beautiful design should never sacrifice legibility. With superior contrast and large, comfortable type, the new design is easy to read and a pleasure to navigate.' ); ?></p>
		</div>
	</div>
</div>

<hr>

<div class="changelog">
	<div class="feature-section col two-col">
		<div>
			<h3><?php _e( 'WordPress on every&nbsp;device' ); ?></h3>
			<p><?php _e( 'We all access the internet in different ways. Smartphone, tablet, notebook, desktop &mdash; no matter what you use, WordPress will adapt and you&#8217;ll feel right at home.' ); ?></p>
			<h4><?php _e( 'High definition at high&nbsp;speed' ); ?></h4>
			<p><?php _e( 'WordPress is sharper than ever with new vector-based icons that scale to your screen. By ditching pixels, pages load significantly faster, too.' ); ?></p>
		</div>
		<div class="last-feature about-colors-img">
			<img src="<?php echo is_ssl() ? 'https://' : '//s.'; ?>wordpress.org/images/core/3.8/colors.png?1" />
		</div>
	</div>
</div>

<hr>

<?php
global $_wp_admin_css_colors;
$new_colors = array( 'fresh', 'light', 'blue', 'midnight', 'sunrise', 'ectoplasm', 'ocean', 'coffee' );
$_wp_admin_css_colors = array_intersect_key( $_wp_admin_css_colors, array_fill_keys( $new_colors, true ) );

if ( count( $_wp_admin_css_colors ) > 1 && has_action( 'admin_color_scheme_picker' ) ) : ?>
<div class="changelog about-colors">
	<div class="feature-section col one-col">
		<div>
			<h3><?php _e( 'Pick a color' ); ?></h3>
			<p><?php _e( 'We&#8217;ve included eight color schemes so you can pick your favorite. Choose from any of them below to change it instantly.' ); ?>
				<?php
				/** This action is documented in wp-admin/user-edit.php */
				do_action( 'admin_color_scheme_picker' );
				?>
			<p><?php printf( __( 'To change your color scheme later, just <a href="%1$s">visit your profile</a>.' ), get_edit_profile_url( get_current_user_id() ) ); ?></p>
=======
	<div class="about-overview">
	<?php
	if ( ! is_ssl() && ( $locale = get_locale() ) && 'en_' === substr( $locale, 0, 3 ) ) : ?>
		<embed src="//v0.wordpress.com/player.swf?v=1.03" type="application/x-shockwave-flash" width="640" height="360" wmode="direct" seamlesstabbing="true" allowfullscreen="true" allowscriptaccess="always" overstretch="true" flashvars="guid=sAiXhCfV&amp;isDynamicSeeking=true" title=""></embed>
	<?php else : ?>
		<img class="about-overview-img" src="//s.w.org/images/core/3.9/overview.png?0" />
	<?php endif; ?>
	</div>
	<h2 class="about-headline-callout"><?php _e( 'A smoother media editing&nbsp;experience' ); ?></h2>
	<div class="feature-section col three-col">
		<div class="col-1">
			<img src="//s.w.org/images/core/3.9/editor.jpg?0" />
			<h4><?php _e( 'Improved visual editing' ); ?></h4>
			<p><?php _e( 'The updated visual editor has improved speed, accessibility, and mobile support.' );
				echo ' ' . __( 'You can paste into the visual editor from your word processor without wasting time to clean up messy styling. (Yeah, we&#8217;re talking about you, Microsoft Word.)' ); ?></p>
		</div>
		<div class="col-2">
			<img src="//s.w.org/images/core/3.9/image.gif?0" />
			<h4><?php _e( 'Edit images easily' ); ?></h4>
			<p><?php _e( 'With quicker access to crop and rotation tools, it&#8217;s now much easier to edit your images while editing posts. You can also scale images directly in the editor to find just the right fit.' ); ?></p>
		</div>
		<div class="col-3 last-feature">
			<img src="//s.w.org/images/core/3.9/drop.jpg?0" />
			<h4><?php _e( 'Drag and drop your images' ); ?></h4>
			<p><?php _e( 'Uploading your images is easier than ever. Just grab them from your desktop and drop them onto the editor.' ); ?></p>
		</div>
	</div>

	<hr>

	<div class="feature-section col two-col">
		<div class="col-1">
			<img src="//s.w.org/images/core/3.9/gallery.jpg?0" />
			<h4><?php _e( 'Gallery previews' ); ?></h4>
			<p><?php _e( 'Galleries display a beautiful grid of images right in the editor, just like they do in your published post.' ); ?></p>
		</div>
		<div class="col-2 last-feature">
			<div class="wp-playlist wp-audio-playlist wp-playlist-light">
				<div class="wp-playlist-current-item"></div>
				<audio controls="controls" preload="metadata"></audio>
				<div class="wp-playlist-next"></div>
				<div class="wp-playlist-prev"></div>
				<?php
				$audio_icon_js = esc_js( includes_url( 'images/media/audio.png' ) );
				$wp_host = '//s.w.org/images/core/3.9/';
				?>

				<script type="application/json">{
					"type":"audio",
					"tracklist":true,
					"tracknumbers":true,
					"images":true,
					"artists":true,
					"tracks":[{
						"src":"<?php echo $wp_host ?>AintMisbehavin.mp3",
						"type":"audio\/mpeg","title":"Ain't Misbehavin'","caption":"","description":"",
						"meta":{
							"artist":"Louis Armstrong & His Orchestra",
							"album":"78 RPMs & Cylinder Recordings",
							"genre":"Jazz",
							"length_formatted":"3:21"
						},
						"image":{"src":"//s.w.org/images/core/3.9/louis.jpg","width":308,"height":240},
						"thumb":{"src":"//s.w.org/images/core/3.9/louis.jpg","width":308,"height":240}
					},
					{
						"src":"<?php echo $wp_host ?>JellyRollMorton-BuddyBoldensBlues.mp3",
						"type":"audio\/mpeg","title":"Buddy Bolden's Blues","caption":"","description":"",
						"meta":{
							"artist":"Jelly Roll Morten",
							"album":"78 RPMs & Cylinder Recordings",
							"genre":"Jazz",
							"length_formatted":"2:09"
						},
						"image":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64},
						"thumb":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64}
					},
					{
						"src":"<?php echo $wp_host ?>DavenportBlues.mp3",
						"type":"audio\/mpeg","title":"Davenport Blues","caption":"","description":"",
						"meta":{
							"artist":"Bix Beiderbecke & His Rhythm Jugglers",
							"album":"78 RPMs & Cylinder Recordings",
							"genre":"Jazz",
							"length_formatted":"2:48"
						},
						"image":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64},
						"thumb":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64}
					},
					{
						"src":"<?php echo $wp_host ?>WolverineBlues.mp3",
						"type":"audio\/mpeg","title":"Wolverine Blues","caption":"","description":"",
						"meta":{
							"artist":"Benny Goodman's Boys",
							"album":"78 RPMs & Cylinder Recordings",
							"genre":"Jazz",
							"length_formatted":"2:55"
						},
						"image":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64},
						"thumb":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64}
					},
					{
						"src":"<?php echo $wp_host ?>Louisiana_Five-Dixie_Blues-1919.mp3",
						"type":"audio\/mpeg","title":"Dixie Blues","caption":"","description":"",
						"meta":{
							"artist":"Louisiana Five",
							"album":"78 RPMs & Cylinder Recordings",
							"genre":"Jazz",
							"length_formatted":"3:01"
						},
						"image":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64},
						"thumb":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64}
					},
					{
						"src":"<?php echo $wp_host ?>Johnny_Hodges_Orchestra-Squaty_Roo-1941.mp3",
						"type":"audio\/mpeg","title":"Squaty Roo","caption":"","description":"",
						"meta":{
							"artist":"Johnny Hodges Orchestra",
							"album":"78 RPMs & Cylinder Recordings",
							"genre":"Jazz",
							"length_formatted":"2:24"
						},
						"image":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64},
						"thumb":{"src":"<?php echo $audio_icon_js ?>","width":48,"height":64}
					}]
				}</script>
			</div>
			<h4><?php _e( 'Do more with audio and video' ); ?></h4>
			<p><?php _e( 'Images have galleries; now we&#8217;ve added simple audio and video playlists, so you can showcase your music and clips.' ); ?></p>
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		</div>
	</div>
</div>

<hr>
<<<<<<< HEAD
<?php endif; ?>

<div class="changelog">
	<div class="feature-section col two-col">
		<div>
			<h3><?php _e( 'Refined theme management' ); ?></h3>
			<p><?php _e( 'The new themes screen lets you survey your themes at a glance. Or want more information? Click to discover more. Then sit back and use your keyboard&#8217;s navigation arrows to flip through every theme you&#8217;ve got.' ); ?></p>
			<h4><?php _e( 'Smoother widget experience' ); ?></h4>
			<p><?php _e( 'Drag-drag-drag. Scroll-scroll-scroll. Widget management can be complicated. With the new design, we&#8217;ve worked to streamline the widgets&nbsp;screen.' ); ?></p>
			<p><?php _e( 'Have a large monitor? Multiple widget areas stack side-by-side to use the available space. Using a tablet? Just tap a widget to add it.' ); ?></p>
		</div>
		<div class="last-feature about-themes-img">
			<img src="<?php echo is_ssl() ? 'https://' : '//s.'; ?>wordpress.org/images/core/3.8/themes.png?1" />
=======

<div class="changelog customize">
	<div class="feature-section col two-col">
		<div>
			<?php
				echo wp_video_shortcode( array(
					'mp4'      => '//s.w.org/images/core/3.9/widgets.mp4',
					'ogv'      => '//s.w.org/images/core/3.9/widgets.ogv',
					'webm'     => '//s.w.org/images/core/3.9/widgets.webm',
					'loop'     => true,
					'autoplay' => true,
					'width'    => 499
				) );
			?>
			<h4><?php _e( 'Live widget and header previews' ); ?></h4>
			<p><?php _e( 'Add, edit, and rearrange your site&#8217;s widgets right in the theme customizer. No &#8220;save and surprise&#8221; &mdash; preview your changes live and only save them when you&#8217;re ready.' ); ?></p>
			<p><?php _e( 'The improved header image tool also lets you upload, crop, and manage headers while customizing your theme.' ); ?></p>
		</div>
		<div class="last-feature">
			<img src="//s.w.org/images/core/3.9/theme.jpg?0" />
			<h4><?php _e( 'Stunning new theme browser' ); ?></h4>
			<p><?php _e( 'Looking for a new theme should be easy and fun. Lose yourself in the boundless supply of free WordPress.org themes with the beautiful new theme browser.' ); ?></p>
		<?php if ( current_user_can( 'install_themes' ) ) { ?>
			<p><a href="<?php echo network_admin_url( 'theme-install.php' ); ?>" class="button button-large button-primary"><?php _e( 'Browse Themes' ); ?></a></p>
		<?php } ?>
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
		</div>
	</div>
</div>

<hr>

<<<<<<< HEAD
<div class="changelog about-twentyfourteen">
	<h2 class="about-headline-callout"><?php _e( 'Twenty Fourteen, a sleek new magazine&nbsp;theme' ); ?></h2>
	<img src="<?php echo is_ssl() ? 'https://' : '//s.'; ?>wordpress.org/images/core/3.8/twentyfourteen.jpg?1" />

	<div class="feature-section col one-col center-col">
		<div>
			<h3><?php _e( 'Turn your blog into a&nbsp;magazine' ); ?></h3>
			<p><?php _e( 'Create a beautiful magazine-style site with WordPress and Twenty Fourteen. Choose a grid or a slider to display featured content on your homepage. Customize your site with three widget areas or change your layout with two page templates.' ); ?></p>
			<p><?php _e( 'With a striking design that does not compromise our trademark simplicity, Twenty Fourteen is our most intrepid default theme yet.' ); ?></p>
		</div>
	</div>
=======
<div class="changelog under-the-hood">
	<h3><?php _e( 'Under the Hood' ); ?></h3>

	<div class="feature-section col three-col">
		<div>
			<h4><?php _e( 'Semantic Captions and Galleries' ); ?></h4>
			<p><?php _e( 'Theme developers have new options for images and galleries that use intelligent HTML5 markup.' ); ?></p>

			<h4><?php _e( 'Inline Code Documentation' ); ?></h4>
			<p><?php _e( 'Every action and filter hook in WordPress is now documented, along with expanded documentation for the media manager and customizer APIs.' ); ?></p>
		</div>
		<div>
			<h4><?php _e( 'External Libraries' ); ?></h4>
			<p><?php _e( 'Updated libraries: TinyMCE&nbsp;4, jQuery&nbsp;1.11, Backbone&nbsp;1.1, Underscore&nbsp;1.6, Plupload&nbsp;2, MediaElement&nbsp;2.14, Masonry&nbsp;3.' ); ?></p>

			<h4><?php _e( 'Improved Database Layer' ); ?></h4>
			<p><?php _e( 'Database connections are now more fault-resistant and have improved compatibility with PHP 5.5 and MySQL 5.6.' ); ?></p>
		</div>
		<div class="last-feature">
			<h4><?php _e( 'New Utility Functions' ); ?></h4>
			<p><?php _e( 'Identify a hook in progress with <code>doing_action()</code> and <code>doing_filter()</code>, and manipulate custom image sizes with <code>has_image_size()</code> and <code>remove_image_size()</code>.' ); ?></p>
			<p><?php _e( 'Plugins and themes registering custom image sizes can now register suggested cropping points. For example, prevent heads from being cropped out of photos with a top-center crop.' ); ?></p>
		</div>
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
</div>

<hr>

<div class="return-to-dashboard">
	<?php if ( current_user_can( 'update_core' ) && isset( $_GET['updated'] ) ) : ?>
	<a href="<?php echo esc_url( self_admin_url( 'update-core.php' ) ); ?>"><?php
		is_multisite() ? _e( 'Return to Updates' ) : _e( 'Return to Dashboard &rarr; Updates' );
	?></a> |
	<?php endif; ?>
	<a href="<?php echo esc_url( self_admin_url() ); ?>"><?php
		is_blog_admin() ? _e( 'Go to Dashboard &rarr; Home' ) : _e( 'Go to Dashboard' ); ?></a>
</div>

</div>
<?php

include( ABSPATH . 'wp-admin/admin-footer.php' );

// These are strings we may use to describe maintenance/security releases, where we aim for no new strings.
return;

_n_noop( 'Maintenance Release', 'Maintenance Releases' );
_n_noop( 'Security Release', 'Security Releases' );
_n_noop( 'Maintenance and Security Release', 'Maintenance and Security Releases' );

/* translators: 1: WordPress version number. */
_n_noop( '<strong>Version %1$s</strong> addressed a security issue.',
         '<strong>Version %1$s</strong> addressed some security issues.' );

/* translators: 1: WordPress version number, 2: plural number of bugs. */
_n_noop( '<strong>Version %1$s</strong> addressed %2$s bug.',
         '<strong>Version %1$s</strong> addressed %2$s bugs.' );

/* translators: 1: WordPress version number, 2: plural number of bugs. Singular security issue. */
_n_noop( '<strong>Version %1$s</strong> addressed a security issue and fixed %2$s bug.',
         '<strong>Version %1$s</strong> addressed a security issue and fixed %2$s bugs.' );

/* translators: 1: WordPress version number, 2: plural number of bugs. More than one security issue. */
_n_noop( '<strong>Version %1$s</strong> addressed some security issues and fixed %2$s bug.',
         '<strong>Version %1$s</strong> addressed some security issues and fixed %2$s bugs.' );

__( 'For more information, see <a href="%s">the release notes</a>.' );
