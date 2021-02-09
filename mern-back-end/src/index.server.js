const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

// Routes
const authRoutes = require('./routes/auth')
const adminauthRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart');
const pageRoutes = require('./routes/admin/page');
const initialDataRoutes = require('./routes/admin/initialData');


const { static } = require('express');


// environment variable or you can say constants
env.config()

// mongoDB Connection
// mongodb+srv://root:<password>@cluster0.jdiwp.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.jdiwp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected')
})


app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use('/api', authRoutes)
app.use('/api', adminauthRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', pageRoutes)
app.use('/api', initialDataRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})