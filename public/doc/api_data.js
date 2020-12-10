define({ "api": [
  {
    "type": "get",
    "url": "/api/user/admin/products",
    "title": "Fetch added products",
    "name": "getProducts",
    "group": "Admin_Product_Management",
    "version": "1.0.0",
    "description": "<p>Fetch all products added</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>product name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>product description</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>product id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/user/admin.js",
    "groupTitle": "Admin_Product_Management",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NameConflictError",
            "description": "<p>An entity already exists with the passed in name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict Error\n{\n\t\"name\": \"NameConflictError\",\n\t\"message\": \"name already exists\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/user/admin/product",
    "title": "Product Addition from admin dashboard",
    "name": "postProduct",
    "group": "Admin_Product_Management",
    "version": "1.0.0",
    "description": "<p>Create new Product. It is with this endpoint that the respective products (DPK, AGO, PMS, ...etc) will be added to the System by the admin.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>product name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>product description</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>product id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/user/admin.js",
    "groupTitle": "Admin_Product_Management",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NameConflictError",
            "description": "<p>An entity already exists with the passed in name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict Error\n{\n\t\"name\": \"NameConflictError\",\n\t\"message\": \"name already exists\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/user/admin/product/:productId",
    "title": "Product Update from admin dashboard",
    "name": "putProduct",
    "group": "Admin_Product_Management",
    "version": "1.0.0",
    "description": "<p>Update Product</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>product name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>product description</p>"
          },
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "productId",
            "description": "<p>id of the product that is about to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>product id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/user/admin.js",
    "groupTitle": "Admin_Product_Management",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NameConflictError",
            "description": "<p>An entity already exists with the passed in name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict Error\n{\n\t\"name\": \"NameConflictError\",\n\t\"message\": \"name already exists\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/auth/admin/signin",
    "title": "Admin Sign In",
    "name": "postAdminSignin",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>Admin authentication</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/auth.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectEmailError",
            "description": "<p>A user with the email was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectPasswordError",
            "description": "<p>The password of the user is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"name\": \"IncorrectEmailError\",\n\t\"message\": \"The email you entered was not found\",\n\t\"isOperational\": true\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"name\": \"IncorrectPasswordError\",\n\t\"message\": \"The password you entered is incorrect\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/auth/buyer",
    "title": "Buyer's Signup endpoint",
    "name": "postBuyer",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>Endpoint to sign buyers up to the platform</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User's first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User's last name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User's Phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the buyer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the buyer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of peddler</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/auth.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailConflictError",
            "description": "<p>User already exists with the passed in email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict Error\n{\n\t\"name\": \"EmailConflictError\",\n\t\"message\": \"email already exists\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/auth/peddler",
    "title": "Create Peddler Profile",
    "name": "postPeddler",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>Endpoint to Create Peddler's Profile. Calling this endpoint will return a temporary token that will be used to access all routes that the peddler has to hit to complete account creation</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User's first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User's last name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User's Phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nTrucks",
            "description": "<p>Number of trucks owned by peddler</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pooImage",
            "description": "<p>Proof of ownership of trucks owned by peddlers</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of peddler</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/auth.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailConflictError",
            "description": "<p>User already exists with the passed in email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict Error\n{\n\t\"name\": \"EmailConflictError\",\n\t\"message\": \"email already exists\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/auth/peddler-signup",
    "title": "Peddler's signup endpoint",
    "name": "postPeddler",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>Peddler's signup route. This route is protected as it needs to be called with the token gotten from calling the route that creates peddlers profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Peddler's username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Peddler's Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/auth.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NameConflictError",
            "description": "<p>An entity already exists with the passed in name</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnverifiedProfileError",
            "description": "<p>Error thrown if pedddler tries to signup before verification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict Error\n{\n\t\"name\": \"NameConflictError\",\n\t\"message\": \"name already exists\",\n\t\"isOperational\": true\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"name\": \"UnverifiedProfileError\",\n\t\"message\": \"Profile not yet verified\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/auth/peddler-code",
    "title": "Peddler's code Activation",
    "name": "postPeddlerCode",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>verifies registration code recieved by peddlers when admin has approved a peddler's profile. This route is protected just like the signup route</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Peddler's registration code.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/auth.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCodeError",
            "description": "<p>Wrong registration code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"name\": \"InvalidCodeError\",\n\t\"message\": \"You have entered a wrong code\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/auth/peddler/signin",
    "title": "Peddler Sign In",
    "name": "postPeddlerSignin",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>Peddlers Sign In end-point. Calling this endpoint will return a a temporary restricted token and will send an otp to the peddler. the token will be used to identify the user during otp verification. on OTP verification a permenent token will be sent</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>User's unique Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/auth.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectUsernameError",
            "description": "<p>The username of the user is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectPasswordError",
            "description": "<p>The password of the user is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\t\"name\": \"IncorrectUsernameError\",\n\t\"message\": \"The username you entered is incorrect\",\n\t\"isOperational\": true\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"name\": \"IncorrectPasswordError\",\n\t\"message\": \"The password you entered is incorrect\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/user/admin/verify-peddler/:peddlerId",
    "title": "Admin verification of peddler profile",
    "name": "postPeddlerVerification",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>verify peddler profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ID",
            "optional": false,
            "field": "peddlerId",
            "description": "<p>Peddler's id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/user/admin.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/auth/signin",
    "title": "Buyer Sign In",
    "name": "postSignin",
    "group": "Authentication",
    "version": "1.0.0",
    "description": "<p>Buyers Sign In end-point</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>User's unique Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authentication token</p>"
          },
          {
            "group": "Success 200",
            "type": "ID",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/auth.js",
    "groupTitle": "Authentication",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectUsernameError",
            "description": "<p>The username of the user is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectPasswordError",
            "description": "<p>The password of the user is incorrect</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\t\"name\": \"IncorrectUsernameError\",\n\t\"message\": \"The username you entered is incorrect\",\n\t\"isOperational\": true\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"name\": \"IncorrectPasswordError\",\n\t\"message\": \"The password you entered is incorrect\",\n\t\"isOperational\": true\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/user/admin/peddlers?vstatus=uncategorized",
    "title": "get peddlers",
    "name": "getPeddlers",
    "group": "Peddler_Verification",
    "version": "1.0.0",
    "description": "<p>Get peddlers by verification status</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vStatus",
            "description": "<p>Verification status verified|unverified|uncategorized</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/user/admin.js",
    "groupTitle": "Peddler_Verification"
  }
] });
