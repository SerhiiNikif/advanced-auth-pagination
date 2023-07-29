import 'dotenv/config';
import app from "./src/app.js";
import { dbConnection } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

dbConnection();

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
