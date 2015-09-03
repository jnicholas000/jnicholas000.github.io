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
            if(key%2 == 0){
                html += '<div class="col-sm-5 visible-sm visible-md visible-lg vcenter">';
                html += '<img src="'+obj.poster.src+'" alt="'+obj.poster.alt+'" />';
                html += '</div>';
            }
            html += '</div>';

        // Create the Project content
            html  += '<div class="content">';
            if(index%2 == 0){
                html += createCarousel(obj.slides, key);
                html += createDetails(obj, key);
            }else{
                html += createDetails(obj, key);
                html += createCarousel(obj.slides, key);
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

        detailsLoop(obj.details.length, obj.client);
            html += '</p>';
            html += '<p>';
            html += '<span class="content-details-heading">Client: </span><br/>';

        detailsLoop(obj.client.length, obj.client);
            html += '</p>';
            html += '<p>';
            html += '<span class="content-details-heading">Role: </span><br/>';

        detailsLoop(obj.role.length, obj.role);

            html += '</p>';
            html += '</div>';

        return html;
    }

    function detailsLoop(len, obj){
        $.each(obj.details, function(key, val){
            html += '. '+val+' <br/>';
            if( key == len-1 ){
                html += '. '+val;
            }

        });
    }

    function createCarousel(obj, index){
        var html = '<div class="col-xs-12 col-sm-6 col-md-8">';
            html += '<!-- Carousel -->';
            html += '<div id="carousel-dsd" class="carousel slide" data-ride="carousel">';
            html += '<!-- Indicators -->';
            html += '<ol class="carousel-indicators">';

        var html2 = '';
        $.each(obj, function(key, val){
            if(key ==0){
                html += '<li data-target="#carousel-dsd" data-slide-to="'+key+'" class="active"></li>';
                html2 += '<div class="item active">';
            }else{
                html += '<li data-target="#carousel-dsd" data-slide-to="'+key+'"></li>';
                html2 += '<div class="item">';
            }

            html2 += '<img src="'+val.src+'" alt="'+val.alt+'">';
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

            return html;
    }

})();
