// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfSd3zbl4iOT_Dw3RA0nk4HVo1SrUcCsc",
  authDomain: "incluacao-fb776.firebaseapp.com",
  projectId: "incluacao-fb776",
  storageBucket: "incluacao-fb776.appspot.com",
  messagingSenderId: "198502388108",
  appId: "1:198502388108:web:bd387b9504810af7d586a9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function logout() {
  auth.signOut().then(() => {
    window.location.href = 'https://inclu-acao-front.vercel.app/index.html';
  }).catch((error) => {
    console.error('Error logging out:', error);
  });
}

// Static data for articles (replace this with dynamic data as needed)
const articles = [
  {
    title: "Trabalhador discriminado no trabalho por ser homossexual receberá R$ 50 mil de indenização por danos morais",
    image: "https://portal.trt3.jus.br/internet/conheca-o-trt/comunicacao/noticias-juridicas/trabalhador-discriminado-no-trabalho-por-ser-homossexual-recebera-r-50-mil-de-indenizacao-por-danos-morais#:~:text=Trabalhador%20discriminado%20no%20trabalho%20por,por%20danos%20morais%20%E2%80%94%20TRT%2DMG&text=V%C3%A1rias%20pessoas%20de%20costas%20em,%C3%ADris%2C%20s%C3%ADmbolo%20do%20movimento%20LGBTQIA%2B",
    url: "https://portal.trt3.jus.br/internet/conheca-o-trt/comunicacao/noticias-juridicas/trabalhador-discriminado-no-trabalho-por-ser-homossexual-recebera-r-50-mil-de-indenizacao-por-danos-morais#:~:text=Trabalhador%20discriminado%20no%20trabalho%20por,por%20danos%20morais%20%E2%80%94%20TRT%2DMG&text=V%C3%A1rias%20pessoas%20de%20costas%20em,%C3%ADris%2C%20s%C3%ADmbolo%20do%20movimento%20LGBTQIA%2B",
    snippet: "Trabalhador discriminado no trabalho por ser homossexual receberá R$ 50 mil de indenização por danos morais."
  },
  {
    title: "Trabalhador vítima de homofobia na empresa é indenizado em R$ 95 mil por danos morais",
    image: "https://www.trt7.jus.br/templates/gk_news2/images/logo/logo.png",
    url: "https://www.trt7.jus.br/index.php?option=com_content&view=article&id=5127:trabalhador-vitima-de-homofobia-na-empresa-e-indenizado-em-r-95-mil-por-danos-morais&catid=152&Itemid=885b",
    snippet: "Trabalhador vítima de homofobia na empresa é indenizado em R$ 95 mil por danos morais."
  },
  {
    title: "A conciliação em casos de assédio no trabalho",
    image: "https://www.csjt.jus.br/web/csjt/conciliacao-artigos/-/asset_publisher/K9ip/content/id/9279623",
    url: "https://www.csjt.jus.br/web/csjt/conciliacao-artigos/-/asset_publisher/K9ip/content/id/9279623",
    snippet: "A conciliação em casos de assédio no trabalho."
  },
  {
    title: "O ciclo do assédio nas empresas",
    image: "https://thinkeva.com.br/wp-content/uploads/2020/02/eva-logo.png",
    url: "https://thinkeva.com.br/o-ciclo-do-assedio-nas-empresas/",
    snippet: "O ciclo do assédio nas empresas."
  },
  {
    title: "Assédio contra a comunidade LGBTQIAPN+ no ambiente de trabalho",
    image: "https://thinkeva.com.br/wp-content/uploads/2020/02/eva-logo.png",
    url: "https://thinkeva.com.br/assedio-contra-a-comunidade-lgbtqiapn-no-ambiente-de-trabalho/#:~:text=Analisando%20os%20dados%20sobre%20a,foram%20discriminadas%20no%20ambiente%20organizacional",
    snippet: "Assédio contra a comunidade LGBTQIAPN+ no ambiente de trabalho."
  }
];

// Function to create article elements
function createArticleElement(article) {
  const articleElement = document.createElement('div');
  articleElement.className = 'article';

  const articleImage = document.createElement('img');
  articleImage.src = article.image;
  articleImage.alt = article.title;
  articleImage.onerror = function() {
    this.src = 'placeholder.png'; // Replace with the path to your default image
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

// Function to display articles
function displayArticles() {
  const articlesContainer = document.getElementById('articles');
  articles.forEach(article => {
    const articleElement = createArticleElement(article);
    articlesContainer.appendChild(articleElement);
  });
}

// Initialize display of articles
displayArticles();
