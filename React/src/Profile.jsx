import React from "react";
import DogImage from "./DogImage";
import { DogsContext } from "./DogProvider";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"

function Profile() {
    const id = useParams().id
    const [dog, setDog] = useState(null)
    const { getOne, change } = useContext(DogsContext)

    const navigate = useNavigate()

    useEffect(() => {
        async function main() {
            const dog = await getOne(id);
            setDog(dog);
        }
        main();
    }, []);

    const deleteFriend = async (friendId) => {
        try {
            const friendIds = dog.friends.map((friend) => friend.id);
            const updatedFriendIds = friendIds.filter((fid) => fid !== friendId);
            const updatedDog = await change(dog.id, { friends: updatedFriendIds });
            // Update the dog state with the updated dog object
            setDog(updatedDog);
        } catch (error) {
            // Handle errors, if any
            console.error("Error deleting friend:", error);
        }
    };

    if (dog === null) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="main-container">
                <div className="header">
                    <h1>{dog.name}'s Profile</h1>
                </div>
                <div className="container">
                    <div className="image">
                        <DogImage />
                    </div>
                    <div className="details">
                        <p>Name: {dog.name}</p>
                        <p>Nick: {dog.nick}</p>
                        <p>Age: {dog.age}</p>
                        <p>Bio: {dog.bio}</p>
                        <p>Friends:
                            <ul className="friend" >
                                {dog.friends.map((friend) => (
                                    <li key={friend.id} className="friend">
                                        <div className="friendy">
                                            <Link to={`/profile/${friend.id}`}>{friend.name}</Link>
                                        </div>
                                        <button onClick={() => deleteFriend(friend.id)}
                                            className="Dfbtn" > X </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="button">
                                <button onClick={() => navigate(`/Change/${id}`)}>Change Details</button>
                            </div>
                        </p>
                    </div>
                    <div className="attendance">
                        <p>Attendance: {dog.attendance ? "Present" : "Not Here"} </p>
                    </div>
                </div>
                <div className="button">
                    <button onClick={() => navigate("/")}>Back to Home Page</button>
                </div>
            </div>
        );
    }
}

export default Profile