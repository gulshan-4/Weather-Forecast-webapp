const express = require("express");
const https = require("https");
const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(express.json());

//GET

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
    res.sendFile(__dirname + "/public/css/style.css");

    
});

//POST
var getWeather;
app.post("/weather", (req, res)=>{

    const apiKey = "&appid=1b3fafc17814357833ca4b8ad2acacfb";
    const query = req.body.location;
    const units ="&units=metric";
    const lang = "&lang=en";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+apiKey+units+lang;

     https.get(url, response=>{
      console.log(response.statusCode);

      response.on("data", data=>{
          const weatherData = JSON.parse(data);
          const cityName = weatherData.name;
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
          
          const weatherObj = {
            cityName : cityName,
            temp: temp,
            description: description,
            icon : icon,
            iconUrl: iconUrl
          }
          getWeather = weatherObj
        //   res.status(204).send();
        // res.sendFile(__dirname + "/public/index.html");
        res.redirect('/')
    });
    });
})

//GET Weather
app.get('/getweather',(req,res)=>{
    res.send(getWeather)
})


//Setting port and listening
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log("Server started on port "+port);
})