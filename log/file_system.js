const fs = require("fs");

export const textfile = (obj) => {
  // console.log("res_>", obj);

  let res = obj.filter((items) => items.status < 200);
  let res2 = obj.filter((items) => items.status >= 300);
  const resulError = res.concat(res2);

  // console.log("resultado error", resulError);

  const jsonObjAll = JSON.stringify(obj);
  const jsonObjError = JSON.stringify(resulError);

  /// con todos lo pedidos
  fs.writeFile("./log/TextoLogAll.txt", jsonObjAll, (error) => {
    if (error) {
      console.log("error-> ", error);
    }
  });

  fs.writeFile("./log/JsonLogAll.json", jsonObjAll, (error) => {
    if (error) {
      console.log("error-> ", error);
    }
  });

  //// con los errores
  fs.writeFile("./log/TextoLogError.txt", jsonObjError, (error) => {
    if (error) {
      console.log("error-> ", error);
    }
  });

  fs.writeFile("./log/JsonLogError.json", jsonObjError, (error) => {
    if (error) {
      console.log("error-> ", error);
    }
  });
};
