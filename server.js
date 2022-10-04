const express = require("express");
const mysql = require("mysql");
const WebSocket = require("ws");
const {BinanceClient} = require("ccxws");
const bodyParser = require("body-parser");
const {PORT} = require("./configs/server.config");
const DB_URI = require("./configs/db.config");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// mysql connection

var connection = mysql.createConnection(DB_URI);
   
  connection.connect();


// routes

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// webSocket connection

const wss = new WebSocket.Server({port: 8082});

wss.on("connection", ws => {
  console.log("new client connected!");

  ws.on("message", data =>{
    console.log(`Client has sent us: ${data}`);
  })

  ws.on("close", ()=>{
    console.log("Client had disconnected");
  })
})


const ws = new WebSocket("ws://localhost:8082");

ws.addEventListener("open", ()=>{
  console.log("we are connected");
  ws.send("Hey ho's it goint")
})


// ccxws

const binance = new BinanceClient();

const market = {
  id: "BTCUSDI",
  base: "BTC",
  quote: "USDT"
}


binance.subscribeTrades(market)
binance.on("trade", trade => console.log(trade));


// server connection

app.listen(PORT, ()=>{
    console.log(`server is running on port : ${PORT}`);
})