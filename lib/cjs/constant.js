"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.NotifyType = void 0;
exports.NotifyType = {
    START_BEFORE: 1, // 游戏开始前状态
    GAMING: 2, // 游戏开始中状态
    END: 3, // 游戏结束状态
};
exports.Action = {
    JOIN_GAME: 1, // 加入游戏操作
    EXIT_GAME: 2, // 退出游戏操作
    SETTING_GAME: 3, // 设置游戏操作
    KICK_OUT: 4, // 踢人操作
    START_GAME: 5, // 开始游戏操作
    PREPARE: 6, // 准备操作
    CANCEL_PREPARE: 7, // 取消准备操作
    GAME_END: 8, // 游戏结束操作
};
