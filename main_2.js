img = "";
status = "";
object = [];

function preload() {
    img = loadImage('ta.jpg');
}
function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object is Detecting";

}

function modelLoaded() {
    status = true;
    console.log("Done!");
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    object = results;
}

function draw() {

    image(img, 0, 0, 600, 400);

    if (status != "") {
        for (i = 0; i < object.length; i++) {

            document.getElementById("status").innerHTML = "Object is Detected";

            fill("#000000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 20, object[i].y + 20);
            noFill();
            stroke("#ffffff");
            rect(object[i].x,
                 object[i].y, 
                 object[i].width, 
                 object[i].height);


        }
    }
}