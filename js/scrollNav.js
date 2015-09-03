/*
 Created by Jonathan Nicholas

Listen for scroll
get window position
loop through all nav links
 get section based on link
 check the window position vs position of section
  add active class to section in window
 else
  remove active class



*/

(function(){
    $("#header").hide();
    $(document).on("scroll", checkLocation);

    // Check the location of widow position and compare to achor points
    function checkLocation(event){
        var headerOffset = ($(".navbar-toggle").is(":visible"))? $(".navbar-header").outerHeight() : $("#header").outerHeight();

        if ($(this).scrollTop() >= $("#intro").outerHeight() - headerOffset ) {
            $('#header').fadeIn();
        } else {
            $('#header').fadeOut();
        }

        var currentScrollPos = $(document).scrollTop() + headerOffset ;

        $("#myNavbar li a").each(function(){
            var currentLink = $(this);
            var linkSection = $(currentLink.attr("href"));

            if(linkSection.position().top  <= currentScrollPos  && linkSection.position().top + linkSection.outerHeight(true) > currentScrollPos ){
                currentLink.addClass("nav-active");
            }else{
                currentLink.removeClass("nav-active");
            }
        })
    }

    //Click event for nav links and arrow to scroll to anchor
    $('#myNavbar li a[href^="#"], .arrow-wrap').on('click', function (event) {
        event.preventDefault();
        var currentLink = $(this);
        var linkSection = $(currentLink.attr("href"));
        var headerOffset = ($(".navbar-toggle").is(":visible"))? $(".navbar-header").outerHeight() : $("#header").outerHeight();
        var linkSectionPos = linkSection.position().top - headerOffset;

        $("#myNavbar li a").removeClass("nav-active");
        currentLink.addClass("nav-active");
        $(document).off("scroll", checkLocation);

        $("#myNavbar").collapse('hide');

        $('html, body').stop().animate({
            'scrollTop': linkSectionPos
        }, 800, 'swing', function () {
            $(document).on("scroll", checkLocation);
            checkLocation();
        });

    });

    // Click event for Learn More buttons to expand and reveal project content
    $(".learnBtn").on("click", function () {
        //getting the next element
        $content = $(this).closest(".container").find(".content");

        //slide all the other open tabs to hide
        $(".content").slideUp();
        $(".learnBtn").html("Learn More");
        //check if its already visible
        if (!($content.is(":visible"))) {
            //no - its hidden - open up the content
            $content.slideToggle(500);
            $(this).html("Close");
        }
    });

    // Turn off carousel's automatically sliding
    $('.carousel').carousel({
     interval: false
    });


})();
