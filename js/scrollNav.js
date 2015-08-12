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


  // $('a[href*=#]:not([href=#])').click(function() {
  //   if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
  //     var target = $(this.hash);
  //     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  //     if (target.length) {
  //       $('html,body').animate({
  //         scrollTop: target.offset().top
  //       }, 1000);
  //       return false;
  //     }
  //   }
  // });

    $('#myNavbar li a[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var currentLink = $(this);
        var linkSection = $(currentLink.attr("href"));

        $("#myNavbar li a").removeClass("nav-active");
        currentLink.addClass("nav-active");
        $(document).off("scroll", checkLocation);

        $('html, body').stop().animate({
            'scrollTop': linkSection.position().top - $("#header").outerHeight()+2
        }, 800, 'swing', function () {
            $(document).on("scroll", checkLocation);
        });

    });

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

    function checkLocation(event){
        if ($(this).scrollTop() > $("#intro").outerHeight() - $("#header").outerHeight() ) {
            $('#header').fadeIn();
        } else {
            $('#header').fadeOut();
        }

        var currentScrollPos = $(document).scrollTop() + $("#header").outerHeight() ;

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




})();
