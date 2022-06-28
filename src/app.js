const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./forecast");

const app = express();
const port = process.env.PORT;

// Define path for express config
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine ,views location & register partials on handlebar
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(public));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nitin Srivastava",
  });
});

app.get("/weather", async (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide address.",
    });
  }
  forecast(address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send(data);
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Nitin Srivastava",
    redirect: "/",
    title: "404",
  });
});

app.listen(port, () => {
  console.log("Server is running on localhost on port" + port);
});
