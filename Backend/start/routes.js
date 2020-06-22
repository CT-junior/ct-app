"use strict";

const AddressController = require("../app/Controllers/Http/AddressController");

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

Route.post("/register", "AuthController.register");
Route.post("/authenticate", "AuthController.authenticate");

Route.post("/addresses/:user_id", "AddressController.store");

Route.get("/app", "UserController.index").middleware(["auth"]);
