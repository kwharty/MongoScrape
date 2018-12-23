var cheerio = require("cheerio");
var axios = require("axios");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every headline\n" +
            "from a reliable news source AKA The Onion:" +
            "\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
axios.get("http://www.rotoworld.com/sports/nba/basketball?ls=roto:nba:gnav").then(function(response) {

  // Load the Response into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);
  // console.log(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

 
  //ONION USES JS_CURATION.. FOR CLASS. HREF EMBEDDED BENEATH REACT
  $("div.cp1_ctrl_home1_pnlmiddle").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).text();

 
    //HAD TO GET RID OF CHILDREN HERE AS HREF CONTAINED WITHIN LARGER TAG
    var link = $(element).children().attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });

    $("#articles").val("");
    $("#notes").val("");
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
  // console.log(results.link);
  // console.log(results.title);
});
