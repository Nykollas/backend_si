const Empresa = require('../model/empresaSchema');
const Hashtag = require('../model/hashtagSchema').HashtagModel;
const Category = require('../model/categorySchema').CategoryModel;

exports.empresa_create = async (req, res) => {
    const empresa = req.body;
    const { category, hashtags } = empresa;
    empresa.hashtags = [];
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
    if (hashtags && hashtags > 0) {
        await hashtags.map(async (hashtag, index, arr) => {
            //Checa se já existe uma hastag
            await Hashtag.findOne({ name: hashtag.name }).then(async doc => {
                //Se não existir cria uma hashtag
                if (!doc) {
                    const newHashtag = new Hashtag(hashtag);
                    await newHashtag.save().then((hashtag) => {
                        empresa.hashtags.push(hashtag);
                    });
                }
                //Caso exista uma hashtag adiciona ela na lista
                empresa.hashtags.push(doc);
            }).catch(err => {
                return res.status(400).send({ err });
            });
            //Chegou no último item
            if (arr.length - 1 == index) {
                //Cria empresa
                Empresa.create(empresa).then((err, created_empresa) => {
                    
                    if(err){
                        res.status(400).send(err);
                    }
                    res.status(200).send(created_empresa);
                });
            }
        });
    } else {
        //Cria empresa
        Empresa.create(empresa).then((created_empresa) => {
            res.status(200).send(created_empresa);
        });
    }
}

exports.empresa_update = async (req, res) => {
    const { hashtags, _id } = req.body;
    res.set("Access-Control-Allow-Origin", "*");
    if (hashtags) {
        await hashtags.map(async (hashtag, index, arr) => {
            //Checa se já existe uma hastag
            await Hashtag.findOne({ name: hashtag.name }).then(async doc => {
                //Se não existir cria uma hashtag
                if (!doc) {
                    const newHashtag = new Hashtag(hashtag);
                    await newHashtag.save();
                }
            }).catch(err => {
                res.status(400).send(err);
            });
            //Depois de iterar todas a hashtags
            if (arr.length - 1 == index) {
                //Busca a empresa pelo id
                Empresa.findOneAndUpdate({ _id: _id }, { $set: req.body }).then((doc) => {
                    //Atualiza seu documento com os dados do corpo da requisição
                }).catch(err => {
                    res.status(400).send({ err: "Empresa não encontrada!" });
                });
            }
        });
    } else {
        Empresa.findOneAndUpdate({ _id: _id }, { $set: req.body }).then(doc => {
            res.status(200).send({ doc });
        }).catch(err => {
            
            res.status(400).send({ err: "Empresa não encontrada!" });
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

        Empresa.deleteOne({_id:_id}).then(doc => {
            res.status(200).send({doc})
        });
}