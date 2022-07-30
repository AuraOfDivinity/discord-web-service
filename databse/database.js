const Sequelize = require("sequelize-cockroachdb");
const { past } = require('./Models/Past')
const { upcoming } = require('./Models/Upcoming')
const { bulk_create, reset_table} = require('./transactions')

// Connect to CockroachDB through Sequelize.
const connectionString = process.env.DATABASE_URL
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: "mlh-birthday-bash"
  }
});

// Defining the models
const Upcoming = sequelize.define('upcoming', {
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
})

const Past = sequelize.define('past', {
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
})


const populate_upcoming_table = async(events) => {
    await Upcoming.sync({
        force:true
    })
    let created = await Upcoming.bulkCreate(events)
}

const populate_past_table = async(events) => {
    Past.destroy({
        where: {},
        truncate: true
    })
    let created = await Past.bulkCreate(events)
}

const get_all_upcoming_records = async() => {
    let results = await Upcoming.findAll()
    return results
}

const get_all_past_records = async() => {
    let results = await Past.findAll()
    return results
}

module.exports= {
    populate_past_table,
    populate_upcoming_table,
    get_all_upcoming_records,
    get_all_past_records
}