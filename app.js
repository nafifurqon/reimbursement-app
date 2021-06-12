const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const port = process.env.PORT || 3000;
// const { adminRouter, gamesRouter, userRouter } = require("./routes");
const route = require("./routes");
const passport = require("./lib/passport");

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create secret using console.log(require("crypto").randomBytes(64).toString("hex"));
app.use(
  session({
    secret:
      "b61eeb9d4cb7aa8abbce3ae09d4002c7feb8f49ec171b615f3e86ce1f7b645cef6f07502b2479571bdd3f158dc8cd32cc1c157b1ec488fd7271accdfd860f8ae",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, //1000 milisecond = 1 second * 60 * 60 = 1 hour
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(methodOverride("_method"));
// app.use(express.static("static"));
app.use(
  "/sb-admin-2",
  express.static("node_modules/startbootstrap-sb-admin-2")
);

app.use("/", route);

// app.use("/", gamesRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/admin", adminRouter);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  console.log(error);

  res.status(status).json({ message: message, data: data });
});

app.listen(port, () =>
  console.log(`Binar challenge app listening at http://localhost:${port}`)
);
