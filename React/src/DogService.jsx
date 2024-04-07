import axios from "axios";

const url = "http://localhost:9000/dogs";

const getAll = async () => {
    try {
        const resp = await axios.get(url);
        if (resp.status !== 200) {
            throw new Error("Malfunctioning server GET request");
        }
        return resp.data;
    } catch (err) {
        console.error(err.message);
        return [];
    }
};

const getOne = async (id) => {
    try {
        const resp = await axios.get(`${url}/${id}`);
        if (resp.status !== 200) {
            throw new Error("Malfunctioning server GET request");
        }
        return resp.data;
    } catch (err) {
        console.error(err.message);
        return [];
    }
};

const create = async (newDog) => {
    try {
        const resp = await axios.post(url, newDog);
        if (resp.status !== 201) {
            throw new Error("Malfunctioning server POST request");
        }
        return resp.data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

const change = async (id, dogData) => {
    try {
        const resp = await axios.put(`${url}/${id}`, dogData);
        if (resp.status !== 200) {
            throw new Error("Malfunctioning server PUT request");
        }
        return resp.data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

const remove = async (id) => {
    try {
        const resp = await axios.delete(`${url}/${id}`);
        if (resp.status !== 200) {
            throw new Error("Malfunctioning server DELETE request");
        }
        return resp.data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

export { getAll, getOne, create, remove, change };