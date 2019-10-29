const next = require("next");
const express = require("express");
const axios = require("axios");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const cookieParser = require("cookie-parser");

const AUTH_USER_TYPE = "authenticated";
const COOKIE_SECRET = "LKJASDFJDSKFFD98212109";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true
};

const authentication = async (email, password) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  return data.find(value => {
    if (value.email === email && value.website === password) {
      return data;
    }
  });
};

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser(COOKIE_SECRET));

  server.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const userData = await authentication(email, password);
    if (userData) {
      res.cookie("token", userData, COOKIE_OPTIONS);
      return res.json({
        name: userData.name,
        email: userData.email,
        type: AUTH_USER_TYPE
      });
    }
    return res.status(403).send("Invalid username or password");
  });

  server.get("/api/profile", async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if (token && token.email) {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        const userProfile = data.find(value => value.email === token.email);
        return res.json({ user: userProfile });
      } catch (error) {
        next(error);
      }
    } else {
      return res.resStatus(404);
    }
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log("Server running on ", port);
  });
});
