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

// CRUD - Create professor
const createprofessor = (req, res) => {
    const {cpf, nome, nascimento, telefone, email, formacao}
        =req.body;

    const query = 'INSERT INTO professor (cpf, nome, nascimento, telefone, email, formacao) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [cpf, nome, nascimento, telefone, email, formacao], (err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'professor criado com sucesso', result});
        }

    });
}

//CRUD - Read professors
const readprofessor = (req, res) => {
    con.query("SELECT * FROM professor",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update professor
const updateprofessor = (req, res) => {
    const {cpf, nome, nascimento, telefone, email, formacao} = req.body;

    const query = 'UPDATE professor SET cpf = ?, nome = ?, nascimento = ?, telefone = ?, email = ? WHERE formacao = ?'
    con.query(query, [cpf, nome, nascimento, telefone, email, formacao],(err, result)=>{
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'professor atualizada com sucesso', result});
        }
    });
}


//CRUD - Delete Veiculo
const deleteprofessor = (req, res) => {
    const {cpf, nome, nascimento, telefone, email, formacao} = req.params;

    const query = 'DELETE FROM professor WHERE email = ?';
    con.query(query, [cpf, nome, nascimento, telefone, email, formacao], (err,result)=> {
        if(err) {
            res.status(500).json({error:err.message});
        }else {
            res.json({message: 'professor removida com sucesso', result});
        }
    });
}

//Saida Front
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

//professors para Veiculo
app.post("/professor",createprofessor);
app.get("/professor", readprofessor);
app.put("/professor", updateprofessor);
app.delete("/professor/:endereco", deleteprofessor);


//Teste de porta
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3000");
});
