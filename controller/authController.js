
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const User = require('../model/userSchema');    

function generateToken(params = {}){
	return jwt.sign(params, authConfig.secret,{
		expiresIn:86400
	});
}

exports.user_create = async (req, res) => {	
	const { email } = req.body;
	try{
		if(await User.findOne({email}))
            return res.status(400).send({error:'Usuário já existe'});
        var hash = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hash;
		const  user = await  User.create(req.body);	
		return res.send({
			user,
			token:generateToken({id:user.id})
		})
		
	}catch(err){
		return res.status(400).send({error:err});
	}
}


 exports.login = async (req, res) => {
	const { email, password  }  = req.body;
	try{
		let passwd = password;
		const user =  await User.findOne({ email }).select('+password');
		if(!user)
			return res.status(401).send({error:'Não encontrado!'});
		if(!passwd)
			passwd = "";
		if(!await bcrypt.compareSync(passwd, user.password))
			return  res.status(401).send({error:'Senha inválida'});
		user.password = undefined;
		res.status(200).send({
			user, 
			token:generateToken({id:user.id})
		})
	}catch(err){
		return res.status(401).send({error: 'Não foi possível autenticar'});
	}
}


exports.forgot_password = ("/forgot_password", async (req, res) => {
	const { email }  = req.body;
	try {
		const user  = await User.findOne({email});
		if(!user)
			return res.status(200).send({error:'Email não encontrado'});
		const token = crypto.randomBytes(20).toString('hex');
		const now = new Date();
		now.setHours(now.getHours() + 1);
		await User.findByIdAndUpdate(user.id,{
			'$set':{
				passwordResetToken:token,
				passwordResetExpires:now,
			}
		});
		mailer.sendMail({
			to:email,
			from:'nicolauarti11@gmail.com',
			template:'forgot_password',
			context:{token},
		}, (err) => {
			if(err) 
				return res.status(401).send({error:'Não foi possível recuperar a senha, tente novamente'})
			return  res.send({text:"OK"});
		});
	}catch(err){
		
		res.status(401).send({error:'Não foi possível recuperar a senha, tente novamente'});
	}
});

exports.reset_password =  async (req, res) => {
	const { email, token, password } = req.body;
	try {
		const user  = User.findOne({ email })
						  .select('+passwordResetToken passwordResetExpires');
		user.then( async user =>{
			if(!user) 
				return res.status(400).send({error:'Usuário não encontrado'});
			if(token !== user.passwordResetToken)
				return res.status(400).send({error:'Token inválido!'});
			const now = new Date();
			if(now > user.passwordResetExpires)
				return res.status(400).send({error:'Token expirado gere um novo!'});
			user.password = password;
			await user.save();
			res.status(200).send({text:'ok'});
		});
	}catch(error){
		return res.status(400).send({error: 'Não foi possível redefinir a senha, tente novamente!'});
	}
}
