/**
 * CEWE Products Block
 */
( function( blocks, editor, components, i18n, element ) {
	
	var el = element.createElement;
	//var children = wp.blocks.source.children;
	var BlockControls = editor.BlockControls;
	var AlignmentToolbar = editor.AlignmentToolbar;
	var MediaUpload = editor.MediaUpload;
	var InspectorControls = editor.InspectorControls;
	var TextControl = components.TextControl;
	var SelectControl = components.SelectControl;
	var Editable = editor.Editable;
	var RichText = editor.RichText;
	var PlainText = editor.PlainText;
	var Button = editor.Button;
	var InnerBlocks = editor.InnerBlocks;
	var URLInputButton = editor.URLInputButton;
	var __ = i18n.__;
	
	blocks.registerBlockType( 'cw-blocks/products', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'CEWE: Products' ), // The title of our block.
		icon: 'columns', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'cewe', // The category of the block.
		attributes: { // Necessary for saving block content.
			
			alignment: {
				type: 'string',
				default: 'center',
			},
			
			backgroundColor: {
				type: 'string',
				default: '#fff'
			},
		
			contents: { type: 'array', default: [] },
			titles: { type: 'array', default: [] },
			imageUrls: { type: 'array', default: [] },
			imageIds: { type: 'array', default: [] },
			linkTexts: { type: 'array', default: [] },
			linkUrls: { type: 'array', default: [] },
			prices: { type: 'array', default: [] },
			columns: {
				type: 'select',
				default: '3'
			},
	
		},

		edit: function( props ) {

			var focus = props.focus;
			var focusedEditable = props.focus ? props.focus.editable || 'productsOneTitle' : null;
			var alignment = props.attributes.alignment;
			var attributes = props.attributes;
			var columns = props.attributes.columns;
			
			function onChangeCols( newColumns ) {
				props.setAttributes( { columns: newColumns } );
			}

			// On selecting a new image
			var onSelectImage = function( media ) {
				
				var id = parseInt(this);

				var image_urls = [];
				var image_ids = [];
				
				for (var k=0; k<props.attributes.imageUrls.length; k++) {
					
					image_urls.push(props.attributes.imageUrls[k]);
					image_ids.push(props.attributes.imageIds[k]);
					
				}
				
				image_urls[id] = media.url;
				image_ids[id] = media.id;
				
				return props.setAttributes( { imageUrls: image_urls, imageIds: image_ids } );
								
			};
			
			// On render image
			var onRenderImage = function(obj) {
				
				var id = parseInt(this);
				
				return el( components.Button, {
						className: 'components-button button button-large',
						onClick: obj.open
					},
					props.attributes.imageIds[id] ?  i18n.__( 'Change Image' ) : i18n.__( 'Upload Image' )
				);
				
			}
			
			// On changing titles
			var onChangeTitle = function( title ) {
				
				var id = parseInt(this);
			
				var new_titles = [];
				
				for (var k=0; k<props.attributes.titles.length; k++) {
					
					new_titles.push(props.attributes.titles[k]);
					
				}
				
				new_titles[id] = title;
				
				props.setAttributes( { titles: new_titles } );
				
			};

			// On changing contents
			var onChangeContent = function( content ) {
				
				var id = parseInt(this);
			
				var new_contents = [];
				
				for (var k=0; k<props.attributes.contents.length; k++) {
					
					new_contents.push(props.attributes.contents[k]);
					
				}
				
				new_contents[id] = content;
				
				props.setAttributes( { contents: new_contents } );
				
			}
			
			// On changing contents
			var onChangePrice = function( price ) {
				
				var id = parseInt(this);
			
				var new_prices = [];
				
				for (var k=0; k<props.attributes.prices.length; k++) {
					
					new_prices.push(props.attributes.prices[k]);
					
				}
				
				new_prices[id] = price;
				
				props.setAttributes( { prices: new_prices } );
				
			}
			
			// On changing link text
			var onChangeLinkText = function( content ) {
				
				var id = parseInt(this);
			
				var new_texts = [];
				
				for (var k=0; k<props.attributes.linkTexts.length; k++) {
					
					new_texts.push(props.attributes.linkTexts[k]);
					
				}
				
				new_texts[id] = content;
				
				props.setAttributes( { linkTexts: new_texts } );
				
			}
			
			// On changing link urls
			var onChangeLinkUrl = function( url ) {
				
				var id = parseInt(this);
			
				var new_urls = [];
				
				for (var k=0; k<props.attributes.linkUrls.length; k++) {
					
					new_urls.push(props.attributes.linkUrls[k]);
					
				}
				
				new_urls[id] = url;
				
				props.setAttributes( { linkUrls: new_urls } );
				
			}

			// On change alignment
			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}
			
			// Edit products
			function editProducts( props ) {
				
				var attributes = props.attributes;
				var columns = props.attributes.columns;
				var output = [];
	
				for (var j=0; j<columns; j++) {
					
					var id = j;
			
					var label = j;
					label++;

					var products = el( 'li', {className: 'product-card cw-grid-item product__card-' + id, style: { }},	
					
						el( 'article', { className: 'product-card__container' },
						
							el( 'a', { href: props.attributes.linkUrls[id], className: 'product-card__link product-card__link-' + id },

							el( 'header', { className: 'product-card__image' },	
							
								el( 'div', { className: 'product-card__buttons' },

									el( URLInputButton, {
										url: props.attributes.linkUrls[id],
										onChange: onChangeLinkUrl.bind(id),
									} ),

									el( MediaUpload, {
										onSelect: onSelectImage.bind(id),
										type: 'image',
										value: props.attributes.imageIds[id],
										render: onRenderImage.bind(id),
									}),
									
								),

								props.attributes.imageIds[id] ?
								el( 'img', { src: props.attributes.imageUrls[id], className: 'product-card__visual', style: {} } ) : el( 'img', { src: 'https://cewe-photoworld.com/images/placeholder-600x400.jpg', className: 'product-card__visual', style: {} } ),

							),
								
							el( 'section', {className: 'product-card__summary product-card__summary-'+id, style: { textAlign: alignment } },
							
								el( RichText, {
									tagName: 'h3',
									className: 'product-card__title product-card__title-'+id,
									inline: true,
									placeholder: i18n.__( 'Title ' + label ),
									value: props.attributes.titles[id],
									onChange: onChangeTitle.bind(id),
								} ),
									
								el( RichText, {
									tagName: 'p',
									className: 'product-card__subtitle product-card__subtitle-'+id,
									inline: true,
									placeholder: i18n.__( 'Content ' + label ),
									value: props.attributes.contents[id],
									onChange: onChangeContent.bind(id), 
								} ),
								
							),
								
							el( 'footer', { className: 'product-card__details' },

								el( RichText, {
									tagName: 'strong',
									className: 'product-card__price product-card__price-'+id, 
									placeholder: i18n.__( 'From price' ),
									value: props.attributes.prices[id],
									onChange: onChangePrice.bind(id),
								}),
									
								el( 'span', { className: 'product-card__button product-card__button-' + id }, 'Explore' ),
									
							),
								
							),
										
						),
								

					);
								
					output.push(products);

				}
					
				return output;
					
			}

			return [
			
				el( // Display controls when the block is clicked on.
					BlockControls,
					{ key: 'controls' },
					el(
						AlignmentToolbar,
						{
							value: alignment,
							onChange: onChangeAlignment,
						}
					),
				),
						
				el(
					InspectorControls,
					{ key: 'inspector' },
					
					el( 'h3', {}, i18n.__( 'Layout' ) ), // The number of columns.
					el(
						SelectControl,
						{
							type: 'number',
							label: i18n.__( 'Number of products' ),
							value: columns,
							onChange: onChangeCols,
							options: [
							   { value: '3', label: i18n.__( '3' ) },
							    { value: '4', label: i18n.__( '4' ) }
							],
						}
					),
					
					
		
					el( components.PanelColor, 
						{
							colorValue: attributes.backgroundColor,
							title: __( 'Background Color' ),
						},
						el( components.ColorPalette, {
							value: attributes.backgroundColor,
							colors: [ 
								{ name: 'white', color: '#fff' }, 
								{ name: 'very-light-grey', color: '#fafafa' }, 
								{ name: 'light-grey', color: '#efefef' }, 
								{ name: 'dark-grey', color: '#222' }, 
							],
							title: __( 'Background Color' ),
							onChange: function( value ) {
								props.setAttributes( { backgroundColor: value } );
							},
						} ),

					),

				),
			
			
				el( 'div', { className: props.className + ' product-cards product-cards__columns-' + columns, style: { background: props.attributes.backgroundColor } },
					
					el( 'ul', { className: 'product-cards__container', style: { } },
					
						editProducts(props),
					
					),
					
				)
			
			];
		},

		save: function() {
			
			 return null;
				
		},
		
	} );

} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);

