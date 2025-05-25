import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "manager",  // your MySQL root password
    database: "blogApp"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
    } else {
        console.log("Connected to MySQL with mysql2!");
    }
});
