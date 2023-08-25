import { Router, Request, Response } from "express";


import ClientController from "../controllers/UserController";

const routes = Router()

routes.post("/client", ClientController.create);
routes.get("/client", ClientController.get);
routes.get("/date-search",ClientController.date);
routes.get("/id", ClientController.id);
routes.delete("/client", ClientController.delete);
routes.put("/client", ClientController.update);


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
