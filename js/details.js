
var param = new URLSearchParams(location.search);
var recipeId = param.get('rid');
var recipeDetails = {};
var recipe_img = document.getElementById('recipe-img');
var ingrediantsArray = [];
getDetails();

function getDetails(){
    var httpReq = new XMLHttpRequest;
    httpReq.open('GET', `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
    httpReq.send();

    httpReq.addEventListener('readystatechange', function () {
        if (httpReq.readyState == 4 && httpReq.status == 200) {
            recipeDetails = JSON.parse(httpReq.response).recipe;
            recipe_img.src = recipeDetails.image_url;
            ingrediantsArray = recipeDetails.ingredients;
            displayIngrediants();
        }
    })

}
function displayIngrediants() {
    var ingrediantsContainer = '';
    for (var i = 0; i < ingrediantsArray.length; i++) {
        ingrediantsContainer += `
                 <li>${ingrediantsArray[i]}</li>`
    }
    document.querySelector('#ingrediantsList').innerHTML = ingrediantsContainer;

}