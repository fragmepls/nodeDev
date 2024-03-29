import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
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
app.set("public", path.join(__dirname, "public"));
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { user: auth.currentUser.email });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  auth.signOut().then(() => {
    res.render("login.ejs");
  }).catch((error) => {
    console.log("error");
  });
});

app.post("/register", checkNotAuthenticated, (req, res) => {
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

app.post("/login", checkNotAuthenticated, (req, res) => {
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

function checkAuthenticated(req, res, next) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      next();
    } else {
      res.redirect("/login");
    }
  });
}

function checkNotAuthenticated(req, res, next) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      res.redirect("/");
    } else {
      next();
    }
  });
}

app.listen(3000);
