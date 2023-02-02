export function jiggle(ob, pix, duration) {
    ob.animate({bottom: "+=" + pix + "px"}, duration);
    return ob.animate({bottom: "-=" + pix + "px"}, duration).promise();
}

export async function bounce(ob, pix, duration) {
        await jiggle(ob, pix, duration);
        bounce(ob, pix, duration);
}