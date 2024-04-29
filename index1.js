const express = require("express");
const port = 3001;
const app = express();

const users = [{
    name: "john",
    kidneys: [{
        healthy: false
    }]
}]
app.use(express.json());

app.get("/", (req, res) => {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberofHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy) {
            numberofHealthyKidneys += 1;
        }
    }
    const numberofUnHealthyKidneys = numberOfKidneys - numberofHealthyKidneys;
    res.json({
        numberOfKidneys, numberofHealthyKidneys, numberofUnHealthyKidneys
    })
})
app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done"
    })
})
app.put("/", (req, res) => {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})
app.delete("/", (req, res) => {
    if (isthereatleastoneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }

        users[0].kidneys = newKidneys;
        res.json({ msg: "Done" });
    }
    else {
        res.status(411).json({ msg: "there is no unhealthy kidneys" })
    }
})
function isthereatleastoneUnhealthyKidney() {
    let atleastoneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (users[0].kidneys[i].healthy) {
            atleastoneUnhealthyKidney = true;
        }
    }
    return atleastoneUnhealthyKidney;
}
app.listen(port, () => {
    console.log(`server is running at ${port}`);
})