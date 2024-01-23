import { Router } from "express";
import UserController from "../controllers/UserController.js";
import ArtistController from "../controllers/ArtistController.js";
import PlaylistController from "../controllers/PlaylistController.js";
import AlbumController from "../controllers/AlbumController.js";

const routes = Router();

//User routes
routes.post("/user", UserController.create);
routes.get("/user/:username", UserController.read);
routes.put("/user", UserController.update);
routes.delete("/user", UserController.delete);

//Artist routes
routes.post("/artist", ArtistController.create);
routes.get("/artist/:username", ArtistController.read);
routes.put("/artist", ArtistController.update);
routes.delete("/artist", ArtistController.delete);

//Playlist routes
routes.post("/playlist", PlaylistController.create);
routes.get("/playlist/:name", PlaylistController.read);
routes.put("/playlist", PlaylistController.update);
routes.delete("/playlist", PlaylistController.delete);

//Album routes
routes.post("/album", AlbumController.create);
routes.get("/album/:name", AlbumController.read);
routes.put("/album", AlbumController.update);
routes.delete("/album", AlbumController.delete);

export default routes;
