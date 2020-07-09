/**
 * CEWE Wrapper Block
 */
( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var __ = i18n.__;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	var AlignmentToolbar = editor.AlignmentToolbar;
	var BlockControls = editor.BlockControls;
	var InspectorControls = editor.InspectorControls;
	var InnerBlocks = editor.InnerBlocks;

	blocks.registerBlockType( 'cw-blocks/wrapper', {
		title: __( 'CEWE: Wrapper', 'cw-blocks' ),
		icon: 'universal-access-alt',
		category: 'cewe',
		className: 'wrapper',
		attributes: {
		},

		edit: function( props ) {
			
			var attributes = props.attributes;
		
			return el( 'div', { className: 'wrapper' },

				el( InnerBlocks,{},),

			);
				
		},

		save: function( props ) { 
			
			var attributes = props.attributes;

			return (
			
				el( 'div', { className: 'wrapper' },

					el( InnerBlocks.Content, {}),

				)
			
			);
						
				
		},
		
	} );
}(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
) );
