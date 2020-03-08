var express = require("express");
var bodyParser = require("body-parser");
const { Client } = require("pg");
var cors = require("cors");

var app= express();

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const client = new Client({
    user: "shaunteeshad",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "recipebook"
});

client.connect();

app.get("/api/recipes", function(request, response) {
    
    client.query('SELECT * FROM public.recipes ORDER BY id DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  });

app.post("/api/recipes", function(request, response) {
    const { name, ingredients, directions } = request.body
  
    client.query('INSERT INTO public.recipes (name, ingredients, directions) VALUES ($1, $2, $3)',
    [name, ingredients, directions], error => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'Recipe added.' })
    })
  });

  app.post("/api/recipes/update", function(request, response) {
    const { name, ingredients, directions, id } = request.body

    client.query('UPDATE public.recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4',
    [name, ingredients, directions, id], error => {
        if (error) {
          throw error
        }
        response.status(200).json({ status: 'success', message: 'Recipe updated.' })
      })
    });

app.delete("/api/recipes/:id", function(request, response) {
  
    client.query('DELETE from public.recipes WHERE id = $1', [request.params.id], error => {
      if (error) {
        throw error
      }
      response.status(200).json({ status: 'success', message: 'Recipe deleted.' })
    })
  });


//Server
app.listen(3000, function(){
    console.log("Server started on port 3000");
});