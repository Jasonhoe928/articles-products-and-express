
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          name: 'asdf',
          price: 4,
          description: 'alieflse'
        },
        {
          name: 'aoseoseso',
          price: 2,
          description: 'aaaaaaaaa'
        },
        {
          name: 'owowowoww',
          price: 8,
          description: 'lalalallaa'
        }
      ]);
    });
};
