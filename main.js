song_1 = "";
song_2 = "";
song_1_status = "";
song_2_status = "";
score_right_wrist = 0;
score_left_wrist = 0;

left_Wrist_X = "";
left_Wrist_Y = "";
right_Wrist_X = "";
right_Wrist_Y = "";

function preload() {
    song_1 = loadSound("AllOfYou.mp3");
    song_2 = loadSound("CouldHaveBeenMe.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log("score_right_wrist = " + score_right_wrist +"score_left_wrist ="+ score_left_wrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        console.log("leftWristX = " + leftWristX +"leftWristY ="+ leftWristY);
        
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("rightWristX = " + rightWristX +"rightWristY ="+ rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 500, 500);

    song_1_status = song_1.isPlaying(); 
    song_2_status = song_1.isPlaying();

    fill("blue");
    stroke("gray");

    if (score_right_wrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song_2.stop();
        if (song_1_status == false) {
            song_1.play();
            document.getElementById("song").innerHTML = "playing-Could Have Been Me";
        }
    }

    if (score_left_wrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song_1.stop();
        if (song_2_status == false) {
            song_2.play();
            document.getElementById("song").innerHTML = "playing-All Of You";
        }
    }
}


function play() {
    song_1.play();
    song.setVolume(1);
    song.rate(1);
}