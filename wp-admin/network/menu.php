<?php
/**
 * Build Network Administration Menu.
 *
 * @package WordPress
 * @subpackage Multisite
 * @since 3.1.0
 */

/* translators: Network menu item */
<<<<<<< HEAD
$menu[2] = array(__('Dashboard'), 'manage_network', 'index.php', '', 'menu-top menu-top-first menu-icon-dashboard', 'menu-dashboard', 'div');
=======
$menu[2] = array(__('Dashboard'), 'manage_network', 'index.php', '', 'menu-top menu-top-first menu-icon-dashboard', 'menu-dashboard', 'dashicons-dashboard');
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

$menu[4] = array( '', 'read', 'separator1', '', 'wp-menu-separator' );

/* translators: Sites menu item */
<<<<<<< HEAD
$menu[5] = array(__('Sites'), 'manage_sites', 'sites.php', '', 'menu-top menu-icon-site', 'menu-site', 'div');
$submenu['sites.php'][5]  = array( __('All Sites'), 'manage_sites', 'sites.php' );
$submenu['sites.php'][10]  = array( _x('Add New', 'site'), 'create_sites', 'site-new.php' );

$menu[10] = array(__('Users'), 'manage_network_users', 'users.php', '', 'menu-top menu-icon-users', 'menu-users', 'div');
=======
$menu[5] = array(__('Sites'), 'manage_sites', 'sites.php', '', 'menu-top menu-icon-site', 'menu-site', 'dashicons-admin-network');
$submenu['sites.php'][5]  = array( __('All Sites'), 'manage_sites', 'sites.php' );
$submenu['sites.php'][10]  = array( _x('Add New', 'site'), 'create_sites', 'site-new.php' );

$menu[10] = array(__('Users'), 'manage_network_users', 'users.php', '', 'menu-top menu-icon-users', 'menu-users', 'dashicons-admin-users');
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
$submenu['users.php'][5]  = array( __('All Users'), 'manage_network_users', 'users.php' );
$submenu['users.php'][10]  = array( _x('Add New', 'user'), 'create_users', 'user-new.php' );

$update_data = wp_get_update_data();

if ( $update_data['counts']['themes'] ) {
<<<<<<< HEAD
	$menu[15] = array(sprintf( __( 'Themes %s' ), "<span class='update-plugins count-{$update_data['counts']['themes']}'><span class='theme-count'>" . number_format_i18n( $update_data['counts']['themes'] ) . "</span></span>" ), 'manage_network_themes', 'themes.php', '', 'menu-top menu-icon-appearance', 'menu-appearance', 'div' );
} else {
	$menu[15] = array( __( 'Themes' ), 'manage_network_themes', 'themes.php', '', 'menu-top menu-icon-appearance', 'menu-appearance', 'div' );
=======
	$menu[15] = array(sprintf( __( 'Themes %s' ), "<span class='update-plugins count-{$update_data['counts']['themes']}'><span class='theme-count'>" . number_format_i18n( $update_data['counts']['themes'] ) . "</span></span>" ), 'manage_network_themes', 'themes.php', '', 'menu-top menu-icon-appearance', 'menu-appearance', 'dashicons-admin-appearance' );
} else {
	$menu[15] = array( __( 'Themes' ), 'manage_network_themes', 'themes.php', '', 'menu-top menu-icon-appearance', 'menu-appearance', 'dashicons-admin-appearance' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
}
$submenu['themes.php'][5]  = array( __('Installed Themes'), 'manage_network_themes', 'themes.php' );
$submenu['themes.php'][10] = array( _x('Add New', 'theme'), 'install_themes', 'theme-install.php' );
$submenu['themes.php'][15] = array( _x('Editor', 'theme editor'), 'edit_themes', 'theme-editor.php' );

if ( current_user_can( 'update_plugins' ) ) {
<<<<<<< HEAD
	$menu[20] = array( sprintf( __( 'Plugins %s' ), "<span class='update-plugins count-{$update_data['counts']['plugins']}'><span class='plugin-count'>" . number_format_i18n( $update_data['counts']['plugins'] ) . "</span></span>" ), 'manage_network_plugins', 'plugins.php', '', 'menu-top menu-icon-plugins', 'menu-plugins', 'div');
} else {
	$menu[20] = array( __('Plugins'), 'manage_network_plugins', 'plugins.php', '', 'menu-top menu-icon-plugins', 'menu-plugins', 'div' );
=======
	$menu[20] = array( sprintf( __( 'Plugins %s' ), "<span class='update-plugins count-{$update_data['counts']['plugins']}'><span class='plugin-count'>" . number_format_i18n( $update_data['counts']['plugins'] ) . "</span></span>" ), 'manage_network_plugins', 'plugins.php', '', 'menu-top menu-icon-plugins', 'menu-plugins', 'dashicons-admin-plugins');
} else {
	$menu[20] = array( __('Plugins'), 'manage_network_plugins', 'plugins.php', '', 'menu-top menu-icon-plugins', 'menu-plugins', 'dashicons-admin-plugins' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
}
$submenu['plugins.php'][5]  = array( __('Installed Plugins'), 'manage_network_plugins', 'plugins.php' );
$submenu['plugins.php'][10] = array( _x('Add New', 'plugin'), 'install_plugins', 'plugin-install.php' );
$submenu['plugins.php'][15] = array( _x('Editor', 'plugin editor'), 'edit_plugins', 'plugin-editor.php' );

<<<<<<< HEAD
$menu[25] = array(__('Settings'), 'manage_network_options', 'settings.php', '', 'menu-top menu-icon-settings', 'menu-settings', 'div');
=======
$menu[25] = array(__('Settings'), 'manage_network_options', 'settings.php', '', 'menu-top menu-icon-settings', 'menu-settings', 'dashicons-admin-settings');
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
if ( defined( 'MULTISITE' ) && defined( 'WP_ALLOW_MULTISITE' ) && WP_ALLOW_MULTISITE ) {
	$submenu['settings.php'][5]  = array( __('Network Settings'), 'manage_network_options', 'settings.php' );
	$submenu['settings.php'][10] = array( __('Network Setup'), 'manage_network_options', 'setup.php' );
}

if ( $update_data['counts']['total'] ) {
<<<<<<< HEAD
	$menu[30] = array( sprintf( __( 'Updates %s' ), "<span class='update-plugins count-{$update_data['counts']['total']}' title='{$update_data['title']}'><span class='update-count'>" . number_format_i18n($update_data['counts']['total']) . "</span></span>" ), 'manage_network', 'upgrade.php', '', 'menu-top menu-icon-tools', 'menu-update', 'div' );
} else {
	$menu[30] = array( __( 'Updates' ), 'manage_network', 'upgrade.php', '', 'menu-top menu-icon-tools', 'menu-update', 'div' );
=======
	$menu[30] = array( sprintf( __( 'Updates %s' ), "<span class='update-plugins count-{$update_data['counts']['total']}' title='{$update_data['title']}'><span class='update-count'>" . number_format_i18n($update_data['counts']['total']) . "</span></span>" ), 'manage_network', 'upgrade.php', '', 'menu-top menu-icon-tools', 'menu-update', 'dashicons-admin-tools' );
} else {
	$menu[30] = array( __( 'Updates' ), 'manage_network', 'upgrade.php', '', 'menu-top menu-icon-tools', 'menu-update', 'dashicons-admin-tools' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
}

unset($update_data);

$submenu[ 'upgrade.php' ][10] = array( __( 'Available Updates' ), 'update_core', 'update-core.php' );
$submenu[ 'upgrade.php' ][15] = array( __( 'Upgrade Network' ), 'manage_network', 'upgrade.php' );

<<<<<<< HEAD
$menu[99] = array( '', 'read', 'separator-last', '', 'wp-menu-separator-last' );
=======
$menu[99] = array( '', 'exist', 'separator-last', '', 'wp-menu-separator' );
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5

require_once(ABSPATH . 'wp-admin/includes/menu.php');
