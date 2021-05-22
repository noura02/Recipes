
var searchInput = document.getElementById('searchInput');
var recipesArray = [];
getRecipes('pizza');


var links = document.querySelectorAll('.nav-link');

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        var currentMeal = e.target.text;
        getRecipes(currentMeal)
    })
}

function displayRecipes() {
    recipesContainer = '';
    for (var i = 0; i < recipesArray.length; i++) {
        recipesContainer += `
                              <div class="col-lg-3 my-4">
                                <div>
                               <img src="${recipesArray[i].image_url}" class="img-height w-100" >
                               <h6 class='mt-3 '>${recipesArray[i].title}</h6>
                               <a href='${recipesArray[i].source_url}' class='btn btn-info ' target='_blank'>source</a>
                                <a href='details.html?rid=${recipesArray[i].recipe_id}' class='btn btn-warning mt-2' target='_blank'>details</a>
                                 </div>
                                </div>`
        document.getElementById('recipesRow').innerHTML = recipesContainer
    }
}

function getRecipes(meal) {
    var htttpReq = new XMLHttpRequest();

    htttpReq.open('GET', `https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    htttpReq.send();

    htttpReq.addEventListener('readystatechange', function () {
        if (htttpReq.readyState == 4 && htttpReq.status == 200) {
            recipesArray = JSON.parse(htttpReq.response).recipes;
            displayRecipes();
        }
    })
}


