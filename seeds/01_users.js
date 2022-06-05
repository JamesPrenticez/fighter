
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, publicAddress: '0x3c46D60Dc7E386709eAd0A9ef752A2f4abAcCA30', username: "walletTwo"},
      ]);
    });
};
