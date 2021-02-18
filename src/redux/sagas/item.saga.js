import { takeEvery, put } from "redux-saga/effects";
import axios from 'axios'

function* fetchAllItems() {
    try {
        const items = yield axios.get('/api/shelf');
        console.log(items);
        console.log('getting items', items.data);
        yield put({ type: 'SET_ITEMS', payload: items.data });
    } catch {
        console.log('get all items error');
    }
}

function* postItem(action) {
    try {
        console.log(action.payload);
        yield axios.post('/api/shelf', action.payload);
        yield put({ type: 'FETCH_ITEMS' })
    } catch {
        console.log('poggers', action.payload)
        console.log('add item error')
    }
}

function* deleteItem(action){
    try{
        //console.log(action.payload);
        yield axios.delete(`/api/shelf/${action.payload}`);
        yield put({type: 'FETCH_ITEMS' });
    }catch(err){
        console.log('delete item error ')
    }
}

function* itemSaga() {
   yield takeEvery('ADD_ITEM', postItem)
   yield takeEvery('FETCH_ITEMS', fetchAllItems)
   yield takeEvery('DELETE_THING', deleteItem)
}
export default itemSaga;