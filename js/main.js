        (function ($) {
            "use strict";
            
            // Initialize EmailJS - REMPLACEZ PAR VOTRE CLÉ PUBLIQUE
            emailjs.init("RN1mK9jE_cYJ9-kDi");
            
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
                console.log($videoSrc);
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

            // Contact Form Handler
            $('#contactForm').on('submit', function(e) {
                e.preventDefault();
                
                var submitBtn = $('#sendMessageButton');
                var originalText = submitBtn.text();
                
                // Disable button and show loading
                submitBtn.prop('disabled', true).text('Envoi en cours...');
                
                // Get form data
                var templateParams = {
                    from_name: $('#name').val(),
                    from_email: $('#email').val(),
                    subject: $('#subject').val(),
                    message: $('#message').val(),
                    to_email: 'Alkashi089@gmail.com' // Votre email
                };
                
                // Send email via EmailJS - REMPLACEZ SERVICE_ID et TEMPLATE_ID
                emailjs.send('service_0o611qj', 'template_f41zba5', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Show success message
                        $('#success').html('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                            '<strong>Message envoyé avec succès!</strong> Je vous répondrai dans les plus brefs délais.' +
                            '<button type="button" class="close" data-dismiss="alert">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button></div>');
                        
                        // Reset form
                        $('#contactForm')[0].reset();
                        
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                        // Show error message
                        $('#success').html('<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                            '<strong>Erreur!</strong> Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou me contacter directement à Alkashi089@gmail.com.' +
                            '<button type="button" class="close" data-dismiss="alert">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button></div>');
                    })
                    .finally(function() {
                        // Re-enable button
                        submitBtn.prop('disabled', false).text(originalText);
                    });
            });
            
        })(jQuery);