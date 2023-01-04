import Client from "../models/Client.js";


export const getClient = async (req, res) => {
    try {
        const client = await Client.find({});
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};