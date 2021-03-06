
var countries_test = ["United States", "United Kingdom", "France", "American Samoa",
"Andorra",
"Angola","Bahrain",
"Bangladesh",
"Barbados"];

var countries = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cape Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthélemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

/*
 * array of artists objects - { name, [countries] };
 */
var artist_list = [];
var complete_pc = 0;
var allCountries = [];
var prevCountries = [];
var width, height;

// for each country in the list abouve, run the following function
$.each(countries, function(i, c) {

  // make the call to the Last.fm API
  $.ajax({
    type: 'POST',                                   // type of request
    url: 'https://ws.audioscrobbler.com/2.0/',      // api url
    data: 'method=geo.gettopartists&' +             // api call
      'country=' + c + '&' +                        // country name
      'limit=10&' +                                 // number of results
      'api_key=58c7574ddd5054ce095f027a95a92e58&' + // api key
      'format=json',                                // return format
    dataType: 'jsonp',
    success: function(data) {                       // if returns data

      try {
        //console.log(c);

        var c_data = {
          name: c.replace(/ /g,''),
          countries: data
          // long-name: c
        };
        allCountries.push(c_data);


        var arts = "" + c + ": ";

        $.each(data.topartists.artist, function(i, item) {
          arts = arts + item.name + ", ";

          // is artist already in list?
          var pos = artist_list.map(function(e) {
            return e.artist_name;
          }).indexOf(item.name);

          //console.log(pos);

          if (pos === -1) {

            var c_list = [];
            //console.log(c.replace(/ /g,''));
            c_list.push(c.replace(/ /g,''));
            //console.log("pos===-1");
            var newI = {
              artist_name: item.name,
              artist_image: item.image[1]['#text'],
              countries: c_list
            };
            artist_list.push(newI);
            //console.log("New length: " + artist_list.length);
          } else {
            artist_list[pos].countries.push(c.replace(/ /g,''));
            //console.log("artist exists (" + item.name + "), new length: " + artist_list[pos].countries.length);
          }
        });

        arts = arts.substr(0, arts.length - 2);
        //console.log(arts);
      } catch (err) {
        console.log("Last.fm cannot find: " + c + "(" + err + ")");
      }

    },
    error: function(code, message) {
      console.log('Error Code: ' + code + ', Error Message: ' + message);
    },
    complete: function() {
      //console.log("Complete: " + (i+1) + " of " + countries.length + " no of artists = " + artist_list.length);
      if (i === (countries.length - 1)) {
        console.log("ALL COUNTRIES DONE");
        var div_l = document.getElementById("fixedNames");
        div_l.innerHTML = "All counties loaded. To use:<br>Move cursor over an artist image from the list below.";

        artist_list.sort(function(a, b) {
          return (b.countries.length) - (a.countries.length);
        });

        var div = document.getElementById("countries_list");
        div.innerHTML = div.innerHTML + "<ul>";

        $.each(artist_list, function(i, item) {

          /*var str = "<li><img src=" + item.artist_image + "/><a href='#' onmouseover='mouseOver(\"" + item.artist_name + "\")' onmouseout='mouseOut(\"" + item.artist_name + "\")'>" + item.artist_name + "</a> (" + item.countries.length + ")</li>";*/

          var str = "<li>" +
                    //"<img src=\"" + item.artist_image + "\"/>" +
                    "<a href='#'" +
                    "   onmouseover='mouseOver(\"" + item.artist_name + "\")'"+
                    "   onmouseout='mouseOut(\"" + item.artist_name + "\")'" +
                    ">" +
                    "<img src=\"" + item.artist_image + "\"/>" +
                    "</a>"+
                    "</li>";

          //console.log(str);

          /*
                  +
                              "<td>";
                    $.each(item.countries, function(i,i_c) {
                      str = str + i_c + "; ";
                    });

                    str = str.substr(0,str.length-2) + "</td></tr>";
                    console.log(str);
                    */
          div.innerHTML = div.innerHTML + str;

        });

        div.innerHTML = div.innerHTML + "</ul>";

        document.getElementById("countries_list").style.display = "block";

        //console.log("Tidy SVG to match Last.fm idiosyncracies");
        svg.selectAll("#Vietnam").attr("id","VietNam");
        svg.selectAll("#Russia").attr("id","RussianFederation");
        //svg.selectAll("#Lao PDR").attr("id","Lao People/'s Democratic Republic");
        svg.selectAll("#Tanzania").attr("id","Tanzania,UnitedRepublicof");
        svg.selectAll("#Syria").attr("id","SyrianArabRepublic");
        svg.selectAll("#S.Sudan").attr("id","SouthSudan");
        //svg.selectAll("#Czech Rep/.").attr("id","Czech Republic");

      } else {
        //console.log ('update pc');
        complete_pc = ((i / (countries.length - 1)) * 100).toFixed(0);
        //var div_l = document.getElementById("loader_pc");
        var div_l = document.getElementById("fixedNames");
        div_l.innerHTML = "Loading: " + complete_pc + "%";
        //console.log("Searched: " + c);

        if(c.length > 10)
          div_l.innerHTML += "<br>" + c.substr(0,7) + "...";
        else
          div_l.innerHTML += "<br>" + c;

      }
    }

  });
});

var svg = d3.select("#svg-container").append("svg");
redraw();
// Redraw based on the new size whenever the browser window is resized.
window.addEventListener("resize", redraw);




function mouseOut(target) {

  var nameBox = document.getElementById("fixedNames");
  nameBox.innerHTML = "To use:<br>Move cursor over an artist image from the list below.";

  var pos = artist_list.map(function(e) {
    return e.artist_name;
  }).indexOf(target);

  $.each(artist_list[pos].countries, function(i, c) {

    var str = "#"+c;
    try {
      var selection = d3.selectAll(str);
      selection.transition().duration(2000).style("fill","black");
    } catch(err) {
      //console.log("Cannot select: " + str + " [" + "]");
    }

  });
}

function mouseOver(target) {

  var pos = artist_list.map(function(e) {
    return e.artist_name;
  }).indexOf(target);

  var nameBox = document.getElementById("fixedNames");
  nameBox.innerHTML = target + "<br>Top 10 in " + artist_list[pos].countries.length + " countries";

  $.each(artist_list[pos].countries, function(i, c) {

    var str = "#"+c;

    try {
      var selection = d3.selectAll(str);
      selection.transition().style("fill","blue");
    } catch(err) {
      //console.log("Cannot select: " + str + " [" + "]");
    }

  });

}

//console.log("Set up map");

function redraw() {

  console.log("Inner width: " + window.innerWidth);



  if(window.innerWidth<window.innerHeight) {
    console.log("1");
    width = window.innerWidth-19;
    height = (window.innerWidth-19)/2;
  } else {
    console.log("2");
    height = window.innerHeight*0.75;
    width = height*2;
    if(width>window.innerWidth-19) {
      console.log("2.1");
      width=window.innerWidth-19;
      height=width/2;
    } else {
      document.getElementById("container").style.left = (window.innerWidth-width)/2+"px";
    }
  }

  var h = $('#fixedNames').height() + height;

  d3.select("#countries_list").style("padding-top", (h)+"px" );

  svg
    .attr("width", width)
    .attr("height", height);

  d3.selectAll("path.subunit").remove();

  //console.log("Set up svg element");

  d3.json("https://jiminyhall.github.io/last-fm-artist-by-country/js/world.json", function(error, world) {

    //console.log("Start svg!");

    var subunits = topojson.feature(world, world.objects);
    var projection = d3.geo.winkel3()
      .scale(width/5.5)
      .center([10, 12])
      .translate([width / 2, height / 2]);
    var path = d3.geo.path().projection(projection);

    svg.append("path")
      .datum(subunits)
      .attr("d", path);

    svg.selectAll(".subunit")
      .data(topojson.feature(world, world.objects.subunits).features)
      .enter().append("path")
      .attr("class", "subunit")
      .attr("id", function(d) {
        return "" + d.id.replace(/ /g,'');
      })
      .attr("d", path)
      .on("mouseover", function() {
        console.log("Country ID: " + this.id + " out of: " + allCountries.length);

        var pos = allCountries.map(function(e) { return e.name; }).indexOf(this.id);
        console.log(pos);
        console.log(allCountries[pos].countries.topartists.artist.map(function(e) { return e.name; }));
      });


    if (error) return console.error(error);
    //console.log(world);
  });
}

function redraw2() {

}
