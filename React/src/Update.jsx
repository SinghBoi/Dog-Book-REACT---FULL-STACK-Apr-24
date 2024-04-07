import DogImage from "./DogImage";
import { DogsContext } from "./DogProvider";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Change() {
    const [dogs, setDogs] = useState([])

    const id = useParams().id
    const [dog, setDog] = useState(null)

    const { getOne, getAll, change } = useContext(DogsContext)

    const [name, setName] = useState("")
    const [nick, setNick] = useState("")
    const [age, setAge] = useState(0)
    const [bio, setBio] = useState("")
    const [attendance, setAttendance] = useState(false)
    const [friends, setFriends] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function main() {
            const dog = await getOne(id);
            setDog(dog)
            setName(dog.name)
            setNick(dog.nick)
            setAge(dog.age)
            setBio(dog.bio)
            setAttendance(dog.attendance)
            setFriends(dog.friends.map(friend => friend.id))
            const dogs = await getAll();
            setDogs(dogs);
        }
        main();
    }, []);

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
        e.preventDefault()
        const dogData = {
            name,
            nick,
            age,
            bio,
            attendance,
            friends,
        }

        const updatedDog = await change(id, dogData);
        setDog(updatedDog)
        navigate(`/Profile/${id}`)
    }

    if (dog === null) {
        return <div>Loading</div>
    } else {
        return (
            <div className="main-container">
                <div className="header">
                    <h1>{dog.name}'s Details</h1>
                </div>
                <form onSubmit={submitHandler} className="container">
                    <div className="image">
                        <DogImage />
                    </div>
                    <div className="details">
                        Name: <input type="text" onChange={nameh} placeholder={dog.name} /> <br /><br />
                        Nick: <input type="text" onChange={nickh} placeholder={dog.nick} /> <br /><br />
                        Age: <input type="number" onChange={ageh} placeholder={dog.age} /> <br /><br />
                        Bio: <input type="text" onChange={bioh} placeholder={dog.bio} /> <br /><br />
                        Attendance: {dog.attendance ? "Present" : "Not Here"} <br /><br />
                        Friends: <ul> {dog.friends.map(friend => (<li key={friend.id}>{friend.name}</li>))} </ul>

                        <input type="submit" value="Update Profile" className="submit" />
                    </div>
                    <div className="attendance">
                        Attendance: <input type="checkbox" checked={attendance} onChange={attendanceh} /> Check on Present <br /><br />
                        Update Friends: <br /><br />
                        <select value={friends} onChange={friendsh} multiple>
                            {dogs.map((friend) => {
                                if (friend.id !== dog.id) {
                                    return (<option key={friend.id} value={friend.id}>{friend.name}</option>)
                                }
                            })}
                        </select><br /><br />
                    </div>
                </form> <br />
                <div className="button">
                    <button onClick={() => navigate(`/Profile/${id}`)}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default Change