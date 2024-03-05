const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

app.use(express.json());

const Database_conn = 'postgres://webadmin:PFNdha24303@node59447-book-ecom.proen.app.ruk-com.cloud/Books';
const sequelize = new Sequelize(Database_conn);

const Book = sequelize.define('books', {
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
    genre: {
        type: Sequelize.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    theme_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    file_name: {
        type: Sequelize.STRING,
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
const Users = sequelize.define('users', {
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
        type: Sequelize.STRING,
        allowNull: false
    },
    fname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    currentcart: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    level: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
const BTypes = sequelize.define('bTypes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bType_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
const Themes = sequelize.define('themes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    theme_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
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

// app.get('/users', (req, res) => {
//     console.log(req.body)
//     Users.findOne({
//         where: {
//             username: req.body.username,
//             password: req.body.password,
//         }
//     }).then(users => {
//         if (!users) {
//             res.status(404).send('Book not found');
//         }
//         else {
//             res.json(users);
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

app.get('/users', (req, res) => {
    Users.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/users', (req, res) => {
    Users.create(req.body).then(users => {
        res.send(users);
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

app.put('/books/stock/:id', (req, res) => {
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

app.put('/books/stock/:id', (req, res) => {
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