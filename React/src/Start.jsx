import DogImage from "./DogImage";
import { Link } from "react-router-dom";
import { DogsContext } from "./DogProvider";
import { useEffect, useState, useContext } from "react";

const Start = () => {

    const [dogs, setDogs] = useState([])
    const { getAll, remove } = useContext(DogsContext)

    useEffect(() => {
        async function main() {
            const dogs = await getAll();
            setDogs(dogs);
        }
        main();
    }, []);

    const deleteDog = async (dogId) => {
        const deletedDog = await remove(dogId);
        setDogs((dogs) => dogs.filter((dog) => dog.id !== deletedDog.id))
    }

    return (
        <div className="main-container">
            <div className="header">
                <h1>Dogs Book</h1>
            </div>
            <ul className="start-list">
                {dogs.map((dog) => (
                    <li key={dog.id} className="start-item">
                        <DogImage />
                        <Link to={`/profile/${dog.id}`}
                            className={dog.attendance ? "green" : "red"}>{dog.name}</Link> <br /><br />
                        <button onClick={() => deleteDog(dog.id)}> Delete {dog.name} </button> <br /><br />
                    </li>
                ))}
            </ul>
            <Link to={`/create`} className="start-link"> Create Profile For New Dog </Link>
        </div>
    )
};

export default Start