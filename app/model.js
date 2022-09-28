export function changePage(pageID, subPage) {
  if (subPage == undefined) {
    $.get(`pages/${pageID}/${pageID}.html`, function (data) {
      $("#app").html(data);
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page not found. Check your URL.");
      }
    });
  } else {
    $.get(`pages/${pageID}/${subPage}.html`, function (data) {
      $("#app").html(data);
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page not found. Check your URL.");
      }
    });
  }
}
