'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('pageAllUrls', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            url: {
                unique:true,
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        });
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('pageAllUrls');
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.dropTable('users');
         */
    }
};
