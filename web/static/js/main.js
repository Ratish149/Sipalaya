(function($){
    
    $(document).on("click", ".otpValidateBtn", function(){
        const otpInput = $(document).find(".otpInput").val();
        if( otpInput.length <= 0 ){
             $.notice({
                 type : "error",
                 text : "OTP code is required!!!"
             });
             return;
        }
        
        
        let loaderBtn = jQuery(this);
        let prevHTML = loaderBtn.html();

        jQuery.ajax({
            type: 'post',
            url: _tutorobject.ajaxurl,
            data: {
                action: 'sip_validate_opt',
                otp : otpInput,
                user : $(document).find(".userID").val()
            },
            beforeSend: function (response) {
                loaderBtn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>');
            },
            complete: function (response) {
                loaderBtn.attr("disabled", false).html(prevHTML);
            },
            success: function (response) {
                if (response.success) {
                    window.location.href = window.location.href;
                } else {
                    $.notice({
                        type : "error",
                        text : response.message
                    })
                }
            },
            error: function (xhr) {
                $.notice({
                    type : "error",
                    text : "Unable to validate your OTP"
                })
            }
        });
    });
    
    
    let timerRunning = false;
    function startTimer(){
        if( timerRunning ) return;
        
        const resentOTPEle = $(document).find(".resentOTP");
        
        resentOTPEle.removeClass("resentOTP");
        resentOTPEle.html(`Resent after ${timeleft}`);
        timerRunning = true;
        
        var timeleft = 60;
        var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
                resentOTPEle.addClass("resentOTP");
                resentOTPEle.html("Resend");
                timerRunning = false;
                clearInterval(downloadTimer);
            }
            
            resentOTPEle.html(timeleft > 0 ? `Resent after ${timeleft}` : 'Resend');
            timeleft -= 1;
        }, 1000);
    }
    
    
    $(document).on("click", ".resentOTP", function(){
        if( timerRunning ) return;
        
        let loaderBtn = jQuery(this);
        let prevHTML = loaderBtn.html();

        jQuery.ajax({
            type: 'post',
            url: _tutorobject.ajaxurl,
            data: {
                action: 'sip_resent_opt',
                user : $(document).find(".userID").val()
            },
            beforeSend: function (response) {
                loaderBtn.attr('disabled', true).html('<i class="fa fa-spin fa-spinner"></i>');
            },
            complete: function (response) {
                loaderBtn.attr("disabled", false).html(prevHTML);
            },
            success: function (response) {
                if (response.success) {
                    $.notice({
                        type : "success",
                        text : "OTP sent successfully!!!"
                    });
                    startTimer();
                } else {
                    $.notice({
                        type : "error",
                        text : response.message
                    })
                }
            },
            error: function (xhr) {
                $.notice({
                    type : "error",
                    text : "Unable to send OTP!!!"
                });
            }
        });
    });
    
    // $(document).on("submit", ".search-field-popup form", function(e){
    //     e.preventDefault();
        
        
    // });
    
    $(document).on("click", ".btn-search-new", function(){
        $(document).find("#searchModal").modal("show");
    })
    
})(jQuery);