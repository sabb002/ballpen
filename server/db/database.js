const { MongoClient } = require("mongodb");

class MongoDB {
    constructor() {
        this.client = null;
        this.db_blog = null;
        this.all_posts = null;
        this.all_users = null;
    }

    async connect() {
        try {
            if (this.client) return;            
            this.client = new MongoClient(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@clusterm0.d0oc9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterM0`);
        
            await this.client.connect();
            this.db_blog = this.client.db('Blog');
            this.all_posts = this.db_blog.collection('posts');
            this.all_users = this.db_blog.collection('users');

            console.log("🍃Connected to mongo.");
        }
        catch (err) {
            console.log("❌Failed to establish connection!\n", err)
        }
    }

    async disconnect(){
        try{
            if(!this.client) return;
            await this.client.close();
            this.client = null;
            this.db_blog = null;
            this.all_posts = null;
            this.all_users = null;
            console.log("🍃Connection Closed.");
        }
        catch(err){
            console.log("❌Failed to disconnect!\n", err);
            
        }
    }
}

const mongodb = new MongoDB();

process.on('SIGINT', async ()=>{
    await mongodb.disconnect();
    process.exit(0);
})

// process.on('SIGTERM', async ()=>{
//     await mongodb.disconnect();
//     process.exit(0);
// })

module.exports = mongodb;