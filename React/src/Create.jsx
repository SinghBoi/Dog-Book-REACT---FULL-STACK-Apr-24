import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DogsContext } from "./DogProvider";
import DogImage from "./DogImage";

function Create() {

    const [dogs, setDogs] = useState([])
    const { getAll, create } = useContext(DogsContext)

    useEffect(() => {
        async function main() {
            const dogs = await getAll();
            setDogs(dogs);
        }
        main();
    }, []);

    const [name, setName] = useState("")
    const [nick, setNick] = useState("")
    const [age, setAge] = useState(0)
    const [bio, setBio] = useState("")
    const [attendance, setAttendance] = useState(false)
    const [friends, setFriends] = useState([])

    const navigate = useNavigate()

    const nameh = (e) => setName(e.target.value)
    const nickh = (e) => setNick(e.target.value)
    const ageh = (e) => setAge(e.target.value)
    const bioh = (e) => setBio(e.target.value)
    const attendanceh = (e) => setAttendance(e.target.checked)
    const friendsh = (e) => {
        const selectedFriends = Array.from(e.target.selectedOptions, option => option.value);
        setFriends(selectedFriends);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const newDog = {
            name,
            nick,
            age,
            bio,
            attendance,
            friends,
        }

        await create(newDog);
        navigate("/")
    }

    return (
        <div className="main-container">
            <div className="header">
                <h1>Create New Dog</h1>
            </div>
            <form onSubmit={submitHandler} className="container">
                <div className="image">
                    <DogImage />
                </div>
                <div className="details">
                    Name: <input type="text" onChange={nameh} placeholder="Enter Name" required /> <br /><br />
                    Nick: <input type="text" onChange={nickh} placeholder="Enter Nick" required /> <br /><br />
                    Age: <input type="number" onChange={ageh} placeholder="Enter Age" required /> <br /><br />
                    Bio: <input type="text" onChange={bioh} placeholder="Enter Bio" required /> <br /><br />
                    Attendance: {attendance ? "Present" : "Not Here"} <br /><br />
                    Friends: <ul>
                        {friends.map(friendId => {
                            const friend = dogs.find(dog => dog.id === friendId);
                            return (
                                <li key={friendId}>{friend.name}</li>
                            );
                        })}
                    </ul>

                    <input type="submit" value="Create Profile" className="submit" />
                </div>
                <div className="attendance">
                    Attendance: <input type="checkbox" checked={attendance} onChange={attendanceh} /> Check on Present <br /><br />
                    Select Friends: <br /><br />
                    <select value={friends} onChange={friendsh} multiple>
                        {dogs.map(friend => (
                            <option key={friend.id} value={friend.id}>{friend.name}</option>
                        ))}
                    </select><br /><br />
                </div>
            </form> <br />
            <div className="button">
                <button onClick={() => navigate("/")}>Cancel</button>
            </div>
        </div>
    )
}

export default Create