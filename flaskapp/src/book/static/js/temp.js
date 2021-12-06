 var book = BookModule.Initialize(DOMAINS.WEB2);
    console.log("book")
    console.log(book)
    var md = new MobileDetect(window.navigator.userAgent);
    var accepted = 0;

    function buttonclick()
    {
        $(".swipe-guide-overlay").hide()
            var setBlur = function(ele, radius) {
            $(ele).css({
               "-webkit-filter": "blur("+radius+"px)",
                "filter": "blur("+radius+"px)"
           });
       }

       // Generic function to tween blur radius
       var tweenBlur = function(ele, startRadius, endRadius) {
            $({blurRadius: startRadius}).animate({blurRadius: endRadius}, {
                duration: 200,
                easing: 'swing', // or "linear"
                                 // use jQuery UI or Easing plugin for more options
                step: function() {
                    setBlur(ele, this.blurRadius);
                },
                callback: function() {
                    // Final callback to set the target blur radius
                     // jQuery might not reach the end value
                     setBlur(ele, endRadius);
                }
            });
        };
        tweenBlur('#page', 10, 0);

        if (accepted === 0) {
            Page_Manager.init_event_listeners();
        }
    }

    console.log("activating page managers");
    var page_count = 0 // {{ page_count | safe }};
    var Page_Manager;

    if (md.mobile() != null)
    {
        Page_Manager = new PageMobile(page_count);
        $("#tutorial-image").attr('src',"{{ url_for('/book.static', filename='images/touch_swipe.png') }}");
    }
    else
    {
        Page_Manager = new PageDesktop( page_count );
        $("#tutorial-image").attr('src',"{{ url_for('/book.static', filename='images/click_swipe.png') }}");
    }



    $("#overlay-gudie").click( () =>
        {
            $("#overlay-guide").hide();
        }
    )