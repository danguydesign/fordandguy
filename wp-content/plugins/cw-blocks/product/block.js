/**
 * CEWE Product Block
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
	var ServerSideRender = components.ServerSideRender;
	var __ = i18n.__;

	blocks.registerBlockType( 'cw-blocks/product', {
		title: i18n.__( 'CEWE: Product' ),
		icon: 'dismiss', 
		category: 'cewe', 
		attributes: {
			content: {  default: '' },
			content_placeholder: { default: ''},
			title: { default: '' },
			title_placeholder: { default: ''  },
			imageUrl: { default: ''  },
			imageUrl_placeholder: { default: '' },
			imageId: { default: ''  },
			imageId_placeholder: { default: ''  },
			imageAlt: { default: ''  },
			imageAlt_placeholder: { default: ''  },
			tabUrl: { default: '' },
			tabId: { default: '' },
			tabAlt: { default: ''},
			linkText: {  default: '' },
			linkUrl: { default: ''  },
			linkUrl_placeholder: { default: '' },
			price: { default: '' },
			price_placeholder: { default: '' },
			sku: { default: '' },
			posts: { },
			postId: {}
		},

		edit: function( props ) {

			var focus = props.focus;
			var attributes = props.attributes;
	
			// On changing link text
			var onChangeLinkText = function( content ) {
				
				props.setAttributes( { linkText: content } );
				
			};

			var onChangeSku = function(value) {

			}
			
			// On changing link urls
			var onChangeLinkUrl = function( url ) {

				props.setAttributes( { linkUrl: url } );
				
			};

			// On selecting a new image
			var onSelectImage = function( media ) {
				
				image_url = media.url;
				image_id = media.id;
				image_alt = media.alt;
				
				return props.setAttributes( { imageUrl: image_url, imageId: image_id, imageAlt: image_alt } );
								
			};

			// On selecting a new image
			var onDeleteImage = function() {

				props.setAttributes( { imageUrl: '', imageId: '', imageAlt: '' } );

			};
			
			// On render image
			var onRenderImage = function(obj) {

				return el( components.Button, {
						className: 'components-button button button-large',
						onClick: obj.open
					},
					props.attributes.imageId?  i18n.__( 'Change Image' ) : i18n.__( 'Upload Image' )
				);
				
			};
			
			// On changing titles
			var onChangeTitle = function( title ) {
				
				props.setAttributes( { title: title } );
				
			};

			// On changing contents
			var onChangeContent = function( content ) {
				
				props.setAttributes( { content: content } );
				
			};

			// On selecting a new tab
			var onSelectTab = function( media ) {

				return props.setAttributes( { tabUrl: media.url, tabId: media.id, tabAlt: media.alt } );

			};

			var onDeleteTab = function( media ) {

				props.setAttributes( { tabUrl: '', tabId: '', tabAlt: ''} );

			};

			// On render tab
			var onRenderTab = function(obj) {

				return el( components.Button, {
							className: 'components-button button button-large',
							onClick: obj.open
						},
						props.attributes.tabId ?  i18n.__( 'Change Tab' ) : i18n.__( 'Upload Tab' )
					);

			};

			// On change price
			var onChangePrice = function( price ) {

				props.setAttributes( { price: price } );

			}

			// On clicking a product
			function onProductClick(event) {

				event.preventDefault();

			}

			// Edit column
			function editProduct( props ) {
				
				var attributes = props.attributes;

				var product = el( 'li', {className: 'product-card cw-grid-item', style: { }},

					el( 'article', { className: 'product-card__container' },

						el( 'a', { href: props.attributes.linkUrl, className: 'product-card__link', onClick: onProductClick },

							props.attributes.tabId &&
							el( 'img', { src: props.attributes.tabUrl, alt: props.attributes.tabAlt, className: 'product-card__tab' } ),

							el( 'header', { className: 'product-card__image' },

								el( 'div', { className: 'product-card__buttons' },

									el( MediaUpload, {
										onSelect: onSelectImage,
										type: 'image',
										value: props.attributes.imageId,
										render: onRenderImage
									}),

									props.attributes.imageId ? el( components.Button, {
											className: 'components-button button button-large',
											//onClick: obj.open
											onClick: onDeleteImage,
										},
										i18n.__( 'Delete Image' )
									) : '',

									el( MediaUpload, {
										onSelect: onSelectTab,
										type: 'image',
										value: props.attributes.tabId,
										render: onRenderTab
									}),

									props.attributes.tabId ? el( components.Button, {
											className: 'components-button button button-large',
											//onClick: obj.open
											onClick: onDeleteTab,
										},
										i18n.__( 'Delete Tab' )
									) : ''

								),

								el( URLInputButton, {
									url: props.attributes.linkUrl ? props.attributes.linkUrl : props.attributes.linkUrl_placeholder,
									onChange: onChangeLinkUrl,
									className: 'product-card__url'
								} ),


								props.attributes.imageId ?
									el( 'img', {  alt: props.attributes.imageAlt, src: props.attributes.imageUrl, className: 'product-card__visual', style: {} } ) :
									props.attributes.imageId_placeholder ?
										el( 'img', {  alt: props.attributes.imageAlt_placeholder, src: props.attributes.imageUrl_placeholder, className: 'product-card__visual', style: {} } ) :
										el( 'img', { src: 'https://cewe-photoworld.com/images/placeholder-600x400.jpg', className: 'product-card__visual', style: {} } ),

							),

							el( 'section', { className: 'product-card__summary' },

								el( RichText, {
									tagName: 'h3',
									className: 'product-card__title',
									inline: true,
									placeholder: props.attributes.title_placeholder ? props.attributes.title_placeholder : 'Title',
									value: props.attributes.title,
									onChange: onChangeTitle,
								} ),
/*
								el( InnerBlocks,
									{
										templateLock: false,
										allowedBlocks: [ 'core/button', 'core/heading', 'core/paragraph', 'core/subhead', 'core/list' ],
										allowedBlocksNames: [ 'core/button', 'core/heading', 'core/paragraph', 'core/subhead', 'core/list' ],
									},
								),
 */
								el('img', { src: "http://local.sandbox.com/cewephotoworld/wp-content/plugins/cw-trustpilot/img/0.svg", alt: "TrustPilot", className: "cwtp__stars" },),


								el( RichText, {
									tagName: 'p',
									className: 'product-card__subtitle',
									inline: true,
									placeholder: props.attributes.content_placeholder ? props.attributes.content_placeholder : 'Content',
									//placeholder: i18n.__( 'Content' ),
									value: props.attributes.content,
									onChange: onChangeContent,
								} )


							),

							el( 'footer', { className: 'product-card__details' },

								el( RichText, {
									tagName: 'strong',
									className: 'product-card__price',
									placeholder: props.attributes.price_placeholder ? '£' + props.attributes.price_placeholder : 'Price',
									value: props.attributes.price,
									onChange: onChangePrice,
								}),

								el( RichText, {
									tagName: 'span',
									className: 'product-card__button',
									placeholder: i18n.__( 'View Product' ),
									value: props.attributes.linkText,
									onChange: onChangeLinkText,
								})

							)

						)

					)

				);

				return product;
					
			}

			return [
			
				el( 
					BlockControls,
					{ key: 'controls' },
					
				),

				el( InspectorControls,
						{ key: 'inspector' },
					el( components.PanelBody, {
							title: i18n.__( 'Product Data' ),
							className: 'product-card__sku',
							initialOpen: true,
						},

						el( components.TextControl, {
							type: 'text',
							label: i18n.__( 'Enter Product SKU' ),
							value: props.attributes.sku,
							onChange: function( value ) {

								props.setAttributes( { sku: value } );

								// Reset all placeholders
								props.setAttributes( { linkUrl_placeholder: ''} );
								props.setAttributes({ content_placeholder: '' });
								props.setAttributes({ price_placeholder: '' });
								props.setAttributes({ imageUrl_placeholder: ''});
								props.setAttributes({ imageId_placeholder: ''});
								props.setAttributes({ imageAlt_placeholder: ''});

							},
						} ),

						el( components.Button, {
								className: 'button button-large',
								onClick: function( event ) {

									event.preventDefault();

									var value = props.attributes.sku;

									// Reset all placeholders
									props.setAttributes( { linkUrl_placeholder: ''} );
									props.setAttributes({content_placeholder: '' });
									props.setAttributes({price_placeholder: '' });
									props.setAttributes({imageUrl_placeholder: ''});
									props.setAttributes({imageId_placeholder: ''});
									props.setAttributes({imageAlt_placeholder: ''});

									if (value !== '') {

										var auth = '&consumer_key=ck_970de2dd0da33b0014fe3522248a260466a4cc87&consumer_secret=cs_92f070e8766ba0090a6348206e20f5c700394c9f';

										wp.apiFetch({path: '/wc/v3/products/?sku=' + value + '&per_page=1' + auth}).then(function (posts) {

											if (posts[0]) {

												// Title
												props.setAttributes({title_placeholder: posts[0].name});

												// Content
												for (var i = 0; i < posts[0].meta_data.length; i++) {

													if (posts[0].meta_data[i].key === 'product_tagline') {

														props.setAttributes({content_placeholder: posts[0].meta_data[i].value});

													}

												}

												// Price
												props.setAttributes({price_placeholder: posts[0].price});

												// Link
												props.setAttributes({linkUrl_placeholder: posts[0].permalink});

												// Image
												props.setAttributes({imageUrl_placeholder: posts[0].images[0].src});
												props.setAttributes({imageId_placeholder: posts[0].images[0].id});
												props.setAttributes({imageAlt_placeholder: posts[0].images[0].alt});

											}
										});

									}

								}
						}, 'Get Product Data'),

					),
				),

				editProduct(props),

			];
		},

		save: function( props ) {

			return (
				el(ServerSideRender, {
					block: "cw-blocks/product",
					attributes: props.attributes
				} )
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

