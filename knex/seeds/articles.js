
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {
          title: 'aaaaaaa',
          author: 'bbbbbb',
          description: 'dccccccc'
        },
        {
          title: 'ddddddd',
          author: 'eeeeeee',
          description: 'fffffffff'
        },
        {
          title: 'gggggggggg',
          author: 'aasfses',
          description: 'ggggggg'
        }
      ]);
    });
};
