const nodemailer = require('nodemailer');
const joi = require('joi');

const optionsSchema = joi.object().keys({
	transporter: joi.any().required().empty('')
});

const register = (server, options, next) => {
	joi.validate(options, optionsSchema, (err, value) => {
		if (err) {
			throw err;
		}

		options = value;
	});

	const transporter = nodemailer.createTransport(options.transporter);

	server.method({
		name: 'sendEmail',
		method: function (emailOptions, next) {
			transporter.sendMail(emailOptions)
				.then(response => {
					return next(null, response);
				})
				.catch(err => {
					return next(err);
				});
		}
	});

	next();
};

register.attributes = {
	pkg: require('./package.json')
};
module.exports = register;
