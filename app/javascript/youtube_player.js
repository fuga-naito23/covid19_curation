document.addEventListener("turbolinks:load", function(){
  //youtubeplayer埋め込み配列
  ytPlayer = [];
  //youtube埋め込み要素,videoId配列
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
      //検証のためconsole.logを残す
      console.log(movies)
      for(var i = 0; i < movies.length; i++) {
        ytData[i].id = movies[i]
      }
      console.log(ytData)

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
    
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = function() {
        for(var i = 0; i < ytData.length; i++){
          console.log("OK")
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