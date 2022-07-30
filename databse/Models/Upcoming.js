const Sequelize = require("sequelize-cockroachdb");

const Upcoming = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    date: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    hybrid_notes: {
        type: Sequelize.STRING
    },
    image_url: {
        type: Sequelize.STRING
    },
    event_link: {
        type: Sequelize.STRING
    },
}

module.exports = {
    Upcoming
}