import { _decorator, Component } from 'cc';
import { GameEvent } from './event/GameEvent';
import { EventMessage } from './event/EventMessage';
import { Global } from './Global';
import { HttpRequest } from './net/HttpRequest';


const { ccclass, property } = _decorator;

@ccclass('LoadingScript')
export class LoadingScript extends Component {


    private _gameEevnt: GameEvent = new GameEvent();



    onLoad() {
        //開啟監聽是否接收到登入成功
        GameEvent._message.on(EventMessage.API_ERROR, this.onHandler, this);
        GameEvent._message.on(EventMessage.LOGIN_SUCCESS, this.onHandler, this);
        GameEvent._message.on(EventMessage.LEAVE_SUCCESS, this.onHandler, this);
        GameEvent._message.on(EventMessage.LOGIN_ERROR, this.onHandler, this);
        GameEvent._message.on(EventMessage.HTTP_TIMEOUT, this.onHandler, this);
        GameEvent._message.on(EventMessage.TOKEN_TIMEOUT, this.onHandler, this);
    }

    private onHandler(event: string, args: any) {
        if (event == EventMessage.LOGIN_SUCCESS) {
            Global.player_id = args.id; // 玩家id
            Global.player_token = args.token; // 玩家token
            Global.player_name = args.name


        }
        else if (event == EventMessage.LOGIN_ERROR || event == EventMessage.API_ERROR) {

        }

        else if (event == EventMessage.HTTP_TIMEOUT || event == EventMessage.TOKEN_TIMEOUT) { // 超時
        }
    }

    start() {

        // 這些資訊須待後端完成後才會知道
        let params = { act: "login_h", account: "test1", pwd: "test1" };
        this._gameEevnt.leave(params);

        // 從 HttpRequest 使用加密方法
        // let res = HttpRequest.aesEncrypt1("","")

    }


    onDestroy() {
        // 对象释放时取消注册的全局事件
        GameEvent._message.off(EventMessage.API_ERROR, this.onHandler, this);
        GameEvent._message.off(EventMessage.LOGIN_SUCCESS, this.onHandler, this);
        GameEvent._message.off(EventMessage.LEAVE_SUCCESS, this.onHandler, this);
        GameEvent._message.off(EventMessage.LOGIN_ERROR, this.onHandler, this);
        GameEvent._message.off(EventMessage.HTTP_TIMEOUT, this.onHandler, this);
        GameEvent._message.off(EventMessage.TOKEN_TIMEOUT, this.onHandler, this);
    }



}