import React, { Component } from "React";
import "./style.css";
import API from '../../utils/API'

const articleContainer;

class ArticleCard extends Component {
    state = {
        articles = {}
    };

    componentDidMount() {
        fetch("/api/headlines?saved=false")
            .then(data => {
                this.setState({ articles: data })
            })
        this.state.articles.length ? console.log("Articles Loaded") : console.log("Error Occurred")
    }

    renderEmpty() {
        // This function renders some HTML to the page explaining we don't have any articles to view
        // Using a joined array of HTML string data because it's easier to read/change than a concatenated string
        var emptyAlert = $(
          [
            "<div class='alert alert-warning text-center'>",
            "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
            "</div>",
            "<div class='card'>",
            "<div class='card-header text-center'>",
            "<h3>What Would You Like To Do?</h3>",
            "</div>",
            "<div class='card-body text-center'>",
            "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
            "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
            "</div>",
            "</div>"
          ].join("")
        );
        // Appending this data to the page
        articleContainer.append(emptyAlert);
      }

    renderArticles(articles) {
        // This function handles appending HTML containing our article data to the page
        // We are passed an array of JSON containing all available articles in our database
        var articleCards = [];
        // We pass each article JSON object to the createCard function which returns a bootstrap
        // card with our article data inside
        for (var i = 0; i < articles.length; i++) {
          articleCards.push(createCard(articles[i]));
        }
        // Once we have all of the HTML for the articles stored in our articleCards array,
        // append them to the articleCards container
        articleContainer.append(articleCards);
      }

    render() {
        if (this.state.articles && this.state.articles.length) {
            this.renderArticles(this.state.articles);
        } else {
            this.renderEmpty();
        }
        return(<>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="/">Mongo Scraper</a>
  <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home
          <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/saved">Saved Articles</a>
      </li>
      <li class="nav-item">
        <a class="btn btn-danger scrape-new">SCRAPE NEW ARTICLES!</a>
      </li>
      <li class="nav-item">
        <a class="btn btn-danger clear">CLEAR ARTICLES!</a>
      </li>
    </ul>
  </div>
</nav>

<div class="jumbotron text-center">
  <div class="overlay">
  </div>
  <div class="background-image">
  </div>
  <div class="caption">
    <h1>Mongo Scraper</h1>
    <p>New York Times Edition</p>
  </div>
</div>
<div class="container-fluid article-container">
  {/* {{#each articles}} */}
  <div data-_id="{{this._id}}" class="card">
    <div class="card-header">
      <h3>
        <a class="article-link" target="_blank" rel="noopener noreferrer" href="{{this.url}}">
            {/* {{this.headline}} */}
            </a>
        <a class="btn btn-success save">Save Article</a>
      </h3>
    </div>
    <div class="card-body">
        {/* {{this.summary}} */}
        </div>
  </div>
  {/* {{/each}} {{#unless articles.length}} */}
  <div class='alert alert-warning text-center'>
    <h4>Uh Oh. Looks like we don't have any new articles.</h4>
  </div>
  <div class="card">
    <div class="card-header text-center">
      <h3>What Would You Like To Do?</h3>
    </div>
    <div class="card-body text-center">
      <h4>
        <a class="scrape-new">Try Scraping New Articles</a>
      </h4>
      <h4>
        <a href="/saved">Go to Saved Articles</a>
      </h4>
    </div>
  </div>
  {/* {{/unless}} */}
</div>
</>
        )
    }
}

export default ArticleCard