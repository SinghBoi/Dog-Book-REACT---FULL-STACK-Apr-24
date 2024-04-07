import { useState, useContext } from "react";
import { DogsContext } from "./DogProvider";

function DogPresence() {
    const [dog, setDog] = useState(null)
    const { change } = useContext(DogsContext)
    const [checked, setChecked] = useState(dog.present);

    const presentHandler = async (e) => {
        e.preventDefault();
        console.log("presence", checked);
        setChecked(!checked);
        const data = await change(dog.id, { ...dog, present: !checked });
        setDog({ ...dog, present: data.present });
    };
    return (
        <div className="prsentdiv">
            <input type="checkbox" name="present" onChange={presentHandler} checked={checked} />{" "}
            Present
        </div>
    );
}

export default DogPresence;