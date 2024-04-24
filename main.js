
"use strict";

// 앱 설정
const express = require("express"),
app = express(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController");

app.set("port", process.env.PORT || 3000);
app.set("/", (req, res) => {
    res.send("Welcome to Confetti Cuisine!");
});

/**
 * 
 * ejs 레이아웃 렌더링
 */
const layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(layouts);

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

/**
 *
 * 각 페이지 및 요청 타입을 위한 라우트 추가
 */
app.get("/", homeController.getHome);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postSignupForm);

/**
 * 
 * 에러 처리 라우트 
 */
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// 3000번 포트로 리스닝 설정
app.listen(app.get("port"), () => {
    console.log(`Server Running at http://localhost:${app.get("port")}`);
});