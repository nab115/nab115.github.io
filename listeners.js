import {jiggle} from './animation.js'
import { fillAboutMe } from './content.js';

$('#contact a').hover(({currentTarget}) => jiggle($(currentTarget).children('i').eq(0), 15, 200)
    // do nothing on mouse leaving the element
    , () => {}
);

$('.smooth-scroll').click((e) => {
        e.preventDefault();
        var target = e.currentTarget.getAttribute('href');
        document.getElementById(target).scrollIntoView({behavior: 'smooth'});
    }
)

$('.mode').click(function(e) {

    $('.mode').toggleClass('selected');
    fillAboutMe($(this).attr('id'))
})