const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width;
let height;

function setSize() {
    if (window.innerWidth > (window.innerHeight * 4 / 3)) {
        height = window.innerHeight-15;
        width = height * 4 / 3;
    } else {
        width = window.innerWidth-20;
        height = width * 3 / 4;
    }
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    ctx.scale(width/640, height/480);
}

setSize();
ctx.closePath();

window.onresize = function() {
    setSize();
};
