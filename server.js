const express = require("express");
const axios = require("axios");
const app = express();
const Redis = require("redis");
const cors = require("cors");
const redisClient = Redis.createClient();

(async () => {
    await redisClient.connect();
})();

redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("error", (err) =>
console.log("Redis Client Connection Error", err)
);

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  
  const data = await redisClient.get(`photos?albumId=${albumId}`);
  if(data){
    console.log("Cache Hit");
    return res.json(JSON.parse(data));
  }
  else{
    console.log("Cache Miss");
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      {
        params: {
          albumId,
        },
      }
    );
    redisClient.setEx(`photos?albumId=${albumId}`, 3600, JSON.stringify(data));
    res.json(data);
  }

});

app.get("/photos/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching photo by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function getAndSetCache(key,cb) {
    return new Promise((resolve,reject)=>{
        const data = redisClient.get(key);
        if(data){
            console.log("Cache Hit");
            resolve(JSON.parse(data));
        }
        else{
            console.log("Cache Miss");
            const result = cb();
            redisClient.setEx(key, 3600, JSON.stringify(result));
            resolve(result);
        }

      
    }
    )

}
app.listen(3000);
