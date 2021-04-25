"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListPlaybackKeyPairs = void 0;
const Ivs_1 = require("../Ivs");
const IvsClient_1 = require("../IvsClient");
const ListPlaybackKeyPairsCommand_1 = require("../commands/ListPlaybackKeyPairsCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListPlaybackKeyPairsCommand_1.ListPlaybackKeyPairsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listPlaybackKeyPairs(input, ...args);
};
async function* paginateListPlaybackKeyPairs(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.nextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.nextToken = token;
        input["maxResults"] = config.pageSize;
        if (config.client instanceof Ivs_1.Ivs) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof IvsClient_1.IvsClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected Ivs | IvsClient");
        }
        yield page;
        token = page.nextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateListPlaybackKeyPairs = paginateListPlaybackKeyPairs;
//# sourceMappingURL=ListPlaybackKeyPairsPaginator.js.map