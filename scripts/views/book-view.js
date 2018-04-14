'use strict';

(function(module){

  function Book(author, title, isbn, image_url, description) {
    this.author = author;
    this.title = title;
    this.isbn = isbn;
    this.image_url = image_url;
    this.description = description;
  }

  Book.toHtml = () => {
    const template = Handlebars.compile($('#book-list-template').text());
    app.Book.author().forEach(list => $('#book-list').append(template(list)));
  }
//   const template = Handlebars.compile($('#view-template').text());

})(app);







// articleView.initAdminPage = () => {
//     const template = Handlebars.compile($('#stats-template').text());
    


//   // REVIEW: We use .forEach() here because we are relying on the side-effects of the callback function: appending to the DOM. The callback is not required to return anything.
//     app.Article.numWordsByAuthor().forEach(stat => $('.author-stats').append(template(stat)));

