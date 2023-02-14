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


module.exports.toggle_patch = async (req , res) =>{
    try {
        const message = await SubsModel.toggleSubscription(req.id, req.body.planName, req.body.startTime);
        res.json({ message });
    
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
}

module.exports.subscription_get = async (req , res) =>{
    try {
        const result = await SubsModel.findUserSubscription(req.id);
        
        res.json({ result });
    
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
}