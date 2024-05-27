// dashboard.js
import { auth } from './js/firebaseConfig.js';

async function logout() {
  try {
    await auth.signOut();
    window.location.href = 'https://inclu-acao-front.vercel.app/index.html';
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

const articles = [
  // your articles data
];

function createArticleElement(article) {
  const articleElement = document.createElement('div');
  articleElement.className = 'article';

  const articleImage = document.createElement('img');
  articleImage.src = article.image;
  articleImage.alt = article.title;
  articleImage.onerror = function() {
    this.src = 'placeholderpride.png';
  };

  const articleContent = document.createElement('div');
  articleContent.className = 'article-content';

  const articleTitle = document.createElement('h3');
  articleTitle.textContent = article.title;

  const articleSnippet = document.createElement('p');
  articleSnippet.textContent = article.snippet;

  const articleLink = document.createElement('a');
  articleLink.href = article.url;
  articleLink.target = '_blank';
  articleLink.textContent = 'Read more';

  articleContent.appendChild(articleTitle);
  articleContent.appendChild(articleSnippet);
  articleContent.appendChild(articleLink);
  articleElement.appendChild(articleImage);
  articleElement.appendChild(articleContent);

  return articleElement;
}

function displayArticles() {
  const articlesContainer = document.getElementById('articles');
  if (!articlesContainer) {
    console.error('Element with ID "articles" not found.');
    return;
  }
  articles.forEach(article => {
    const articleElement = createArticleElement(article);
    articlesContainer.appendChild(articleElement);
  });
}

displayArticles();
window.logout = logout;
