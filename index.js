const express = require('express');
const { types } = require('pg');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

app.use(express.json());

// const Database_conn = 'postgres://webadmin:PFNdha24303@node59447-book-ecom.proen.app.ruk-com.cloud:11931/Books';
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
const Order_headers = sequelize.define('order_headers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
const Order_lines = sequelize.define('order_lines',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    book_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalOP: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalOP: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

sequelize.sync();

app.get('/books', (req, res) => {
    Book.findAll({
        order: [['id', 'ASC']] // 'ASC' for ascending order, 'DESC' for descending order
      }).then(books => {
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

app.get('/books/type/:id', (req, res) => {
    Book.findAll({
        where: {
            type_id: req.params.id
        },
        order: [['id', 'ASC']]
    }).then(book => {
        if (!book) {
            res.status(404).send('Data not found');
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

app.get('/bTypes', (req, res) => {
    BTypes.findAll({
        order: [['id', 'ASC']] // 'ASC' for ascending order, 'DESC' for descending order
      }).then(btype => {
        res.json(btype);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/bTypes/:id', (req, res) => {
    BTypes.findAll({
        where: {
            id: req.params.id
        }
      }).then(btype => {
        res.json(btype);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/themes/:id', (req, res) => {
    Themes.findAll({
        where: {
            id: req.params.id
        }
      }).then(btype => {
        res.json(btype);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/bTypes', (req, res) => {
    BTypes.create(req.body).then(type => {
        res.send(type);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/bT_update/:id', (req, res) => {
    BTypes.findByPk(req.params.id).then(type => {
        if (!type) {
            res.status(404).send('Book not found');
        }
        else {
            type.update(req.body).then(() => {
                res.send(type);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/bTypes/:id', (req, res) => {
    console.log(req.params.id)
    BTypes.findByPk(req.params.id).then(bType => {
        if (!bType) {
            res.status(404).send('Book not found');
        }
        else {
            bType.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/themes', (req, res) => {
    Themes.findAll({
        order: [['id', 'ASC']] // 'ASC' for ascending order, 'DESC' for descending order
      }).then(btype => {
        res.json(btype);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/themes', (req, res) => {
    Themes.create(req.body).then(type => {
        res.send(type);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/t_update/:id', (req, res) => {
    Themes.findByPk(req.params.id).then(type => {
        if (!type) {
            res.status(404).send('Book not found');
        }
        else {
            type.update(req.body).then(() => {
                res.send(type);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/themes/:id', (req, res) => {
    console.log(req.params.id)
    Themes.findByPk(req.params.id).then(bType => {
        if (!bType) {
            res.status(404).send('Book not found');
        }
        else {
            bType.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
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

app.get('/users/:id', (req, res) => {
    Users.findByPk(req.params.id).then(users => {
        if (!users) {
            res.status(404).send('User not found');
        }
        else {
            res.json(users);
        }
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

app.get('/orderheader', (req, res) => {
    Order_headers.findAll().then(order => {
        if (!order) {
            res.status(404).send('Data not found');
        }
        else {
            res.json(order);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/orderheader/:id', (req, res) => {
    Order_headers.findAll({
        where: {
            user_id: req.params.id
        }
    }).then(order => {
        if (!order) {
            res.status(404).send('Data not found');
        }
        else {
            res.json(order);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/orderline/:id', (req, res) => {
    Order_lines.findAll({
        where: {
            order_id: req.params.id
        }
    }).then(order => {
        if (!order) {
            res.status(404).send('Book not found');
        }
        else {
            res.json(order);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/order/:id', async (req, res) => {
    try {
        const orderLines = await Order_lines.findAll({
            where: {
                order_id: req.params.id
            }
        });

        if (!orderLines || orderLines.length === 0) {
            return res.status(404).send('No order lines found for the given order ID');
        }

        const result = await Promise.all(orderLines.map(async (orderLine) => {
            const book = await Book.findByPk(orderLine.book_id);
            return book;
        }));

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/placeOrder', (req, res) => {
    console.log("Got data")
    Order_headers.create(req.body).then(order_headers => {
        console.log("initiated")
        res.send(order_headers);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/placeOrderLine', (req, res) => {
    Order_lines.create(req.body).then(order => {
        res.send(order);
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

app.put('/users/:id', (req, res) => {
    Users.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Users not found');
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