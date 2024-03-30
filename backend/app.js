//app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



const productRoute = require("./routes/pro_routes");
const historyRoute = require('./routes/history_routes')
const purchaseRoute = require('./routes/purchase_routes')
const path = require("path");
const multer = require("multer");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "product")); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes

app.use("/productRoute", productRoute);
app.use("/historyRoute", historyRoute);
app.use("/purchaseRoute", purchaseRoute);
app.use('/product', express.static('product'));
// MongoDB Connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jo2zyyn.mongodb.net/${process.env.MONGO_DB}`
).then(() => {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

// Route to handle image upload
app.post("/upload", upload.single("image"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ message: "File uploaded successfully", filename: req.file.originalname });
});
