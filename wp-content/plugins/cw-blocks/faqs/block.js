/**
 * CEWE Faqs Block
 */
( function( blocks, editor, components, i18n, element ) {
	
	var el = element.createElement;
	var Fragment = element.Fragment;
	var BlockControls = editor.BlockControls; 
	var AlignmentToolbar = editor.AlignmentToolbar; 
	var MediaUpload = editor.MediaUpload; 
	var InspectorControls = editor.InspectorControls; 
	var SelectControl = components.SelectControl;
	var RangeControl = components.RangeControl;
	var CheckboxControl = components.CheckboxControl;
	var RichText = editor.RichText; 
	var InnerBlocks = editor.InnerBlocks; 
	var URLInputButton = editor.URLInputButton;
	var __ = i18n.__;
	
	function getFaqsTemplate(faqs) {
	
		var templates = new Array();
		
		for (var i=0; i<faqs; i++) {
			
			var template = ['cw-blocks/faq'];
			
			templates.push( template );
		}
		
		return templates;
		
	}

	blocks.registerBlockType( 'cw-blocks/faqs', {
		title: i18n.__( 'CEWE: Faqs' ), 
		icon: 'editor-help',
		category: 'cewe',
		attributes: { 
			
			faqs: {
				type: 'number',
				default: '3'
			}
			
		},

		edit: function( props ) {
			
			function onChangeFaqs( value ) {
				props.setAttributes( { faqs: value } );
			}
			
			return [

				el( 
					BlockControls,
					{ key: 'controls' },
					
				),
						
				el(
					InspectorControls,
					{ key: 'inspector' },
					
					el( 'h3', {}, i18n.__( 'Layout' ) ),
						
					el(
						RangeControl,
						{
						
							label: i18n.__( 'Number of faqs' ),
							value: props.attributes.faqs,
							onChange: onChangeFaqs,
							min:  2,
							max: 6
						}
					),
						
				),

				el('div', {className: 'faqs faqs--' + props.attributes.faqs },
					
					el( 'dl', { className: 'faqs__container', style: { } },
						
						el( InnerBlocks,
							
							{
									
								allowedBlocks: [ 'cw-blocks/faq' ],
								template: getFaqsTemplate(props.attributes.faqs),
								templateLock: "all"
									
							},
											
						),
								
					),
						
				),
							
			];
		},

		save: function(props) {
			
			return (
			
				el( 'div', { className: props.className + ' faqs faqs--' + props.attributes.faqs },
				
					el( 'dl', { className: 'faqs__container' },
						
						el( InnerBlocks.Content, {} ),
								
					),
									
				)

				
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