<?php
/**
 * These functions are needed to load Multisite.
 *
 * @since 3.0.0
 *
 * @package WordPress
 * @subpackage Multisite
 */

/**
 * Whether a subdomain configuration is enabled.
 *
 * @since 3.0.0
 *
 * @return bool True if subdomain configuration is enabled, false otherwise.
 */
function is_subdomain_install() {
	if ( defined('SUBDOMAIN_INSTALL') )
		return SUBDOMAIN_INSTALL;

	if ( defined('VHOST') && VHOST == 'yes' )
		return true;

	return false;
}

/**
 * Returns array of network plugin files to be included in global scope.
 *
 * The default directory is wp-content/plugins. To change the default directory
 * manually, define <code>WP_PLUGIN_DIR</code> and <code>WP_PLUGIN_URL</code>
 * in wp-config.php.
 *
 * @access private
 * @since 3.1.0
 * @return array Files to include
 */
function wp_get_active_network_plugins() {
	$active_plugins = (array) get_site_option( 'active_sitewide_plugins', array() );
	if ( empty( $active_plugins ) )
		return array();

	$plugins = array();
	$active_plugins = array_keys( $active_plugins );
	sort( $active_plugins );

	foreach ( $active_plugins as $plugin ) {
		if ( ! validate_file( $plugin ) // $plugin must validate as file
			&& '.php' == substr( $plugin, -4 ) // $plugin must end with '.php'
			&& file_exists( WP_PLUGIN_DIR . '/' . $plugin ) // $plugin must exist
			)
		$plugins[] = WP_PLUGIN_DIR . '/' . $plugin;
	}
	return $plugins;
}

/**
 * Checks status of current blog.
 *
 * Checks if the blog is deleted, inactive, archived, or spammed.
 *
 * Dies with a default message if the blog does not pass the check.
 *
 * To change the default message when a blog does not pass the check,
 * use the wp-content/blog-deleted.php, blog-inactive.php and
 * blog-suspended.php drop-ins.
 *
 * @since 3.0.0
 *
 * @return bool|string Returns true on success, or drop-in file to include.
 */
function ms_site_check() {
	$blog = get_blog_details();

	/**
	 * Filter checking the status of the current blog.
	 *
	 * @since 3.0.0
	 *
	 * @param bool null Whether to skip the blog status check. Default null.
	*/
	$check = apply_filters( 'ms_site_check', null );
	if ( null !== $check )
		return true;

	// Allow super admins to see blocked sites
	if ( is_super_admin() )
		return true;

	if ( '1' == $blog->deleted ) {
		if ( file_exists( WP_CONTENT_DIR . '/blog-deleted.php' ) )
			return WP_CONTENT_DIR . '/blog-deleted.php';
		else
			wp_die( __( 'This user has elected to delete their account and the content is no longer available.' ), '', array( 'response' => 410 ) );
	}

	if ( '2' == $blog->deleted ) {
		if ( file_exists( WP_CONTENT_DIR . '/blog-inactive.php' ) )
			return WP_CONTENT_DIR . '/blog-inactive.php';
		else
			wp_die( sprintf( __( 'This site has not been activated yet. If you are having problems activating your site, please contact <a href="mailto:%1$s">%1$s</a>.' ), str_replace( '@', ' AT ', get_site_option( 'admin_email', 'support@' . get_current_site()->domain ) ) ) );
	}

	if ( $blog->archived == '1' || $blog->spam == '1' ) {
		if ( file_exists( WP_CONTENT_DIR . '/blog-suspended.php' ) )
			return WP_CONTENT_DIR . '/blog-suspended.php';
		else
			wp_die( __( 'This site has been archived or suspended.' ), '', array( 'response' => 410 ) );
	}

	return true;
}

/**
<<<<<<< HEAD
 * Sets current site name.
 *
 * @access private
 * @since 3.0.0
 * @return object $current_site object with site_name
 */
function get_current_site_name( $current_site ) {
	global $wpdb;

	$current_site->site_name = wp_cache_get( $current_site->id . ':site_name', 'site-options' );
	if ( ! $current_site->site_name ) {
		$current_site->site_name = $wpdb->get_var( $wpdb->prepare( "SELECT meta_value FROM $wpdb->sitemeta WHERE site_id = %d AND meta_key = 'site_name'", $current_site->id ) );
		if ( ! $current_site->site_name )
			$current_site->site_name = ucfirst( $current_site->domain );
		wp_cache_set( $current_site->id . ':site_name', $current_site->site_name, 'site-options' );
	}

	return $current_site;
}

/**
 * Sets current_site object.
 *
 * @access private
 * @since 3.0.0
 * @return object $current_site object
 */
function wpmu_current_site() {
	global $wpdb, $current_site, $domain, $path, $sites, $cookie_domain;

	if ( empty( $current_site ) )
		$current_site = new stdClass;

	if ( defined( 'DOMAIN_CURRENT_SITE' ) && defined( 'PATH_CURRENT_SITE' ) ) {
		$current_site->id = defined( 'SITE_ID_CURRENT_SITE' ) ? SITE_ID_CURRENT_SITE : 1;
		$current_site->domain = DOMAIN_CURRENT_SITE;
		$current_site->path   = $path = PATH_CURRENT_SITE;
		if ( defined( 'BLOG_ID_CURRENT_SITE' ) )
			$current_site->blog_id = BLOG_ID_CURRENT_SITE;
		elseif ( defined( 'BLOGID_CURRENT_SITE' ) ) // deprecated.
			$current_site->blog_id = BLOGID_CURRENT_SITE;
		if ( DOMAIN_CURRENT_SITE == $domain )
			$current_site->cookie_domain = $cookie_domain;
		elseif ( substr( $current_site->domain, 0, 4 ) == 'www.' )
			$current_site->cookie_domain = substr( $current_site->domain, 4 );
		else
			$current_site->cookie_domain = $current_site->domain;

		wp_load_core_site_options( $current_site->id );

		return $current_site;
	}

	$current_site = wp_cache_get( 'current_site', 'site-options' );
	if ( $current_site )
		return $current_site;

	$sites = $wpdb->get_results( "SELECT * FROM $wpdb->site" ); // usually only one site
	if ( 1 == count( $sites ) ) {
		$current_site = $sites[0];
		wp_load_core_site_options( $current_site->id );
		$path = $current_site->path;
		$current_site->blog_id = $wpdb->get_var( $wpdb->prepare( "SELECT blog_id FROM $wpdb->blogs WHERE domain = %s AND path = %s", $current_site->domain, $current_site->path ) );
		$current_site = get_current_site_name( $current_site );
		if ( substr( $current_site->domain, 0, 4 ) == 'www.' )
			$current_site->cookie_domain = substr( $current_site->domain, 4 );
		wp_cache_set( 'current_site', $current_site, 'site-options' );
		return $current_site;
	}
	$path = substr( $_SERVER[ 'REQUEST_URI' ], 0, 1 + strpos( $_SERVER[ 'REQUEST_URI' ], '/', 1 ) );

	if ( $domain == $cookie_domain )
		$current_site = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $wpdb->site WHERE domain = %s AND path = %s", $domain, $path ) );
	else
		$current_site = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $wpdb->site WHERE domain IN ( %s, %s ) AND path = %s ORDER BY CHAR_LENGTH( domain ) DESC LIMIT 1", $domain, $cookie_domain, $path ) );

	if ( ! $current_site ) {
		if ( $domain == $cookie_domain )
			$current_site = $wpdb->get_row( $wpdb->prepare("SELECT * FROM $wpdb->site WHERE domain = %s AND path='/'", $domain ) );
		else
			$current_site = $wpdb->get_row( $wpdb->prepare("SELECT * FROM $wpdb->site WHERE domain IN ( %s, %s ) AND path = '/' ORDER BY CHAR_LENGTH( domain ) DESC LIMIT 1", $domain, $cookie_domain, $path ) );
	}

	if ( $current_site ) {
		$path = $current_site->path;
		$current_site->cookie_domain = $cookie_domain;
		return $current_site;
	}

	if ( is_subdomain_install() ) {
		$sitedomain = substr( $domain, 1 + strpos( $domain, '.' ) );
		$current_site = $wpdb->get_row( $wpdb->prepare("SELECT * FROM $wpdb->site WHERE domain = %s AND path = %s", $sitedomain, $path) );
		if ( $current_site ) {
			$current_site->cookie_domain = $current_site->domain;
			return $current_site;
		}

		$current_site = $wpdb->get_row( $wpdb->prepare("SELECT * FROM $wpdb->site WHERE domain = %s AND path='/'", $sitedomain) );
	}

	if ( $current_site || defined( 'WP_INSTALLING' ) ) {
		$path = '/';
		return $current_site;
	}

	// Still no dice.
	wp_load_translations_early();

	if ( 1 == count( $sites ) )
		wp_die( sprintf( __( 'That site does not exist. Please try <a href="%s">%s</a>.' ), 'http://' . $sites[0]->domain . $sites[0]->path ) );
	else
		wp_die( __( 'No site defined on this host. If you are the owner of this site, please check <a href="http://codex.wordpress.org/Debugging_a_WordPress_Network">Debugging a WordPress Network</a> for help.' ) );
=======
 * Retrieve a network object by its domain and path.
 *
 * @since 3.9.0
 *
 * @param string   $domain   Domain to check.
 * @param string   $path     Path to check.
 * @param int|null $segments Path segments to use. Defaults to null, or the full path.
 * @return object|bool Network object if successful. False when no network is found.
 */
function get_network_by_path( $domain, $path, $segments = null ) {
	global $wpdb;

	$domains = $exact_domains = array( $domain );
	$pieces = explode( '.', $domain );

	/*
	 * It's possible one domain to search is 'com', but it might as well
	 * be 'localhost' or some other locally mapped domain.
	 */
	while ( array_shift( $pieces ) ) {
		if ( $pieces ) {
			$domains[] = implode( '.', $pieces );
		}
	}

	/*
	 * If we've gotten to this function during normal execution, there is
	 * more than one network installed. At this point, who knows how many
	 * we have. Attempt to optimize for the situation where networks are
	 * only domains, thus meaning paths never need to be considered.
	 *
	 * This is a very basic optimization; anything further could have drawbacks
	 * depending on the setup, so this is best done per-install.
	 */
	$using_paths = true;
	if ( wp_using_ext_object_cache() ) {
		$using_paths = wp_cache_get( 'networks_have_paths', 'site-options' );
		if ( false === $using_paths ) {
			$using_paths = (bool) $wpdb->get_var( "SELECT id FROM $wpdb->site WHERE path <> '/' LIMIT 1" );
			wp_cache_add( 'networks_have_paths', (int) $using_paths, 'site-options'  );
		}
	}

	$paths = array();
	if ( $using_paths ) {
		$path_segments = array_filter( explode( '/', trim( $path, "/" ) ) );

		/**
		 * Filter the number of path segments to consider when searching for a site.
		 *
		 * @since 3.9.0
		 *
		 * @param int|null $segments The number of path segments to consider. WordPress by default looks at
		 *                           one path segment. The function default of null only makes sense when you
		 *                           know the requested path should match a network.
		 * @param string   $domain   The requested domain.
		 * @param string   $path     The requested path, in full.
		 */
		$segments = apply_filters( 'network_by_path_segments_count', $segments, $domain, $path );

		if ( null !== $segments && count($path_segments ) > $segments ) {
			$path_segments = array_slice( $path_segments, 0, $segments );
		}

		while ( count( $path_segments ) ) {
			$paths[] = '/' . implode( '/', $path_segments ) . '/';
			array_pop( $path_segments );
		}

		$paths[] = '/';
	}

	/**
	 * Determine a network by its domain and path.
	 *
	 * This allows one to short-circuit the default logic, perhaps by
	 * replacing it with a routine that is more optimal for your setup.
	 *
	 * Return null to avoid the short-circuit. Return false if no network
	 * can be found at the requested domain and path. Otherwise, return
	 * an object from wp_get_network().
	 *
	 * @since 3.9.0
	 *
	 * @param null|bool|object $network  Network value to return by path.
	 * @param string           $domain   The requested domain.
	 * @param string           $path     The requested path, in full.
	 * @param int|null         $segments The suggested number of paths to consult.
	 *                                   Default null, meaning the entire path was to be consulted.
	 * @param array            $paths    The paths to search for, based on $path and $segments.
	 */
	$pre = apply_filters( 'pre_get_network_by_path', null, $domain, $path, $segments, $paths );
	if ( null !== $pre ) {
		return $pre;
	}

	// @todo Consider additional optimization routes, perhaps as an opt-in for plugins.
	// We already have paths covered. What about how far domains should be drilled down (including www)?

	$search_domains = "'" . implode( "', '", $wpdb->_escape( $domains ) ) . "'";

	if ( ! $using_paths ) {
		$network = $wpdb->get_row( "SELECT id, domain, path FROM $wpdb->site
			WHERE domain IN ($search_domains) ORDER BY CHAR_LENGTH(domain) DESC LIMIT 1" );
		if ( $network ) {
			return wp_get_network( $network );
		}
		return false;

	} else {
		$search_paths = "'" . implode( "', '", $wpdb->_escape( $paths ) ) . "'";
		$networks = $wpdb->get_results( "SELECT id, domain, path FROM $wpdb->site
			WHERE domain IN ($search_domains) AND path IN ($search_paths)
			ORDER BY CHAR_LENGTH(domain) DESC, CHAR_LENGTH(path) DESC" );
	}

	/*
	 * Domains are sorted by length of domain, then by length of path.
	 * The domain must match for the path to be considered. Otherwise,
	 * a network with the path of / will suffice.
	 */
	$found = false;
	foreach ( $networks as $network ) {
		if ( $network->domain === $domain || "www.$network->domain" === $domain ) {
			if ( in_array( $network->path, $paths, true ) ) {
				$found = true;
				break;
			}
		}
		if ( $network->path === '/' ) {
			$found = true;
			break;
		}
	}

	if ( $found ) {
		return wp_get_network( $network );
	}

	return false;
}

/**
 * Retrieve an object containing information about the requested network.
 *
 * @since 3.9.0
 *
 * @param object|int $network The network's database row or ID.
 * @return object|bool Object containing network information if found, false if not.
 */
function wp_get_network( $network ) {
	global $wpdb;

	if ( ! is_object( $network ) ) {
		$network = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $wpdb->site WHERE id = %d", $network ) );
		if ( ! $network ) {
			return false;
		}
	}

	return $network;
}

/**
 * Retrieve a site object by its domain and path.
 *
 * @since 3.9.0
 *
 * @param string   $domain   Domain to check.
 * @param string   $path     Path to check.
 * @param int|null $segments Path segments to use. Defaults to null, or the full path.
 * @return object|bool Site object if successful. False when no site is found.
 */
function get_site_by_path( $domain, $path, $segments = null ) {
	global $wpdb;

	$path_segments = array_filter( explode( '/', trim( $path, '/' ) ) );

	/**
	 * Filter the number of path segments to consider when searching for a site.
	 *
	 * @since 3.9.0
	 *
	 * @param int|null $segments The number of path segments to consider. WordPress by default looks at
	 *                           one path segment following the network path. The function default of
	 *                           null only makes sense when you know the requested path should match a site.
	 * @param string   $domain   The requested domain.
	 * @param string   $path     The requested path, in full.
	 */
	$segments = apply_filters( 'site_by_path_segments_count', $segments, $domain, $path );

	if ( null !== $segments && count( $path_segments ) > $segments ) {
		$path_segments = array_slice( $path_segments, 0, $segments );
	}

	while ( count( $path_segments ) ) {
		$paths[] = '/' . implode( '/', $path_segments ) . '/';
		array_pop( $path_segments );
	}

	$paths[] = '/';

	/**
	 * Determine a site by its domain and path.
	 *
	 * This allows one to short-circuit the default logic, perhaps by
	 * replacing it with a routine that is more optimal for your setup.
	 *
	 * Return null to avoid the short-circuit. Return false if no site
	 * can be found at the requested domain and path. Otherwise, return
	 * a site object.
	 *
	 * @since 3.9.0
	 *
	 * @param null|bool|object $site     Site value to return by path.
	 * @param string           $domain   The requested domain.
	 * @param string           $path     The requested path, in full.
	 * @param int|null         $segments The suggested number of paths to consult.
	 *                                   Default null, meaning the entire path was to be consulted.
	 * @param array            $paths    The paths to search for, based on $path and $segments.
	 */
	$pre = apply_filters( 'pre_get_site_by_path', null, $domain, $path, $segments, $paths );
	if ( null !== $pre ) {
		return $pre;
	}

	/*
	 * @todo
	 * get_blog_details(), caching, etc. Consider alternative optimization routes,
	 * perhaps as an opt-in for plugins, rather than using the pre_* filter.
	 * For example: The segments filter can expand or ignore paths.
	 * If persistent caching is enabled, we could query the DB for a path <> '/'
	 * then cache whether we can just always ignore paths.
	 */

	// Either www or non-www is supported, not both. If a www domain is requested,
	// query for both to provide the proper redirect.
	$domains = array( $domain );
	if ( 'www.' === substr( $domain, 0, 4 ) ) {
		$domains[] = substr( $domain, 4 );
		$search_domains = "'" . implode( "', '", $wpdb->_escape( $domains ) ) . "'";
	}

	if ( count( $paths ) > 1 ) {
		$search_paths = "'" . implode( "', '", $wpdb->_escape( $paths ) ) . "'";
	}

	if ( count( $domains ) > 1 && count( $paths ) > 1 ) {
		$site = $wpdb->get_row( "SELECT * FROM $wpdb->blogs WHERE domain IN ($search_domains) AND path IN ($search_paths) ORDER BY CHAR_LENGTH(domain) DESC, CHAR_LENGTH(path) DESC LIMIT 1" );
	} elseif ( count( $domains ) > 1 ) {
		$sql = $wpdb->prepare( "SELECT * FROM $wpdb->blogs WHERE path = %s", $paths[0] );
		$sql .= " AND domain IN ($search_domains) ORDER BY CHAR_LENGTH(domain) DESC LIMIT 1";
		$site = $wpdb->get_row( $sql );
	} elseif ( count( $paths ) > 1 ) {
		$sql = $wpdb->prepare( "SELECT * FROM $wpdb->blogs WHERE domain = %s", $domains[0] );
		$sql .= " AND path IN ($search_paths) ORDER BY CHAR_LENGTH(path) DESC LIMIT 1";
		$site = $wpdb->get_row( $sql );
	} else {
		$site = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $wpdb->blogs WHERE domain = %s AND path = %s", $domains[0], $paths[0] ) );
	}

	if ( $site ) {
		// @todo get_blog_details()
		return $site;
	}

	return false;
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
}

/**
 * Displays a failure message.
 *
 * Used when a blog's tables do not exist. Checks for a missing $wpdb->site table as well.
 *
 * @access private
 * @since 3.0.0
 */
function ms_not_installed() {
	global $wpdb, $domain, $path;

	wp_load_translations_early();

	$title = __( 'Error establishing a database connection' );
	$msg  = '<h1>' . $title . '</h1>';
	if ( ! is_admin() )
		die( $msg );
	$msg .= '<p>' . __( 'If your site does not display, please contact the owner of this network.' ) . '';
	$msg .= ' ' . __( 'If you are the owner of this network please check that MySQL is running properly and all tables are error free.' ) . '</p>';
	if ( ! $wpdb->get_var( "SHOW TABLES LIKE '$wpdb->site'" ) )
		$msg .= '<p>' . sprintf( __( '<strong>Database tables are missing.</strong> This means that MySQL is not running, WordPress was not installed properly, or someone deleted <code>%s</code>. You really should look at your database now.' ), $wpdb->site ) . '</p>';
	else
		$msg .= '<p>' . sprintf( __( '<strong>Could not find site <code>%1$s</code>.</strong> Searched for table <code>%2$s</code> in database <code>%3$s</code>. Is that right?' ), rtrim( $domain . $path, '/' ), $wpdb->blogs, DB_NAME ) . '</p>';
	$msg .= '<p><strong>' . __( 'What do I do now?' ) . '</strong> ';
	$msg .= __( 'Read the <a target="_blank" href="http://codex.wordpress.org/Debugging_a_WordPress_Network">bug report</a> page. Some of the guidelines there may help you figure out what went wrong.' );
	$msg .= ' ' . __( 'If you&#8217;re still stuck with this message, then check that your database contains the following tables:' ) . '</p><ul>';
	foreach ( $wpdb->tables('global') as $t => $table ) {
		if ( 'sitecategories' == $t )
			continue;
		$msg .= '<li>' . $table . '</li>';
	}
	$msg .= '</ul>';

	wp_die( $msg, $title );
}
<<<<<<< HEAD
=======

/**
 * This deprecated function formerly set the site_name property of the $current_site object.
 *
 * This function simply returns the object, as before.
 * The bootstrap takes care of setting site_name.
 *
 * @access private
 * @since 3.0.0
 * @deprecated 3.9.0
 *
 * @param object $current_site
 * @return object
 */
function get_current_site_name( $current_site ) {
	_deprecated_function( __FUNCTION__, '3.9' );
	return $current_site;
}

/**
 * This deprecated function managed much of the site and network loading in multisite.
 *
 * The current bootstrap code is now responsible for parsing the site and network load as
 * well as setting the global $current_site object.
 *
 * @access private
 * @since 3.0.0
 * @deprecated 3.9.0
 *
 * @return object
 */
function wpmu_current_site() {
	global $current_site;
	_deprecated_function( __FUNCTION__, '3.9' );
	return $current_site;
}
>>>>>>> aaf7130cc2c2505efce9574ab828fca95caf51e5
