import {
    camelCase,
    cloneDeep,
    curry,
    head,
    identity,
    isNil,
    map,
    mapKeys,
    mapValues,
    merge,
    over,
    path,
    pick,
    pipe,
    reduce,
    truncate,
} from "lodash/fp";
import {
    get as getFromStorage,
    set as saveToStorage,
} from "../../utils/storage";
import api from "../../api";
import { getId } from "../../api/helpers";

const model = {
    bio: null,
    id: null,
    isRequestable: null,
    linkedinUrl: null,
    name: null,
    profileImage: null,
    quote: null,
    role: null,
    twitterUrl: null,
};

const getModel = () => cloneDeep(model);

const setValues = curry((from, to) =>
    Object.entries(from).forEach(([key, value]) => {
        to[key] = value;
    })
);

const resetValues = setValues(model);

/**
 * Flattens the object returned from an api request so we don't have to think about nesting,
 * and get the profile pic to top level.
 * Specifics of each requests are not handled here.
 */
const flatten = (user) => ({
    ...user.fields,
    id: user.id,
    "Profile image": head(user.fields["Profile image"]).url,
});

/**
 * Returns an array of records that are flattened,
 * keys are mapped in camelCase for quality.
 * Get them once and then get them from localstorage
 */
const getAll = async () => {
    let profiles = getFromStorage(["profiles", "all"]);
    if (!profiles) {
        profiles = await api.profiles
            .getAll()
            // Unnest response
            .then(path(["records"]))
            .then(
                map(
                    pipe([
                        flatten,
                        // Truncate bio key (there's no R.evolve in lodash fp)
                        over([
                            identity,
                            pipe([
                                pick(["Bio"]),
                                mapValues(truncate({ length: 140, separator: /\./ })),
                            ]),
                        ]),
                        reduce(merge, {}),
                        mapKeys(camelCase),
                    ])
                )
            )
            .then(saveToStorage(["profiles", "all"]));
    }
    return profiles
};

/**
 * Get the details of a single user, flattened,
 * with keys mapped to camelCase for quality.
 * Retrieve once and then retrieve from localstorage
 */
const get = async (profile) => {
    const id = getId({ identifierKey: "id" })(profile);
    let data = getFromStorage(["profiles", `${id}`]);
    if (isNil(data)) {
        console.log("not saved data")
        data = await api.profiles
            .get(profile)
            .then(pipe([flatten, mapKeys(camelCase)]))
            .then(saveToStorage(["profiles", `${id}`]));
    }

    return data
};

const sendFriendRequest = async (fromName, toId) => {
    const data = {
        records: [
            {
                fields: {
                    From: fromName,
                    To: [toId],
                },
            },
        ],
    };
    const friendRequest = await api.profiles.sendFriendRequest(data)
    console.log(">>>>>", friendRequest)
    return api.profiles.sendFriendRequest(data)
};

export default {
    ...api.profiles,
    getModel,
    setValues,
    resetValues,
    getAll,
    get,
    sendFriendRequest,
};