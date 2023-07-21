import express from "express";
import categoryRouter from "./routes/category.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/ping", (req, res) => {
    res.json({message: "ProductService.Version1.0.0"});
});

app.use('/category', categoryRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
});

app.use((error, req, res, next) => {
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({message})
});

export default app;