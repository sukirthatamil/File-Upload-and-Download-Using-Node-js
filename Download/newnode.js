const https = require("https");
const fs = require("fs");
const url = "https://www.google.com/search?q=images&rlz=1C1GCEA_enIN987IN987&sxsrf=ALiCzsaw40a0zKj8MQCoH3payZRPBliySw:1656512224385&source=lnms&tbm=isch&sa=X&ved=2ahUKEwibg8317NL4AhXmSGwGHT0pCnIQ_AUoAXoECAEQAw&biw=1280&bih=609&dpr=1.5#imgrc=DH7p1w2o_fIU8M";
https.get(url, (res) => {
    const path = "./downloaded-image.png";
    const writeStream = fs.createWriteStream(path);
    res.pipe(writeStream);

  writeStream.on("finish", () => {
    writeStream.close();
    console.log("Download Completed");
  });
  });
