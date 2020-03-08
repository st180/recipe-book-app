import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import $ from "../jquery-3.4.1";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-book';

recipe = {
  id: "",
  name: "",
  ingredients: "",
  directions: ""
};


recipelist;

constructor(private dataService: DataService){}

ngOnInit(){
  this.getData();
}

resetInputs(){
  this.recipe = {
    id: "",
    name: "",
    ingredients: "",
    directions: ""
  };
}

saveRecipe() {
  const data = {
    id: this.recipe.id,
    name: this.recipe.name,
    ingredients: this.recipe.ingredients,
    directions: this.recipe.directions
  };

  console.log(data);

  this.dataService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.getData();
      },
      error => {
        console.log(error);
      });
  
}

editRecipe(name, ingredients, directions, id) {

  document.forms['editform'].elements['name'].value = name;
  document.forms['editform'].elements['ingredients'].value = ingredients;
  document.forms['editform'].elements['directions'].value = directions;
  document.forms['editform'].elements['id'].value = id;

  this.recipe.id = id;
  console.log(id);
}

submitEditedRecipe() {
  

  const data = {
    name: this.recipe.name,
    ingredients: this.recipe.ingredients,
    directions: this.recipe.directions,
    id: this.recipe.id
  };

  console.log(data);

  this.dataService.update(data)
    .subscribe(
      response => {
        console.log(response);
        this.getData();
      },
      error => {
        console.log(error);
      });

}

deleteRecipe(id){
  
  this.dataService.delete(id)
  .subscribe(
    response => {
      console.log(response);
      this.getData();
    },
    error => {
      console.log(error);
    });

}

getData() {
  this.dataService.getAll()
    .subscribe((data)=>{
      this.recipelist = data;
      
    })
}


}
