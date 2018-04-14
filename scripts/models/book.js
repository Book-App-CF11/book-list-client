'use strict';

var app = {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://git.heroku.com/michael-booklist.git';
ENV.developmentApiUrl = 'http;//localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module){

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  //   function Book(author, title, isbn, image_url, description) {
  //     this.author = author;
  //     this.title = title;
  //     this.isbn = isbn;
  //     this.image_url = image_url;
  //     this.description = description;
  //   }

  function Book(bookObj) {
    Object.keys(bookObj).forEach(key => this[key] = bookObj[key]);
  }

  Book.prototype.toHtml = function() {
    const template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }
  //   const template = Handlebars.compile($('#view-template').text());

  Book.all = [];

  Book.loadAll = (rows) => {
    Book.all = rows.sort((a,b) => b.title -a.title).map(book = new Book(book));
  }
  Book.fetchAll = callback =>
    $.get(`/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

})(app);
