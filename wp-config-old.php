<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'cwd_wordpress');

/** MySQL database username */
define('DB_USER', 'cwd_wordpress');

/** MySQL database password */
define('DB_PASSWORD', '#a7Db>&]-E9ibk');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '3/O{{C*fA<69n|~crvFP>jWE?5a=3B_-6#0 NOcq$w4->oR}{DqUW_&dE?E!CAL,');
define('SECURE_AUTH_KEY',  'Gb.*d|N;2gAi1dB_{r4+=4<p>0s~9<jR.%<|6_,9Biov]TZW.AgODE1#G?&r-F0I');
define('LOGGED_IN_KEY',    ')nFh!0`)TTya56%/>o6@g7b65{ab&{N8bD1HKbEk|ll^-aS{)_e}0T&r-$5B#t!S');
define('NONCE_KEY',        'SH@8ce@!jY!|f|Z<D/p=.gMX>Kye/*qi(GGXnW[WH.bi,s|pr-,AaL#EB1-eq*ar');
define('AUTH_SALT',        'lGogqkU@t}f<nH1@}yjA|)<zmTgLI[.yW5_Vg(_LH6v/$@wj=|z0]*l*F=!0|h-y');
define('SECURE_AUTH_SALT', 'XvoEe|{*}Z=cGWC{eQb.^3I+?IR1|<S+f)vD+Wm &DgG[M9ZI[yx%g]x?xc4FyRA');
define('LOGGED_IN_SALT',   'bvue)+bka#!9r!1b_!-D81TSBfbZ:`C2lGGK+)7u3~>[G{VHp65-aXAB~T9>j3p*');
define('NONCE_SALT',       '}hzpS%jG4P_,u-jEcxjbFM.riISd~;S)aBw>/;ApgLsI ACJ*e&TmpH)%:rAbx[I');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'cwd20140610_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

