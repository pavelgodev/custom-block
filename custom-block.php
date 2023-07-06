<?php
/**
 * Plugin Name:       Custom Block
 * Description:       Custom block(Accordion) is similar to FAQ section, content can be edited by content writers
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Pavel Moiseenko
 * Author URI:        https://www.linkedin.com/in/pavel-moiseenko-44a27474
 * License:           GPL-2.0
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cb
 *
 */

function acc_custom_block_block_init(): void {
	register_block_type( __DIR__ . '/build/blocks/item' );
	register_block_type( __DIR__ . '/build/blocks/item-wrapper' );
}

add_action( 'init', 'acc_custom_block_block_init' );


function enqueue_js_script(): void {
	wp_enqueue_script('custom-lazy-load', plugins_url('/addLazyLoad.js', __FILE__), [], false,true );
	wp_enqueue_script( 'acc', plugins_url( '/custom.js', __FILE__ ), [], false, true );
}

add_action( 'wp_enqueue_scripts', 'enqueue_js_script' );


add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);

function add_type_attribute( $tag, $handle, $src ) {
	if ( 'custom-lazy-load' === $handle ) {
		return '<script type="module" id="custom-lazy-load-js" src="' . esc_url( $src ) . '"></script>';
	}

	if ( 'acc' === $handle ) {
		return '<script type="module" id="acc-js" src="' . esc_url( $src ) . '"></script>';
	}

	return $tag;
}
