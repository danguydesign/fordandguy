/**
 * CEWE Squares Block
 */
( function( blocks, editor, components, i18n, element ) {
	
	var el = element.createElement;
	//var children = wp.blocks.source.children;
	var BlockControls = editor.BlockControls;
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
	
	blocks.registerBlockType( 'cw-blocks/squares', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'CEWE: Squares' ), // The title of our block.
		icon: 'screenoptions', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'cewe', // The category of the block.
		attributes: { // Necessary for saving block content.
		
			contents: { type: 'array', default: [] },
			titles: { type: 'array', default: ['Title', 'Title', 'Title'] },
			backgroundUrls: { type: 'array', default: [] },
			backgroundIds: { type: 'array', default: [] },
			imageUrls: { type: 'array', default: [] },
			imageIds: { type: 'array', default: [] },
			imageAlts: { type: 'array', default: [] },
			linkTexts: { type: 'array', default: ['Read more', 'Read more', 'Read more'] },
			linkUrls: { type: 'array', default: [] },
	
		},

		edit: function( props ) {

			var focus = props.focus;
			var focusedEditable = props.focus ? props.focus.editable || 'squareOneTitle' : null;
			var attributes = props.attributes;
			var columns = props.attributes.columns;

			// On selecting a new background
			var onSelectBackground = function( media ) {
				
				var id = parseInt(this);

				var background_urls = [];
				var background_ids = [];
				
				for (var k=0; k<props.attributes.backgroundUrls.length; k++) {
					
					background_urls.push(props.attributes.backgroundUrls[k]);
					background_ids.push(props.attributes.backgroundIds[k]);
					
				}
				
				background_urls[id] = media.url;
				background_ids[id] = media.id;
				
				return props.setAttributes( { backgroundUrls: background_urls, backgroundIds: background_ids } );
				
			};
			
			// On render background
			var onRenderBackground = function(obj) {
				
				var id = parseInt(this);
				
				return el( components.Button, {
						className: 'components-button button button-large',
						onClick: obj.open
					},
					props.attributes.backgroundIds[id] ?  i18n.__( 'Change Background' ) : i18n.__( 'Upload Background' )
				);
				
			};
			
			// On selecting a new image
			var onSelectImage = function( media ) {
				
				var id = parseInt(this);

				var image_urls = [];
				var image_ids = [];
				var image_alts = [];
				
				for (var k=0; k<props.attributes.imageUrls.length; k++) {
					
					image_urls.push(props.attributes.imageUrls[k]);
					image_ids.push(props.attributes.imageIds[k]);
					image_alts.push(props.attributes.imageAlts[k]);
					
				}
				
				image_urls[id] = media.url;
				image_ids[id] = media.id;
				image_alts[id] = media.alt;
				
				return props.setAttributes( { imageUrls: image_urls, imageIds: image_ids, imageAlts: image_alts } );
								
			};
			
			// On render image
			var onRenderImage = function(obj) {
				
				var id = parseInt(this);
				
				return el( components.Button, {
						className: 'components-button button button-large',
						onClick: obj.open
					},
					props.attributes.imageIds[id] ?  i18n.__( 'Change Logo' ) : i18n.__( 'Upload Logo' )
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
			
			// Edit squares
			function editSquares( props ) {
				
				var attributes = props.attributes;
				var output = [];
	
				for (var j=0; j<3; j++) {
					
					var id = j;
		
					var background = '';
					if (props.attributes.backgroundUrls[j]) {
						background = 'url(' + props.attributes.backgroundUrls[j] + ')';
					}
			
					var label = j;
					label++;

					var square = el( 'article', {className: 'squares__square rocket-lazyload squares__square-' + id, style: { backgroundImage: background }},	
					
						el( 'div', { className: 'squares__buttons' },
						
							el( MediaUpload, {
								onSelect: onSelectBackground.bind(id),
								type: 'image',
								value: props.attributes.backgroundIds[id],
								render: onRenderBackground.bind(id),
							}),
					
							el( MediaUpload, {
								onSelect: onSelectImage.bind(id),
								type: 'image',
								value: props.attributes.imageIds[id],
								render: onRenderImage.bind(id),
							}),

						),
					
						el( 'div', { className: 'squares__container' },
						
							props.attributes.imageIds[id] ?
							el( 'img', { alt: props.attributes.imageAlts[id], src: props.attributes.imageUrls[id], className: 'squares__image squares__image-'+id, style: {} } ) : el( 'img', { src: '', className: 'squares__image squares__image-'+id, style: {} } ),
				
							el( 'div', {
							
								className: 'squares__content squares__content-1', },
								el( RichText, {
									tagName: 'h3',
									className: 'squares__title squares__title-'+id,
									inline: true,
									placeholder: i18n.__( 'Title ' + label ),
									value: props.attributes.titles[id],
									onChange: onChangeTitle.bind(id),
								} ),
								
								el( RichText, {
									tagName: 'p',
									className: 'squares__text squares__text-'+id,
									inline: true,
									placeholder: i18n.__( 'Content ' + label ),
									value: props.attributes.contents[id],
									onChange: onChangeContent.bind(id), 
								} ),
							
							),
								
								
							el( 'div', { className: 'squares__footer' },

								el( URLInputButton, {
									url: props.attributes.linkUrls[id],
									onChange: onChangeLinkUrl.bind(id),
								} ),
							
							
								el( RichText, {
									tagName: 'a',
									className: 'squares__link',
									placeholder: i18n.__( 'Read more' ),
									value: props.attributes.linkTexts[id],
									onChange: onChangeLinkText.bind(id),
								}),
								
								
							
					
							),

						),
								
								
								
						
					

					);
								
					output.push(square);

				}
					
				return output;
					
			}

			return [
			
				el( // Display controls when the block is clicked on.
					BlockControls,
					{ key: 'controls' },
				),
			
				el( 'div', { className: props.className + ' squares', },
				
					editSquares(props),
					
				)
			
			];
		},

		save: function( props ) {
			
			var attributes = props.attributes;
			
			function outputSquares(props) {

				var output = [];
				
				for (var i=0; i<3; i++) {
				
					var background = '';
					
					if (props.attributes.backgroundIds[i]) {
						background = 'url(' + props.attributes.backgroundUrls[i] + ')';
					}

					var square = el( 'article', {className: 'squares__square rocket-lazyload squares__square-' + i, 'data-bg': background },
										
						el( 'div', { className: 'squares__container' },
									
							props.attributes.imageIds[i] &&
							el( 'img', { alt: props.attributes.imageAlts[i], src: props.attributes.imageUrls[i], className: 'squares__image squares__image-'+i } ),
										
							el( 'div', { className: 'squares__content squares__content-'+i, },
								el( 'h3', { className: 'squares__title squares__title-'+i }, props.attributes.titles[i] ),
								el( 'p', { className: 'squares__text squares__text-'+i }, props.attributes.contents[i] ),
							),
								
							el( 'a', { href: props.attributes.linkUrls[i], className: 'squares__link squares__link-'+i }, props.attributes.linkTexts[i]),

						),
									
					);
											
					output.push(square);
									
				}
				
				return (output);
				
			}

			return (
			
				el( 'div', { className: props.className + ' squares', },
				
					outputSquares(props)
									
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

