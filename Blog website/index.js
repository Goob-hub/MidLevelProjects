import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [
    {
        id: 1,
        title: "Why im so hungry!",
        text: `Constant feelings of hunger can throw you off your weight loss plan. Why am I always hungry? It seems like you never feel full enough to stop thinking of food or eating. This can be frustrating, especially if you want to lose or maintain a certain weight goal. 
        The first step to managing your weight control problem is to understand why you are always hungry and what you can do to beat constant hunger.

        Part 1: Why Am I Always Hungry? 1. Fast Metabolism
        Some people burn more calories in a small amount of time. According to one study, more that 30% of the general population have fast metabolism, which allows them to burn up to 400 more calories per day than most people do. If your metabolism is fast, you will tend to …show more content…

        Parasites like tapeworms can live in your intestines without you knowing it, until symptoms get worse. Sometimes, the only symptom is constant hunger with failure to gain weight.`
    },
    {
        id: 2,
        title: "Why programming is more addictive than cocaine!",
        text: `Unlike many other tasks where errors can be concealed or go unnoticed, programming has a unique ability to swiftly expose our incorrect mental models. This fast and unforgiving feedback loop can be both daunting and exhilarating, making programming a uniquely addictive pursuit for those who embrace its challenges.`
    }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { blogs: posts });
});

app.listen(port, () => {
    console.log("Site live on port 3000");
})