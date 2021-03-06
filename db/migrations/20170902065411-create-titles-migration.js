'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('titles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            total: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
        return queryInterface.dropTable('titles');
      /*
       Add reverting commands here.
       Return a promise to correctly handle asynchronicity.

       Example:
       return queryInterface.dropTable('users');
       */
    }
};
