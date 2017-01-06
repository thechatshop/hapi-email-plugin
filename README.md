Hapi Email plugin
=================

This is a Hapi.js plugin to provide configuration and access to nodemailer.

Current maintainer: Marios Antonoudiou

Installation
------------

```
$ # provide example
```

Configuration
-------------

```javascript
server.register({
	register: require('hapi-email-plugin'),
	options: {
		transporter: nodemailerStub()
	}
}, err => {
	done(err);
});
```

Usage
-----
It currently provides a server method, that can send emails. Keep in mind that the email options are passed to nodemailer created transporter.
```javascript
const emailOptions = {
	from: 'marios@thechatshop.com',
	to: 'info@thechatshop.com',
	subject: 'Test email',
	text: 'Lorem ipsum dorcet sit amet',
	html: '<p>Lorem ipsum dorcet sit amet</p>'
};

server.methods.sendEmail(emailOptions, (err, response) => {
	// Do something
});
```
