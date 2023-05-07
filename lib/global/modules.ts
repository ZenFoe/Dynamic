import mime from './pkg/mime';
import * as path from 'path-browserify';
import * as idb from 'idb';
import * as base64 from 'base-64';
import * as querystring from 'querystring';
import { parse as P5parse, serialize as P5serialize } from 'parse5';
import { parse as jsParse } from 'meriyah';
import { generate as ESgenerate } from 'escodegen';
import bare from '@tomphttp/bare-client';
import * as url from 'url';
import walkParse5 from './pkg/walk-parse5';
import * as cssTree from 'css-tree';
import * as cookie from 'cookie';
import * as astring from 'astring'
import * as setCookieParser from 'set-cookie-parser';

class DynamicModules {
  mime = mime;
  idb = idb;
  path = path;
  cssTree = cssTree;
  walkParse5 = walkParse5;
  querystring = querystring;
  url = url;
  meriyah = { parse: jsParse };
  escodegen = { generate: ESgenerate };
  parse5 = { parse: P5parse, serialize: P5serialize };
  bare = bare;
  base64 = base64;
  cookie = {...cookie, serialize: (...args: any) => { try {return cookie.serialize.apply({}, args)} catch(e) {console.log(e);}}};
  setCookieParser = setCookieParser;
  astring = {...astring, generate: (...args: any) => {return (astring.generate.apply({}, args) as string | any).replace(`return (a = (p = (R = (q = ["origin", (g = L.dv, "recaptcha-setup"), "ports"], g.data) == q[1], w)[39](8, T, g[q[0]]) == w[39](33, T, O), !Y) || g.source == Y.contentWindow, R && p && a && __dynamic$get(g[q[2]]).length > B ? __dynamic$get(g[q[2]])[B] : null);`, `return (a = (p = (R = (q = ["origin", (g = L.dv, "recaptcha-setup"), "ports"], g.data) == q[1], w)[39](8, T, g[q[0]]) == w[39](8, T, g[q[0]]), !Y) || g.source == Y.contentWindow, R && p && a && __dynamic$get(g[q[2]]).length > B ? __dynamic$get(g[q[2]])[B] : null);`)}};

  ctx;

  constructor(ctx:any) {
    this.ctx = ctx;
  }
}

export default DynamicModules;