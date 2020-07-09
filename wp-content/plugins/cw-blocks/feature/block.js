/**
 * CEWE Feature Block
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

	//i18n.setLocaleData( window.gutenberg_examples_03.localeData, 'gutenberg-examples' );

	blocks.registerBlockType( 'cw-blocks/feature', {
		title: __( 'CEWE: Feature', 'cw-blocks' ),
		icon: 'welcome-widgets-menus',
		category: 'cewe',
		className: 'feature',

		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'h2',
			},
			subtitle: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			mediaAlt: {
				type: 'string'
			},
			mediaVideo: {
				default: '',
			},
			mobilemediaID: {
				type: 'number',
			},
			mobilemediaURL: {
				type: 'string',
				source: 'attribute',
				selector: '.mobile-source',
				attribute: 'srcset',
			},

			tabletmediaID: {
				type: 'number',
			},
			tabletmediaURL: {
				type: 'string',
				source: 'attribute',
				selector: '.tablet-source',
				attribute: 'srcset',
			},



			body: {
				type: 'array',
				source: 'children',
				selector: '.featured__body',
			},
			alignment: {
				type: 'string',
				default: 'left'
			},
			backgroundColor: {
				type: 'string',
				default: '#fff'
			},
			textColor: {
				type: 'string',
				default: '#222'
			}
		},

		edit: function( props ) {

			var attributes = props.attributes;

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
			}

			function onChangeContent( newContent ) {
				props.setAttributes( { content: newContent } );
			}

			function getEditMediaElement(props) {

				var attributes = props.attributes;

				if (!attributes.mediaVideo) {

					var output = el( 'picture', { },

						attributes.mobilemediaURL ? el( 'source', { className: 'mobile-source', srcSet: attributes.mobilemediaURL,  media: "(max-width: 768px)" } ) : '',
						attributes.tabletmediaURL ? el( 'source', { className: 'tablet-source', srcSet: attributes.tabletmediaURL,  media: "(min-width: 769px) and (max-width: 1024px)" } ) : '',
						attributes.mediaURL ? el( 'source', { className: 'desktop-source', srcSet: attributes.mediaURL,  media: "(min-width: 1025px)" } ) : '',
						attributes.mediaURL ? el( 'img', { src: attributes.mediaURL,  alt: attributes.mediaAlt } ) : '',


						el( MediaUpload, {
							onSelect: onSelectMobileImage,
							type: 'image',
							value: attributes.mobilemediaID,
							render: function( obj ) {
								return props.isSelected && el( components.Button, {
										className: 'button button-small',
										onClick: obj.open
									},
									! attributes.mobilemediaID ? i18n.__( 'Upload Mobile Image', 'cw-blocks' ) :  i18n.__( 'Change Mobile Image', 'cw-blocks' ),
								);
							}
						} ),
						el( MediaUpload, {
							onSelect: onSelectTabletImage,
							type: 'image',
							value: attributes.tabletmediaID,
							render: function( obj ) {
								return props.isSelected && el( components.Button, {
										className: 'button button-small',
										onClick: obj.open
									},
									! attributes.tabletmediaID ? i18n.__( 'Upload Tablet Image', 'cw-blocks' ) :  i18n.__( 'Change Tablet Image', 'cw-blocks' ),
								);
							}
						} ),
						el( MediaUpload, {
							onSelect: onSelectImage,
							type: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return props.isSelected && el( components.Button, {
										className: 'button button-small',
										onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Desktop Image', 'cw-blocks' ) :  i18n.__( 'Change Desktop Image', 'cw-blocks' ),
								);
							}
						} )

					);

				}
				else {

					var output =  el( 'div', { className: 'wistia-embed' },

						el( 'script', { src: "https://fast.wistia.com/embed/medias/" + attributes.mediaVideo + ".jsonp", async: 'true' } ),

						el( 'div', { className: 'wistia_responsive_padding', style: { paddingTop: '56.25%', paddingBottom: '28px', paddingLeft: '0', paddingRight: '0', position: 'relative' } },

							el( 'div', { className: 'wistia_responsive_wrapper', style: { height: '100%', left: '0', position: 'absolute', top: '0', width: '100%' } },

								el( 'span', { className: 'wistia_embed wistia_async_' + attributes.mediaVideo + ' popover=true popoverAnimateThumbnail=true videoFoam=true', style: { display: 'inline-block', height: '100%', position: 'relative', width: '100%' } },
									'Video ID: ' + attributes.mediaVideo
								),

							),

						),

					);

				}

				return output;


			}



			var onSelectImage = function( media ) {

				//~ Compatibility
				//~ if (media.compat.item) {

					//~ video = false;

					//~ var fields = document.createElement('div');
					//~ fields.innerHTML = media.compat.item;
					//~ var field = fields.getElementsByClassName('compat-field-cw-video-link');
					//~ var input = field[0].getElementsByTagName('input');
					//~ video = input[0].value;

					//~ console.log(video);

				//~ }

				var video = '';

				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
					mediaAlt: media.alt,
					mediaVideo: video
				} );
			};

			var onSelectMobileImage = function( media ) {
				return props.setAttributes( {
					mobilemediaURL: media.url,
					mobilemediaID: media.id,
				} );
			};


			var onSelectTabletImage = function( media ) {
				return props.setAttributes( {
					tabletmediaURL: media.url,
					tabletmediaID: media.id,
				} );
			};

			var backgroundColor = '#fff';
			var textColor = '#222';

			if (props.attributes.backgroundColor) {
				backgroundColor = props.attributes.backgroundColor;
			}

			if (props.attributes.textColor) {
				textColor = props.attributes.textColor;
			}

			return el( 'div', { className: 'feature feature--align' + props.attributes.alignment + ' ' + props.className, style: { background: backgroundColor, color: textColor } },

				el( 'div', { className: 'feature__container' },

					el( 'div', { className: 'feature__image' },

						getEditMediaElement(props),

					),

					el( 'div', { className: 'feature__content' },

						el( InnerBlocks,
							{

								allowedBlocks: [ 'core/button', 'core/heading', 'core/paragraph', 'core/subhead', 'core/list' ],
								allowedBlocksNames: [ 'core/button', 'core/heading', 'core/paragraph', 'core/subhead', 'core/list' ]

							},
						),

					),

					el( BlockControls,
						{ key: 'controls' },
						el(
							AlignmentToolbar,
							{
								value: props.attributes.alignment,
								onChange: onChangeAlignment,
							}
						)
					),

					el( InspectorControls,
						{ key: 'inspector' },

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

						el( components.PanelBody,
							{
							colorValue: attributes.textColor,
							title: __( 'Text Color' ),
							},
							el( components.ColorPalette, {
								value: attributes.textColor,
								colors: [
									{ name: 'white', color: '#fff' },
									{ name: 'dark-grey', color: '#222' },
								],
								title: __( 'Text Color' ),
								onChange: function( value ) {
									props.setAttributes( { textColor: value } );
								},
							} ),

						),


						el( components.PanelBody, {
							title: i18n.__( 'Video ID' ),
							className: 'video-id',
							initialOpen: true,
							},
							el( components.TextControl, {
								type: 'video-id',
								label: i18n.__( 'Enter a Wistia video ID' ),
								value: props.attributes.mediaVideo,
								onChange: function( value ) {
									props.setAttributes( { mediaVideo: value } );
								},
							} ),
						),

					)

				)

			);
		},

		save: function( props ) {

			var attributes = props.attributes;

			var backgroundColor = '#fff';
			var textColor = '#222';

			if (props.attributes.backgroundColor) {
				backgroundColor = props.attributes.backgroundColor;
			}

			if (props.attributes.textColor) {
				textColor = props.attributes.textColor;
			}


			function getMediaElement(props) {

				var attributes = props.attributes;

				if (!props.attributes.mediaVideo) {

						var output = el( 'div', { className: 'feature__image' },

							el( 'picture', { },

							attributes.mobilemediaURL ? el( 'source', { className: 'mobile-source', srcSet: attributes.mobilemediaURL,  media: "(max-width: 768px)" } ) : '',
							attributes.tabletmediaURL ? el( 'source', { className: 'tablet-source', srcSet: attributes.tabletmediaURL,  media: "(min-width: 769px) and (max-width: 1024px)" } ) : '',
							attributes.mediaURL ? el( 'source', { className: 'desktop-source', srcSet: attributes.mediaURL,  media: "(min-width: 1025px)" } ) : '',
							attributes.mediaURL ? el( 'img', { src: attributes.mediaURL,  alt: attributes.mediaAlt } ) : '',



							),
						);

				}
				else {

					var output = el( 'div', { className: 'feature__image' },

						el( 'script', { src: "https://fast.wistia.com/embed/medias/" + attributes.mediaVideo + ".jsonp", async: 'true' } ),

						el( 'div', { className: 'wistia_responsive_padding', style: { paddingTop: '56.25%', paddingBottom: '28px', paddingLeft: '0', paddingRight: '0', position: 'relative' } },

							el( 'div', { className: 'wistia_responsive_wrapper', style: { height: '100%', left: '0', position: 'absolute', top: '0', width: '100%' } },

								el( 'span', { className: 'wistia_embed wistia_async_' + attributes.mediaVideo + ' popover=true popoverAnimateThumbnail=true videoFoam=true', style: { display: 'inline-block', height: '100%', position: 'relative', width: '100%' } },



								),

							),

						),

					);


				}

				return output;

			}

			return (
				el( 'div', { className: 'feature feature--align' + props.attributes.alignment + ' ' + props.className, style: { background: backgroundColor, color: textColor } },

					el( 'div', { className: 'feature__container' },

						getMediaElement(props),

						el( 'div', { className: 'feature__content' },

						el( 'div', { className: 'feature__textbox' },

							el( InnerBlocks.Content, { }),

							)
						)

					)
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
