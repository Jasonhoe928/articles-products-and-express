class Products {
    constructor() {
      this._count = 1;
      this._storage = [];
      this.add({
        name: 'Test',
        description: 'A Test',
        price: '100'
      });
    }
    all() {
      return [...this._storage];
    }
    getItemById(id) {
      return this._storage.filter(item => id == item.id)[0];
    }
    add(item) {
      item.id = this._count;
      this._storage.push(item);
      this._count++;
      return item.id;
    }
    updateItemById(id) {}
    deleteItemById(id) {
        
    }
  }
  
  module.exports = Products;