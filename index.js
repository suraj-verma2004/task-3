const express=require('express');
const app=express();
const PORT = 3000;

app.use(express.json())


// memory database
let books=[{id:'1',title:'Trust',author:'Hernsn Diaz'},
    {id:'2',title:'Harry Potter',author:'J.K. Rowling'},
{id:'3',title:'Toad and Diamonds', author:'Hesther  Tomlinson'}];

function generateUniqueID(){
    return Date.now().toString();
}
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Book API! Use /books to access the book data. You can also use Postman for other operations (POST, PUT, DELETE).');
   
});

// GET for all Books 

app.get('/books',(req,res)=>{
    res.json(books);
});

// Get book single using ID 
app.get('/books/:id',(req,res)=>{
    const{id}=req.params;
    const book = books.find(b=>b.id===id);
    if(book){
        res.json(book);
    }
    else{
        res.status(404).json({message:'Book not found'});
    }
});

// to add new books 

app.post('/books',(req,res)=>{
    // if user not inserted values 
    const {title,author}=req.body;
    if(!title || !author){
        return res.status(400).json({message:'Title and author are required'});
    }

    // creted new 
    const newBook ={
        id:generateUniqueID(),title,author};
    books.push(newBook);
    res.status(201).json(newBook);
});

// to update data and correct the book data 
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex !== -1) {
        if (!title || !author) {
            return res.status(400).json({ message: 'Title and author are required for update' });
        }
        books[bookIndex] = { ...books[bookIndex], title, author };
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});


// delete request for json data . 
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = books.length;
    books = books.filter(b => b.id !== id);

    if (books.length < initialLength) {
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});