const { setup } = require('./database');
setup('./test.db').catch(console.error);
