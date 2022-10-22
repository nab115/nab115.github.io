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

async function initial_jiggle() {
    for(let i = 0; i < $("#contact").children("a").length; i++) {
        await sleep(100);
        jiggle($("#contact").children("a").eq(i).children("i").eq(0), 200);
    }
}

function fillProjects() {
    projects.forEach((p) => {
        $('#projects').append(`
            <div class="project-container">
                <p class="project-text-title">${p["title"]}</p>
                <p class="project-text-description">${p["description"]}</p>
                <a class="project-text-link" href=${p["link"]}>View the code</p>
            </div>
            `
        );
    });
}

$(document).ready(function() {
    initial_jiggle();
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

// $('.project-container').append('<p>Testing Jquery</p>');
// console.log($(".title").css({"font-size" : "10px"}));
// console.log($(".title").eq(1).attr("font-size", "10px"));

// console.log(projects[0]['title']);
