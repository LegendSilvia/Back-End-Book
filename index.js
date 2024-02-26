const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const Database_conn = 'postgres://webadmin:PFNdha24303@node59447-book-ecom.proen.app.ruk-com.cloud/Books';
const sequelize = new Sequelize(Database_conn);

const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    theme_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});
const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fname: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lname: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    address: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

sequelize.sync();

app.get('/books', (req, res) => {
    Book.findAll().then(books => {
        res.json(books);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        }
        else {
            res.json(book);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/books', (req, res) => {
    Book.create(req.body).then(book => {
        res.send(book);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        }
        else {
            book.update(req.body).then(() => {
                res.send(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found');
        }
        else {
            book.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
}); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));