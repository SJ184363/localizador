const express = require("express");
const mysql = require("mysql");

const app = express();

let conexion = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bodega",
});

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("registro");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/validar", function (req, res) {
    const datos = req.body;

    let nombre = datos.nombre;
    let descrip = datos.descrip;
    let precio = datos.precio;
    let exist = datos.exist;

    let registrar = "INSERT INTO productos (idp, nombre, descrip, precio, exist) VALUES (null, '" + nombre + "', '" + descrip + "','" + precio + "','" + exist + "')";

    conexion.query(registrar, function (error) {
        if (error) {
            console.log("Error al registrar: ", error);
        } else {
            console.log("Registro exitoso");
            res.render('confirma', { nombre });
            //res.redirect("/");
        }
    })
});

app.listen(3000, function () {
    console.log("Servidor corriendo en el http://localhost:3000");
});
