import projects from '/projects.json' assert {type: 'json'};

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function jiggle(ob, d) {
    ob.animate({bottom: "+=15px"}, d);
    ob.animate({bottom: "-=15px"}, d);
}

// this works, yet gives maximum call stack size exceeded because of the infinite recursion
// obviously this happens, so the solution is to have an infinite loop which finishese 
//each call before executing the next
async function bounce_error(ob, d) {
        jiggle(ob, d);
        bounce(ob, d);
}

async function bounce(ob, d) {
    ob.animate({bottom: "+=15px"}, d);
    ob.animate({bottom: "-=15px"}, d, function() { bounce(ob, d) });
    // why does the above code work but not 
    // ob.animate({bottom: "-=15px"}, d, bounce(ob, d));
    // or
    // ob.animate({bottom: "-=15px"}, d, () => bounce(ob, d));
    // this is relevant https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript
}

async function initial_jiggle() {
    for(var i = 0; i < $("#contact").children("a").length; i++) {
        await sleep(100);
        jiggle($("#contact").children("a").eq(i).children("i").eq(0), 200);
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
                    <div class="project-info__inner">
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

$(document).ready(function() {
    initial_jiggle();
    bounce($("#down_arrow"), 750);
    fillProjects();
});

$("#contact a").hover(
    function() {
        jiggle($(this).children("i").eq(0), 200);
    }
    // do nothing on mouse leaving the element
    , function() {
    }
);

$(".smooth-scroll").click(
    function(e) {
        e.preventDefault();
        document.getElementById($(this).attr('href').substr(1)).scrollIntoView({behavior: 'smooth'});
    }
)
