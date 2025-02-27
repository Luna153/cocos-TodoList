import { _decorator, Button, Component, director, EditBox, Label, Node } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Login')
export class Login extends Component {

    @property(EditBox)
    private inputName: EditBox = null;

    @property(Button)
    private loginBtn: Button = null;



    start() {

    }
    protected onLoad(): void {
        this.loginBtn.node.on(Button.EventType.CLICK, this.onLogin, this)
    }

    onLogin() {
        // console.log("登入");
        // userName存入Global
        Global.userName = this.inputName.string
        // 清空輸入框
        this.inputName.string = "";
        // 跳轉場景
        director.loadScene("02-ListPage");

    }


    update(deltaTime: number) {

    }
}

