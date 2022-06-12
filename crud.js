const axios = require('axios');
const link = 'http://localhost:3000/books/';


const addBooks = async (link, bookInfo) => {
  const { id, name, author } = bookInfo;
  if(!(id && name && author)){
    return { msg: 'Insufficient information.'}
  }
  try {
      const res = await axios.post(link, bookInfo);
      return { status: res.status, statusText: res.statusText, msg: "Book added." };
  } catch (error) {
      return { Error: error.message }
  }
};


const getBooks = async (link, id=null) => {
    try {
        const res = await axios.get(id? link+id : link);
        return { status: res.status, statusText: res.statusText, data: res.data };
    } catch (error) {
        if (error.response.status == 404){
            return { status: 404, msg: `Book number #${id} does not exist.` }
        } else {
            return { Error: error.message }
        }
    }
};
  


const putBook = async (link, bookInfo) =>{
  const { id } = bookInfo;
  if(!(id && bookInfo)){
  return { msg: 'Insufficient information' }
  }
  try {
    const res = await axios.put(link+id, bookInfo);
    return { status: res.status, statusText: res.statusText, msg: `Successfully over writed #${id} book` }
  } catch (error) {
    if (error.response.status == 404){
      return { staus: 404, msg: `Book number #${id} does not exist.` }
    } else {
      return { Error: error.message }
    }
  }
};
  
  
const deleteBooks = async (link, id) =>{
    if(!id){
      return { msg: 'Provide an id for deletion.'}
    }
    try {
        const res = await axios.delete(link+id);
        return { status: res.status, statusText: res.statusText, msg: `Successfully deleted #${id} book` }
    } catch (error) {
        if (error.response.status == 404){
            return { status: 404, msg: `Book number #${id} does not exist.` }
        } else {
            return { Error: error.message }
        }
    }
};


// /// STARTS FROM HERE.......
const main = async () => {
    while (true){
      const userInp = require("readline-sync");
      const user = userInp.questionInt(
        "1.addBooks\n2.getBooks\n3.putBook\n4.deleteBooks\n:)Enter any key to exit:-\nChoose your query:-"
      );
      let res;
      if (user === 1) {
        console.log("Enter your new book data:-");
        const id = userInp.question("Enter your new book id:-");
        const name = userInp.question("Enter your new book name:-");
        const author = userInp.question("Enter your new book author:-");
        const newBookData = { id, name, author }
        res = await addBooks(link, newBookData);
      } else if (user === 2) {
        const bookId = userInp.question("=> allBooksPressEnter\n=> particularBookId\nChoose your bookId:-");
        res = await getBooks(link, bookId);
      } else if (user === 3) {
        console.log("Enter your new book data:-\n");
        const id = userInp.question("Enter your new book data:-\n");
        const name = userInp.question("Enter your new book data:-\n");
        const author = userInp.question("Enter your new book data:-\n");
        const bookData = { id, name, author }
        res = await putBook(link, bookData);
      } else if (user === 4) {
        const bookId = userInp.question("Enter your book id to delete:-\n");
        res = await deleteBooks(link, bookId);
      } else {
        console.log('Thank you!!!!');
        break
      }
      console.log(res);
  };
}
main()