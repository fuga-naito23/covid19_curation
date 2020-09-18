  function searchVideos(){
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
      url: " /api/youtube",
      type: "GET",
      dataType: "json"
    })
    .done(function(videos){
      //検証のためconsole.logを残す
      console.log(videos)
      for(var i = 0; i < videos.length; i++) {
        ytData[i].id = videos[i]
      }
      console.log(ytData)

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";

      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = function() {
        for(var i = 0; i < ytData.length; i++){
          ytPlayer[i] = new YT.Player(ytData[i]["area"], {
            height: '260',
            width: '420',
            videoId: ytData[i]["id"]
          })
        }
      }

    })
    .fail(function(){
      alert("動画を取得できませんでした。");
    })
  }

  document.addEventListener("turbolinks:load", function(){
    if ( true ) {
      console.log("OK")
      searchVideos()
    } else {
      console.log("NO")
    }
  });