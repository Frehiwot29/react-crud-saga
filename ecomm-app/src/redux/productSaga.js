import { takeEvery, put, takeLatest, call } from 'redux-saga/effects'
import { PRODUCT_LIST, SEARCH_PRODUCT, SET_PRODUCT_LIST, NAVIGATE_TO_ANNOUNCEMENT } from './constant';

function* getProducts() {
    let result = yield call(fetch, 'http://localhost:3500/products');
    let data = yield result.json();
    console.warn("Products fetched from db.json", data)
    yield put({ type: SET_PRODUCT_LIST, data })
}

function* searchProducts(action) {
    let url = 'http://localhost:3500/products';
    // Construct URL with search query. json-server uses 'q' for global full-text search.
    if (action.query) {
        url = `http://localhost:3500/products?q=${encodeURIComponent(action.query)}`;
    }
    let result = yield call(fetch, url);
    let data = yield result.json();
    console.warn("Search results from db.json", data)
    yield put({ type: SET_PRODUCT_LIST, data })
}

function* navigateToAnnouncementSaga(action) {
    yield console.warn("Saga: Intercepting navigation to announcement page");
    yield call(action.navigate, "/announcement");
}

function* productSaga() {
    yield takeEvery(PRODUCT_LIST, getProducts)
    yield takeLatest(SEARCH_PRODUCT, searchProducts)
    yield takeEvery(NAVIGATE_TO_ANNOUNCEMENT, navigateToAnnouncementSaga)
}
export default productSaga;