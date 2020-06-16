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
    
    res.set("Access-Control-Allow-Origin", "*");

    const userId = req.body.userId;
    const newName = req.body.userName;
    const newEmail = req.body.userEmail;
    const actualPassword = req.body.actualPassword;
    const newPassword =   req.body.newPassword;
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
            
        }
        console.log(userId, user);
        if(!validPassword(user.password, actualPassword)){
            return res.status(400).send({
                message:'Senha inválida'
            })
        }
        else if(user && user.updateOne){
            await UserModel.updateOne( { _id: userId }, newData, errorCallback);
            return res.status(200).send({message:"Atualizado com sucesso"});
            
        }else{
            return res.status(400).send({
                message:'Erro'
            })
        }
    });
}

exports.user_show = function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    let userId = req.query.id;
    UserModel.findOne({_id:userId}, async (err, user) => {
        if(err){
            return res.status(400).send({
                message: "Usuário não encontrado"
            });
            return
        }
        const { _id, email } = user;
        return res.status(200).send({_id, email});

    });
}
