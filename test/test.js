const Code = require('code');   // assertion library
const Lab = require('lab');
const Hapi = require('hapi');
const nodemailerStub = require('nodemailer-stub-transport');

const lab = exports.lab = Lab.script();
let server;

lab.experiment('fabmail', () => {
	lab.before(done => {
		server = new Hapi.Server();
		server.connection({port: 3000});

		server.register({
			register: require('../index'),
			options: {
				transporter: nodemailerStub()
			}
		}, err => {
			done(err);
		});
	});

	lab.test('succesfully registers server method', done => {
		Code.expect(server.methods.sendEmail).to.be.function();

		done();
	});

	lab.test('sends emails', done => {
		const emailOptions = {
			from: 'marios@thechatshop.com',
			to: 'info@thechatshop.com',
			subject: 'Test email',
			text: 'Lorem ipsum dorcet sit amet',
			html: '<p>Lorem ipsum dorcet sit amet</p>'
		};

		server.methods.sendEmail(emailOptions, (err, response) => {
			Code.expect(err).to.be.null();
			Code.expect(response).to.be.object();

			done();
		});
	});
});
