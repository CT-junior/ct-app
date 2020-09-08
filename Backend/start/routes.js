"use strict";

const AddressController = require("../app/Controllers/Http/AddressController");
const { route, RouteGroup } = require("@adonisjs/framework/src/Route/Manager");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use("Route");

/**Routes for get any information of user needing autentication*/
Route.group(()=>{
    Route.get("","UserController.show"); /** Show an unique user */
    Route.get("MyPosts","UserController.myPosts"); /** Show all posts of an unique user */
    Route.get("address", "UserController.myAddress"); /** Show an address of an unique user */
}).prefix("user").middleware(['auth']);

/** Routes using UserController */
Route.get("/list", "UserController.index").middleware(["auth"]); /** Show all users */
Route.get("/list/addresses", "UserController.list_adrress").middleware(["auth"]); /** Show all users with each address */
Route.get("/:user_id/address", "UserController.address").middleware(["auth"]); /** Show an address of an expecific user */

/** Routes using AuthController */
Route.post("/register", "AuthController.register"); /** Register an user in the back */
Route.post("/authenticate", "AuthController.authenticate"); /** Creat a token to user */

/** Routes using AddressController */
Route.post("/addresses/:user_id", "AddressController.store"); /** Create an address */
Route.get("/addresses", "AddressController.index"); /** Show all addresses */

/** Routes using PostController */
Route.post("/createPost", "PostController.store").middleware(["auth"]); /** Create a post */
Route.post("/editPost/:id", "PostController.update").middleware(["auth"]); /** Edit the content of a already existing post */
Route.get("/posts","PostController.index");  /** Show all posts */
Route.get("/getPost/:id","PostController.show") /**Show a specific post */
Route.delete("/deletePost/:id","PostController.destroy").middleware(["auth"])


/** Other routes */
Route.get("/", ()=> "Olá, terceiro!")
Route.get("/app", "UserController.home").middleware(["auth"]); 