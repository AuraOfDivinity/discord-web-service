const {get_all_upcoming_records, get_all_past_records} = require('../databse/database')

exports.get_all_upcoming_events = async(req, res) => {
    const upcoming_records = await get_all_upcoming_records()

    return res.status(200).json({status: true, type: "upcoming", data: upcoming_records})
}

exports.get_all_past_events = async(req, res) => {
    const past_events = await get_all_past_records()

    return res.status(200).json({status: true, type:"past", data: past_events})
}