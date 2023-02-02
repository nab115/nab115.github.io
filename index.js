$(document).ready(async function() {
    const res = await fetch("/projects.json");
    const projects = await res.json();
    initial_jiggle();
    bounce($("#down_arrow"), 15, 750);
    fillProjects(projects);
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function jiggle(ob, pix, duration) {
    ob.animate({bottom: "+=" + pix + "px"}, duration);
    return ob.animate({bottom: "-=" + pix + "px"}, duration).promise();
}

async function bounce(ob, pix, duration) {
        await jiggle(ob, pix, duration);
        bounce(ob, pix, duration);
}

async function initial_jiggle() {

    var icons = $("#contact").children("a");
    for(var i = 0; i < icons.length; i++) {
        await sleep(100);
        jiggle(icons.eq(i).children("i").eq(0), 15, 200);
    }
}

async function fillProjects(projects) {

    projects.forEach((p) => {
        var readmore_html = "";
        var link_html = "";
        var image_html = `<div class=project-image-container><img src=${p["image"]}></div>`
        if (p.hasOwnProperty('readmore')) {
            readmore_html = `<a class="text-blue" href=${p["readmore"]}>Read More &#8594</a></p>`
            image_html = `<div class=project-image-container><a href=${p["readmore"]}><img src=${p["image"]}></a></div>`
        }
        if (p.hasOwnProperty('link')) {
            link_html = `<a class="text-blue" href=${p["link"]}>Try it out &#8594</a></p>`
            image_html = `<div class=project-image-container><a href=${p["link"]}><img src=${p["image"]}></a></div>`
        }

        $('#projects').append(`
            <div class="project-container">
                <div class="project-info__outer">
                    <div class="inner">
                        <h3>${p["title"]}</h3>
                        <p>${p["description"]}</p>
                        <div class="project-links">
                            <p><a class="text-blue" href=${p["code"]}>View the code</a>
                            ${readmore_html}
                            ${link_html}
                        </div>
                    </div>
                </div>
                ${image_html}
            </div>
            `
        );
    });
}

$("#contact a").hover(({currentTarget}) => jiggle($(currentTarget).children("i").eq(0), 15, 200)
    // do nothing on mouse leaving the element
    , () => {}
);

$(".smooth-scroll").click((e) => {
        e.preventDefault();
        var target = e.currentTarget.getAttribute("href");
        document.getElementById(target).scrollIntoView({behavior: 'smooth'});
    }
)
