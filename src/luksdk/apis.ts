import {LukSDK} from "./luksdk";
import {LukSDKExceptions} from "./exception";
import {signature} from "./sign";
import {GetGameServiceList, PublishControlEvent, QueryNotifyEvent, QueryOrder} from "./models/apimodels";

export class Apis {
    private luksdk: LukSDK;

    constructor(luksdk: LukSDK) {
        this.luksdk = luksdk;
    }

    async getGameServiceList(req: GetGameServiceList.Request): Promise<GetGameServiceList.Response> {
        req.c_id = !req.c_id || req.c_id == 0 ? this.luksdk.config.appId : req.c_id;
        req.timestamp = req.timestamp || Math.floor(Date.now() / 1000);
        req.sign = req.sign || signature(this.luksdk.config.appSecret, req)

        try {
            const response = await fetch(`${this.luksdk.config.domain}/sdk/get_game_service_list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'nodejs/v1.0.0',
                },
                body: JSON.stringify(req)
            });

            if (!response.ok) throw LukSDKExceptions.INTERNAL_ERROR.with(`HTTP error! status: ${response.status}`);

            return await response.json();
        } catch (error) {
            throw LukSDKExceptions.INTERNAL_ERROR.with(error)
        }
    }

    async queryNotifyEvent(req: QueryNotifyEvent.Request): Promise<QueryNotifyEvent.Response> {
        req.app_id = !req.app_id || req.app_id == 0 ? this.luksdk.config.appId : req.app_id;
        req.timestamp = req.timestamp || Math.floor(Date.now() / 1000);
        req.sign = req.sign || signature(this.luksdk.config.appSecret, req)

        try {
            const response = await fetch(`${this.luksdk.config.domain}/sdk/query_notify_event`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'LUKSDK': 'nodejs',
                    'LUKSDK_VERSION': 'v1.0.0'
                },
                body: JSON.stringify(req)
            });

            if (!response.ok) throw LukSDKExceptions.INTERNAL_ERROR.with(`HTTP error! status: ${response.status}`);

            return await response.json();
        } catch (error) {
            throw LukSDKExceptions.INTERNAL_ERROR.with(error)
        }
    }

    async queryOrder(req: QueryOrder.Request): Promise<QueryOrder.Response> {
        req.app_id = !req.app_id || req.app_id == 0 ? this.luksdk.config.appId : req.app_id;
        req.timestamp = req.timestamp || Math.floor(Date.now() / 1000);
        req.sign = req.sign || signature(this.luksdk.config.appSecret, req)

        try {
            const response = await fetch(`${this.luksdk.config.domain}/sdk/query_order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'LUKSDK': 'nodejs',
                    'LUKSDK_VERSION': 'v1.0.0'
                },
                body: JSON.stringify(req)
            });

            if (!response.ok) throw LukSDKExceptions.INTERNAL_ERROR.with(`HTTP error! status: ${response.status}`);

            return await response.json();
        } catch (error) {
            throw LukSDKExceptions.INTERNAL_ERROR.with(error)
        }
    }

    async publishControlEvent(req: PublishControlEvent.Request): Promise<PublishControlEvent.Response> {
        req.app_id = !req.app_id || req.app_id == 0 ? this.luksdk.config.appId : req.app_id;
        req.timestamp = req.timestamp || Math.floor(Date.now() / 1000);
        req.sign = req.sign || signature(this.luksdk.config.appSecret, req)

        try {
            const response = await fetch(`${this.luksdk.config.domain}/sdk/publish_control_event`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'LUKSDK': 'nodejs',
                    'LUKSDK_VERSION': 'v1.0.0'
                },
                body: JSON.stringify(req)
            });

            if (!response.ok) throw LukSDKExceptions.INTERNAL_ERROR.with(`HTTP error! status: ${response.status}`);

            return await response.json();
        } catch (error) {
            throw LukSDKExceptions.INTERNAL_ERROR.with(error)
        }
    }

}