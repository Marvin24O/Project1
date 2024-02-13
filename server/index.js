const express = require("express") //referencia de express
const app = express(); //creamos la app que obtendra a express
const mysql = require ("mysql") //requerimos a mysql
const cors = require("cors");

app.use(cors());//cors() permite que los recursos de tu servidor sean accesibles desde otros dominios o ubicaciones.
app.use(express.json());// analiza las solicitudes entrantes con cargas útiles en formato JSON y las convierte en objetos JavaScript accesibles a través de req.body en las rutas de la aplicación.

const db = mysql.createConnection({ //conexion a db
    host: "localhost",
    user: "root",
    password: "",
    database: "empleados_crud"
});

app.post("/create",(req,res)=>{  //solicitud y respuesta que se puede obtener
    const nombre = req.body.nombre //creamos una constante para cada variable
    const edad = req.body.edad     //una vez tenemos los datos que nos envian desde el form 
    const pais = req.body.pais      //hacemos una consulta para enviarlos a la bd
    const cargo = req.body.cargo        //el re.body  recibe los datos en formato JSON 
    const anios = req.body.anios
    
    db.query('INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES(?,?,?,?,?)',[nombre, edad, pais, cargo, anios], //estos valores son remplazados y capturados de la solicitud
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado registrado con exito!!")
        }
    }
    );    
});

app.get("/empleados",(req,res)=>{
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result) //este result, son los datos que hay en la bd, en la tabla
        }
    }
    );    
});

app.put("/update",(req,res)=>{
    const id = req.body.id
    const nombre = req.body.nombre
    const edad = req.body.edad
    const pais = req.body.pais
    const cargo = req.body.cargo
    const anios = req.body.anios
    
    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',[nombre, edad, pais, cargo, anios, id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado actualizado con exito!!")
        }
    }
    );    
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id
    
    db.query('DELETE FROM empleados WHERE id=?', id, (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado Eliminado con exito!!")
        }
    });    
});


app.listen(3001,()=>{  //indicamos el puerto que queremos
    console.log("Corriendo en el puerto 3001")//cuando corra este puerto, sacara este log
})

