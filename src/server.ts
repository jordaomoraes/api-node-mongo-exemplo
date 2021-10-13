import express from 'express';
import cors from 'cors';
import routes from './routes';
import mongoose from 'mongoose'
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'
const db = require("./database/connection");

const app = express()
//Configurações
app.use(cors())
app.use(express.json());
app.use(routes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


mongoose.Promise = global.Promise;
mongoose
    .connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conectado ao mongo!");
    })
    .catch(erro => {
        console.log("Erro ao Conectar com o Banco de Dados : " + erro);
    });


app.use((req, res, next) => {
    next();
})

const port = process.env.PORT_WWW_APP || 3000
app.listen(port, () => {
    console.log('Servidor Rodando na porta ' + port + '...')
})