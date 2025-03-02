$(function() {
  const song = document.getElementById("song")
  let isPlayed = false

  $("#playback").click(() => {
    if (isPlayed) {
      song.pause();
      isPlayed = false;
    } else {
      song.play();
      isPlayed = true;
    }
  });

  // song.play()
  



  generateDust("cover-image")
  generateDust("invited-image")
  generateDust("bio-image")
  // generateDust("journey-image")
  generateDust("location-image")
  generateDust("gift-image")
  // generateDust("sambutan-image")

  $("#invitation-button").click(() => {
    $("#cover").addClass("opened")
  })

  $("#toggle-gift").click(() => {
    $("#open").toggle()
  })
})
