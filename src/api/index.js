import {
    fromPairs,
    head,
    last,
    map,
    over,
    path,
    pipe,
    split
  } from "lodash/fp";
  import { getApiToken } from "./helpers/airtable";
  import { set } from "lodash";
  import axios from "axios";
  
  // Adding a XYZ.js into the namespaces folder will automatically make it available
  
  const ctx = require.context("./namespaces", true, /.+\.js$/, 'sync');
  // Takes a path and returns a module name
  const getModuleName = pipe([split('/'), last, split("."), head]);
  // Passed a path will return the module
  const getModule = pipe([ctx, path('default')])
  // Makes a map of all the namespaces in the api client
  const namespaces = pipe(
    map(over([getModuleName, getModule])),
    fromPairs
  )(ctx.keys());
  
  let instance = axios.create({
    headers: {
      Authorization: `Bearer ${getApiToken()}`,
      "Content-Type": "application/json",
    },
  });
  
  
  export function parseBody(response) {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    }
  }
  
  export function err(error) {
    return Promise.reject(error);
  }
  
  instance.interceptors.response.use(parseBody, err);
  
  
  let mapped = {};
  
  /**
   * Generates an object with this shape
   * { namespace:  { action: (data, config) => axios(requestData) } }
   * Example
   * { users: { create: (data) => axios(), get: id => axios } }
   */
  Object.entries(namespaces).forEach(([name, module]) => {
    Object.entries(module).forEach(([method, endpoints]) => {
      Object.entries(endpoints).forEach(([endpoint, getUrl]) => {
        // e.g. api.users.getAll = () => axios(...)
        set(mapped, [name, endpoint], (data = {}, config = {}) => {
          let body = {
            method,
            url: getUrl(data),
            ...config,
          };
          //Only attach a body when the method allows
          if (["post", "put"].includes(method)) {
            body.data = data;
          }
  
          return instance(body);
        })
      })
    })
  })
  
  
  //This is the apiclient
  export default mapped;
  //This is the axios instance for misc calls
  export { instance };