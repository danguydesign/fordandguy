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
		icon: 'products', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
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
			imageAlts: { type: 'array', default: []},
			linkTexts: { type: 'array', default: [] },
			linkUrls: { type: 'array', default: [] },
			prices: { type: 'array', default: [] },
			tabUrls: { type: 'array', default: [] },
			tabIds: { type: 'array', default: [] },
			tabAlts: { type: 'array', default: []},
			columns: {
				type: 'select',
				default: '3'
			},
			products: {
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
			var products = props.attributes.products;

			function onChangeCols( newColumns ) {
				props.setAttributes( { columns: newColumns } );
			}

			function onChangeProducts( newProducts ) {
				props.setAttributes( { products: newProducts } );
			}

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
					props.attributes.imageIds[id] ?  i18n.__( 'Change Image' ) : i18n.__( 'Upload Image' )
				);

			}

			// On selecting a new tab
			var onSelectTab = function( media ) {

				var id = parseInt(this);

				var tab_urls = [];
				var tab_ids = [];
				var tab_alts = [];

				for (var k=0; k<props.attributes.tabUrls.length; k++) {

					tab_urls.push(props.attributes.tabUrls[k]);
					tab_ids.push(props.attributes.tabIds[k]);
					tab_alts.push(props.attributes.tabAlts[k]);

				}

				tab_urls[id] = media.url;
				tab_ids[id] = media.id;
				tab_alts[id] = media.alt;

				return props.setAttributes( { tabUrls: tab_urls, tabIds: tab_ids, tabAlts: tab_alts } );

			};

			// On render tab
			var onRenderTab = function(obj) {

				var id = parseInt(this);

				return el( components.Button, {
						className: 'components-button button button-large',
						onClick: obj.open
					},
					props.attributes.tabIds[id] ?  i18n.__( 'Change Tab' ) : i18n.__( 'Upload Tab' )
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

			function handleProductLinkClick(event) {

				event.preventDefault();

			}

			// Edit products
			function editProducts( props ) {

				var attributes = props.attributes;
				var columns = props.attributes.columns;
				var products = props.attributes.products;
				var output = [];

				for (var j=0; j<products; j++) {

					var id = j;

					var label = j;
					label++;

					var product = el( 'li', {className: 'product-card cw-grid-item product__card-' + id, style: { }},

						el( 'article', { className: 'product-card__container' },

							el( 'a', { href: props.attributes.linkUrls[id], className: 'product-card__link product-card__link-' + id, onClick: handleProductLinkClick },

								props.attributes.tabIds[id] &&
								el( 'img', { src: props.attributes.tabUrls[id], alt: props.attributes.tabAlts[id], className: 'product-card__tab product-card__tab-'+id } ),

								el( 'header', { className: 'product-card__image' },

									el( 'div', { className: 'product-card__buttons' },

										el( MediaUpload, {
											onSelect: onSelectImage.bind(id),
											type: 'image',
											value: props.attributes.imageIds[id],
											render: onRenderImage.bind(id),
										}),

										el( MediaUpload, {
											onSelect: onSelectTab.bind(id),
											type: 'image',
											value: props.attributes.tabIds[id],
											render: onRenderTab.bind(id),
										}),

									),

									el( URLInputButton, {
										url: props.attributes.linkUrls[id],
										onChange: onChangeLinkUrl.bind(id),
										className: 'product-card__url',
									} ),

									props.attributes.imageIds[id] ?
									el( 'img', {  alt: props.attributes.imageAlts[id], src: props.attributes.imageUrls[id], className: 'product-card__visual', style: {} } ) : el( 'img', { src: 'https://cewe-photoworld.com/images/placeholder-600x400.jpg', className: 'product-card__visual', style: {} } ),

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

									// el( RichText, {
									// 	tagName: 'span',
									// 	className: 'product-card__button product-card__button-'+id,
									// 	placeholder: i18n.__( 'Explore' ),
									// 	value: props.attributes.linkTexts[id],
									// 	onChange: onChangeLinkText.bind(id),
									// }),

									//el( 'span', { className: 'product-card__button product-card__button-' + id }, 'Explore' ),

								),

							),

						),


					);

					output.push(product);

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
							value: products,
							onChange: onChangeProducts,
							options: [
								{ value: '1', label: i18n.__( '1' ) },
								{ value: '2', label: i18n.__( '2' ) },
								{ value: '3', label: i18n.__( '3' ) },
								{ value: '4', label: i18n.__( '4' ) },
								{ value: '5', label: i18n.__( '5' ) },
								{ value: '6', label: i18n.__( '6' ) },
								{ value: '7', label: i18n.__( '7' ) },
								{ value: '8', label: i18n.__( '8' ) },
								{ value: '9', label: i18n.__( '9' ) },
								{ value: '10', label: i18n.__( '10' ) },
								{ value: '11', label: i18n.__( '11' ) },
								{ value: '12', label: i18n.__( '12' ) },
								{ value: '13', label: i18n.__( '13' ) },
								{ value: '14', label: i18n.__( '14' ) },
								{ value: '15', label: i18n.__( '15' ) },
								{ value: '16', label: i18n.__( '16' ) }
							],
						}
					),
					el(
						SelectControl,
						{
							type: 'number',
							label: i18n.__( 'Number of columns' ),
							value: columns,
							onChange: onChangeCols,
							options: [
							   { value: '3', label: i18n.__( '3' ) },
							    { value: '4', label: i18n.__( '4' ) }
							],
						}
					),


					el( components.PanelBody,
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

		save: function( props ) {

			var attributes = props.attributes;
			var alignment = props.attributes.alignment;
			var columns = props.attributes.columns;
			var products = props.attributes.products;

			function outputProducts(props) {

				var output = [];

				for (var i=0; i<products; i++) {

					var link_text = props.attributes.linkTexts[i];

					if (!props.attributes.linkTexts[i]) {

						link_text = 'Explore';

					}

					var product = el( 'li', {className: 'product-card cw-grid-item product__card-' + i, style: { }},

						el( 'article', { className: 'product-card__container' },

							el( 'a', { href: props.attributes.linkUrls[i], className: 'product-card__link product-card__link-'+i },

								props.attributes.tabIds[i] &&
								el( 'img', { alt: props.attributes.tabAlts[i], src: props.attributes.tabUrls[i], className: 'product-card__tab product-card__tab-'+i } ),

								el( 'header', { className: 'product-card__image' },
									props.attributes.imageIds[i] &&
									el( 'img', { alt: props.attributes.imageAlts[i], src: props.attributes.imageUrls[i], className: 'product-card__visual' } ),
								),

								el( 'section', { className: 'product-card__summary product-card__summary-'+i, style: { textAlign: props.attributes.alignment } },
									el( 'h3', { className: 'product-card__title product-card__title-'+i }, props.attributes.titles[i] ),
									el( 'p', { className: 'product-card__subtitle product-card__subtitle-'+i }, props.attributes.contents[i] ),
								),

								el( 'footer', { className: 'product-card__details product-card__details-'+i, style: { textAlign: props.attributes.alignment } },
									el( 'strong', { className: 'product-card__price product-card__price-'+i }, props.attributes.prices[i] ),
									// el( 'span', { className: 'product-card__button product-card__button-'+i }, link_text),
								),

							),

						),

					);

					output.push(product);

				}

				return (output);

			}

			return (

				el( 'div', { className: props.className + ' product-cards product-cards__columns-' + columns, style: { background: props.attributes.backgroundColor } },

					el( 'ul', { className: 'product-cards__container', style: { } },

						outputProducts(props)

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
