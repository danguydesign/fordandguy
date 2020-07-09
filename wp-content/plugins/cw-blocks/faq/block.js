/**
 * CEWE FAQ Block
 */
( function( blocks, editor, components, i18n, element ) {
	
	var el = element.createElement;
	var BlockControls = editor.BlockControls; 
	var AlignmentToolbar = editor.AlignmentToolbar; 
	var MediaUpload = editor.MediaUpload; 
	var InspectorControls = editor.InspectorControls; 
	var SelectControl = components.SelectControl;
	var RichText = editor.RichText; 
	var InnerBlocks = editor.InnerBlocks; 
	var URLInputButton = editor.URLInputButton;
	var __ = i18n.__;
	
	blocks.registerBlockType( 'cw-blocks/faq', {
		title: i18n.__( 'CEWE: Faq' ), 
		icon: 'editor-help', 
		category: 'cewe', 
		attributes: { 
		
			question: { default: ''  },
			answer: { default: '' }
			
		},

		edit: function( props ) {

			var focus = props.focus;
			var attributes = props.attributes;

			return el( 'div', { className: 'faq' },
			
				el( 'dd', { className: 'faq__question' },

					el( RichText, {
						tagName: 'h3',
						className: 'faq__title',
						inline: true,
						placeholder: i18n.__( 'Question' ),
						value: props.attributes.question,
						onChange: function( value ) {
							props.setAttributes( { question: value } );
						},
					} ),
				
				),	
							
				el( 'dd', { className: 'faq__answer' },

					el( InnerBlocks,
						{ 
						templateLock: false,
						allowedBlocks: [ 'core/button', 'core/heading', 'core/paragraph', 'core/subhead', 'core/list' ],
						allowedBlocksNames: [ 'core/button', 'core/heading', 'core/paragraph', 'core/subhead', 'core/list' ],
						},
					),
						
				),	

			);

		},

		save: function( props ) {
			
			var attributes = props.attributes;
			
			return el( 'div', { className: 'faq' },

				el( 'dt', { className: 'faq__question' }, 

					el( 'h3', { className: 'faq__title' }, props.attributes.question ),

				),
					
				el( 'dd', { className: 'faq__answer' }, el( InnerBlocks.Content, null ) )
					
			);
							
		},
		
	} );

} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);

