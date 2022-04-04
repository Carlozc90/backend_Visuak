export const postLogin = async (req, res) => {
  const request = require("request");
  const url = "https://datacenter.visualkgroup.com:58346/b1s/v1/Login";
  const body = {
    CompanyDB: "VISUALK_CL",
    UserName: "postulante3",
    Password: "123qwe",
  };
  const postheaders = {
    "Content-Type": "application/json",
  };
  const options = {
    url: url,
    method: "post",
    json: body,
    postheaders: postheaders,
    strictSSL: false,
  };

  request.post(options, (error, response, body) => {
    if (error) {
      console.log("1", error);
    } else {
      console.log("2", response.statusCode);
      res = response.body;
      console.log("3", JSON.stringify(response.body));
    }
  });
};
