# **InfiniteTalk! API Documentation**

Clone this repository with : 
```git clone --single-branch --branch back-end https://github.com/arifian853/InfiniteTalk.git```

Then ``` npm install ``` to download all the dependencies, then ```npm run dev``` to start the server with nodemon with ```PORT = 7777```
Don't forget to make the .env files with this content : 

```
PORT=7777
MONGO_URL=<your mongodb url>
JWT_SECRET=<your JWT Secret>
PROJ_ENVIRONMENT=development
```

## A. Tech Stack
### 1. Server

- **Express**
- **NodeJS**

### 2. Security

- **BcryptJS**
- **JSONWebtoken**
- **OTPAuth**
- **CORS**

### 3. Database + Tools

- **MongoDB**
- **MongoDB Compass**
- **Postman**
 
## B. Database Model 

## - User Data Schema

### Fields:

- **username:**
  - Type: String
  - Required: true
  - Unique: true

- **email:**
  - Type: String
  - Required: true
  - Unique: true
  - Sparse: true

- **password:**
  - Type: String
  - Required: true

- **avatar:**
  - Type: String
  - Default: ""

- **fullName:**
  - Type: String
  - Required: true

- **program:**
  - Type: String

- **mentor:**
  - Type: Boolean
  - Default: false

- **admin:**
  - Type: Boolean
  - Default: false

- **verificationCode:**
  - Type: String
  - Required: false

- **lastLogin:**
  - Type: Date
  - Default: null

- **otp_enabled:**
  - Type: Boolean
  - Default: false

- **otp_verified:**
  - Type: Boolean
  - Default: false

- **otp_base32:**
  - Type: String
  - Default: ""

- **otp_auth_url:**
  - Type: String
  - Default: ""

### Additional Configuration:

- **Timestamps:**
  - Enabled: true

## - Post Schema

### Fields:

- **title:**
  - Type: String
  - Required: true

- **caption:**
  - Type: String
  - Required: true

- **slug:**
  - Type: String
  - Required: true
  - Unique: true

- **photo:**
  - Type: String
  - Required: false

- **user:**
  - Type: ObjectId (refers to "User" model)
  
- **tags:**
  - Type: Array of Strings

### Additional Configuration:

- **Timestamps:**
  - Enabled: true

- **Virtuals:**
  - Enabled: true
  - Virtual Field: comments
    - Ref: "Comment"
    - Local Field: "_id"
    - Foreign Field: "post"

## Comment Schema
### Fields:

- **user:**
  - Type: ObjectId (refers to "User" model)
  - Required: true

- **desc:**
  - Type: String
  - Required: true

- **post:**
  - Type: ObjectId (refers to "Post" model)
  - Required: true

- **check:**
  - Type: Boolean
  - Default: true

- **parent:**
  - Type: ObjectId (refers to "Comment" model)
  - Default: null

- **replyOnUser:**
  - Type: ObjectId (refers to "User" model)
  - Default: null

### Additional Configuration:

- **Timestamps:**
  - Enabled: true

- **Virtuals:**
  - Enabled: true
  - Virtual Field: replies
    - Ref: "Comment"
    - Local Field: "_id"
    - Foreign Field: "parent"

## C. Routes : 
- User Routes
#### 1. Sign In for Mentee (POST)
```http://localhost:7777/api/user/signin```

#### 2. Sign Up for Mentee (POST)
```http://localhost:7777/api/user/signup```

#### 3. Sign In for Mentor (POST)
```http://localhost:7777/api/user/signin-mentor```

#### 4. Sign Up for Mentor (POST)
```http://localhost:7777/api/user/signup-mentor```

#### 5. User Profile (GET)
```http://localhost:7777/api/user/profile```

#### 6. Update User Profile (PUT)
```http://localhost:7777/api/user/updateProfile```

#### 7. Update User Profile Picture (PUT)
```http://localhost:7777/api/user/updateProfilePicture```

- OTP Routes
#### 1. Generate OTP (POST)
```http://localhost:7777/api/otp/generate```

#### 2. Verify OTP (POST)
```http://localhost:7777/api/otp/verify```

#### 3. Validate OTP (POST)
```http://localhost:7777/api/otp/validate```

#### 4. Disable OTP (POST)
```http://localhost:7777/api/otp/disable```

- Post Routes
#### 1. Create Post (POST)
```http://localhost:7777/api/posts/create```

#### 2. Update Post (PUT)
```http://localhost:7777/api/posts/update/:slug```

#### 3. Get All Post (GET)
```http://localhost:7777/api/posts/all```

#### 4. Delete Post (DELETE)
```http://localhost:7777/api/posts/delete/:slug```

#### 4. Get Post Detail (GET)
```http://localhost:7777/api/posts/detail/:slug```

- Comment Routes
#### 1. Create Comment (POST)
```http://localhost:7777/api/comments/createComment```

#### 2. Update Comment (PUT)
```http://localhost:7777/api/comments/updateComment/:commentId```

#### 3. Get All Post (GET)
```http://localhost:7777/api/posts/all```

#### 4. Delete Comment (DELETE)
```http://localhost:7777/api/comments/deleteComment/:commentId```