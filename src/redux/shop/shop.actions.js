import shopActionTypes from './shop.type'

export const updateCollection = (collectionMap) => ({
    type: shopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionMap
})