const Empresa = require('../model/empresaSchema');
const Hashtag = require('../model/hashtagSchema').HashtagModel;
const Category = require('../model/categorySchema').CategoryModel;

exports.empresa_create = async (req, res) => {
    const empresa = req.body;
    const { category, hashtags} = empresa;
    empresa.hashtags = [];


    //Cria categoria
    Category.findOne({
        category
    }).then(async (doc) => {
        if(!doc){
            Category.create({category});
            return;
        }
    });

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
            Empresa.create(empresa).then((created_empresa) => {
                res.status(200).send(created_empresa);
            });
        }
    });
}

exports.empresa_update = async (req, res) => {
    const { hashtags, id } = req.body
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
            Empresa.findOne({ _id: id }).then((doc) => {
                //Atualiza seu documento com os dados do corpo da requisição
                doc.update(req.body);
            }).catch(err => {
                res.status(400).send({err:"Empresa não encontrada!"});
            });
        }
    });

}
exports.empresa_list = (req, res) => {
        Empresa.find({}).then(empresas => {
            
            return res.status(200).send({
                empresas
            }).catch(err => {
                return res.status(200).send({err});
            })
        })
}
exports.empresa_delete = (req, res) => {

}