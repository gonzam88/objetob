(function() {
    setTimeout(function(){
        document.getElementById("intro").classList.add("opened")
    },600)
    const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: `{ videos { id titulo video { url } thumb { url } texto { html } } }`})
  };

  fetch(`https://api-eu-central-1.graphcms.com/v2/ckdeyuw9er2q401xs12xcgnom/master`, options)
      .then(res => res.json())
      // .then(res => console.log(res.data.videos))
      .then(res => app.SetVideos(res.data.videos))//app._data.vids = res.data.videos.slice(0,0) )


  fetch(`${location.href}?action=posiciones`)
    .then(res => res.json())
    .then(res => app.SetCursores(res))
})();



var app = new Vue({
    el: '#app',
    data: {
        titulo: "objeto-b",
        introTxt: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eu sem integer vitae justo. Fringilla urna porttitor rhoncus dolor purus non. Sit amet cursus sit amet dictum sit amet. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Nunc mattis enim ut tellus elementum sagittis vitae et. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Vivamus arcu felis bibendum ut tristique et egestas. Enim neque volutpat ac tincidunt. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tellus in metus vulputate eu scelerisque felis. Nisl purus in mollis nunc sed.

Egestas diam in arcu cursus euismod quis. Consequat ac felis donec et odio pellentesque diam volutpat commodo. Odio euismod lacinia at quis risus sed. Venenatis a condimentum vitae sapien pellentesque. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Nunc aliquet bibendum enim facilisis gravida neque. Mus mauris vitae ultricies leo integer malesuada. Morbi enim nunc faucibus a. Orci porta non pulvinar neque laoreet suspendisse. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Ut etiam sit amet nisl purus in.

Neque sodales ut etiam sit amet nisl purus. A erat nam at lectus urna duis. Risus pretium quam vulputate dignissim suspendisse in est ante in. Sem nulla pharetra diam sit amet nisl suscipit. Blandit massa enim nec dui nunc mattis enim ut tellus. Vitae et leo duis ut diam. Tortor aliquam nulla facilisi cras fermentum odio. Vulputate mi sit amet mauris commodo quis. Donec ultrices tincidunt arcu non sodales neque. Quam adipiscing vitae proin sagittis nisl. Sollicitudin aliquam ultrices sagittis orci. Quisque egestas diam in arcu cursus euismod quis. Nam libero justo laoreet sit amet. Hac habitasse platea dictumst vestibulum rhoncus est. Auctor eu augue ut lectus arcu bibendum at varius. Leo integer malesuada nunc vel risus. Aliquet enim tortor at auctor urna nunc id.

Sit amet facilisis magna etiam tempor orci eu. Cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo. Sed blandit libero volutpat sed. Feugiat in fermentum posuere urna nec tincidunt. Ultricies lacus sed turpis tincidunt id. Posuere ac ut consequat semper viverra. Odio aenean sed adipiscing diam donec adipiscing. Arcu non odio euismod lacinia at quis risus sed. Sem et tortor consequat id porta nibh venenatis cras sed. Blandit massa enim nec dui nunc. Interdum posuere lorem ipsum dolor. Diam donec adipiscing tristique risus nec feugiat in fermentum. Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod. Ut tellus elementum sagittis vitae et leo duis ut diam.

Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Facilisis gravida neque convallis a cras semper. Velit euismod in pellentesque massa placerat. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies. Duis at consectetur lorem donec massa sapien faucibus et. Nulla facilisi morbi tempus iaculis urna id. Turpis massa tincidunt dui ut. Ultrices neque ornare aenean euismod elementum. Integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Sit amet volutpat consequat mauris nunc. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat.`,
        vids:[],
        openedVid: {titulo:"", texto:{html:""}, thumb:{url:""}, video   :{url:""}},
        modalClosed: true,
        cursores: [],
        cursoresIndex: 0,
        indexIncrementing: true,
    },


    methods:{
        SetVideos: function (newVids) {
            this.vids = newVids
        },
        OpenVideo: function(ele){
            this.openedVid = ele;
            this.modalClosed = false;
            this.$refs.videoPlayer.play()
        },
        CloseVideo: function(){
            this.modalClosed = true;
            this.$refs.videoPlayer.pause()
        },

        SetCursores: function(newCursores){
            let temp = [];
            for(let i = 0; i < newCursores.length; i++){
                temp.push(JSON.parse(newCursores[i].pos));
            }
            // console.log(temp)
            this.cursores = temp
        },
        NextTick: function(){
            if(this.indexIncrementing){
                this.cursoresIndex++;
                if(this.cursoresIndex == cantPosiciones-1){
                    this.indexIncrementing = false
                }
            }else{
                this.cursoresIndex--;
                if(this.cursoresIndex <= 0){
                    this.indexIncrementing = true
                }
            }
        }
    }
})




var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

startAnimating(2);
// initialize the timer variables and start the animation
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}



function animate() {
    // request another frame
    requestAnimationFrame(animate);
    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
        // Put your drawing code here
        tick();
    }
}



var xpos;
var ypos;
function findScreenCoords(mouseEvent)
{
  if (mouseEvent)
  {
    //FireFox
    xpos = mouseEvent.pageX;
    ypos = mouseEvent.pageY;
  }
  else
  {
    //IE
    xpos = window.event.pageX;
    ypos = window.event.pageY;
  }
}
document.getElementsByTagName("body")[0].onmousemove = findScreenCoords;

var cantPosiciones = 50;
var posiciones = []
var savedPosiciones = false;
function tick(){
    // console.log(xpos/window.innerWidth,ypos/window.innerHeight)
    if(posiciones.length < cantPosiciones){
        if(!isNaN(xpos) && !isNaN(ypos)){
            posiciones.push([
                xpos/window.innerWidth,
                ypos/window.innerHeight])
        }
    }else{
        if(!savedPosiciones){
            // GUARDAR EN DB
            superagent
               .post('')
               .send({ coso: 'hola', pos: JSON.stringify(posiciones)})
               .type("form")
               .set('Accept', 'application/json')
               .then(res => {
                  console.log(res.text)
               });
           console.log("posiciones enviadas")
           savedPosiciones = true;
        }
    }
    // Muevo las animaciones actuales
    app.NextTick();
}

// requestAnimationFrame polyfill
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
