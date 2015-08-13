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
