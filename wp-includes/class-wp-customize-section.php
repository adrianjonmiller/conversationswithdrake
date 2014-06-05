<?php
/**
 * Customize Section Class.
 *
<<<<<<< HEAD
=======
 * A UI container for controls, managed by the WP_Customize_Manager.
 *
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
 * @package WordPress
 * @subpackage Customize
 * @since 3.4.0
 */
class WP_Customize_Section {
<<<<<<< HEAD
	public $manager;
	public $id;
	public $priority       = 10;
	public $capability     = 'edit_theme_options';
	public $theme_supports = '';
	public $title          = '';
	public $description    = '';
=======

	/**
	 * WP_Customize_Manager instance.
	 *
	 * @since 3.4.0
	 * @access public
	 * @var WP_Customize_Manager
	 */
	public $manager;

	/**
	 * Unique identifier.
	 *
	 * @since 3.4.0
	 * @access public
	 * @var string
	 */
	public $id;

	/**
	 * Priority of the section which informs load order of sections.
	 *
	 * @since 3.4.0
	 * @access public
	 * @var integer
	 */
	public $priority = 10;

	/**
	 * Capability required for the section.
	 *
	 * @since 3.4.0
	 * @access public
	 * @var string
	 */
	public $capability = 'edit_theme_options';

	/**
	 * Theme feature support for the section.
	 *
	 * @since 3.4.0
	 * @access public
	 * @var string|array
	 */
	public $theme_supports = '';

	/**
	 * Title of the section to show in UI.
	 *
	 * @since 3.4.0
	 * @access public
	 * @var string
	 */
	public $title = '';

	/**
	 * Description to show in the UI.
	 *
	 * @since 3.4.0
	 * @access public
	 * @var string
	 */
	public $description = '';

	/**
	 * Customizer controls for this section.
	 *
	 * @since 3.4.0
	 * @access public
	 * @var array
	 */
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
	public $controls;

	/**
	 * Constructor.
	 *
<<<<<<< HEAD
	 * @since 3.4.0
	 *
	 * @param WP_Customize_Manager $manager
	 * @param string $id An specific ID of the section.
	 * @param array $args Section arguments.
=======
	 * Any supplied $args override class property defaults.
	 *
	 * @since 3.4.0
	 *
	 * @param WP_Customize_Manager $manager Customizer bootstrap instance.
	 * @param string               $id      An specific ID of the section.
	 * @param array                $args    Section arguments.
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
	 */
	function __construct( $manager, $id, $args = array() ) {
		$keys = array_keys( get_class_vars( __CLASS__ ) );
		foreach ( $keys as $key ) {
			if ( isset( $args[ $key ] ) )
				$this->$key = $args[ $key ];
		}

		$this->manager = $manager;
		$this->id = $id;

		$this->controls = array(); // Users cannot customize the $controls array.

		return $this;
	}

	/**
<<<<<<< HEAD
	 * Check if the theme supports the section and check user capabilities.
=======
	 * Checks required user capabilities and whether the theme has the
	 * feature support required by the section.
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
	 *
	 * @since 3.4.0
	 *
	 * @return bool False if theme doesn't support the section or user doesn't have the capability.
	 */
	public final function check_capabilities() {
		if ( $this->capability && ! call_user_func_array( 'current_user_can', (array) $this->capability ) )
			return false;

		if ( $this->theme_supports && ! call_user_func_array( 'current_theme_supports', (array) $this->theme_supports ) )
			return false;

		return true;
	}

	/**
	 * Check capabilities and render the section.
	 *
	 * @since 3.4.0
	 */
	public final function maybe_render() {
		if ( ! $this->check_capabilities() )
			return;

<<<<<<< HEAD
		do_action( 'customize_render_section', $this );
		do_action( 'customize_render_section_' . $this->id );
=======
		/**
		 * Fires before rendering a Customizer section.
		 *
		 * @since 3.4.0
		 *
		 * @param WP_Customize_Section $this WP_Customize_Section instance.
		 */
		do_action( 'customize_render_section', $this );
		/**
		 * Fires before rendering a specific Customizer section.
		 *
		 * The dynamic portion of the hook name, $this->id, refers to the ID
		 * of the specific Customizer section to be rendered.
		 *
		 * @since 3.4.0
		 */
		do_action( "customize_render_section_{$this->id}" );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

		$this->render();
	}

	/**
<<<<<<< HEAD
	 * Render the section.
=======
	 * Render the section, and the controls that have been added to it.
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
	 *
	 * @since 3.4.0
	 */
	protected function render() {
		?>
		<li id="accordion-section-<?php echo esc_attr( $this->id ); ?>" class="control-section accordion-section">
			<h3 class="accordion-section-title" tabindex="0"><?php echo esc_html( $this->title ); ?></h3>
			<ul class="accordion-section-content">
				<?php if ( ! empty( $this->description ) ) : ?>
				<li><p class="description"><?php echo $this->description; ?></p></li>
				<?php endif; ?>
				<?php
				foreach ( $this->controls as $control )
					$control->maybe_render();
				?>
			</ul>
		</li>
		<?php
	}
}
