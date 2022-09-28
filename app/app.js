import * as MODEL from "./model.js";

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  let pageIDArray = pageID.split("/");
  pageID = pageIDArray[0];
  let subPageID = pageIDArray[1];

  if (pageID == "") {
    MODEL.changePage("home");
  } else {
    if (pageID == subPageID) {
      MODEL.changePage(pageID);
    } else {
      MODEL.changePage(pageID, subPageID);
    }
  }
}

function initApp() {
  $(window).on("hashchange", route);
  route();
  initListeners();
}

$(document).ready(function () {
  initApp();
});

async function initListeners() {
  $("#login").click(async (e) => {
    const { value: loginValues } = await Swal.fire({
      title: "Log in",
      html:
        '<label for="username">Username:</label>' +
        '<input id="username" class="swal2-input">' +
        '<label for="password">Password:</label>' +
        '<input type="password" id="password" class="swal2-input">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Log In",
      confirmButtonColor: "#347deb",
      preConfirm: () => {
        return [$("#username").val(), $("#password").val()];
      },
    });

    try {
      if (loginValues[0] == "") {
        Swal.fire({
          title: "Error",
          text: "Please enter a username.",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "Retry",
        }).then((result) => {
          $("#login").trigger("click");
        });
      } else if (loginValues[1] == "") {
        Swal.fire({
          title: "Error",
          text: "Please enter a password.",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "Retry",
        }).then((result) => {
          $("#login").trigger("click");
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: `Welcome, ${loginValues[0]}!`,
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#28a745",
        });
      }
    } catch (e) {}
  });
}
