const PartyModel = require('../models/Party')

const checkPartyBudget = (budget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0)

    if(priceSum > budget) return false

    return true
}

const partyController = {
    create: async(req, resp) => {
        const { title, author, description, budget, image, services } = req.body

        const party = {
            title,
            author,
            description,
            budget,
            image,
            services
        }

        if(party.services && !checkPartyBudget(party.budget, party.services)){
            resp.status(406)
                    .json({
                        msg: 'O seu orçamento é insuficiente'
                    })
            return
        }

        await PartyModel.create(party)
            .then(response => {
                resp.status(201)
                    .json({
                        response, 
                        msg: 'Festa criada com sucesso'
                    })
            })
            .catch(err => console.log(err))
    },
    getAll: async(req, resp) => {
        await PartyModel.find()
            .then(parties => resp.json(parties))
            .catch(err => console.log(err))
    },
    get: async(req, resp) => {
        const { id } = req.params

        await PartyModel.findById(id)
            .then(party => {
                if(!party){
                    resp.status(404)
                        .json({
                            msg: 'Festa não encontrada'
                        })
                    return
                }

                resp.json(party)
            })
            .catch(err => console.log(err))
    },
    delete: async(req, resp) => {
        const { id } = req.params

        await PartyModel.findByIdAndDelete(id)
            .then(deletedParty => {
                if(!deletedParty){
                    resp.status(404)
                        .json({
                            msg: 'Festa não encontrada'
                        })
                    return
                }

                resp.status(200)
                    .json({
                        deletedParty, 
                        msg: 'Festa excluída com sucesso'
                    })
            })
            .catch(err => console.log(err))
    },
    update: async(req, resp) => {
        const { id } = req.params

        const { title, author, description, budget, image, services } = req.body

        const party = {
            title,
            author,
            description,
            budget,
            image,
            services
        }

        if(party.services && !checkPartyBudget(party.budget, party.services)){
            resp.status(406)
                    .json({
                        msg: 'O seu orçamento é insuficiente'
                    })
            return
        }

        await PartyModel.findByIdAndUpdate(id, party)
        .then(updatedParty => {
            if(!updatedParty){
                resp.status(404)
                    .json({
                        msg: 'Festa não encontrada'
                    })
                return
            }

            resp.status(200)
                .json({
                    party, 
                    msg: 'Festa atualizada com sucesso'
                })
        })
    }
}

module.exports = partyController