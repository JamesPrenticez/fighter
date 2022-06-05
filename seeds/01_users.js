const nonce = () => {
  return Math.floor(Math.random() * 1000000)
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, nonce: nonce(), publicAddress: '0x3c46D60Dc7E386709eAd0A9ef752A2f4abAcCA30', username: "walletTwo"},
        {id: 2, nonce: nonce(), publicAddress: '0xbd735274e4739797233e4DabA98c1ebCf81066E5', username: "walletThree"},
      ]);
    });
};
