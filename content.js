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


export function fillAboutMe(mode) {

    var professional_html = 
    `
    After graduating from the University of Pittsburgh with a B.S. in Computer Engineering, 
    I joined Vanguard as a member of their Technology Leadership Development Program. Through that rotational
    program I gained experience in software development, cloud engineering and data analytics.
    <br><br>
    After a few years working in Vanguard's User Experience division as a data analyst, I am looking to transition 
    back into software engineering. I recently have been working on various personal projects,
    using these to learn new technologies such as 
    <a href="https://reactjs.org/">React</a>, 
    <a href="https://expressjs.com/">Express.js</a>, 
    <a href="https://spring.io/">Spring</a>
    and <a href="https://www.mongodb.com/">MongoDB</a>. 
    
    I am interested in a back-end or full stack role where I can solve 
    challenging problems and continue to develop my skills.
    ` 

    var personal_html = 
    `
    I was born and raised in Rochester, NY, home of the incredible 
    <a href="https://thetakeout.com/the-garbage-plate-is-peak-cuisine-1848764198">garbage plate</a>. I stayed on the
    east coast for college and later work, however I recently relocated to Seattle, WA to move in with my partner who is
    a medical resident at the University of Washington.
    <br><br>
    In my free time I enjoy cooking, weightlifting and playing video games like Rocket League, Valorant and online Chess.
    `
    if (mode === "personal") $('#about-text-content').html(personal_html);
    else if (mode == "professional") $('#about-text-content').html(professional_html);
}