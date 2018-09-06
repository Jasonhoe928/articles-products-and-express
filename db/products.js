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
    deleteProductById(id) {
      let removedProduct = null;
      console.log('deleteProductById =', id);
      // console.log('this._storage before =', this._storage);
      this._storage.forEach((element, index) => {
        if (element.id === Number(id)) {
          removedProduct = this._storage.splice(index, 1);
        }
      });
      // console.log('this._storage after =', this._storage);
  
      return removedProduct;
    }
  }
  
  module.exports = Products;