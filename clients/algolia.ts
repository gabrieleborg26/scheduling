import algoliasearch from "algoliasearch/lite";
const assert = require("assert");

let searchClient: any = null;

export function initSearchClient() {
    return new Promise(async (resolve, reject) => {
        try {
            searchClient = algoliasearch(
                process.env.NEXT_PUBLIC_APP_ALGOLIA_APP_ID!,
                process.env.NEXT_PUBLIC_APP_ALGOLIA_ADMIN_KEY!
            )
            console.log(`Algolia client : ${process.env.NEXT_PUBLIC_APP_ALGOLIA_APP_ID} connected.`)
            resolve(searchClient);
        } catch (e) {
            reject(e);
        }
    });
}

export function getSearchClient() {
    if (!searchClient || searchClient == null) {
        initSearchClient().then(() => {
            assert.ok(
                searchClient,
                "Algolia Client has not been initialized. Please called init first."
            );
        });
    }
    return searchClient;
}