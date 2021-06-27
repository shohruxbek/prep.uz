(function($) {

    $(document).ready(function(){

        // Mobile menu
        $('.top-buttons .dropdown-toggle').click(function(){
            if ( $('.top-buttons .dropdown-content') ) {
                $('.header').removeClass('open');
            } else {
                $('.header').addClass('open');
            }
        });

        // Rating
        $('.rating-stars:not(.disabled) ul li').on('mouseover', function(){
            var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

            // Now highlight all the stars that's not after the current hovered star
            $(this).parent().children('li.star').each(function(e){
                if (e < onStar) {
                    $(this).addClass('hover');
                }
                else {
                    $(this).removeClass('hover');
                }
            });

        }).on('mouseout', function(){
            $(this).parent().children('li.star').each(function(e){
                $(this).removeClass('hover');
            });
        });
        $('.rating-stars:not(.disabled) ul li').on('click', function(){
            var onStar = parseInt($(this).data('value'), 10); // The star currently selected
            var stars = $(this).parent().children('li.star');
            
            for (i = 0; i < stars.length; i++) {
                $(stars[i]).removeClass('selected');
            }
            
            for (i = 0; i < onStar; i++) {
                $(stars[i]).addClass('selected');
            }
        });

        // Sidebar accordion
        $('.sidebar-accordion__header a').on('click', function(){
            $(this).parent().toggleClass('closed');
            $(this).parents('.sidebar-accordion').find('.sidebar-accordion__content').toggle();
        });

        // Accordion
        $(document).on('click','.accordion__header, .accordion__buttons a:not(.accordion__toggle)', function(){
            var currentItem = $(this).parents('.accordion__item');
            var allItems = $(this).parents('.accordions').find('.accordion__item');

            if (currentItem.hasClass("active")) {
                currentItem.removeClass('active');
            } else {
                // if ( !$(e.target).is('.accordion__buttons a')) {
                allItems.removeClass('active');
                currentItem.addClass('active');
                // }
            }
        });

        // Modal
        $(document).on('click','.modal__toggle', function(){
            $(this).parents('.modal').addClass('open');
        });
        $(document).on('click','.modal__close', function(){
            $(this).parents('.modal').removeClass('open');
        });

        // Modal Authorization. Change Forms
        $('.authorization-modal .change-form').click(function(){
            var formGroup = '#' + $(this).data('change-form');
            $(this).parents('.authorization-modal').removeClass('open');
            $(formGroup).addClass('open');
        });

        // FORM STYLER
        $(document).ready(function(){
            $('input, select').styler();
            $('input[type="file"]').styler('destroy');
        });

        // Tabs
        $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a.tab-btn').click(function(e){
            e.preventDefault();
            var $this = $(this),
                tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
                others = $this.closest('.tab-btn').parents('.tabs').find('.tab-btn'),
                target = $this.attr('href');
            others.removeClass('active');
            $this.addClass('active');
            $(tabgroup).children('div').hide();
            $(target).show();
        })

        // Dropdown toggle
        $('.dropdown-toggle').click(function(){
            var thisContent = $(this).next('.dropdown-content');

            $('.dropdown-content').not(thisContent).hide();
            thisContent.toggle();
        });
        $(document).click(function(e) {
            if ( !$(e.target).parents().is('.dropdown')) {
                $('.dropdown-content').hide();
            }
        });

        // Slim Scroll
        $(function(){
            $('.slimscroll').slimScroll({
                height: 'auto',
                allowPageScroll: true,
                // wheelStep: 4,
            });

            $('.slimscroll-chat-contacts').slimScroll({
                height: 'auto',
                allowPageScroll: false,
                // wheelStep: 8,
            });

            $('.slimscroll-chat-content').slimScroll({
                height: 'auto',
                allowPageScroll: false,
                start: 'bottom',
                // wheelStep: 8,
            });
        });

        // Content image
        var contentImage = $('.content-image');
        var contentImageWrapper = $('.content-image-wrapper');
        var contentImageCaption = contentImage.data('content-image-caption');
        $(contentImage).wrap('<div class="content-image-wrapper"></div>');
        $('<strong>' + contentImageCaption + '</strong>').insertAfter(contentImage);

        // Leave Reply
        $('.lr__cancel').click(function() {
            $(this).parents('.leave-review').find('textarea').val('');
        });

        // Toggle Content
        $('.toggle-content__btn').click(function() {
            $(this).toggleClass('active');
            $(this).parents('.toggle-content').find('.toggle-content__content').toggle();
        });

        // Course description full view
        $('.caf__cd__togglebtn').click(function(){
            $(this).parents('.caf__course-description').toggleClass('open');
        });

        // Chat mobile sliding
        $(document).on('click', '.chat__list .tab-btn', function(){
            $('.chat__list').hide();
            $('.chat__content').show();
        });
        $(document).on('click', '.backto__chatlist', function(){
            $('.chat__list').show();
            $('.chat__content').hide();
        });

        // Left menu in mobile menu (not carousel menu)
        $('.left-menu-show').click(function(){
            $('.sidebar').addClass('show');
            $('body').addClass('noscroll');
        });
        $('.left-menu-hide').click(function(){
            $('.sidebar').removeClass('show');
            $('body').removeClass('noscroll');
        });

    });

    // Floating Sidebar
    if( $('.floating-div').length > 0 ){
        var floatingDiv = $('.floating-div');
        var topPosition = $('.floating-div').offset().top - 20;
        $(window).scroll(function() {
            if (($(window).scrollTop() > topPosition)) {
                floatingDiv.addClass('sticky');
            } else {
                floatingDiv.removeClass('sticky');
            }
        });

        var floatingButton = $('.floating-button');
        var topPositionButton = $('.floating-button').offset().top - 10;

        // floatingButton.css('height', floatingButton.height());

        $(window).scroll(function() {
            if (($(window).scrollTop() > topPositionButton)) {
                floatingButton.addClass('sticky');
            } else {
                floatingButton.removeClass('sticky');
            }
        });
    }

})(jQuery);

// Test - Fill input width
function resizeInput() {
    $(this).attr('size', $(this).val().length);
}

$('.ttype--fill input[type="text"]')
    .keyup(resizeInput)
    .each(resizeInput);