<?php
require './medoo/src/Medoo.php';
use Medoo\Medoo;
include 'config.php';

if(isset($_POST["coso"])){
    // Initialize
    $database = new Medoo([
        'database_type' => 'mysql',
        'database_name' => $config["dbname"],
        'server'        => 'localhost',
        'username'      => $config["dbuser"],
        'password'      => $config["dbpass"]
    ]);

    // $hash = md5($config["sec"]);
    $time = date("Y-m-d H:i:s", time());

    $database->insert('cursores', [
        'pos'   => $_POST["pos"],
        'time'  => $time
    ]);

    echo "posiciones guardadas";
    exit;
}

if(isset($_GET["action"]) && $_GET["action"] == "posiciones"){
    // Initialize
    $database = new Medoo([
        'database_type' => 'mysql',
        'database_name' => $config["dbname"],
        'server'        => 'localhost',
        'username'      => $config["dbuser"],
        'password'      => $config["dbpass"]
    ]);
    $data = $database->select("cursores", ["pos"]);
    echo json_encode($data);
    exit;
}


 ?>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">

    <title>objeto-b</title>
    <link rel="icon" type="image/png" href="">

    <meta name="description" content="">
    <meta name="author" content="OBJETO-B">


    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@700&display=swap" rel="stylesheet">
    <link href='./style.css?v=1' rel='stylesheet' />
</head>
<body>


<div id="app" :class="{fullscreen: !modalClosed}" v-cloak>

    <div id="cursores">
        <div class="cursor" v-for="c in cursores" v-bind:style="{ left: `${c[cursoresIndex][0] * window.innerWidth}px`, top: `${c[cursoresIndex][1] * window.innerHeight}px` }">
        </div>
    </div>


    <div id="intro" class="">
        <h1>{{titulo}}</h1>
    </div>
    <div class="desc">
        <p>{{introTxt}}</p>
    </div>
    <div class="films">
        <div class="item" v-for="vid in vids" v-bind:style="{ backgroundImage: `url(${vid.thumb.url})` }" @click="OpenVideo(vid)">
            <div class="inner">
                <h2 class="title">{{vid.titulo}}</h2>
            </div>
    	</div>


    </div>





    <div id="modal" :class="{closed: modalClosed}" v-if="typeof openedVid !== 'undefined'">
            <div class="columns">
                <div class="column videoContainer">
                    <video ref="videoPlayer" width="450" controls v-bind:src="openedVid.video.url" autoplay></video>
                </div>
                <div class="column videoMetadata">
                    <p><strong>{{openedVid.titulo}}</strong><p>
                    <div v-if="openedVid.autor">por {{openedVid.autor}}</div>
                    <div v-html="openedVid.texto.html"></div>
                </div>
            </div>
            <div class="cerrar" @click="CloseVideo()"><span>[X]</span></div>


    </div>




</div><!-- app -->






    <footer>

    </footer>

    <!-- md5 -->
    <script src="./md5.min.js"></script>
    <!-- superagent -->
    <script src="https://cdn.jsdelivr.net/npm/superagent@5.3.1/dist/superagent.min.js" integrity="sha256-Z+shWFMYVbUNCQNUL1R4yVVi1rVDwLDBG3a0K93dQkc=" crossorigin="anonymous"></script>
    <!-- vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <!-- main -->
    <script src="./script.js"></script>
</body>
