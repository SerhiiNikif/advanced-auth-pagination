import app from "./src/app.js";
import { PORT } from "./src/config/index.js";
import { connection } from "./src/config/db.js";

connection();

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
