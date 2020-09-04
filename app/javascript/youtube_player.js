document.addEventListener("turbolinks:load", function(){
  // 動画検索JS
  // $(document).ready(function(){

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
  
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    ytPlayer = [];
  
    ytData = [
      {
        id: "",
        area: "movie1"
      },
      {
        id: "",
        area: "movie2"
      },
      {
        id: "",
        area: "movie3"
      },
      {
        id: "",
        area: "movie4"
      },
      {
        id: "",
        area: "movie5"
      }
    ];
    $.ajax ({
      url: "/youtube",
      type: "GET",
      dataType: "json"
    })
    .done(function(movies){
      console.log(movies)

      for(var i = 0; i < movies.length; i++) {

        ytData[i].id = movies[i]
      }
      console.log(ytData)

      window.onYouTubeIframeAPIReady = function() {
        for(var i = 0; i < ytData.length; i++){
          console.log(ytData[i]["area"])
          console.log(ytData[i]["id"])
          ytPlayer[i] = new YT.Player(ytData[i]["area"], {
            height: '260',
            width: '420',
            videoId: ytData[i]["id"],
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          })
        }
      }

    })
    .fail(function(){
      alert("動画を取得できませんでした。");
    })
  // })

  document.player = null;



  window.onPlayerReady = function(event) {
    event.target.playVideo();
  }

  window.done = false;
  window.onPlayerStateChange = function(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }

  function stopVideo() {
    ytPlayer[i].stopVideo();
  }

});