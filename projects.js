export async function fillProjects() {
    const res = await fetch("/projects.json");
    const projects = await res.json();
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