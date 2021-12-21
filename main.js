song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
var scoreRightWrist = 0;
var scoreLeftWrist = 0;

function preload() {
    song = loadSound("hi.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded() {
    console.log('PoseNet is Initilized');
}

function draw() {
    image(video, 0, 0, 600, 500)

    fill('#FF0000');
    stroke("#FF0000");
if(scoreRightWrist > 0.01)
{
    circle(rightWristX, rightWristY, 20);

    if (right > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed").innerHTMl = "Speed = 1x";
        song.rate(1);
    } else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed").innerHTMl = "Speed = 1.5x";
        song.rate(1.5);
    } else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed").innerHTMl = "Speed = 2x";
        song.rate(2);
    } else if (rightWristY > 400 && rightWristY <= 500) {
        document.getElementById("speed").innerHTMl = "Speed = 2.5x";
        song.rate(2.5);
    }
    
}
if (scoreLeftWrist > 0.01) {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals / 500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftWristX + " leftWristY =" + leftWristY)

        rightWristY = results[0].pose.rightWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWrist = " + rightWristX + " rightWristY =" + rightWristY)
    }
}