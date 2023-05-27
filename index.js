import express from "express";
import bodyParser from "body-parser";
import ds_conn, { USERS } from "./conn";

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

let port = 2500;

app.get("/", (req, res) => {
  res.send("<h1>HOME</h1>");
});

app.get("/about", (req, res) => {
  console.log(req.method);
  console.log(req.headers);
  console.log(req.params);
  console.log(req.body);

  res.send("<h1>ABOUT</h1>");
});

app.get("/user/:user_id", (req, res) => {
  let { user_id } = req.params;

  res.json({
    ok: true,
    message: "User retrieved",
    data: USERS.readone(user_id),
  });
});

app.post("/add_user", (req, res) => {
  let data = req.body;

  if (USERS.readone({ email: data.email }))
    return res.json({ ok: false, message: "User already exists", status: 403 });

  let result = USERS.write(data);
  data._id = result._id;

  res.json({
    ok: true,
    message: "User added",
    status: 200,
    user_id: data._id,
  });
});

app.get("/contact", (req, res) => {
  res.send("<h1>CONTACT</h1>");
});

app.get("*", (req, res) => {
  res.send("<h1>404: Page Not Found</h1>");
});

app.listen(port, () => {
  ds_conn();
  console.log(`Server is running on :${port}`);
});
