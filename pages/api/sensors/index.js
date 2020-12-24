import { withCors, endpoint } from 'functions/apiCallFunctions';
import * as sensors from 'db/sensors';

export default async (req, res) => {
  await withCors(req, res);

  switch (req.method) {
    case 'GET':
      return endpoint({
        funcToCall: sensors.select,
        responseResultGetter: r => r.rows,
      })(req, res);
    case 'POST':
      return endpoint({
        funcToCall: () => sensors.insert(req.body.name, req.body.description)
      })(req, res);
    default:
      res.status(405).end()
      break;
  }
}