import projects from '/projects.json' assert {type: 'json'};

$(document).ready(function() {
    initial_jiggle();
    bounce($("#down_arrow"), 15, 750);
    fillProjects();
});

function jiggle(ob, pix, duration) {
    ob.animate({bottom: "+=" + pix + "px"}, duration);
    return ob.animate({bottom: "-=" + pix + "px"}, duration).promise();
}

async function bounce(ob, pix, duration) {
        await jiggle(ob, pix, duration);
        bounce(ob, pix, duration);
}

async function initial_jiggle() {
    for(var i = 0; i < $("#contact").children("a").length; i++) {
        await sleep(100);
        jiggle($("#contact").children("a").eq(i).children("i").eq(0), 15, 200);
    }
}

function fillProjects() {
    projects.forEach((p) => {
        
        var readmore_html = "";
        var image_html = `<div class=project-image-container><img src=${p["image"]}></div>`
        if (p.hasOwnProperty('readmore')) {
            readmore_html = `<a class="text-blue" href=${p["readmore"]}>Read More &#8594</a></p>`
            image_html = `<div class=project-image-container><a href=${p["readmore"]}><img src=${p["image"]}></a></div>`
        }

        $('#projects').append(`
            <div class="project-container">
                <div class="project-info__outer">
                    <div class="project-info__inner inner">
                        <p class="project-title">${p["title"]}</p>
                        <p>${p["description"]}</p>
                        <div class="project-links">
                            <p><a class="text-blue" href=${p["code"]}>View the code</a>
                            ${readmore_html}
                        </div>
                    </div>
                </div>
                ${image_html}
            </div>
            `
        );
    });
}

$("#contact a").hover(
    function() {
        jiggle($(this).children("i").eq(0), 15, 200);
    }
    // do nothing on mouse leaving the element
    , function() {
    }
);

$(".smooth-scroll").click(
    function(e) {
        e.preventDefault();
        document.getElementById($(this).attr('href')).scrollIntoView({behavior: 'smooth'});
    }
)
