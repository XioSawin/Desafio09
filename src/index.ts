import express from 'express'

const app = express();
const router = express.Router();

app.use(express.json());

let productos: any[] = []; //inicializado como array vacio, no sabemos qué va a ir adentro.

router.get('/', (req, res) => {

    if(!productos.length){ 
        res.json({error: 'no hay productos cargados'});
    }

    res.json(productos); //devolver los datos en formato json
})

router.get('/addproduct', (req, res)=>{
    res.sendFile(__dirname + '/addproduct.html');
})

router.post('/', (req, res) => {
    const {title, price, thumbnail} = req.body;

    let id = (productos.length)+1;

    const producto = {
        id, 
        title, 
        price, 
        thumbnail
    }

    productos.push(producto);
    res.sendStatus(201);
})

router.get('/:id', (req, res)=>{ //get info by id
    const id = req.params.id;

    const producto = productos.find(producto => producto.id == id);

    if(!producto){ 
        res.json({error: 'producto no encontrado'});
    }

    res.json(producto);
})

router.patch('/actualizar/:id', (req, res) => {

    const id = req.params.id;

    const producto = productos.find(producto => producto.id == id);

    if(!productos){ 
        res.sendStatus(404);
    }

    const {title, price, thumbnail} = req.body;

    producto.title = title;
    producto.price = price;
    producto.thumbnail = thumbnail;
    
    res.sendStatus(204);
})

router.delete('/borrar/:id', (req, res) => {
    const id = req.params.id;

    const producto = productos.find(producto => producto.id == id);

    if(!producto){ 
        res.sendStatus(404);
    }

    productos = productos.filter(producto => producto.id != id)
})

app.use('/api/producto', router);
app.use(express.static('public'));

app.listen(8080, () => {
    console.log("I´m driving driving on port 8080");
})