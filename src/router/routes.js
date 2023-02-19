import { pipe, over, initial, last, map, split, capitalize, fromPairs, wrap, } from "lodash/fp";

const ctx = require.context("../components/pages/", true, /index.vue$/, 'lazy');
// Takes a path and returns a capitalized module name
const getModuleName = pipe([split("/"), initial, last, capitalize]);
// Passed a path will return a fn that returns the module
const getModuleFn = wrap(ctx)
// Makes a map of all the pages in the application
const pages = pipe(
    map(over([getModuleName, getModuleFn])),
    fromPairs
)(ctx.keys());

const routes = [
    {
        path: '/', redirect: { name: 'people' },
    },
    {
        path: '/people',
        name: 'people',
        component: pages.People
    },
    {
        path: '/profiles/:id',
        name: 'profile',
        component: pages.Person
    },
]

export default routes;