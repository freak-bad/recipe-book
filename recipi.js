document.getElementById('searchBtn').addEventListener('click', function() {
    const query = document.getElementById('search').value;
    fetchRecipes(query);
});

function fetchRecipes(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.meals);
            console.log(data);
            
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}


function displayRecipes(meals) {
    const recipeSection = document.getElementById('recipes');
    recipeSection.innerHTML = '';

    if (meals) {
        meals.forEach(meal => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe');

            recipeCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>
            `;

            recipeSection.appendChild(recipeCard);
        });
    } else {
        recipeSection.innerHTML = '<p>No recipes found</p>';
    }
}
