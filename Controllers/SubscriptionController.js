const SubsModel = require('../Models/Subscription');

module.exports.subscribe_get = async (req , res) =>{
    try {
        const message = await SubsModel.subscribeToPlan({userId: req.id, planName: req.params.name});
        res.json({ message });
    
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
}