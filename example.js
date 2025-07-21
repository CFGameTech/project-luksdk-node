const {LukSDK} = require("./lib/cjs/luksdk/index.js");
const {GetChannelToken} = require("./lib/cjs/luksdk/models/callbackmodels/get_channel_token.js");
const luksdk = new LukSDK({
    appId: 0,
    appSecret: '0',
    domain: '0'
})

luksdk.getApis().getGameServiceList({}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})
