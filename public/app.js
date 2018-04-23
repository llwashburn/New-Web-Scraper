
//App.js 
// by writing a function that takes in 'scrapedData' (JSON) and creates a table body
function displayResults(scrapedData) {
  // First, empty the table
  $("tbody").empty();

  // Then, for each entry of that json...
  scrapedData.forEach(function(scrapedData) {
    // Append each of the article's properties to the table
    $("tbody").append(
      "<tr><td>" +
        scrapedData.title +
        "</td>" +
        "<td>" +
        scrapedData.link +
        "</td>" +
        "</tr>" 
    )
  });
}

// // Bonus function to change "active" header
// function setActive(selector) {
//   // remove and apply 'active' class to distinguish which column we sorted by
//   $("th").removeClass("active");
//   $(selector).addClass("active");
// }

// 1: On Load
// ==========

// First thing: ask the back end for json with all articles
$.getJSON("/all", function(data) {
  console.log(data);
  // Call our function to generate a table body
  displayResults(data);
// $("#results").append("<tr><td>" + data[i].title + "</td>" + 
// "<td>" + data[i].link + "</td>" +
// // "<td>" + data[i].image + "</td>" +
// "</td></tr>");
});

// First thing: ask the back end for json with all animals
$.getJSON("/scrape", function(data) {
  // Call our function to generate a table body
  displayResults(data);
// $("#results").append("<tr><td>" + data[i].title + "</td>" + 
// "<td>" + data[i].link + "</td>" +
// // "<td>" + data[i].image + "</td>" +
// "</td></tr>");
});


// 2: Button Interactions
//DELETE
// ======================

// // When user clicks the id "#delete" button, remove the id article from the table?
// $("#delete").on("click", function() {
    
//   // Set new column as currently-sorted (active)
//   setActive("#what goes here?");

//   // Do an api call to the back end for json with all article 
//   $.getJSON("/delete", function(data) {
//     // Call our function to generate a table body
//     displayResults(data);
//   });
// });

//SAVE ARTICLE
// // When user clicks the id "#save" button, display the table in a saved route? 
// $("#save").on("click", function() {
//   // Set new column as currently-saved(active)
//   setActive("#what goes here?");

//   // Do an api call to the back end for json with all saved articles 
//   $.getJSON("/save", function(data) {
//     // Call our function to generate a table body
//     displayResults(data);
//   });
// });
