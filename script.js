const searchBar = document.querySelector('#search_here');
const search_Button = document.querySelector('#search_button');

const api_key = "647b57feaa704dad99e835d313147ad9";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => getData("India"));

async function getData(name) {
    const response = await fetch(`${url}${name}&apiKey=${api_key}`); 
    const data = await response.json();
    newsArticles = data.articles; 
    binData(newsArticles);
}

function binData(articles) {
    const cardContainer = document.getElementById("cards-container");
    const newsCardTemplates = document.getElementById("cardTemplate");

   
    cardContainer.innerHTML = "";


    articles.forEach((article) => {
        if (!article.urlToImage) return; 

        const cardClone = newsCardTemplates.content.cloneNode(true);


        cardClone.querySelector(".figure-img").src = article.urlToImage; 
        cardClone.querySelector(".title").textContent = article.title; 
        cardClone.querySelector(".source").textContent = article.source.name;
        cardClone.querySelector(".author").textContent = article.author || "Unknown Author";
        cardClone.querySelector(".date").textContent = new Date(article.publishedAt).toLocaleDateString();
        cardClone.querySelector(".description").textContent = article.description || "No description available.";
        cardContainer.appendChild(cardClone);
        
    });
    
}

const searchHere = document.querySelector("#search_here");
const searchButton = document.querySelector("#search_button");

searchButton.addEventListener('click', (event)=>{
    event.preventDefault();
    const toSearch = searchHere.value;
    getData(toSearch);

});


//   Applying Dropdowns

const sortDropdown = document.querySelector("#sort-dropdown");

sortDropdown.addEventListener('change',(event)=>{
    const sortBy = event.target.value;
    const sortedArticles = sortNews(newsArticles, sortBy);
    binData(sortedArticles);
})

function sortNews(newsItems, sortBy) {
    return newsItems.sort((a, b) => {
        if (sortBy === 'publishedAt') {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
        }
    
        if (sortBy === 'relevancy') {
            return b.title.length - a.title.length;
        } else if (sortBy === 'popularity') {
           
            return b.title.length - a.title.length; 
        }
        return 0; 
    });
}

 // Applying DropDown for language

const langDropdown = document.querySelector("#lang-dropdown");

langDropdown.addEventListener('change',(event)=>{
    const langValue = event.target.value;
    filterByLanguage(langValue);
})

function filterByLanguage(selectedLang) {
    const filteredLang = newsArticles.filter(article => {
        // Ensure both selectedLang and article.Language are in the same case
        return article.Language.toLowerCase() === selectedLang.toLowerCase();
    });
    binData(filteredLang);
}
