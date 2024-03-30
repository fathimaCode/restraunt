// routes/commonRoutes.js
const express = require("express");
const router = express.Router();

function createRoutes(model) {
    router.route("/create").post(async (req, res, next) => {
        await model.create(req.body)
            .then((result) => {
                res.json({
                    data: result,
                    message: "Item added successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });

    router.route("/getAll").get(async (req, res, next) => {
        await model.find()
            .then((result) => {
                res.json({
                    data: result,
                    message: "All items retrieved successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });
    router.route("/getUserInfo").post(async (req, res, next) => {
        const { email, password } = req.body;
    
        await model.findOne({ email, password })
            .then((result) => {
                if (result) {
                    res.json({
                        data: result,
                        message: "User details retrieved successfully",
                        status: 200,
                    });
                } else {
                    res.status(404).json({
                        message: "User not found",
                        status: 404,
                    });
                }
            })
            .catch((err) => {
                return next(err);
            });
    });
    router.route("/get/:id").get(async (req, res, next) => {
        await model.findById(req.params.id)
            .then((result) => {
                res.json({
                    data: result,
                    message: "Item details retrieved successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });

    router.route("/update/:id").put(async (req, res, next) => {
        await model.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            .then((result) => {
                console.log(result);
                res.json({
                    data: result,
                    message: "Item updated successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });

    router.route("/delete/:id").delete(async (req, res, next) => {
        await model.findByIdAndDelete(req.params.id)
            .then(() => {
                res.json({
                    message: "Item deleted successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });

    return router;
}

module.exports = createRoutes;
