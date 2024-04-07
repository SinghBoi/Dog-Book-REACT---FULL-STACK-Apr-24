import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dogBook from "./model.js";

const app = express();
app.use(cors()); // middleware för att tillåta extern kommunikation
app.use(bodyParser.json()); // middleware för att kunna ta emot json format

app.get("/dogs", async (req, resp) => {
    const dogs = await dogBook.find(); // hämta alla dogs från databas
    resp.status(200).json(dogs);
});

app.get("/dogs/:id", async (req, resp) => {
    const { id } = req.params;
    const dog = await dogBook.findOne({ _id: id }); // hämta alla dogs från databas
    // hämta alla vänner som finns in dog.friends array ["bs34", "y76r"]
    if (dog.friends.length) {
        const query = { _id: { $in: dog.friends } };
        const friends = await dogBook.find(query);
        dog.friends = friends; // byt ut friends från
    }
    resp.status(200).json(dog);
});

app.post("/dogs", async (req, resp) => {
    try {
        const dog = new dogBook(req.body);
        const savedDog = await dog.save(); // spara en nya dog i databas
        await dogBook.updateMany({ _id: req.body.friends }, { $push: { friends: dog.id } });
        resp.status(201).json(savedDog);
    } catch (err) {
        resp.status(500).send()
    }
});

app.put("/dogs/:id", async (req, resp) => {
    try {
        const { id } = req.params;
        await dogBook.updateOne({ _id: id }, req.body); // uppdatera en dog profile i databas
        const updatedDog = await dogBook.findById(id); // sedan hämta uppdaterad dog profile från databas
        // hämta alla vänner som finns in dog.friends array ["bs34", "y76r"]
        const query = { _id: { $in: updatedDog.friends } };
        const friends = await dogBook.find(query);
        await dogBook.updateMany({}, { $pull: { friends: updatedDog.id } });
        await dogBook.updateMany(query, { $push: { friends: updatedDog.id } });
        updatedDog.friends = friends; // byt ut friends från
        resp.status(200).json(updatedDog);
    } catch (err) {
        console.log(err.message)
        resp.status(500).send()
    }
});

app.delete("/dogs/:id", async (req, resp) => {
    const { id } = req.params;
    const deletedDog = await dogBook.findByIdAndDelete(id); // ta bort en dog från databas
    await dogBook.updateMany({ friends: id }, { $pull: { friends: id } }); // ta bort vän från andras vänlistor
    resp.status(200).json(deletedDog);
});

const start = async () => {
    try {
        const dbUrl = "mongodb://localhost:27017/dbDogs";
        await mongoose.connect(dbUrl); // connecta med databas via url (detta kan vara atlas)
        app.listen(9000, () => console.log("Server started on port 9000"));
    } catch (error) {
        // om något blir fel i connection stoppa server
        console.error(error);
        process.exit(1);
    }
};
start();