const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// meddle were;
app.use(express.json());
app.use(cors());




// mongoDb operations start;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.g3vskme.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //========================================================================//
        //-------------------------------START------------------------------------//
        //========================================================================//



        
        // Get the database and collection on which to run the operation
        const contactCollection = client.db("portfolio-data").collection("contacts");


        app.get('/contacts', async (req, res) => {
            const result = await contactCollection.find().toArray();
            res.send(result);
        })

        app.post('/contact', async (req, res) => {
            const contactData = req.body;
            const result = await contactCollection.insertOne(contactData);
            res.send(result);
        })






        //========================================================================//
        //-------------------------------START------------------------------------//
        //========================================================================//

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("PING YOUR DEPLOYMENT. YOU SUCCESSFULLY CONNECTED TO MONGODB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






// default server get operations;
app.get("/", (req, res) => {
    res.send("ABDUR RAHIM IS RUNNING..................VUM")
});

app.listen(port, () => {
    console.log(`SYSTEM IS RUNNING ON PORT: ${port}`);
})