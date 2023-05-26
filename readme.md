# __THE PROJECT: toys_nodejs_project__

## *This is a server side project*

The main purpose of this project is to provide APIs for the client side.
There were no demands for creating:

* client side
* DELETE and PUT routes for users 

### __APIs for toys:__

GET https://toys-nodejs-sv.cyclic.app/toys -> all the toys
GET https://toys-nodejs-sv.cyclic.app/toys/?page=0&perpage=10 -> all toys by default
GET https://toys-nodejs-sv.cyclic.app/toys/?s={word} -> toys with word in name or information
GET https://toys-nodejs-sv.cyclic.app/toys/cat -> distinct categories
GET https://toys-nodejs-sv.cyclic.app/toys/cat/{catname} -> all toys in catname categoty
GET https://toys-nodejs-sv.cyclic.app/toys/prices -> all toys sorted by price in asc
GET https://toys-nodejs-sv.cyclic.app/toys/prices/?min=5&max=2000 all toys sorted by price within [min, max]
GET https://toys-nodejs-sv.cyclic.app/toys/prices/?reverse=ok -> all toys in reverse sort by price
GET https://toys-nodejs-sv.cyclic.app/toys/prices/?&sort={fildname} -> all toys sorted by fildname in asc
POST https://toys-nodejs-sv.cyclic.app/toys -> add toy with requied body accordin to toy model and token
PUT https://toys-nodejs-sv.cyclic.app/toys/{toyId} -> edit the toy with toyId, providing required body and token
DELETE https://toys-nodejs-sv.cyclic.app/toys/{toyId} -> delete the toy with toyId, providing token

### __APIs for users:__

POST https://toys-nodejs-sv.cyclic.app/users/login -> to login with email and password to get token
POST https://toys-nodejs-sv.cyclic.app/users -> to add new user with the required body
GET https://toys-nodejs-sv.cyclic.app/users/userInfo -> get user information, providing user token



* Standard Fronted View of https://toys-nodejs-sv.cyclic.app/toys:
  * ![toys](/iconic.png)
  * Format: ![toys may be shown on: https://toys-nodejs-sv.cyclic.app/toys.html](/toys.html)

### __DETAILED ROUTES for TOYS__

#### *This information is for anyone taking an interest how the project works*

### __Installation__

This project requires [Node.js](https://nodejs.org/) v10+ to run, Postman and mongodb.

* Create database in mongodb and name it hipo5.
* Add 2 collections into hipo5

> Note: the collections may be found in jsons folder

To start the server simply type into the terminal:

```sh
npm install
```

Now you have all the modules in.
Run and Debug

> Note:you can see this information in console log:

```sh
The Server litens to port:3000
mongo connected
```

### __Toys__

### GET

* To see all the toys
  * Send GET requirest via Postman to the:

```sh
https://toys-nodejs-sv.cyclic.app/toys
```

> Note: by defoult it will take you to the:

```sh
https://toys-nodejs-sv.cyclic.app/toys/?page=0&perpage=10
```

* By going to the:

```sh
https://toys-nodejs-sv.cyclic.app/toys/?s=word
```

> Results with this word in name or information will be shown.

> Change page/perpage values however you like to perform results in a prefered range.

* GET all distinct categories:

```sh
https://toys-nodejs-sv.cyclic.app/toys/cat
```

* GET specific category:

```sh
https://toys-nodejs-sv.cyclic.app/toys/cat/catname
```

> Note: catname is one of categories names from https://toys-nodejs-sv.cyclic.app/toys/cat
 
* GET toys by prices:
 
```sh
https://toys-nodejs-sv.cyclic.app/toys/prices/
```

> Note: by default toys are sorted by price from 5 to 2000 in asc:

```sh
https://toys-nodejs-sv.cyclic.app/toys/prices/?min=5&max=2000
```
> Note: min/max values can be changed within [5, 2000], according to desiered result.

* And to reverse the sort direction:

```sh
https://toys-nodejs-sv.cyclic.app/toys/prices/?reverse=ok
```

* To change sort criteria to another fildname:

```sh
https://toys-nodejs-sv.cyclic.app/toys/prices/?&sort=fildname
```

> To make any changes in toys collection there is a need to login via Postman, with the email and password of one of the users get token to use for 1 hour.
> For login see the LogIn section of Users POST

### POST

* To add a new toy:

  * Via Postman only regitered user may post new toy (there is a check of user token and user_id of a new toy before the action).

  * In the headers:
    * add key:
      * x-auth-token
    * value:
      * {token that recived from login of this user}. 
  * In the body:
     * The requied body may be checked in toyModel.js.

  * Send Post requirest via Postman to the:

```sh
https://toys-nodejs-sv.cyclic.app/toys
```

### PUT and DELETE

* Only user, who created the row in toys collection may delete or update it. 
  * In the headers add:
    * key:
      * x-auth-token
    * value:
      * {token that recived from login of this user}.
  * In Postman choose operation:
    * DELETE to remove toy with thisToyId from collection
    * PUT to update it.

```sh
https://toys-nodejs-sv.cyclic.app/toys/thisToyId
```

### __Users__

### POST

* To add a new user:
  * Send POST requirest via Postman to the:

```sh
https://toys-nodejs-sv.cyclic.app/users
```

* To logIn:

  * Send POST requirest via Postman to the:

```sh
https://toys-nodejs-sv.cyclic.app/users/login
```

> Note: for this project only all the passwords are: 123
> Note: the required body for login and adding user may be found in userModel.js

### GET

* To get a specific user information:
  * In the headers:
    * key:
      * x-auth-token
    * value:
      * {token that recived from login of this user}
  * Send GET requirest via Postman to the:

```sh
https://toys-nodejs-sv.cyclic.app/users/userInfo
```

###### Creator: Tcherepanova Svetlana



"# toys" 
