import { _decorator, Button, Component, director, EditBox, Label, Node, Animation } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;


@ccclass('Login')
export class Login extends Component {

    @property(EditBox)
    private inputName: EditBox = null;

    @property(Button)
    private loginBtn: Button = null;

    @property(Node)
    public loginMenu:Node = null;
    @property(Node)
    public loginAni:Node = null;

    @property(Animation)
    public loginAnimCircle: Animation = null;



    start() {
        // 預設警告視窗關閉
        this.loginMenu.active = false;
        this.loginAni.active = false;
        
        // this.loginAnim.getState('load_ani');
        
    }
    protected onLoad(): void {
        this.loginBtn.node.on(Button.EventType.CLICK, this.onLogin, this)
    }
    
    // 關閉提示訊息
    onWarn(){
        this.loginMenu.active = false;
    }

    onLogin() {
        // 有使用者名稱
        if(this.inputName.string){

            // userName存入Global
            Global.userName = this.inputName.string
            // 載入loading動畫
            this.loginAni.active = true;
            this.loginAnimCircle.play('load_ani');
            
            setTimeout(()=>{
                // 清空輸入框
                // this.inputName.string = "";
                // 跳轉場景
                director.loadScene("02-ListPage");            
            }, 2000);
        }else{
            console.log('請輸入名稱')
            this.loginMenu.active = true;
        }

    }


    update(deltaTime: number) {

    }
}

