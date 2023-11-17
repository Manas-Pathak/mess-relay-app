import Complaint from "../models/Complaint.js";
import Notifs from "../models/Notifs.js";

export const getNotifs = async (req, res) => {
    try {
        const notifs = await Notifs.find();
        res.status(200).json(notifs);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint;
        res.status(200).json(complaints);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const postComplaint = async (req, res) => {
    try {
        const { fullName, email, room, description, picturePath } = req.body;

        const newComplaint = new Complaint({
            fullName,
            email,
            room,
            description,
            picturePath,
        });

        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
