/**
 * CEWE Header Block
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

	blocks.registerBlockType( 'cw-blocks/header', {
		title: __( 'CEWE: Header', 'cw-blocks' ),
		icon: 'universal-access-alt',
		category: 'cewe',
		className: 'header',
		attributes: {
		},

		edit: function( props ) {
			
			var attributes = props.attributes;
		
			return el( 'div', { className: 'header' },

				el( InnerBlocks,
					{ 

						allowedBlocks: [ 'core/button', 'core/heading', 'core/paragraph', 'core/subhead',  'core/list' ],
						allowedBlocksNames: [ 'core/button', 'core/heading', 'core/paragraph', 'core/subhead', 'core/list' ]
	
					},
				),

			);
				
		},

		save: function( props ) { 
			
			var attributes = props.attributes;

			return (
			
				el( 'div', { className: 'header' },

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
