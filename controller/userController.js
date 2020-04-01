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
    const newName = req.body.name;
    const newEmail = req.body.email;
    const actualPassword = req.body.actualPassword;
    const newPassword =   req.body.newPassword;
    const newData = { 
        name: newName,
        password: newPassword,
        email:newEmail
    };
    UserModel.findOne({_id:userId}, async (err, user) => {
        if(err){
            res.status(400).send({
                message: "Usuário não encontrado"
            });
            return
        }
        if(!validPassword(user.password, actualPassword)){
            res.status(400).send({
                message:'Senha inválida'
            })
        }
        else if(user && user.updateOne){
            await UserModel.updateOne( { _id: userId }, newData, errorCallback);
            res.status(200).send("Atualizado com sucesso");
            return;
        }
    });
}
