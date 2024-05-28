const fs = require("fs");

fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data); // <Buffer 48 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73>
  console.log(data.toString()); // 저를 읽어주세요.
});
