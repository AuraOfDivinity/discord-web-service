const bulk_create = async(event_array, model) => {
    return model.bulkCreate(event_array)
}

const reset_table = async(model) => {
    return model.sync({
        force:true
    })
}

module.exports = {
    bulk_create,
    reset_table
}