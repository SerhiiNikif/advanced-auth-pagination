import app from "./src/app.js";
import { PORT } from "./src/config/index.js";
import { dbConnection } from "./src/config/db.js";

dbConnection();

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
