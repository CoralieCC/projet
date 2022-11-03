import express from "express";
import { port, hostname} from "./config/config.js";
import router from "./Routes/routes.js";
import cors from "cors";
import { sequelize } from "./config/database.js";
import { User } from "./Models/User.js";
import { Comment } from "./Models/Comments.js";
import { Review } from './Models/Reviews.js';
import { Book } from './Models/Books.js'
import { Author } from "./Models/Author.js";

const app = express();

const BASE_URL = `http://${hostname}:${port}`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

// ==========
// Connexion base de données
// ==========
User.hasMany(Review)
User.hasMany(Comment)
Review.hasMany(Comment)
Book.hasMany(Review)
Book.belongsTo(Author)
sequelize
    .sync()
    .then((result) => init())
    .catch((err) => console.log(err));

async function init() {
    try {
    // ==========
    // App routers
    // ==========

        app.use("/", router);

    // ==========
    // App start
    // ==========

        app.listen(port, () => {
            console.log(`App listening at http://${hostname}:${port}`);
        });
    } catch (err) {
        console.error("❌ Error", err.message);
    }
}
