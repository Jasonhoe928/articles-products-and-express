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
    deleteItemById(id) {
        
    }
  }
  
  module.exports = Articles;