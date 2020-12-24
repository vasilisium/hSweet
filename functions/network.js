'use strict';

export const nets = () => Object.values(require('os').networkInterfaces())
    .reduce((r, list) => 
        r.concat(list.reduce((rr, i) => 
            rr.concat(i.family==='IPv4' && !i.internal && i.address || []), []
        )), []
    )