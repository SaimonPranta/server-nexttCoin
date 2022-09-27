const express = require('express');
const cors = require('cors');
require("./db/connection");
const user_collection = require("./db/schemas/user_schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const authGard = require('./middleware/authGard');
const root = require("./routes/root")
const registation = require("./routes/user_routes/registation");
const login = require("./routes/user_routes/login");
const read_user = require("./routes/user_routes/read_user");
const update_user = require("./routes/user_routes/update_user");
const password_reset = require("./routes/user_routes/password_reset");
const balance_transfer = require("./routes/user_routes/balance_transfer");
const investment = require("./routes/user_routes/investment");
const mobile_rechare = require("./routes/user_routes/mobile_recharge");
const withdraw = require("./routes/user_routes/withdraw");
const adminAuthGard = require("./middleware/adminAuthGard");
const all_user = require("./routes/admin_routes/all_user");
const user_dtails = require("./routes/admin_routes/user_dtails");
const investment_approval = require("./routes/admin_routes/investment_approval");
const mobile_recharge_approval = require('./routes/admin_routes/mobile_recharge_approval');
const mobile_recharge_decline = require('./routes/admin_routes/mobile_recharge_decline');
const investment_request_decline = require('./routes/admin_routes/investment_request_decline');
const withdraw_request_approval = require('./routes/admin_routes/withdraw_request_approval');
const withdraw_request_decline = require('./routes/admin_routes/withdraw_request_decline');
const add_slider_img = require('./routes/admin_routes/add_slider_img');
const user_activation = require('./routes/user_routes/user_activation');
const slider_provider = require('./routes/user_routes/slider_provider');
const fileUpload = require('express-fileupload');
const path = require('path');

const fs = require('fs-extra');
const slider_img_delete = require('./routes/admin_routes/slider_img_delete');
const generation_user = require('./routes/user_routes/generation_user');
const admin_update_user = require('./routes/admin_routes/admin_update_user');
const read_notice = require('./routes/user_routes/read_notice');
const add_notice = require('./routes/admin_routes/add_notice');
const before_registation_checking = require('./routes/user_routes/before_registation_checking');
const generation_all = require('./routes/user_routes/generation_all');
const per_generation = require('./routes/user_routes/per_generation');
const create_conversations = require('./messenger/routes/create_conversations');
const conversation_porvider = require('./messenger/routes/conversation_porvider');
const user_porvider = require('./messenger/routes/user_porvider');
const create_message = require('./messenger/routes/create_message');
const message_provider = require('./messenger/routes/message_provider');
// const filter_delete_user = require('./functions/filter_delete_user');



const app = express();
dotenv.config()

const port = process.env.PORT || 8000


// ====== Middleware ======
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "images/slider_img")))



// ====== Root Route ======
// app.get('/', root);
app.get('/', root);



// ====== Slider Provider Route ======
app.get('/slider_provider', slider_provider);
// ====== User Before Registation Checing Route ======
app.post('/before_registation_checking', before_registation_checking);
// ====== User Registation Route ======
app.post('/user', registation);
// ====== User Login Route ======
app.post("/logIn", login)
// ====== Read User Route ======
app.get("/user", authGard, read_user);
// ====== User Activation Route ======
app.post("/activation", authGard, user_activation);


// ====== User Update Route ======
app.patch("/user", authGard, update_user);
// ======User Password Reset Route ======
app.patch("/passwordReset", authGard, password_reset);
// ======Balance Transfer Route ======
app.post("/balance_transfer", authGard, balance_transfer);
// ======Investmen Approval Route ======
app.post("/investment", authGard, investment);


// ======Mobile Recharge Route ======
app.post("/mobile_rechare", authGard, mobile_rechare);
// ======Withdraw Route ======
app.post("/withdraw", authGard, withdraw);

// ======Generation User list Route ======
app.get("/per_generation", authGard, per_generation);

// ======Generation User list Route ======
app.get("/generation_all", authGard, generation_all);

// ======All Generation User Route ======
app.get("/generation_user", authGard, generation_user);
// ======Admin User Details Read Route ======
app.get("/user/userDetails", authGard, user_dtails)


// ======Admin All User Read Route ======
app.get("/admin/users", adminAuthGard, adminAuthGard, all_user);
// ======Admin User Update Read Route ======
app.post("/admin/update_user", adminAuthGard, admin_update_user);
// ======Admin Investment Requesst Approval Route ======
app.post("/investment_approval", adminAuthGard, investment_approval)





// ======Create Conversation Route ======
// app.post("/create_conversations", authGard, create_conversations);
app.post("/create_conversations", create_conversations);

// ======Provider Conversation Route ======
app.get("/conversation_porvider/:userID", authGard, conversation_porvider);

// ======Provider User Route ======
app.get("/user_porvider/:userID", authGard, user_porvider);

// ======Create Message Route ======
// app.post("/create_message", authGard, create_message);
app.post("/create_message", create_message);

// ======Provide Message Route ======
// app.get("/message_provider", message_provider);
app.get("/message_provider/:conversetionID", message_provider);








// ======Mobile Recharge Approval Route ======
app.post("/mobile_recharge_approval", adminAuthGard, mobile_recharge_approval);
// ======Withdraw Requesst Approval Route ======
app.post("/withdraw_request_approval", adminAuthGard, withdraw_request_approval)

// ======Mobile Recharge Decline Route  ======
app.post("/mobile_recharge_decline", adminAuthGard, mobile_recharge_decline)
// ======Investment Request Decline Route  ======
app.post("/investment_request_decline", adminAuthGard, investment_request_decline)
// ======Withdraw Request Decline Route  ======
app.post("/withdraw_request_decline", adminAuthGard, withdraw_request_decline)





// ======Slider Image Add Route  ======
app.post("/addSlider", adminAuthGard, add_slider_img)
// ======Slider Image Delete Route  ======
app.delete("/slider_img_delete", adminAuthGard, slider_img_delete)
// ======Notice Add Route  ======
app.post("/notice", adminAuthGard, add_notice)
// ======Notice Read Route  ======
app.get("/notice", read_notice)

// filter_delete_user()

// ====== Error Handling Middleware ======
app.use((error, req, res, next) => {
    console.log(error)
    if (error.message) {
        res.status(500).send({ error: error.message })
    } else if (error) {
        res.status(500).send({ error: "Something is wrong, please try out letter" })
    }
});

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})








