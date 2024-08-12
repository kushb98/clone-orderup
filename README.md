# Order Up Backend

Backend to expose API for Order Up!

---

## Requirements

For development, you will only need Node.js and a node global package, installed in your environment.

## Install

    $ git clone https://github.com/MEDkids/order_up_backend
    $ cd order_up_backend
    $ npm install

## Configure app

Create a `.env` file and create the following variables; Request from Lamodot

```
DB_URL=""
PORT=
JWT_EXPIRES_IN =
JWT_SECRET =

```

## Running the project

    $ npm run dev

## Folder Structure

```
project
│   index.ts (start here)
|
└───models (schemas and type interfaces)
│
└───routes (API routes)
│
└───controllers (API logics)


```

## REST API

See status codes here >> [url]

### Auth

We are handling `user` authentication and `admin` authentication differently.
This handles all the authentication and authorazation features

#### Admin/Manager Login Auth

Handle admin/Manager Login functionality

endpoint: `/api/v1/auth/orderup/login`

Authentication: `NO`

Authorization: `NO`

method: `POST`

body:

```js
{

  "username": [string, required],
  "password": [string, required],

}

```

response:

```js
{
  "success": boolean,
  "message":string,
  adminAccout: {
    "_id":string,
    "username": string,
    "roles"string ,
    "email": string,
    "password":string,
    "firstname": string,
    "lastname": string,
    "refreshToken": string,
    "createdAt": timestamp
    "updatedAt": timestamp,
    "lastLogin":timestamp
  }

  "access_token": string
}

```

status: `200 OK`

#### Admin/Manager Logout Auth

terminate loggein session

endpoint: `/api/v1/auth/orderup/logout`

Authentication: `NO`

Authorization: `NO`

method: `POST`

body:

```js
{

 "username": string,

}

```

response:

```js

{
  "success": true,
  "message": "Admin loggedout successfully"
}

```

status: `200 OK`

#### Admin/Manager forgot Password Auth

Allows admin/Manager to request for a link for to reset new password

endpoint: `/api/v1/auth/orderup/forgot-password`

Authentication: `NO`

Authorization: `NO`

method: `POST`

body:

```js
{

 "email": string,

}

```

response:

```js

{
  "success": boolean,
  "message": string
}

```

status: `200 OK`

#### Admin/Manager reset Password Auth

Allows admin to request new password

endpoint: `/api/v1/auth/orderup/reset-password`

Authentication: `NO`

Authorization: `NO`

method: `POST`

body:

```js
{

 "password": string,
 "confirmPassword": string,

}

```

response:

```js

{
  "success": boolean,
  "message":string,
  adminAccout: {
    "_id":string,
    "username": string,
    "role": string,
    "email": string,
    "password":string,
    "firstname": string,
    "lastname": string,
    "refreshToken": string,
    "createdAt": timestamp
    "updatedAt": timestamp,
    "lastLogin":timestamp
  }

  "access_token": string
}

```

status: `200 OK`

#### Admin/Manager Refresh Access Token Auth

This endpoint handles functions responsible for sending new access tokens to admin when access tokens have expired.

endpoint: `/api/v1/auth/orderup/login/refresh-token`

Authentication: `NO`

Authorization: `NO`

method: `POST`

body:

```js
 {
  "email": string
 }

```

response:

```js
 {
  "success": boolean,
  "message": string
 }

```

status: `200 OK`

#### Admin/Manager Register Auth

Add new administrator, send new admin an email about their account.

endpoint: `/api/v1/auth/orderup-owner/add-tm-new`

Authentication: `YES`

Authorization: `YES`

Authorized role `admin`

Role: ["admin" , "manager"]

method: `POST`

body:

```js
{

  "firstname": string,
  "lastname": string,
  "email": string,
  "username": string,
  "role":string,
  "password": string,

}

```

response:

```js
 {

  "success": boolean,
  "message": string,
  adminUser:{
    "_id": string,
    "email": string
  }
 }



```

status: `201 OK`

#### Edit Admin/Manager

Allows Amdin/Manager update their account

endpoint: `/api/v1/auth/orderup/id`

Method: `PATCH`

Authentication: `YES`

Authorization: `YES`

Authorized role: `admin`

body :

```js
{
  "firstname": string,
  "lastname": string,
  "email": string,
  "username": string,
  "role":string,
}

```

response:

```js
{
  "success": boolean,
  "message":string,
  adminAccout: {
    "_id":string,
    "username": string,
    "role": string,
    "email": string,
    "password":string,
    "firstname": string,
    "lastname": string,
    "refreshToken": string,
    "createdAt": timestamp
    "updatedAt": timestamp,
    "lastLogin":timestamp
  }

  "access_token": string
}

```

status: `200 OK`

#### Change password Admin/Manager

Allows admin/manager to chnange password

endpoint: `/api/v1/auth/orderup/change-password`

Authentication: `YES`

Authorization: `YES`

method: `PATCH`

body:

```js
{

 "password": string,
 "confirmPassword": string,

}

```

response:

```js

{
  "success": boolean,
  "message":string,
  adminAccout: {
    "_id":string,
    "username": string,
    "role": string,
    "email": string,
    "password":string,
    "firstname": string,
    "lastname": string,
    "refreshToken": string,
    "createdAt": timestamp
    "updatedAt": timestamp,
    "lastLogin":timestamp
  }

  "access_token": string
}

```

status: `201 OK`

#### DELETE Admin/Manager

Allows admin to deleted managers

endpoint: `/api/v1/auth/orderup/id`

Method: `DELETE`

Authentication: `YES`

Authorization: `YES`

Authorized role: `admin`

body:

```js
{
}
```

response:

```js
{
  "status": boolean,
  "message:" string
}
```

status: `200 OK`

## RECIPES

### Add new recipe

endpoint: `/api/v1/recipes/new-recipe`

method: `POST`

Authentication: `YES`

Authorization: `YES`

Authorized role: `admin`, `manager`

body :

```js
{
  "recipe-name:" string,
  "meal-title-image": string,
  "ingredients": [{"name": string, qty: number}, ]
  "cooking-instruction": string
}

```

response:

```js
{
  status: boolean,
  message: string,
  reciep:{
    "_id": string,
    "recipe-name:" string,
    "meal-title-image": string,
    "ingredients": [{"name": string, qty: string}, ],
    "ingrident": string, //id must match ingredient in the ingredient collection
    "cooking-instruction": string,
    "createdbBy": string, // id
    "createdAt": timestamp
    "updatedAt": timestamp,
  }
}


```

status: `200 OK`

### Get list of recipeType, recipes and allergies

#### Todo : Document others routes

`GET /recipes/`

#### Response

```

{
"success": true,
"result": {
"recipeTypeList": [
{
"_id": "65d62f1af8ad42be4b014845",
"name": "Breakfast"
},
{
"_id": "65d62f1af8ad42be4b014846",
"name": "Lunch"
},
{
"_id": "65d62f1af8ad42be4b014847",
"name": "Dinner"
},
{
"_id": "65d63357f8ad42be4b014851",
"name": "Snack"
}
],
"allergyList": [
{
"_id": "65d6a7d5f8ad42be4b014858",
"name": "Gluten Free"
},
{
"_id": "65d8e50bf8ad42be4b01486b",
"name": "Citrus Free"
},
{
"_id": "65d8e50bf8ad42be4b01486c",
"name": "Nuts Free"
},
{
"_id": "65d8e50bf8ad42be4b01486a",
"name": "Dairy Free"
},
{
"_id": "65d8e50bf8ad42be4b014869",
"name": "Fish Free"
}
],
"recipeList": [
{
"\_id": "65d135f333ab29df43d0f944",
"name": "Turkey Apple Cheddar Sandwich",
"typeId": {
"\_id": "65d62f1af8ad42be4b014845",
"name": "Breakfast"
}
},

     ...

      {
        "_id": "65d52def6e5eba7d9b7583f0",
        "name": "Kids Charcuterie Board",
        "typeId": {
          "_id": "65d63357f8ad42be4b014851",
          "name": "Snack"
        }
      }
    ]

}
}

```

### Get list of ingredients for a recipe

`GET /recipes/:id`

### Response

```

{
"success": true,
"result": {
"\_id": "65d135f333ab29df43d0f944",
"ingredients": [
{
"\_id": "65f1edd2ec2fcbcbad710d4d",
"item": "Cheddar Cheese",
"img": "<url>",
"brands": [
{
"_id": "65cff7fb7bfc3ee1abcd46c3",
"name": "Medium Cheddar Cheese - 8oz - Good & Gatherâ„¢"
},
{
"_id": "65cff7fb7bfc3ee1abcd46c1",
"name": "Pepper Jack, Colby Jack, Swiss & Cheddar Cheese Slice Party Tray - 28ct/16oz - Good & Gatherâ„¢"
},
{
"_id": "65cff7fb7bfc3ee1abcd46c0",
"name": "Shredded Sharp Cheddar Cheese - 8oz - Good & Gatherâ„¢"
},
{
"_id": "65cff7fb7bfc3ee1abcd46c2",
"name": "Sharp Cheddar Cheese - 8oz - Good & Gatherâ„¢"
},
{
"_id": "65cff7fb7bfc3ee1abcd46bf",
"name": "Shredded Mild Cheddar Cheese - 8oz - Good & Gatherâ„¢"
}
]
},

    ]

}
}

```

```

```
