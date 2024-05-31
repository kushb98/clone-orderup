# Order Up Backend

Backend to expose API for Order Up!

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.



## Install

    $ git clone https://github.com/MEDkids/order_up_backend
    $ cd order_up_backend
    $ npm install

## Configure app

Create a  `.env` file and create the following variables

```
DB_CONN_STRING="" 
DB_NAME=""
COLLECTION_NAME=""
PORT=
API_URL=""
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

```


## REST API


### Get list of recipeType, recipes and allergies

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
        "_id": "65d135f333ab29df43d0f944",
        "name": "Turkey Apple Cheddar Sandwich",
        "typeId": {
          "_id": "65d62f1af8ad42be4b014845",
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
    "_id": "65d135f333ab29df43d0f944",
    "ingredients": [
      {
        "_id": "65f1edd2ec2fcbcbad710d4d",
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