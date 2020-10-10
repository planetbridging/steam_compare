//Fas1an
//watson8123

//steam name to id
//http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=F482E7D5410B6BF879C548FF4DBF1355&vanityurl=watson8123

const https = require('https');



const express = require('express');
const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authtoken");
  next();
});

app.get('/', async (request, response) =>{  

    https.get('https://steamcommunity.com/id/'+request.query.steamname+'/games?xml=1', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      //console.log(JSON.parse(data).explanation);
      //console.log(data);
      //var textChunk = data.toString('utf8');
      response.send(data);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

app.get('/nametoid', async (request, response) =>{  

  https.get('https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=F482E7D5410B6BF879C548FF4DBF1355&vanityurl=' + request.query.steamname, (resp) => {
  let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });


    resp.on('end', () => {
      response.send(data);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

app.get('/getplayergames', async (request, response) =>{  

  https.get('https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=F482E7D5410B6BF879C548FF4DBF1355&steamid=' + request.query.steamname, (resp) => {
  let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });


    resp.on('end', () => {
      response.send(data);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});

app.listen(38123, console.log('App Listening to port 38123'));


