"use strict";

const AddressController = require("../app/Controllers/Http/AddressController");
const { route } = require("@adonisjs/framework/src/Route/Manager");

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

Route.get("/list", "UserController.show");

Route.post("/register", "AuthController.register");
Route.post("/authenticate", "AuthController.authenticate");
Route.post("/:user_id/refresh", "AuthController.authenticate_refresh").middleware(["auth"]);

Route.post("/:user_id/logout", "UserController.revokeUserToken").middleware(["auth"]);
Route.post("/addresses/:user_id", "AddressController.store");

Route.get("/app", "UserController.index").middleware(["auth"]);
