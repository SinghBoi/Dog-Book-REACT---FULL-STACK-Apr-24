import { useState, useEffect } from "react";

function DogImage() {
  const [dogImg, setDogImg] = useState("");

  useEffect(() => {
    const fetchDog = async () => {
      const resp = await fetch("https://dog.ceo/api/breeds/image/random");

      const dog = await resp.json();
      setDogImg(dog.message);
    };
    fetchDog();
  }, []);

  return (
    <div>
      <img src={dogImg} alt="" width="200px" height="180px" />
    </div>
  );
}
export default DogImage;