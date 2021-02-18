import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function ShelfPage() {


  const dispatch = useDispatch();
  const books = useSelector(store => store.books);
  console.log(books);
  let [newItem, setNewItem] = useState({
    description: '',
    image_url: '',
  })

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEMS' });  //  or books, whatever
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    dispatch({ type: 'ADD_ITEM', payload: newItem })
    setNewItem({
      description: '',
      image_url: '',
    })
  }


  // const deleter = (event) => {
  //   dispatch({ type: 'DELETE_THING', payload: event.target })
  // }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit={handleSubmit}>
        <input required onChange={(event) => setNewItem({ ...newItem, image_url: event.target.value })} value={newItem.image_url} placeholder='image' />
        <input required onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} value={newItem.description} placeholder='Description' />
        <button type='submit'>Submit</button>
      </form>
      {books.map(book => {
        return (
          <div key={book.id} >
            <img src={book.image_url} />
            <h5>{book.description}</h5>
            <button onClick={() => dispatch({ type: 'DELETE_THING', payload: book.id })}>Delete Item</button>
          </div>
        );
      })}
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
