const Empresa = require('../model/empresaSchema');
const Hashtag = require('../model/hashtagSchema').HashtagModel;
const Category = require('../model/categorySchema').CategoryModel;

exports.empresa_create = async (req, res) => {
    const empresa = req.body;
    const { category, hashtags } = empresa;
    res.set("Cache-Control", "no-cache");
    res.set("Access-Control-Allow-Origin", "*");
    Category.findOne({
        category
    }).then(async (doc) => {
        if (!doc) {
            Category.create({ category });
            return;
        }
    });
    if (hashtags && hashtags.length > 0) {
        Promise.all(hashtags.map(async (hashtag, index, arr) => {
            //Checa se já existe uma hastag
            return Hashtag.findOne({ name: hashtag }).then(async doc => {
                //Se não existir cria uma hashtag
                if (!doc) {
                    return Hashtag.create({ name: hashtag, searched_times: 0 }).then((hashtag) => {
                        empresa.hashtags[index] = hashtag;
                    }).catch(err => {
                        return res.status(400).send(err);
                    });
                }else{
                    empresa.hashtags[index] = doc;
                }
                //Caso exista uma hashtag adiciona ela na lista 
            }).catch(err => {
                return res.status(400).send({ err });
            });
        })).then(() => {
            //Cria empresa
            const { name, phone, email, street, place, city, uf, img, hashtags } = empresa;
            let newEmpresa = { name, phone, email, street, place, city, uf, img, hashtags };
            Empresa.create(newEmpresa).then((created_empresa) => {
                return res.status(200).send(created_empresa);
            }).catch(
                err => (res.status(400).send(err))
            );
        });
    }
    else {
        //Cria empresa
        const { name, phone, email, street, place, city, uf, img, hashtags } = empresa;
        let newEmpresa = { name, phone, email, street, place, city, uf, img, hashtags };

        Empresa.create(newEmpresa).then((created_empresa) => {
            res.status(200).send(created_empresa);
        }).catch(err => res.status(400).send(err));
    }
}
exports.empresa_update = async (req, res) => {
    const empresa = req.body;
    
    const { hashtags, category, _id } = empresa;
    res.set("Access-Control-Allow-Origin", "*");
    Category.findOne({
        category
    }).then(async (doc) => {
        if (!doc) {
            Category.create({ category });
            return;
        }
    });
    if (hashtags && hashtags.length > 0) {
        Promise.all(hashtags.map(async (hashtag, index, arr) => {
            //Checa se já existe uma hastag
            return Hashtag.findOne({ name: hashtag.name }).then(async doc => {
                //Se não existir cria
                if (!doc) {
                    return Hashtag.create({ name: hashtag, searched_times: 0 }).then((hashtag) => {
                        empresa.hashtags[index] = hashtag;
                    }).catch(err => {
                        return res.status(400).send(err);
                    });
                } else {
                    //Caso exista uma hashtag adiciona ela na lista
                    empresa.hashtags[index] = doc;
                }
            }).catch(err => {
                return res.status(400).send(err);
            });
        })).then(() => {
            //Depois de iterar todas a hashtags
            //Busca a empresa pelo id
            Empresa.findOneAndUpdate({ _id: _id }, { $set: req.body }).then((doc) => {
                //Atualiza seu documento com os dados do corpo da requisição
                return res.status(200).send(doc);
            }).catch(err => {
                return res.status(400).send({ err: "Empresa não encontrada!" });
            });
        });
    } else {
        Empresa.findOneAndUpdate({ _id: _id }, { $set: req.body }).then(doc => {
            return res.status(200).send({ doc });
        }).catch(err => {
            return res.status(400).send({ err: "Empresa não encontrada!" });
        });
    }
}
exports.empresa_list = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    Empresa.find({}).then(empresas => {
        return res.status(200).send({
            empresas
        })
    }).catch(err => {
        return res.status(200).send({ err });
    })
}
exports.empresa_delete = (req, res) => {
    const { _id } = req.body;
    res.set("Cache-Control", "no-cache");
    res.set("Access-Control-Allow-Origin", "*");
    Empresa.deleteOne({ _id: _id }).then(doc => {
        return res.status(200).send({ doc })
    }).catch( err => {
        return res.status(400).send({err});
    });
}