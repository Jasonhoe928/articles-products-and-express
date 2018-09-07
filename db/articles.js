class Articles {
    constructor() {
      this._count = 1;
      this._storage = [];
      this.add({
        title: 'Article Test',
        body: 'An article Test',
        author: '100'
      });
    }
    all() {
      return [...this._storage];
    }
    getItemById(title) {
      return this._storage.filter(item => title == item.title)[0];
    }
    add(artItem) {
      this._storage.push(artItem);
      return artItem.title;
    }
    updateItemById(id) {}
    deleteArticleById(title) {
      console.log('title', title)
      let removedArticle = null;
      // console.log('this._storage before =', this._storage);
      this._storage.forEach((element, index) => {
        if (element.title === title) {
          removedArticle = this._storage.splice(index, 1);
        }
      });
      // console.log('this._storage after =', this._storage);
  
      return removedArticle;
    }
  }
  
  module.exports = Articles;