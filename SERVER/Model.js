import mongoose from "mongoose";

mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id; // ta bort _id när vi skickar (detta ersätter med id istället)
        delete converted.__v; // ta bort __v när vi skickar
    },
});

const dogBookSchema = new mongoose.Schema({
    name: String, // dogBook i databasen ska ha "Name" property av typen String
    nick: String, // dogBook i databasen ska ha "Nick" property av typen String
    age: Number, // dogBook i databasen ska ha "Age" property av typen Number
    bio: String, // dogBook i databasen ska ha "Bio" property av typen String
    attendance: Boolean, // dogBook i databasen ska ha "Attendence" property av typen Boolean
    friends: Array, // dogBook i databasen ska ha "Friends" property av typen Array
});

export default mongoose.model("dogBook", dogBookSchema); // skapa model och exportera