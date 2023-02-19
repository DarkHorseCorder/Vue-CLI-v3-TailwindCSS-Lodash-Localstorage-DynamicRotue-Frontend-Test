import {
    always,
    concat,
    cond,
    flip,
    identity,
    isPlainObject,
    join,
    path,
    pipe,
    stubTrue,
  } from "lodash/fp";
  
  const appendTo = flip(concat);
  
  const _getId = ({ identifierKey }) =>
    cond([
      [isPlainObject, path([identifierKey])],
      [stubTrue, identity],
    ]);
  
  /**
   * For a passed endpoint generate a map that follows:
   * namespace >> method >> url
   */
  
  const generateEndpoints = (namespace, { identifierKey = "id" } = {}) => {
    const getId = _getId({ identifierKey });
    return {
      get: {
        get: pipe([getId, appendTo([namespace]), join("/")]),
        getAll: always(`${namespace}/`),
      },
      post: {
        create: always(`${namespace}/`),
        search: always(`${namespace}/search`),
      },
      put: {
        update: pipe([path([identifierKey]), appendTo([namespace]), join("/")]),
      },
      delete: {
        delete: pipe([getId, appendTo([namespace]), join("/")]),
      },
    };
  };
  
  export { _getId as getId, generateEndpoints };
  