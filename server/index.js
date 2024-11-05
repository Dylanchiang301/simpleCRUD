const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());         // 啟用所有來源的 CORS 支持
app.use(express.json());  // 解析 JSON 請求體

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "dylan301",
    database: "employeeSystem",
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL successfully!');
    }
});

// 取得資料
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

// 新增資料
app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    )
})

// 修改資料
app.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
        "UPDATE employees SET wage = ? WHERE id = ?",
        [wage, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// 刪除資料
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.listen(4001, () => {
    console.log('your success running port 4000')
})