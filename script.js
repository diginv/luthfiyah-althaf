$(function() {

  // $("section").hide();
  // const baseUrl = "https://109.106.255.62:8443";
  const baseUrl = "http://diginv.duckdns.org:8080";
  // const baseUrl = "http://localhost:8080";
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

  const createWish = (nama, ucapan, waktu) => {
    const namaEl = document.createElement("div");
    namaEl.classList.add("nama");
    namaEl.textContent = nama;

    const ucapanEl = document.createElement("div");
    ucapanEl.classList.add("ucapan");
    ucapan = ucapan.replace(/\n/g, '<br/>');
    ucapan = DOMPurify.sanitize(ucapan);
    ucapanEl.innerHTML = ucapan;

    const waktuEl = document.createElement("div");
    waktuEl.classList.add("waktu");
    waktuEl.textContent = waktu;

    const newWish = document.createElement("div");
    newWish.classList.add("wish");
    newWish.appendChild(namaEl);
    newWish.appendChild(ucapanEl);
    newWish.appendChild(waktuEl);

    return newWish;
  }

  const wishes = document.getElementById("wishes");

  const refresh = () => {
    wishes.innerHTML = "";
    $.ajax(
      {
        url: `${baseUrl}/wishes`,
        success: (result) => {
          result.forEach((el) => {
            const createdDate = new Date(el.createdAt)
            const currentDate = new Date();
            const diffTime = currentDate - createdDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            console
            if (diffDays > 0) {
              time = `${diffDays} hari yang lalu`
            } else if (currentDate.getHours() - createdDate.getHours() > 0) {
              time = `${currentDate.getHours() - createdDate.getHours()} jam lalu`
            } else if (currentDate.getMinutes() - createdDate.getMinutes() > 0) {
              time = `${currentDate.getMinutes() - createdDate.getMinutes()} menit lalu`
            } else {
              time = `${currentDate.getSeconds() - createdDate.getSeconds()} detik lalu`
            }
            wishes.appendChild(createWish(el.name, el.wish, time));
          });
        }
      }
    );
  }

  refresh();

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

  const giftGap = $("#gift-container").css("gap").replace("px", "");
  const giftHeight = $("#gift-image").height();
  const openHeight = $("#open").height();

  $("#toggle-gift").click(() => {
    if ($("#gift-image").height() === giftHeight) {
      $("#gift-image").height("0px");
      $("#gift-hider").height(openHeight);
      $("#toggle-gift").html("Close");
      $("#gift-container").css("gap", `${giftGap/2}px`);
    } else {
      $("#gift-image").height(giftHeight);
      $("#gift-hider").height("0px");
      $("#toggle-gift").html("Open");
      $("#gift-container").css("gap", `${giftGap}px`);
    }
  })

  $("#wish-button").click(() => {
    const name = $("#wish-nama").val()
    const wish = $("#wish-ucapan").val()
    if (name === "" || wish === "") {
      alert("Nama atau ucapan masih kosong");
      return;
    }
    const data = {
      name: name,
      wish: wish,
    };
    console.log(data);
    $.ajax(
      {
        url: `${baseUrl}/wish`,
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: (result) => {
          $("#wish-nama").val("");
          $("#wish-ucapan").val("");
          refresh();
        }
      }
    );
  });

  const day = document.getElementById("day").children[0];
  const hour = document.getElementById("hour").children[0];
  const minute = document.getElementById("minute").children[0];
  const second = document.getElementById("second").children[0];
  const theDay = new Date("2025-04-05T08:00:00");

  const countdownUpdate = () => {
    const now = new Date();
    const difference = theDay - now;

    if (difference <= 0) {
      console.log('The countdown has finished!');
      clearInterval(countdown);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    day.innerHTML = days;
    hour.innerHTML = hours;
    minute.innerHTML = minutes;
    second.innerHTML = seconds;
  };

  const countdown = setInterval(countdownUpdate, 1000)

  $("#bsi-copy").click(() => {
    const bsi = document.createElement("input");
    bsi.value = $("#bsi-number").html();
    bsi.select();
    bsi.setSelectionRange(0, 99999);
    if ($("#bsi-copy").html() === `<i class="fa-solid fa-check"></i>Copied`) {
      $("#bsi-copy").html(`<i class="fa-regular fa-copy"></i>Copy`);
    } else {
      $("#bsi-copy").html(`<i class="fa-solid fa-check"></i>Copied`);
    }
    navigator.clipboard.writeText(bsi.value);
  });

  $("#bca-copy").click(() => {
    const bca = document.createElement("input");
    bca.value = $("#bca-number").html();
    bca.select();
    bca.setSelectionRange(0, 99999);
    if ($("#bca-copy").html() === `<i class="fa-solid fa-check"></i>Copied`) {
      $("#bca-copy").html(`<i class="fa-regular fa-copy"></i>Copy`);
    } else {
      $("#bca-copy").html(`<i class="fa-solid fa-check"></i>Copied`);
    }
    navigator.clipboard.writeText(bca.value);
  });

})
