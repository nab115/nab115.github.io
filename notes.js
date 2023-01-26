function jiggle(ob, d) {
    ob.animate({bottom: "+=15px"}, d);
    ob.animate({bottom: "-=15px"}, d);
}

// this works, yet gives maximum call stack size exceeded because of the infinite recursion
// obviously this happens, so the solution is to have an infinite loop which finishes
// each call before executing the next
async function bounce_error(ob, d) {
        jiggle(ob, d);
        bounce(ob, d);
}

async function bounce(ob, d) {
    console.log("bounce");
    ob.animate({bottom: "+=15px"}, d);
    // ob.animate({bottom: "-=15px"}, d, function() { bounce(ob, d) });
    // why does the above code work but not 
    // ob.animate({bottom: "-=15px"}, d, bounce(ob, d));
    // or this
    ob.animate({bottom: "-=15px"}, d, () => bounce(ob, d));
    // this is relevant https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript
}


// in the above, the reason 

ob.animate({bottom: "-=15px"}, d, bounce(ob, d));

// doesnt work is because animate, or any other similar function, needs to take in a function REFERENCE
// but using bounce(ob,d) INVOKES the function, and is not a suitable parameter.

// Instead, we can use function() {} which gives a reference to the bounce function
// using an arrow function () => bounce(ob, d), also works and I believe is the preferred method
// not sure why I claimed it didn't work.