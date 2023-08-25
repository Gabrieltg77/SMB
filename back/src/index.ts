import * as express from "express";
import * as cors from 'cors';
import * as dotenv from "dotenv";
import routes from "./routes";


dotenv.config();

//cria o servidor
const app = express();
app.use(cors())
//parâmetros JSON
app.use(express.json()); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
app.use(routes);