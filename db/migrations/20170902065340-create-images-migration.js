'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('images', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false
            },
            titleId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
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
        return queryInterface.dropTable('images');
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.dropTable('users');
         */
    }
};
