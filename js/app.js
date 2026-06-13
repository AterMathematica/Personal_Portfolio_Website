$(document).foundation()

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%                             Slideshow Function                                    %%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
$('.slide-nav').click(function() {
    let forward = ($(this).hasClass('for')) ? 1 : 0;

    let slides = $('.slideshow li').toArray();
    let numSlides = slides.length;

    for(let i = 0; i < numSlides; i++) {
        const slide = $(slides[i]);
        //Change the current slide's classes
        if(slide.hasClass('active')){
            slide.removeClass('active');
            slide.addClass('inactive');

            //Pick the next slide depending on direction
            let newSlide;
            if(forward)
                newSlide = (i == numSlides - 1) ? $(slides[0]) : $(slides[i + 1]);
            else
                newSlide = (i == 0) ? $(slides[numSlides - 1]) : $(slides[i - 1]);
            
            //Change the new slide's classes
            newSlide.addClass('active');
            newSlide.removeClass('inactive');

            break;
        }
    }
})

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%                      Product Image Gallery Function                               %%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
$('.sim-thumb').on('click', function() {
    //'Special Interests' page, theatre poster captions
    function formatPosterCaption(caption){
        let dateMatch = caption.match(/Created (\w+ \d{4})/);
        if(dateMatch){
            let date = dateMatch[1];
            return `Created <span class="date">${date}</span>`;
        }
        return caption;
    }

    //'Featured Projects' page, math pumpkin caption
    function formatPumpkinCaption(caption){
        let detailMatch = caption.split(" (");
        if(detailMatch[1]){
            let main = detailMatch[0];
            let details = detailMatch[1];
            return `${main} <br><span class="description">${details}</span>`;
        }
        return caption;
    }
    
    //Get the image source for the main and thumbnail images
    let thumbSource = $(this).data('image');
    let mainSource = $(this).parent().parent().parent().find('img').attr('src');


    //Get the image alt tags for the main and thumbnail images
    let thumbAlt = $(this).find('img').attr('alt');
    let mainAlt = $(this).parent().parent().parent().find('img').attr('alt');

    //Get the captions for the main and thumbnail images
    let thumbCap = $(this).data('caption');
    let mainCap = $(this).parent().parent().parent().find('figcaption').html();

    let formattedThumbCap;
    let formattedMainCap;

    //Format captions if necessary
    if($(this).data('type') == 'pumpkin'){
        formattedThumbCap = formatPumpkinCaption(thumbCap);
        formattedMainCap = formatPumpkinCaption(mainCap);
    }

    else if($(this).data('type') == 'poster'){
        formattedThumbCap = formatPosterCaption(thumbCap);
        formattedMainCap = formatPosterCaption(mainCap);
    }

    else{
        formattedThumbCap = thumbCap;
        formattedMainCap = mainCap; 
    }

    //Update the main figure to contain the image source, caption and alt tags
    $(this).parent().parent().parent().find('figure').find('img').attr('src', thumbSource);
    $(this).parent().parent().parent().find('figure').find('img').attr('alt', thumbAlt);
    $(this).parent().parent().parent().find('figcaption').html(formattedThumbCap);


    //Update the thumbnail li to contain the new image source, caption and alt tags
    $(this).find('img').attr('src', mainSource);
    $(this).find('img').attr('alt', mainAlt);
    $(this).data('image', mainSource);
    $(this).data('caption', formattedMainCap);
})

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%                         Functions for the class page                              %%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
document.addEventListener("DOMContentLoaded", function setFirstSem() {
    const semesters = ["sp19", "fa19", "sp20", "fa20", "sp21", "fa21", "sp22", "fa22", "sp23", "fa23", "sp24"];
    semesters.forEach(semester => {
      document.getElementById(`${semester}_classes`).style.display = semester === "sp24" ? "block" : "none";
    });
});

function resetSems(currentSem) {
    const semesters = ["sp19", "fa19", "sp20", "fa20", "sp21", "fa21", "sp22", "fa22", "sp23", "fa23", "sp24"];

    semesters.forEach(semester => {
      const element = document.getElementById(`${semester}_classes`);
      if (element.style.display === "block" && currentSem !== semester) {
        element.style.display = "none";
      }
    });
}

document.getElementById("semesters_dropdown").addEventListener("change", function setSem() {
    const selectedSemester = document.getElementById("semesters_dropdown").value;
    resetSems(selectedSemester);
    const elementToShow = document.getElementById(`${selectedSemester}_classes`);
    if (elementToShow.style.display == "none") {
        elementToShow.style.display = "block";
    }
});