jQuery(function ($) {

    'use strict';

    $(window).on('load', function(){
        $('.wpa-woocommerce-product-gallery').css({"opacity": "1"});
    });

    (function () {

        if ($('.wpa-product-gallery').length > 0) {

            var wpaThumbnailShow = parseInt($('.wpa-woocommerce-product-gallery').attr('data-thumbnails')),
            wpaArrowShow = $('.wpa-woocommerce-product-gallery').attr('data-wpa-navigation');

            // arrow visibility
            if (wpaArrowShow == 'yes') {
                wpaArrowShow = true;
            } else {
                wpaArrowShow = false;
            }


            $('.wpa-product-gallery').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: wpaArrowShow,
                autoplay: false,
                adaptiveHeight: true,
                infinite: false,
                touchMove: false,
                draggable: false,
                swipe: false,
                prevArrow: '<button class="wpawg-prev"><i class="flaticon-left-arrow-3"></i></button>',
                nextArrow: '<button class="wpawg-next"><i class="flaticon-right-arrow-2"></i></button>',
                asNavFor: '.wpa-product-gallery-thumbs',
            });

            $('.wpa-product-gallery-thumbs').slick({
                slidesToShow: parseInt(wpaThumbnailShow),
                slidesToScroll: 1,
                asNavFor: '.wpa-product-gallery',
                arrows: wpaArrowShow,
                autoplay: false,
                focusOnSelect: true,
                infinite: false,
                prevArrow: '<button class="wpawg-prev"><i class="flaticon-left-arrow-2"></i></button>',
                nextArrow: '<button class="wpawg-next"><i class="flaticon-right-arrow-3"></i></button>',
            });


            var firstThumb = $('.wpa-product-gallery-thumbs .slick-track .slick-current img');

            firstThumb.removeAttr('srcset');
            
            var imagePopupSrc = $('.wpa-product-gallery .slick-track .slick-current a.wpawg-image-popup');

            var origSrc = firstThumb.attr('src'),
                dataLargeImage = firstThumb.attr('data-large_image');

            var wpawgZoom = $('.wpa-woocommerce-product-gallery').attr('data-zoom');


            $( '.variations_form' ).on('found_variation', function( event, variation ) {
                $('.wpa-product-gallery').slick('slickGoTo', 0);

                if( variation.image.src ) {
                    firstThumb.attr('src', variation.image.gallery_thumbnail_src);
                }

                console.log(variation.image);

                if( variation.image.src ) {
                    imagePopupSrc.attr('data-mfp-src', variation.image.full_src);
                }

                if ($('.wpa-woocommerce-product-gallery').length > 0 && wpawgZoom == 'yes') {
                    if (wpawgZoom == 'yes') {
                        $('.wpa-product-gallery .slick-track .slick-current > img, .wpa-woocommerce-product-gallery .wpa-product-single-image > div img').last().remove();
                        setTimeout(function(){
                            $('.wpa-product-gallery .slick-track .slick-current, .wpa-woocommerce-product-gallery .wpa-product-single-image > div').zoom();
                        }, 100);
                    }
                }
            });

            $( '.variations_form' ).on( 'reset_image', function() {
                firstThumb.attr('src', origSrc);
                imagePopupSrc.attr('data-mfp-src', dataLargeImage);

                $('.wpa-product-gallery-thumbs').slick('slickGoTo', 0);
            });

            $( '.reset_variations' ).on( 'click', function() {
                if (wpawgZoom == 'yes') {
                    $('.wpa-product-gallery .slick-track .slick-current > img, .wpa-woocommerce-product-gallery .wpa-product-single-image > div img').last().remove();

                    setTimeout(function(){
                        $('.wpa-product-gallery .slick-track .slick-current, .wpa-woocommerce-product-gallery .wpa-product-single-image > div').zoom();
                    }, 100);
                }
            });

            // On before slide change
            $('.wpa-product-gallery').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                $('.wpa-product-gallery .wpawg-video-popup, .wpa-product-gallery .wpawg-image-popup').css('display', 'none');
            });

            // On after slide change
            $('.wpa-product-gallery').on('afterChange', function(event, slick, currentSlide, nextSlide){
                $('.wpa-product-gallery .wpawg-video-popup, .wpa-product-gallery .wpawg-image-popup').css('display', 'block');
            });
        }
    }());



    /* ======= Magnific Popup for image ======= */
    (function(){
        if ($('.wpa-woocommerce-product-gallery').length > 0) {

            $('.wpa-product-gallery .slick-list, .wpa-product-single-image > div').magnificPopup({
                delegate: '.wpawg-image-popup',
                type: 'image',
                mainClass: 'mfp-with-fade',
                removalDelay: 300,
                fixedContentPos: true,
                image: {
                    verticalFit: true
                },
                gallery:{
                    enabled:true,
                    // navigateByImgClick: true
                },
                callbacks: {
                    open: function() {
                        var wpaMfp = $.magnificPopup.instance;
                        var wpaProto = $.magnificPopup.proto;
                        var wpaArrowRight = $('.mfp-arrow-right');
                        var wpaArrowLeft = $('.mfp-arrow-left');

                        // extend function that moves to next item
                        wpaMfp.next = function() {

                            // if index is not last, call parent method
                            if(wpaMfp.index < wpaMfp.items.length - 1) {
                                wpaProto.next.call(wpaMfp);
                                wpaArrowLeft.show();
                            } else {
                               // otherwise do whatever you want, e.g. hide "next" arrow
                               wpaArrowRight.hide();
                            }
                        };

                        // same with prev method
                        wpaMfp.prev = function() {
                            if(wpaMfp.index > 0) {
                                wpaProto.prev.call(wpaMfp);
                                wpaArrowRight.show();
                            } else {
                               // otherwise do whatever you want, e.g. hide "prev" arrow
                               wpaArrowLeft.hide();
                            }
                        };
                    }
                }
            });
        }
    }());


    /* ======= Image Zoom ======= */
    (function(){
        var wpawgZoom = $('.wpa-woocommerce-product-gallery').attr('data-zoom');
        if ($('.wpa-woocommerce-product-gallery').length > 0 && wpawgZoom == 'yes') {
            $('.wpa-product-gallery .slick-track .slick-slide, .wpa-woocommerce-product-gallery .wpa-product-single-image > div').zoom({
                on: 'mouseover', // other options: grab, click, toggle, mouseover
                duration: 500,
                magnify: 1
            });
        }
    }());
});