function createMarkup(markup_name, text, parent, attribute) {
  const markup = document.createElement(markup_name);
  markup.textContent = text;
  parent.appendChild(markup);
  if (attribute && attribute.hasOwnProperty("name")) {
    markup.setAttribute(attribute.name, attribute.value);
  }
  return markup;
}

const themes = ["Tous","Html", "Css", "Javascript"];

themes.forEach(theme => {
  const button = createMarkup("button", theme, document.body, {name:"style", value: "background-color: green; margin-left: 350px; font-size: 30px"});
  button.classList.add("theme-button");
  button.addEventListener('click', () => {
    filtrerArticles(theme)
  });
});

const articles = [
  {theme: "Html", titre: "Article Html 1", content: "Lorem ipsum dolor sit amet."},
  {theme: "Html", titre: "Article Html 2", content: "Lorem ipsum dolor sit amet."},
  {theme: "Html", titre: "Article Html 3", content: "Lorem ipsum dolor sit amet."},
  {theme: "Html", titre: "Article Html 4", content: "Lorem ipsum dolor sit amet."},
  {theme: "Css", titre: "Article Css 1", content: "Lorem ipsum dolor sit amet."},
  {theme: "Css", titre: "Article Css 2", content: "Lorem ipsum dolor sit amet."},
  {theme: "Css", titre: "Article Css 3", content: "Lorem ipsum dolor sit amet."},
  {theme: "Css", titre: "Article Css 4", content: "Lorem ipsum dolor sit amet."},
  {theme: "Javascript", titre: "Article Javascript 1", content: "Lorem ipsum dolor sit amet."},
  {theme: "Javascript", titre: "Article Javascript 2", content: "Lorem ipsum dolor sit amet."},
  {theme: "Javascript", titre: "Article Javascript 3", content: "Lorem ipsum dolor sit amet."},
  {theme: "Javascript", titre: "Article Javascript 4", content: "Lorem ipsum dolor sit amet."},
];

articles.forEach(content => {
  const article = createMarkup("article", "", document.body, {name:"style", value: "display: none ; border: solid black 1px;"});
  createMarkup("p", content.theme, article);
  createMarkup("p", content.titre, article);
  createMarkup("p", content.content, article);
});

function filtrerArticles(theme){
  const articles = document.querySelectorAll("article");
  
  articles.forEach(article => {
    const themeArticle = article.querySelector("p:first-of-type");
    if ( theme === "Tous" || themeArticle.textContent === theme ) {
      article.style.display = "block";
    } else {
      article.style.display = "none";
    } 
  })
}

