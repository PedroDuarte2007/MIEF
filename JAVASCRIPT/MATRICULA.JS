const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database:'escolamief'
});

con.connect((err) => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

const teste = (req, res) => {
    res.send("Back-end respondendo");
}

// CRUD - Create alunos
const createalunos = (req, res) => {
    const {email, telefone, nome, cpf, nascimento}
        =req.body;

    const query = 'INSERT INTO alunos (email, telefone, nome, cpf, nascimento) VALUES(?, ?, ?, ?, ?)';
    con.query(query, [email, telefone, nome, cpf, nascimento], (err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'alunos criado com sucesso', result});
        }

    });
}

//CRUD - Read alunoss
const readalunos = (req, res) => {
    con.query("SELECT * FROM alunos",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update alunos
const updatealunos = (req, res) => {
    const {email, telefone, nome, cpf, nascimento} = req.body;

    const query = 'UPDATE alunos SET email = ?, telefone = ?, nome = ?, cpf = ?, WHERE nascimento = ?'
    con.query(query, [email, telefone, nome, cpf, nascimento],(err, result)=>{
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'alunos atualizada com sucesso', result});
        }
    });
}


//CRUD - Delete Veiculo
const deletealunos = (req, res) => {
    const {email, telefone, nome, cpf, nascimento} = req.params;

    const query = 'DELETE FROM alunos WHERE email = ?';
    con.query(query, [email, telefone, nome, cpf, nascimento], (err,result)=> {
        if(err) {
            res.status(500).json({error:err.message});
        }else {
            res.json({message: 'alunos removida com sucesso', result});
        }
    });
}

//Saida Front
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

//alunoss para Veiculo
app.post("/alunos",createalunos);
app.get("/alunos", readalunos);
app.put("/alunos", updatealunos);
app.delete("/alunos/:endereco", deletealunos);


//Teste de porta
app.listen(3300, () => {
    console.log("Servidor rodando na porta 3000");
});
