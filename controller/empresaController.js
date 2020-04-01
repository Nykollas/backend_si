const Empresa = require('../model/empresaSchema');
const Hashtag = require('../model/hashtagSchema').HashtagModel;

exports.empresa_create = async (req, res) => {


    const empresa = req.body;
    empresa.hashtags = [];
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
                doc.update(req.body, (err, raw) => {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).send({ raw });
                    }
                });
            }).catch(err => {
                res.status(400).send(err);
            });
        }
    });

}
exports.empresa_list = (req, res) => {

}
exports.empresa_delete = (req, res) => {

}