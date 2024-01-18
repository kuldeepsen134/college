const { Event } = require("../model");
const { handleResponse, handleError, getPagination } = require("../utils/helper");

exports.create = async (req, res) => {
    try {
        const { title, sort_desc, detail } = req.body

        let file_URL = `/media/${req.file.filename}`

        const data = { title, sort_desc, detail, image_URL: file_URL };

        const newEvent = new Event(data);

        await newEvent.save();

        const datad = { ...newEvent._doc }

        handleResponse(res, datad, 201)
    } catch (error) {
        if (error.code === 11000) {
            handleError('This Event already exists.', 400, res)
            return
        }
        handleError(error.message, 400, res)
    };
};

exports.find = async (req, res) => {
    try {
        const { role, q } = req.query;
        const searchFilter = q ? {
            $or: [
                { name: { $regex: new RegExp(q, 'i') } },
                { userName: { $regex: new RegExp(q, 'i') } }
            ]
        } : {};

        const users = await Event.find({ ...searchFilter })

        const getUsers = users.filter((user) => user.role !== 'admin')

        const totalCount = await Event.countDocuments()

        const getPaginationResult = await getPagination(req.query, getUsers, totalCount);

        handleResponse(res, getPaginationResult, 200)

    } catch (error) {
        handleError(error.message, 400, res)
    };
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Event.findOne({ _id: id })
        handleResponse(res, user, 200)
    } catch (error) {
        handleError(error.message, 400, res)
    };
};


exports.update = async (req, res) => {
    try {
        const { title, sort_desc, detail } = req.body
        console.log('req.body>>>>>>>>>>>>>>', req.body);
        const { id } = req.params;
        let file_URL = `/media/${req?.file?.filename}`

        const data = { title, sort_desc, detail, image_URL: file_URL };
        await Event.updateOne({ _id: id }, data, { new: true })
        res.status(200).send({ message: "Event has been successfully update.", error: false })
    } catch (error) {
        handleError(error.message, 400, res)
    };
};


// exports.delete = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (req.user._id === id || req.user.role === 'admin') {
//             const user = await User.findOne({ _id: id })

//             if (!user) {
//                 handleError('Invailid user.', 400, res)
//                 return
//             }

//             await User.deleteOne({ _id: user._id })

//             handleResponse(res, 'User successfully removed.', 200)
//         }
//         else {
//             handleError('User can delete self account or admin can delete user account.', 400, res)
//             return
//         }
//     } catch (error) {
//         handleError(error.message, 400, res)
//     };
// };