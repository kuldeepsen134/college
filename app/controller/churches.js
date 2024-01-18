const { Churches } = require("../model");
const { handleResponse, handleError, getPagination } = require("../utils/helper");

exports.create = async (req, res) => {
    try {
        const { title, desc, mobile, email, type } = req.body

        let file_URL = `/media/${req?.file?.filename}`

        const data = { title, desc, mobile, email, type, image_URL: file_URL };

        const newChurches = new Churches(data);

        await newChurches.save();

        const datad = { ...newChurches._doc }

        handleResponse(res, datad, 201)
    } catch (error) {
        if (error.code === 11000) {
            handleError('This Churches already exists.', 400, res)
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

        const churches = await Churches.find({ ...searchFilter })

        const getchurches = churches.filter((user) => user)

        const totalCount = await Churches.countDocuments()

        const getPaginationResult = await getPagination(req.query, getchurches, totalCount);

        handleResponse(res, getPaginationResult, 200)

    } catch (error) {
        handleError(error.message, 400, res)
    };
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const churches = await Churches.findOne({ _id: id })
        handleResponse(res, churches, 200)
    } catch (error) {
        handleError(error.message, 400, res)
    };
};

exports.update = async (req, res) => {
    try {
        const { title, desc, mobile, email, type } = req.body
        const { id } = req.params;

        let file_URL = `/media/${req.file.filename}`

        const data = { title, desc, mobile, email, type, image_URL: file_URL };

        await Churches.updateOne({ _id: id }, data, { new: true })
        res.status(200).send({ message: "Churches has been successfully update.", error: false })
    } catch (error) {
        handleError(error.message, 400, res)
    };
};
