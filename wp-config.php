<?php

define('FORCE_SSL_ADMIN', true);
define('WP_HOME', 'https://fordandguy.co.uk');
define('WP_SITEURL', 'https://fordandguy.co.uk');

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'WPCACHEHOME', '/home/w9nb18b7io54/public_html/fordandguy/wp-content/plugins/wp-super-cache/' );
define('WP_CACHE', true);
define( 'DB_NAME', 'fordandguy' );

/** MySQL database username */
define( 'DB_USER', 'fordandguy' );

/** MySQL database password */
define( 'DB_PASSWORD', 'Design123!' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'r)(i|CqnQCf`-kD:gvDfgqa4dwxc~7{A,h(}A:SABi(<iR$]Be`{^Ebr*DkcgCG?' );
define( 'SECURE_AUTH_KEY',  '<b7rFRyYl]1S5@ 39ehIaCa k/#g.Dac6cFw^1w& |$TsH_E_<-jKsmC@OeLwHWY' );
define( 'LOGGED_IN_KEY',    'JJXNJG6b&nAz~&X%CBxQ?;u]Ut6|;%uH>K|R]}(3I5!c!oe)28D0x%)--QR5PT:/' );
define( 'NONCE_KEY',        ',[x>!VyUXC!V}WyhR;1sc<1pfx;?dcUDEWVV2i+D&kW@|-)HU ?^x[WQ(]oY.!GQ' );
define( 'AUTH_SALT',        '34q5m)0# (AUy(d!HEN${p<:FQ%2y97[>vPm):Rs}o^Au]LlUWR$.RC[nKbc:o{Q' );
define( 'SECURE_AUTH_SALT', ')d[Rptzc(!xS_kfIy}%%mh`X]HK>fC#}WnWx=zCqS&}!~W2_@} kz%>D<$wUl$:^' );
define( 'LOGGED_IN_SALT',   'g;cV}*IP}^aSkd,.(objo=^|wfFbBP+1gr3`-|oKxIn)`T=_=PAObg{^ye:NO 4;' );
define( 'NONCE_SALT',       '?3|F{32^Ddez$zc8.QTS5AH2!sfZ;i:O&5 R9c@T+4l2R=nfTJfcJoC+8)f@6+zb' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
