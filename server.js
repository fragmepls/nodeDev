import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAYu4LBl-MJsydo6mHEl1qnffTtteckkwM",
  authDomain: "school-fff9a.firebaseapp.com",
  projectId: "school-fff9a",
  storageBucket: "school-fff9a.appspot.com",
  messagingSenderId: "625820194936",
  appId: "1:625820194936:web:a9809af85889e01250f58d",
  measurementId: "G-XHBF8HKRP5",
};

const app = express();
const firebase = initializeApp(firebaseConfig);
const auth = getAuth();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", (req, res) => {
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      res.redirect("/register");
    });
  res.redirect("/login");
});

app.post("/login", (req, res) => {
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      res.redirect("/login");
    });
  res.redirect("/");
});

app.listen(3000);
