$(function() {
  const song = document.getElementById("song")
  let isPlayed = false;

  $("#playback").click(() => {
    if (isPlayed) {
      song.pause();
      isPlayed = false;
    } else {
      song.play();
      isPlayed = true;
    }
  });


  // $("#open").toggle()
  generateDust("cover-image")
  generateDust("invited-image")
  generateDust("bio-image")
  // generateDust("journey-image")
  generateDust("location-image")
  // generateDust("gift-image")
  // generateDust("sambutan-image")

  $("#invitation-button").click(() => {
    $("#cover").addClass("opened")
    song.play();
  })
  // song.currentTime = 0;
  // song.play();

  $("#toggle-gift").click(() => {
    console.log($("#gift-image").height());
    if ($("#gift-image").height() === 150) {
      $("#gift-image").height("0px");
      $("#gift-hider").height("420px");
      $("#toggle-gift").html("Close");
      $("#gift-container").css("gap", "10px");
    } else {
      $("#gift-image").height("150px");
      $("#gift-hider").height("0px");
      $("#toggle-gift").html("Open");
      $("#gift-container").css("gap", "20px");
    }
    // $("#open").toggle()
  })

  $("#bsi-copy").click(() => {
    const bsi = document.createElement("input");
    bsi.value = $("#bsi-number").html();
    bsi.select();

    bsi.setSelectionRange(0, 99999);
    console.log(bsi);
    navigator.clipboard.writeText(bsi.value);
  });
  // $("#bsi-copy").click(() => {
  //   navigator.clipboard.writeText($("#bsi-number").html());
  // });
})
