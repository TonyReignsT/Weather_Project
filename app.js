const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


//Fetching data from an external server
app.get("/", (req, res) => {

    res.sendFile(`${__dirname}/index.html`)
    // res.send("Server is up and running.")
});

app.post("/", (req, res)=> {
    // console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "e6c75c9b4ca2b7f3f1359e23d8b5dc35";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units=" +unit; //weather url
    https.get(url, (response) => {
        // console.log(response.statusCode);

        //To get hold of the data
        response.on("data", (data)=> {
            const weatherData = JSON.parse(data);
            //use the json viewer extension on the chrome browser to copy the path
            const temp = weatherData.main.temp; //path to the specific value
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"; //the image url of the weather icon
            
            res.write("<p>The weather is currently: " + weatherDescription + "</p>");
            res.write("<h1>The temperature in "+ query +" is " + temp +" Degrees Celcius.</h1>")
            res.write("<img src=" + imageURL + ">"); 
            res.send()
        })
    })
})





app.listen(3000, () => {
    console.log("Server is running on port 3000...");
});
