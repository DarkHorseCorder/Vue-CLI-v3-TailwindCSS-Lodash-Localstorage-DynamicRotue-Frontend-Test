import { last, split, head, pipe, path, map, over, fromPairs } from "lodash/fp";

/**
 * Services provide shared logic on top of plain api reqs, 
 * or ops related to a specific entity, 
 * making a store possibly optional.
 * 
 * Adding a XYZ.js into the namespaces folder will automatically make it available
 */


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


export default namespaces;