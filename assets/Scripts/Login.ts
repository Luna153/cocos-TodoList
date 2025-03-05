import { _decorator, Button, Component, director, EditBox, Label, Node, Animation, AudioSource, AudioClip } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;


@ccclass('Login')
export class Login extends Component {

    
    // 音樂播放器
    @property({ group: { name: 'Audio' },    type: AudioSource, tooltip: "音效控制器" })
    audioSource: AudioSource = null;
    @property({ group: { name: 'Audio' },    type: AudioClip,   tooltip: "音效陣列" })
    clip: AudioClip[] = [];

    // property分類(標籤名稱, 種類, 提示文字)
    // @property({ group: { name: 'Audio1' },    type: EditBox,   tooltip: "" })

    // private testAudio: EditBox = null;

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

    // 音樂播放器(第幾個clip: 從0開始算, 音量: 0-1)
    playOneShot (clipNo: number, vol: number) {
        this.audioSource.playOneShot(this.clip[clipNo], vol);
    }
    // playOneShotB (event,  costom) {
    //     this.audioSource.playOneShot(this.clip[clipNo], vol);
    // }

    // playOneShotB1 (event,  costom) {
    //     '[1,0.5]'

    //     this.audioSource.playOneShot(this.clip[clipNo], vol);
    // }


    start() {
        // 預設警告視窗關閉
        this.loginMenu.active = false;
        this.loginAni.active = false;
        
        // this.loginAnim.getState('load_ani');

        // this.playOneShot(1,0.5)

        

        // this.playOneShotB1(null,'[1,0.5]')
        
    }
    protected onLoad(): void {
        this.loginBtn.node.on(Button.EventType.CLICK, this.onLogin, this)
        // 測試canvus 背景BGM
        // console.log(this.node.parent.getComponent(AudioSource));
    }
    
    // 關閉提示訊息
    onWarn(){
        this.loginMenu.active = false;
        this.playOneShot(0,0.5);
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

