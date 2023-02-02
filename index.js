import {fillProjects, fillAboutMe} from './content.js'
import {jiggle, bounce} from './animation.js'

$(function() {
    initial_jiggle();
    bounce($("#down_arrow"), 15, 750);
    fillProjects();
    fillAboutMe('professional');
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function initial_jiggle() {

    var icons = $("#contact").children("a");
    for(var i = 0; i < icons.length; i++) {
        await sleep(100);
        jiggle(icons.eq(i).children("i").eq(0), 15, 200);
    }
}
