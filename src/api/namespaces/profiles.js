
import { merge } from "lodash";
import { always, concat, flip, pipe, join } from "lodash/fp";
import { generateEndpoints, getId } from "../helpers";
import { getApiToken } from "../helpers/airtable";
const namespace = "profiles";

const appendTo = flip(concat);
const nameSpace = merge({}, generateEndpoints(namespace), {
    get: {
        get: pipe([
            getId({ identifierKey: 'id' }),
            appendTo(['https://api.airtable.com/v0/app7cLoZ4xMOrQvKR/People']),
            join('/')
        ]),
        getAll: always([`https://api.airtable.com/v0/app7cLoZ4xMOrQvKR/tblWcsEyTOIf47ZuQ?api_key=${getApiToken()}`]),
    },
    post: {
        sendFriendRequest: always('https://api.airtable.com/v0/app7cLoZ4xMOrQvKR/Friend%20request')
    }
})

export default nameSpace;