document.addEventListener("turbolinks:load", function(){

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";

  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  ytPlayer = [];

  ytData = [
    {
      id: "ZRCdORJiUgU",
      area: "movie1"
    },
    {
      id: "6aFdEhEZQjE",
      area: "movie2"
    }
  ];

  document.player = null;

  window.onYouTubeIframeAPIReady = function() {
    for(var i = 0; i < ytData.length; i++){
      ytPlayer[i] = new YT.Player(ytData[i]["area"], {
        height: '260',
        width: '420',
        videoId: ytData[i]['id'],
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      })
    }
    // player = new YT.Player('youtube-player', {
    //   height: '260',
    //   width: '420',
    //   videoId: '76TjJ6djE6Y',
    //   events: {
    //     'onReady': onPlayerReady,
    //     'onStateChange': onPlayerStateChange
    //   }
    // });
  }

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