'use strict';

var app = {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://git.heroku.com/michael-booklist.git';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module){

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  //   function Book(bookObj) {
  //     this.author = bookObj.author;
  //     this.title = title;
  //     this.isbn = isbn;
  //     this.image_url = image_url;
  //     this.description = description;
  //   }    check out Object.assign (look it up)

  function Book(bookObj) {
    Object.keys(bookObj).forEach(key => this[key] = bookObj[key]);
  }

  Book.prototype.toHtml = function() {
    const template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  Book.all = [];

  Book.loadAll = (rows) => {
    Book.all = rows.sort((a,b) => b.title -a.title).map(book => new Book(book));
  }
  Book.fetchAll = (callback) => {
    $.getJSON(`${ENV.apiUrl}/api/v1/books`) //added JSON
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  }

  module.Book = Book;

})(app);
