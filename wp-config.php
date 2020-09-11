<?php
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
define( 'DB_NAME', 'fordandguy' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

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
define( 'AUTH_KEY',         '*,xIcg9Yd5u(LY#G]xLK2>E=o:c<|j4l#_T3q<gF[!3}<u0hcW:z/18qIH(s0ogG' );
define( 'SECURE_AUTH_KEY',  'm5KHcOj6KU^aDNa461*p{,9UU)WD)ch#w%7m.Ec9TwxZfh0;i.`B8v8,BVvNxwCx' );
define( 'LOGGED_IN_KEY',    '`sC]K(Bq u)3RAVn}<iicQnKg}u|=qT1dm^ |=5>i0UB):NQ/OnVb2DcI:w%inFK' );
define( 'NONCE_KEY',        'ulo){v&> uW_=!&p8yN#;KO8Q)!2 `f)s?;j<}b yk73^-22LqkGPC~u:VM)^Tp%' );
define( 'AUTH_SALT',        ' .I(SF?-hUbD9b>Hn9FFO(o+yFsV76A=[:lJ*!3JYK9%Nr<NLu;Fnv_x=Ve.xIy+' );
define( 'SECURE_AUTH_SALT', 'o69I1d^I^($Tpi@_iJ|ZA2SJH0;(P,<[qqmeJ%H2T0?Qi#Kid, Ov!8Gu.<=KiIH' );
define( 'LOGGED_IN_SALT',   'P5p,dvCI{s5*|G <S4}$_Lrh(*mq>?x<HimFCNeeeCbntC72Ol9ymDD~?%w>f@={' );
define( 'NONCE_SALT',       'X}-2s64@&@qU;ITDsC3cI h=D((RY_9KO?,Ej|[lmd~q6$`|]N}e#`-.XpJ)<ZZj' );

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
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
