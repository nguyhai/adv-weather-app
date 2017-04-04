//Worked with Josh Hight on this

$(document).ready(function () {

  console.log("hello");
  
  weatherApp = {

    $targetArea: $("#weather"),

    weatherApiKey: "",

    lastLatitiude: "",
    lastLongitude: "",

    getFormData: function () {
      if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
        weatherApp.weatherApiKey = $("#apikey").val().trim();
      }

      let zip = $("#zip").val().trim();  

      if (zip === null || zip.length < 5) {
        weatherApp.$targetArea.html("Enter a valid zip code.");
      } else {
        weatherApp.getWeatherData(zip);
      }

      console.log("Zipcode is : ", zip);
      console.log("API Key is : ", weatherApp.weatherApiKey);
      
    },

    getWeatherData: function (zipcode) {
        
      let zip = $("#zip").val().trim();  
      //let url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

      let url = "testData/test.json"

      $.getJSON(url, function (data) {
          console.log (data);
          
        if (data.cod == 200) {
          weatherApp.$targetArea.html("Success!");
         
        // THIS IS WHERE YOU WOULD ADD THE DATA TO THE PAGE
        html = "";
        // Add the city name    
        html += "<ul><h2>" + data.name +"</h2>";
        // Might need to write a loop to add more weather descriptions if there is more than 1. Come back to this later. 
        //
        // Add the weather condition descriptions, all of them, comma separated

        let description2 = "";
            
        if (typeof data.weather["1"] === "undefined"){
            console.log("That was undefined");
            description2 = "";
            //description2=data.weather["1"].description
        
        }
            else {
            description2=data.weather["1"].description
            }
            
        html += "<li>" + "Weather Description: " + data.weather["0"].description +", "+ description2  +"</li>";
        // Add the current temperature, the day's low & high temp, current pressure, & current humidity
        html += "<li>" + "Current Temperature: " + data.main.temp + 'F' + "     " + "High: " + data.main.temp_max  +'F'+ " Low: " + data.main.temp_min  +'F'+ "</li>";
        html += "<li>" + "Current Pressure: " + data.main.pressure + "</li>";
        html += "<li>" + "Current Humidity: " + data.main.humidity + "</li>";
        html += "</ul>";
            
        weatherApp.$targetArea.append(html);

          // Get the lat & longitude from the result and save
          weatherApp.lastLatitiude = data.coord.lat;
          weatherApp.lastLongitude = data.coord.lon;

          // Add a button for 5 day forcast
          weatherApp.$targetArea.append('<div id="5day"><button id="fiveDay">Get 5 Day Forecast</button></div>');
          $("#fiveDay").on("click", weatherApp.getFiveDayWeather);

        } else {
          weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
        }
      }).fail(function () {
        weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
      });
    },

    getFiveDayWeather: function () {
      //let url = "//api.openweathermap.org/data/2.5/forecast?lat=" + weatherApp.lastLatitiude + "&lon=" + weatherApp.lastLongitude + "&appid=" + weatherApp.weatherApiKey + "&units=imperial";

      let url = "testData/test5day.json"
        
      $.getJSON(url, function (data) {
        var $target = $("#5day")
        if (data.cod == 200) {
          $target.html("Success!");
            console.log (data);
        let day = new Date();
        let newDay = day.getDay();
        // THIS IS WHERE YOU WOULD ADD THE 5 DAY FORCAST DATA TO THE PAGE
        //The 5 Day forceast is uses data for every 3 hours. so every 8 would be 1 day. 0(today), 8, 16, 24, 32
            
        let description3 = "";
        if (typeof data.list["1"].weather["1"] === "undefined"){
            console.log("That was undefined");
            description2 = "";
        
        }
            else {
            description3=data.list["1"].weather["1"].description
            }    
            
        html = "";
        html += "<ul><h2>Five Day Weather Forcast</h2>";
            
            html += "<p><b>"+data.list["0"].dt_txt +"</b></p>";
            html += "<li>Weather Description: " + data.list["0"].weather["0"].description + ", "+ description3  +"</li>";
            html += "<li>Temperature: "+ data.list["0"].main.temp +" High: "+ data.list["0"].main.temp_max +" Low: "+ data.list["0"].main.temp_min +" </li>";
            html += "<li>Pressure: "+ data.list["0"].main.pressure +"</li>";
            html += "<li>Humidity: "+ data.list["0"].main.humidity +"</li>";

            html += "<p><b>"+data.list["8"].dt_txt +"</b></p>";
            html += "<li>Weather Description: " + data.list["8"].weather["0"].description + ", "+ description3  +"</li>";
            html += "<li>Temperature: "+ data.list["8"].main.temp +" High: "+ data.list["8"].main.temp_max +" Low: "+ data.list["8"].main.temp_min +" </li>";
            html += "<li>Pressure: "+ data.list["8"].main.pressure +"</li>";
            html += "<li>Humidity: "+ data.list["8"].main.humidity +"</li>";
            
            html += "<p><b>"+data.list["16"].dt_txt +"</b></p>";
            html += "<li>Weather Description: " + data.list["16"].weather["0"].description + ", "+ description3  +"</li>";
            html += "<li>Temperature: "+ data.list["16"].main.temp +" High: "+ data.list["16"].main.temp_max +" Low: "+ data.list["16"].main.temp_min +" </li>";
            html += "<li>Pressure: "+ data.list["16"].main.pressure +"</li>";
            html += "<li>Humidity: "+ data.list["16"].main.humidity +"</li>";
            
            html += "<p><b>"+data.list["24"].dt_txt +"</b></p>";
            html += "<li>Weather Description: " + data.list["24"].weather["0"].description + ", "+ description3  +"</li>";
            html += "<li>Temperature: "+ data.list["24"].main.temp +" High: "+ data.list["24"].main.temp_max +" Low: "+ data.list["24"].main.temp_min +" </li>";
            html += "<li>Pressure: "+ data.list["24"].main.pressure +"</li>";
            html += "<li>Humidity: "+ data.list["24"].main.humidity +"</li>";
            
            html += "<p><b>"+data.list["32"].dt_txt +"</b></p>";
            html += "<li>Weather Description: " + data.list["32"].weather["0"].description + ", "+ description3  +"</li>";
            html += "<li>Temperature: "+ data.list["32"].main.temp +" High: "+ data.list["32"].main.temp_max +" Low: "+ data.list["32"].main.temp_min +" </li>";
            html += "<li>Pressure: "+ data.list["32"].main.pressure +"</li>";
            html += "<li>Humidity: "+ data.list["32"].main.humidity +"</li>";
            
        html += "</ul>";
        weatherApp.$targetArea.append(html);
            
          // For each of the 5 days, at each time specified, add the date/time plus:
          //   - the weather condition descriptions, all of them, comma separated
          //   - day's temp, low & high temp, pressure, humidity

        } else {
          $target.html("Sorry, 5 day forecast data is unavailable. Try again later.");
        }
      }).fail(function () {
        weatherApp.$targetArea.html("Sorry, 5 day forecast data is unavailable. Try again later.");
      });

    }
  }

  // Form submit handler
  $("#submit").click(function () {
    weatherApp.getFormData();
    return false;
  });

});