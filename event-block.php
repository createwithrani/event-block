<?php
/**
 * Plugin Name:       Event Block
 * Description:       Easily add event listing with an Add to Calendar button to your website.
 * Requires at least: 5.8
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Aurooba Ahmed
 * Author URI:        https://createwithrani.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rani-event-block
 * @package           createwithrani
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function createwithrani_event_block_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'createwithrani_event_block_block_init' );
