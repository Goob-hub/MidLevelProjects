import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let posts = [
    {
        id: 0,
        title: "Why im so hungry!",
        text: `Constant feelings of hunger can throw you off your weight loss plan. Why am I always hungry? It seems like you never feel full enough to stop thinking of food or eating. This can be frustrating, especially if you want to lose or maintain a certain weight goal. 
        The first step to managing your weight control problem is to understand why you are always hungry and what you can do to beat constant hunger.

        Part 1: Why Am I Always Hungry? 1. Fast Metabolism
        Some people burn more calories in a small amount of time. According to one study, more that 30% of the general population have fast metabolism, which allows them to burn up to 400 more calories per day than most people do. If your metabolism is fast, you will tend to …show more content…

        Parasites like tapeworms can live in your intestines without you knowing it, until symptoms get worse. Sometimes, the only symptom is constant hunger with failure to gain weight.`
    },
    {
        id: 1,
        title: "Why programming is more addictive than cocaine!",
        text: `Unlike many other tasks where errors can be concealed or go unnoticed, programming has a unique ability to swiftly expose our incorrect mental models. This fast and unforgiving feedback loop can be both daunting and exhilarating, making programming a uniquely addictive pursuit for those who embrace its challenges.`
    },
    {
        id: 2,
        title: "I really have to use the bathroom right now!",
        text: `Toilets are commonly made of ceramic (porcelain), concrete, plastic, or wood. Newer toilet technologies include dual flushing, low flushing, toilet seat warming, self-cleaning, female urinals and waterless urinals. Japan is known for its toilet technology. Airplane toilets are specially designed to operate in the air.`
    }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { blogs: posts });
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/read", (req, res) => {
    let postId = parseInt(req.query.id);
    let postFound = false;
    let requestedPost;

    posts.forEach(post => {
        if(post.id === postId){
            postFound = true;
            requestedPost = post;
        }
    });

    if(postFound) {
        res.render("read.ejs", { blog: requestedPost });
    } else {
        res.render("read.ejs");
    }
});

app.get("/delete", (req, res) => {
    let postId = parseInt(req.query.id);

    posts.splice(postId, 1);

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if(post.id > postId) {
            post.id -= 1;
        }
    }

    res.redirect("/");
});

app.get("/edit", (req, res) => {
    let postId = parseInt(req.query.id);
    let post = posts[postId];

    res.render("edit.ejs", { blogPost: post });
});

app.post("/create", (req, res) => {
    let post = req.body;
    posts.push(post);
    post.id = posts.length - 1;
    res.redirect("/");
});

app.post("/edit", (req, res) => {
    let editedPost = req.body;
    editedPost.id = parseInt(editedPost.id);
    posts[editedPost.id] = editedPost;
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Site live on port 3000");
});