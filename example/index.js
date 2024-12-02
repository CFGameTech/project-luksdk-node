const luksdk = require("luksdk");
const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

const sdk = new luksdk.SDK("fa7ad21fdbe10218024f88538a86", "https://api.luk.live");

app.post("/sdk/get_channel_token", (req, res) => {
    const request = req.body;
    const response = sdk.getChannelToken(request, (request) => {
        return {
            token: "my-token",
            left_time: 7200,
        };
    });

    console.log("get_channel_token", { request, response });
    res.status(200).json(response);
});

app.post("/sdk/refresh_channel_token", (req, res) => {
    const request = req.body;
    const response = sdk.refreshChannelToken(request, (request) => {
        return {
            token: "my-token",
            left_time: 7200,
        };
    })

    console.log("refresh_channel_token", { request, response });
    res.status(200).json(response);
});

app.post("/sdk/get_channel_user_info", (req, res) => {
    const request = req.body;
    const response = sdk.getChannelUserInfo(request, (request) => {
        return {
            c_uid: request.c_uid,
            name: "my-name",
            avatar: "",
            coins: 100000,
        };
    })

    console.log("get_channel_user_info", { request, response });
    res.status(200).json(response);
});

app.post("/sdk/create_channel_order", (req, res) => {
    const request = req.body;
    const response = sdk.createChannelOrder(request, (request) => {
        return request.data.map(datum => ({
            c_uid: datum.c_uid,
            order_id: datum.game_order_id,
            coins: 100000,
            status: 1,
        }))
    });

    console.log("create_channel_order", { request, response });
    res.status(200).json(response);
});

app.post("/sdk/notify_channel_order", (req, res) => {
    const request = req.body;
    const response = sdk.notifyChannelOrder(request, (request) => {
        return request.data.map(datum => ({
            c_uid: datum.c_uid,
            order_id: datum.game_order_id,
            coins: 100000,
            score: 100000,
        }));
    });

    console.log("notify_channel_order", { request, response });
    res.status(200).json(response);
});

app.post("/sdk/notify_game", (req, res) => {
    const request = req.body;
    const response = sdk.notifyGame(request, () => {
        return {};
    });

    console.log("notify_game", { request, response });
    res.status(200).json(response);
});

app.get("/sdk/get_game_service_list", (req, res) => {
    sdk.getGameServiceList(1010997).then(response => {
        return response;
    }).then(data => {
        res.status(200).json(data);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
