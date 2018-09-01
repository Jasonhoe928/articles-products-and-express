class Inventory {
    constructor() {
      this._count = 1;
      this._storage = [];
      this.add({
        name: 'A test',
        description: 'A test.'
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
    deleteItemById(id) {}
  }
  
  module.exports = Inventory;