const UserModel = require('../model/userSchema');


//Controller atualizar usuário
function validPassword(password, actualPassword){
    if(user && password !== actualPassword)
        return false;
    return true;
}

function errorCallback (err)  {
    if(err){
        res.status(400).send({message: 'Erro'});
        return;
    }
}

exports.user_update = function (req, res, next) {
    const userId = req.body.id;
    const newName = req.body.userName;
    const newEmail = req.body.userEmail;
    const actualPassword = req.body.password;
    const newPassword =   req.body.passwordConfirmation;
    const newData = { 
        name: newName,
        password: newPassword,
        email:newEmail
    };
    UserModel.findOne({_id:userId}, async (err, user) => {
        if(err){
            return res.status(400).send({
                message: "Usuário não encontrado"
            });
            return
        }
        if(!validPassword(user.password, actualPassword)){
            return res.status(400).send({
                message:'Senha inválida'
            })
        }
        else if(user && user.updateOne){
            await UserModel.updateOne( { _id: userId }, newData, errorCallback);
            return res.status(200).send("Atualizado com sucesso");
            
        }
    });
}

exports.user_show = function (req, res, next) {
    console.log(req);
    /*
    UserModel.findOne({_id:userId}, async (err, user) => {
        if(err){
            return res.status(400).send({
                message: "Usuário não encontrado"
            });
            return
        }
        return res.status(200).send(user);

    });*/
}
