
var $ = jQuery;
function custom_slider_script() {
    const header = $(document).find("header");
    
    function set_fixed_header(){
        const scroll = $(window).scrollTop();
       
        if( scroll > 82 ){
            header.addClass("sticky");
        }else{
            header.removeClass("sticky");
        }
    }
    
    $(window).scroll(set_fixed_header);
    set_fixed_header();
    
    
    const swiper = $(document).find(".swiper");
    if( swiper.length > 0 ){
        new Swiper('.swiper', {
            slidesPerView : 1,
            spaceBetween : 20,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                600: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                1000: {
                  slidesPerView: 3,
                  spaceBetween: 30
                }
            }
        });
    }
}

$(function() { custom_slider_script(); })