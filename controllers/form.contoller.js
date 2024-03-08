const formSchema = require('../model/form');

module.exports = {
    newForm: async (req, res) => {
        try {
            const { title } = req.body
            const{id,isAdmin}=req.user
            if(!isAdmin)
            {
                return res.status(401).json({ message: "You don't have access for this api", isSuccess: false })
            }
            const checktile = await formSchema.findOne({ title })
            if (checktile) {
                return res.status(401).json({ message: "this title is already used", isSuccess: false })
            }
            req.body.createdby=id
            const newform = new formSchema(req.body)
            newform.save().then((result) => {
                return res.status(200).json({ message: "form  is added", isSuccess: true })
            }).catch((err) => {
                return res.status(400).json({ message: err.message, isSuccess: false })
            });
        } catch (error) {
            return res.status(500).json({ message: err.message, isSuccess: false })
        }
    },
    updateFormById: async (req, res) => {
        try {
            const{isAdmin}=req.user
            const { fid } = req.params
            if(!isAdmin)
            {
                return res.status(401).json({ message: "You don't have access for this api", isSuccess: false })
            }
            await formSchema.findByIdAndUpdate(fid,req.body)
            return res.status(200).json({ message: "form  is updated", isSuccess: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
     getFormById: async (req, res) => {
        try {
            const { fid } = req.params
           const response= await formSchema.findById(fid)
            return res.status(200).json({ message: "form details",response, isSuccess: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
    getAllForms: async (req, res) => {
        try {
            const { page = 1 } = req.query;
            var perPage = req.query.perPage ? req.query.perPage : 25
            const data = await formSchema
              .find(req.query)
              .skip(perPage * page - perPage)
              .limit(perPage)
              .sort({ '_id': -1 })
            const count = await formSchema.find(req.query).count()
            res.status(201).send({
              message: "List of forms",
              data,
              current: page,
              totalCount: count,
              pages: Math.ceil(count / perPage),
              isSuccess: true
            });
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
    deleteFormById: async (req, res) => {
        try {
            const{isAdmin}=req.user
            const { fid } = req.params
            if(!isAdmin)
            {
                return res.status(401).json({ message: "You don't have access for this api", isSuccess: false })
            }
            await formSchema.findByIdAndDelete(fid)
            return res.status(200).json({ message: "form  is deleted", isSuccess: true })
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    }
}