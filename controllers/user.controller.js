const {create_user_record, get_user_records, delete_all_user_records} = require('../databse/database')

exports.subscribe_user = async(req, res) => {
    const { number } = req.body

    await create_user_record(number)
    return res.status(201).json({status: true, message: 'User Record Successfully Created.'})
}

exports.get_all_users = async(req, res) => {
    const users = await get_user_records()

    return res.status(200).json({status: true, message: 'Users successfully fetched', data: users})
}

exports.delete_all_users = async(req, res) => {
    const users = await delete_all_user_records()

    return res.status(200).json({status: true, message: 'Users records succesfully cleared'})
}