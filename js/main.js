$("#toggle-nav").click(function () {
  if ($("#nav").css("left") == "0px") {
    $("#toggle-nav i").removeClass(" fa-xmark");
    $("#toggle-nav i").addClass("fa-bars");

    $("#nav").animate({ left: "-250" }, 500, () => {
      // $('#navbar-menu ul').toggle(800);
    });
    $("#navbar-menu ul li")
      .eq(5)
      .animate({ bottom: "-50px", opacity: "0" }, 50, () => {
        $("#navbar-menu ul li")
          .eq(4)
          .animate({ bottom: "-100px", opacity: "0" }, 50, () => {
            $("#navbar-menu ul li")
              .eq(3)
              .animate({ bottom: "-150px", opacity: "0" }, 50, () => {
                $("#navbar-menu ul li")
                  .eq(2)
                  .animate({ bottom: "-200px", opacity: "0" }, 50, () => {
                    $("#navbar-menu ul li")
                      .eq(1)
                      .animate({ bottom: "-250px", opacity: "0" }, 50, () => {
                        $("#navbar-menu ul li")
                          .eq(0)
                          .animate(
                            { bottom: "-300px", opacity: "0" },
                            50,
                            () => {}
                          );
                      });
                  });
              });
          });
      });
  } else {
    $("#toggle-nav i").removeClass("fa-bars");
    $("#toggle-nav i").addClass(" fa-xmark");

    $("#nav").animate({ left: "0px" }, 500, () => {
      $("#navbar-menu ul li")
        .eq(0)
        .animate({ bottom: "0px", opacity: "1" }, 250, () => {
          $("#navbar-menu ul li")
            .eq(1)
            .animate({ bottom: "0px", opacity: "1" }, 240, () => {
              $("#navbar-menu ul li")
                .eq(2)
                .animate({ bottom: "0px", opacity: "1" }, 230, () => {
                  $("#navbar-menu ul li")
                    .eq(3)
                    .animate({ bottom: "0px", opacity: "1" }, 220, () => {
                      $("#navbar-menu ul li")
                        .eq(4)
                        .animate({ bottom: "0px", opacity: "1" }, 210, () => {
                          $("#navbar-menu ul li")
                            .eq(5)
                            .animate(
                              { bottom: "0px", opacity: "1" },
                              200,
                              () => {}
                            );
                        });
                    });
                });
            });
        });
    });
  }
  // console.log($("#nav").css("left"));
});

// //////////////////////////////////////////////////////////////
// api

const apiKey = "api_key=0baecb2ca1948d3d843c177ac589fdc9";
const baseUrl = "https://api.themoviedb.org/3";
const popularApiUrl =
  baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const nowPlayingApiUrl =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=0baecb2ca1948d3d843c177ac589fdc9&language=en-US&page=1";
const topRatedApiUrl =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=0baecb2ca1948d3d843c177ac589fdc9&language=en-US&page=1";
const upcomingApiUrl =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=0baecb2ca1948d3d843c177ac589fdc9&language=en-US&page=1";
const trendingApiUrl =
  "https://api.themoviedb.org/3/trending/movie/day?api_key=0baecb2ca1948d3d843c177ac589fdc9";
const searchApiUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=0baecb2ca1948d3d843c177ac589fdc9&language=en-US&page=1";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const movies = document.getElementById("movies");
const searchINPT = document.getElementById("search-input");
const searchCurrentINPT = document.getElementById("searchCurrent");

let currentData;

getMovies(topRatedApiUrl);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      showMovies(data.results);

      // console.log(currentData);
    });
}

function showMovies(data) {
  movies.innerHTML = "";
  data.forEach((movie) => {
    let cartoona = ``;
    const { title, poster_path, vote_average, release_date, overview } = movie;

    const movieCard = document.createElement("div");
    movieCard.classList.add("col-md-4");
    cartoona += `<div id="${title}" class="movie-card">
    <img src="${imgUrl + poster_path}" alt="${title}">
    <div class="layer">
    
    <h2>${title}</h2>
    <p>${overview}</p>
    <p>${vote_average}</p>
    <p>${release_date}</p>
    
    </div>
    </div>`;
    movieCard.innerHTML = cartoona;

    movies.appendChild(movieCard);
  });
  currentData = data;
  // console.log(currentData);
}

$("#nowPlaying").click(function () {
  getMovies(nowPlayingApiUrl);
});
$("#popular").click(function () {
  getMovies(popularApiUrl);
});
$("#topRated").click(function () {
  getMovies(topRatedApiUrl);
});
$("#trending").click(function () {
  getMovies(trendingApiUrl);
});
$("#upcoming").click(function () {
  getMovies(upcomingApiUrl);
});

$("#search-input").keyup(function (e) {
  let searchTerm = searchINPT.value;

  if (searchTerm != "") {
    getMovies(searchApiUrl + "&query=" + searchTerm);
  }
});

$("#searchCurrent").keyup(function (e) {
  let searchTerm = searchCurrentINPT.value;

  let filterdData = currentData.filter((movie) =>
    movie.title.includes(searchTerm)
  );

  console.log(filterdData);

  if (searchTerm != "") {
    showMovies(filterdData);
  } else {
    getMovies(topRatedApiUrl);
  }
});

// /////////////////////////////////////////////////////
// contact form

let nameInp = document.querySelector("#nameInp");
let emailInp = document.querySelector("#emailInp");
let phoneInp = document.querySelector("#phoneInp");
let ageInp = document.querySelector("#ageInp");
let passInp = document.querySelector("#passInp");
let repassInp = document.querySelector("#repassInp");

$("#nameInp").keyup(function (e) {
  let re = new RegExp("\\s+");

  if (re.test(nameInp.value)) {
    $("#contact .row div:nth-child(2) .alert").removeClass("d-none");
    console.log("space");
  } else {
    $("#contact .row div:nth-child(2) .alert").addClass("d-none");
  }
});

$("#emailInp").keyup(function (e) {
  let respace = new RegExp("\\s+");
  // let remail = new RegExp(".com")
  let remail = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );

  if (remail.test(emailInp.value)) {
    $("#contact .row div:nth-child(3) .alert").addClass("d-none");
    console.log("space");
  } else {
    $("#contact .row div:nth-child(3) .alert").removeClass("d-none");
  }
});

$("#phoneInp").keyup(function (e) {
  let respace = new RegExp("\\s+");
  let rephone = new RegExp("^.{15}$");

  if (rephone.test(phoneInp.value)) {
    $("#contact .row div:nth-child(4) .alert").removeClass("d-none");

    console.log("space");
  } else {
    $("#contact .row div:nth-child(3) .alert").addClass("d-none");
  }
});

$("#ageInp").keyup(function (e) {
  let respace = new RegExp("\\s+");
  let reage = new RegExp("^.{3}$");

  if (reage.test(ageInp.value)) {
    $("#contact .row div:nth-child(5) .alert").removeClass("d-none");

    console.log("space");
  } else {
    $("#contact .row div:nth-child(5) .alert").addClass("d-none");
  }
});

$("#passInp").keyup(function (e) {
  if (passInp.value.match(/^[A-Za-z]\w{7,14}$/)) {
    $("#contact .row div:nth-child(6) .alert").addClass("d-none");
    console.log("space");
  } else {
    $("#contact .row div:nth-child(6) .alert").removeClass("d-none");
    console.log("wrong" + passInp.value);
  }
});

$("#repassInp").keyup(function (e) {
  if (repassInp.value == passInp.value) {
    $("#contact .row div:nth-child(7) .alert").addClass("d-none");
    console.log("space");
  } else {
    $("#contact .row div:nth-child(7) .alert").removeClass("d-none");
    console.log("wrong" + passInp.value);
  }
});
