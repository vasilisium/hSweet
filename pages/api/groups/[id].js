import { endpoint } from 'functions/apiCallFunctions';
import { selectOne } from 'db/groups';

export default endpoint({
  funcToCall: selectOne,
  requestQueryGetter: q=>q.id,
  responseResultGetter: r => r.rows,
  isCallWithCors: true
});

