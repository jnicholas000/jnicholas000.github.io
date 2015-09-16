/*
 Created by Jonathan Nicholas

Load JSON data
Loop through each project in the data
 create project html for each project
  create project heading
  create project content
   create project details
   create project carousel
Add project to #portfolio

*/

(function(){

    var jsonURL = "lib/projects.json";
    // Load the JSON data and send each project to createProject

    $.getJSON( jsonURL, function(data){
        // Loop through the JSON array retrieved
        $.each(data.projects, function(key, val){
            $("#portfolio").append(createProject(val, key));
        });
        setUI();
    })

    .fail(function(event) {
        console.log( "Error", event);
    });



    function createProject(obj, index){
        var html = '<div class="project">';
            html += '<div class="container">';

        // Create the Project Heading
            html += '<div class="row heading">';
            if(index%2 == 0){
                html += '<div class="col-xs-12 visible-xs vcenter">';
            }else{
                html += '<div class="col-xs-12 col-sm-5 vcenter">';
            }
            html += '<img src="'+obj.poster.src+'" alt="'+obj.poster.alt+'" />';
            html += '</div>';
            html += '<div class="col-xs-12 col-sm-7 textCon">';
            html += '<h1>'+obj.title+'</h1>';
            html += '<h2>'+obj.subtitle+'</h2>';
            html += '<button class="btn btn-lg btn-primary learnBtn" type="button">Learn More</button>';
            html += '</div>';
            if(index%2 == 0){
                html += '<div class="col-sm-5 visible-sm visible-md visible-lg vcenter">';
                html += '<img src="'+obj.poster.src+'" alt="'+obj.poster.alt+'" />';
                html += '</div>';
            }
            html += '</div>';

        // Create the Project content
            html  += '<div class="content">';
            if(index%2 == 0){
                html += createCarousel(obj, index);
                html += createDetails(obj, index);
            }else{
                html += createDetails(obj, index);
                html += createCarousel(obj, index);
            }

        // Close container and project
            html += '</div>';
            html += '</div>';

        return html;
    }

    function createDetails(obj, index){

        var html = '<div class="col-sm-6 col-md-4 visible-sm visible-md visible-lg content-details">';
            html += '<p>';
            html += '<span class="content-details-heading">Details: </span><br/>';

            html += detailsLoop(obj.details.length, obj.details);
            html += '</p>';
            html += '<p>';
            html += '<span class="content-details-heading">Client: </span><br/>';

            html += detailsLoop(obj.client.length, obj.client);
            html += '</p>';
            html += '<p>';
            html += '<span class="content-details-heading">Role: </span><br/>';

            html += detailsLoop(obj.role.length, obj.role);

            html += '</p>';

        if(obj.link){
            html += '<p>';
            html += '<a href="'+obj.link+'" target="_blank">View site</a>'
            html += '</p>'
        }

        html += '</div>';

        return html;
    }

    function detailsLoop(len, obj){
        var html = "";
        $.each(obj, function(key, val){
            if( key == len-1 ){
                html += '. '+val;
            }else{
                html += '. '+val+' <br/>';
            }
        });
        return html;
    }

    function createCarousel(obj, index){
        var html = '<div class="col-xs-12 col-sm-6 col-md-8">';
            html += '<!-- Carousel -->';
            html += '<div id="carousel-'+obj.id+'" class="carousel slide" data-ride="carousel">';
            html += '<!-- Indicators -->';
            html += '<ol class="carousel-indicators">';

        var html2 = '';
        $.each(obj.slides, function(key, val){
            if(key ==0){
                html += '<li data-target="#carousel-'+obj.id+'" data-slide-to="'+key+'" class="active"></li>';
                html2 += '<div class="item active">';
            }else{
                html += '<li data-target="#carousel-'+obj.id+'" data-slide-to="'+key+'"></li>';
                html2 += '<div class="item">';
            }

            if(val.type == "embed"){
                html2 += "<div class='embed-container'><iframe src="+val.src+" frameborder='0' allowfullscreen></iframe></div>";
            }else{
                html2 += '<img src="'+val.src+'" alt="'+val.alt+'">';
            }
            html2 += '<div class="carousel-caption">';
            html2 += '<h4>'+val.caption+'</h4>';
            html2 += '</div>';
            html2 += '</div>';

        });

            html += '</ol>';
            html += '<!-- Wrapper for slides -->';
            html += '<div class="carousel-inner">';
            html += html2;
            html += '</div>';
            html += '</div>';
            html += '</div>';

            return html;
    }

 function setUI(){

    // Click event for Learn More buttons to expand and reveal project content
    $(".learnBtn").on("click", function () {
        //getting the next element
        var $self = $(this);
        var $content = $self.closest(".container").find(".content");


        $(".learnBtn").html("Learn More");
        //slide all the other open tabs to hide
        var $openContent = $(".content:visible");
        if($openContent.length){
            if (!$content.is($openContent)) {
                var projectOffset = 0;
                var openProject = $openContent.closest(".project");
                var currentProject = $self.closest(".project");
                if(openProject.position().top < currentProject.position().top){
                    // Assumes that all closed projects are the same height.
                    projectOffset = openProject.outerHeight() - currentProject.outerHeight();
                }

                positionProject($self, $content, projectOffset);
            }
            $openContent.slideUp(800);
        }else{
            positionProject($self, $content, 0);
        }

    });

    // Turn off carousel's automatically sliding
    $('.carousel').carousel({
     interval: false
    });

}

function positionProject($button, $content, projectOffset){

    $content.slideToggle(800);
    $button.html("Close");

    var headerOffset = ($(".navbar-toggle").is(":visible"))? $(".navbar-header").outerHeight() : $("#header").outerHeight();
    var projectPos = $button.closest(".project").position().top - headerOffset+2 - projectOffset;

    $('html, body').stop().animate({
        'scrollTop': projectPos
    }, 800, 'swing');
}

})();
