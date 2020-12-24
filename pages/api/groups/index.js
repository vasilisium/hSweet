const { withCors, endpoint } = require('functions/apiCallFunctions');
import * as groups from 'db/groups';

export default async (req, res) => {
  await withCors(req, res);

  switch (req.method) {
    case 'GET':
      return endpoint({
        funcToCall: groups.selectAll,
        responseResultGetter: r => r.rows,
      })(req, res);
    case 'POST':
      return endpoint({
        funcToCall: () => groups.insert(req.body.name, req.body.description),
        responseResultGetter: r => r.rows,
      })(req, res);
    default:
      res.status(405).end()
      break;
  }
};

