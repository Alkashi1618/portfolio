(function ($) {
    "use strict";
    
    // Initialize EmailJS avec les variables d'environnement
    emailjs.init(process.env.EMAILJS_PUBLIC_KEY || "RN1mK9jE_cYJ9-kDi");
    
    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
           
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
           
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })
        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });
    
    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
   
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

    // Form validation helper
    function validateForm() {
        var isValid = true;
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();
        
        // Reset previous errors
        $('.form-control').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        
        if (name === '') {
            $('#name').addClass('is-invalid');
            $('#name').after('<div class="invalid-feedback">Le nom est requis.</div>');
            isValid = false;
        }
        
        if (email === '') {
            $('#email').addClass('is-invalid');
            $('#email').after('<div class="invalid-feedback">L\'email est requis.</div>');
            isValid = false;
        } else if (!isValidEmail(email)) {
            $('#email').addClass('is-invalid');
            $('#email').after('<div class="invalid-feedback">Veuillez entrer un email valide.</div>');
            isValid = false;
        }
        
        if (subject === '') {
            $('#subject').addClass('is-invalid');
            $('#subject').after('<div class="invalid-feedback">Le sujet est requis.</div>');
            isValid = false;
        }
        
        if (message === '') {
            $('#message').addClass('is-invalid');
            $('#message').after('<div class="invalid-feedback">Le message est requis.</div>');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Contact Form Handler
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        $('#success').empty();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        var submitBtn = $('#sendMessageButton');
        var originalText = submitBtn.text();
        
        // Disable button and show loading
        submitBtn.prop('disabled', true).text('Envoi en cours...');
        
        // Get form data
        var templateParams = {
            from_name: $('#name').val().trim(),
            from_email: $('#email').val().trim(),
            subject: $('#subject').val().trim(),
            message: $('#message').val().trim(),
            to_name: 'Ousmane DEME', // Votre nom
            reply_to: $('#email').val().trim()
        };
        
        // Send email via EmailJS avec les variables d'environnement
        emailjs.send(
            process.env.EMAILJS_SERVICE_ID || 'service_0o611qj',
            process.env.EMAILJS_TEMPLATE_ID || 'template_f41zba5',
            templateParams
        )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                $('#success').html(
                    '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                    '<i class="fa fa-check-circle mr-2"></i>' +
                    '<strong>Message envoyé avec succès!</strong> Merci pour votre message. Je vous répondrai dans les plus brefs délais.' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '</div>'
                );
                
                // Reset form
                $('#contactForm')[0].reset();
                $('.form-control').removeClass('is-valid is-invalid');
                
                // Scroll to success message
                $('html, body').animate({
                    scrollTop: $('#success').offset().top - 100
                }, 500);
                
            }, function(error) {
                console.error('EmailJS Error:', error);
                
                // Show error message with more details
                var errorMsg = 'Une erreur est survenue lors de l\'envoi.';
                if (error.text) {
                    errorMsg += ' Détail: ' + error.text;
                }
                
                $('#success').html(
                    '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                    '<i class="fa fa-exclamation-triangle mr-2"></i>' +
                    '<strong>Erreur!</strong> ' + errorMsg + ' Veuillez réessayer ou me contacter directement à <a href="mailto:Alkashi089@gmail.com">Alkashi089@gmail.com</a>.' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '</div>'
                );
                
                // Scroll to error message
                $('html, body').animate({
                    scrollTop: $('#success').offset().top - 100
                }, 500);
            })
            .finally(function() {
                // Re-enable button
                submitBtn.prop('disabled', false).text(originalText);
            });
    });
    
    // Real-time form validation
    $('#name, #email, #subject, #message').on('blur', function() {
        var field = $(this);
        var value = field.val().trim();
        
        field.removeClass('is-valid is-invalid');
        field.siblings('.invalid-feedback').remove();
        
        if (value !== '') {
            if (field.attr('id') === 'email') {
                if (isValidEmail(value)) {
                    field.addClass('is-valid');
                } else {
                    field.addClass('is-invalid');
                    field.after('<div class="invalid-feedback">Veuillez entrer un email valide.</div>');
                }
            } else {
                field.addClass('is-valid');
            }
        }
    });
    
})(jQuery);