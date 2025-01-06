const { ObjectId } = require("mongodb");
const mongodb = require("../db/database");

class RootController {
    /* Posts */
    async getAllPosts(req, res){
        try{
            const posts = await mongodb.all_posts.find().sort({createdAt: -1}).toArray();
            res.status(200).send(posts);
        }
        catch(error){
            res.status(500).send({message: "[getAllPosts()] crashed.", error})
        }
    }

    async getPostById(req, res){
        try{
            const { id } = req.params;

            if(!ObjectId.isValid(id)){
                return res.status(400).send("Invalid ID format.")
            }
            const post = await mongodb.all_posts.findOne({_id: new ObjectId(id)});
            if(!post) {
                return res.status(404).send("No post found with the id:" + id)
            }
            res.status(200).send(post);
        }
        catch(error){
            res.status(500).send({message: "[saveUserInfo()] crashed.", error})
        }
    }

    async getPostsByCategory(req, res){
        try{
            const { category } = req.query;
            const posts = await mongodb.all_posts.find({category}).toArray();
            if(posts.length === 0){
                return res.status(404).send("No posts found of category:" + category);
            }
            res.status(200).send(posts);
        }
        catch(error){
            res.status(500).send({message: "[saveUserInfo()] crashed.", error})
        }
    }

    async createPost(req, res){
        try{
            const post = req.body;
            const result = await mongodb.all_posts.insertOne(post);
            res.status(201).send(result.insertedId);
        }
        catch(error){
            res.status(500).send({message: "[saveUserInfo()] crashed.", error})
        }
    }

    async updatePost(req, res){
        try {
            const { id } = req.params;
            const payload = req.body;

            await mongodb.all_posts.updateOne({_id: new ObjectId(id)}, payload);
            res.status(200).send({message: "Successfully updated."});
        } 
        catch (error) {
            res.status(500).send({message: "[saveUserInfo()] crashed.", error})
        }
    }

    async deletePost(req, res){
        try {
            const { id } = req.params;
            const count = await mongodb.all_posts.deleteOne({_id: new ObjectId(id)});
            if(count.deletedCount === 0){
                return res.status(404).send("Post not found! id:" + id);
            }
            res.status(200).send("Successfuly deleted the post. id:" + id);
        }
        catch (error) {
            res.status(500).send({message: "[saveUserInfo()] crashed.", error})
        }
    }

    /* Users */
    async getAllUsers(req, res){
        try {
            const user = await mongodb.all_users.find().sort({createdAt: -1}).toArray();
            res.status(200).send(user); 
        } catch (error) {
            res.status(500).send({message: "[getAllUsers()] crashed.", error})
        }
    }

    async saveUserInfo(req, res){
        try {
            const user = req.body;
            const id = await mongodb.all_users.insertOne(user);
            res.status(201).send({message: "User saved!", id})
        }
        catch(error){
            res.status(500).send({message: "[saveUserInfo()] crashed.", error})
        }
    }
}

const rootController = new RootController();

module.exports = rootController;