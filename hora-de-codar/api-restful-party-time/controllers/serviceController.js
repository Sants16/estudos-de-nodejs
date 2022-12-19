const { Service: ServiceModel } = require('../models/Service')

const serviceController = {
    create: async(req, resp) => {
        const { name, description, price, image } = req.body

        const service = {
            name,
            description,
            price,
            image
        }

        await ServiceModel.create(service)
            .then(response => {
                resp.status(201)
                    .json({
                        response, 
                        msg: 'Serviço criado com sucesso'
                    })
            })
            .catch(err => console.log(err))
    },
    getAll: async(req, resp) => {
        await ServiceModel.find()
            .then(services => resp.json(services))
            .catch(err => console.log(err))
    },
    get: async(req, resp) => {
        const { id } = req.params

        await ServiceModel.findById(id)
            .then(service => {
                if(!service){
                    resp.status(404)
                        .json({
                            msg: 'Serviço não encontrado'
                        })
                    return
                }

                resp.json(service)
            })
            .catch(err => console.log(err))
    },
    delete: async(req, resp) => {
        const { id } = req.params

        //? Deleta o serviço
        await ServiceModel.findByIdAndDelete(id)
            .then(deletedService => {
                //? Verifica se o serviço que queremos excluir existe
                if(!deletedService){
                    resp.status(404)
                        .json({
                            msg: 'Serviço não encontrado'
                        })
                    return
                }

                resp.status(200)
                    .json({
                        deletedService, 
                        msg: 'Serviço excluído com sucesso'
                    })
            })
            .catch(err => console.log(err))
    },
    update: async (req, resp) => {
        const { id } = req.params
        const { name, description, price, image } = req.body

        const service = {
            name,
            description,
            price,
            image
        }

        await ServiceModel.findByIdAndUpdate(id, service)
        .then(updatedService => {
            if(!updatedService){
                resp.status(404)
                    .json({
                        msg: 'Serviço não encontrado'
                    })
                return
            }

            resp.status(200)
                .json({
                    service, 
                    msg: 'Serviço atualizado com sucesso'
                })
        })
    }
}

module.exports = serviceController