import { _decorator, Button, Component, director, EditBox, instantiate, Label, Node, Sprite, SpriteFrame, Toggle, Animation, tween, Vec3, Tween } from 'cc';
import { Global } from './Global';
import { LocalizedLabel } from 'db://i18n/LocalizedLabel';
const { ccclass, property } = _decorator;

// enum DeleteState {
//     DL_CANCEL, //0
//     DL_COMFIRM  //1
// }


@ccclass('Manerger')
export class Manerger extends Component {

    // Prefab使用Node節點可以設定EventHandler
    @property(Node)
    public listItemPrefab: Node = null;
    @property(Node)
    public content: Node = null;
    // @property(Prefab)
    // public listPrefab: Prefab = null;
    @property(Node)
    private avatar: Node = null;
    @property(Node)
    public InputMenu: Node = null;
    @property(Node)
    public DeleteMenu: Node = null;

    @property(EditBox)
    private addInput: EditBox = null;

    @property(Button)
    private addBtn: Button = null;
    // @property(Button)
    // private deleteCancelBtn: Button = null;
    // @property(Button)
    // private deleteConfirmBtn: Button = null;

    @property(Label)
    private userName: Label = null;

    @property(SpriteFrame)
    private avatarAlbum: SpriteFrame[] = [];

    @property(LocalizedLabel)
    private warningText: LocalizedLabel = null;


    // @property
    private addCount = 0;
    private curAvatar = 0;
    // private deleteEvent = null;
    private deleteCustomData = null;

    public deleteState = 0;

    private ws: WebSocket; // WebSocket 連接



    setCheckState() {

    }

    start() {
        this.userName.string = Global.userName;
        this.listItemPrefab.active = false;
        this.DeleteMenu.active = false;
        this.InputMenu.active = false;


        // 呼叫websocket
        // this.wss();
    }

    // 使用websocket串接api
    wss() {
        // wsUrl: 要連接的網址
        this.ws = new WebSocket("ws://124.222.224.186:8800");

        // 接受後端傳來的消息(event)
        this.ws.onmessage = (event) => {
            console.log(`websock 後端訊息: ${event.data}`)
        }

        //成功連上
        this.ws.onopen = (event) => {
            console.log(`websock 連線成功: ${event}`)
            // 後端回傳資料send
            this.ws.send("ABC");
        }

        // 出現網路錯誤
        this.ws.onerror = (event) => {
            console.log(`websock 連線錯誤: ${event}`)
        }

        // ws連線關閉
        this.ws.onclose = (event) => {
            console.log(`websock 連線關閉: ${event}`)
        }
    }

    protected onLoad(): void {
        this.addBtn.node.on(Button.EventType.CLICK, this.onAdd, this)
        // this.deleteCancelBtn.node.on(Button.EventType.CLICK, this.onDeleteCancel, this)
        // this.deleteConfirmBtn.node.on(Button.EventType.CLICK, this.onDeleteConfirm, this)
    }


    // 輸入框訊息
    onInputWarn() {
        this.InputMenu.active = false;
    }
    // 刪除訊息
    onDeleteCancel() {
        // this.deleteState = DeleteState.DL_CANCEL;
        this.DeleteMenu.active = false;
    }
    onDeleteConfirm() {
        // this.deleteState = DeleteState.DL_COMFIRM;
        // this.onDelete(this.deleteEvent, this.deleteCustomData, DeleteState.DL_COMFIRM);
    }


    // 更換相片
    onChangeAvatar() {
        if (this.curAvatar < this.avatarAlbum.length - 1) {
            this.curAvatar++;
            // console.log("更換照片")
            this.avatar.getComponent(Sprite).spriteFrame = this.avatarAlbum[this.curAvatar]
        } else {
            this.curAvatar = 0;
            // console.log("照片從0開始")
            this.avatar.getComponent(Sprite).spriteFrame = this.avatarAlbum[0]
        }
    }

    // 新增代辦
    onAdd() {

        // 判斷是否有輸入文字
        if (this.addInput.string) {
            this.addCount++;

            // 製作Prefab
            let list = instantiate(this.listItemPrefab);
            list.children[1].getComponent(Label).string = this.addInput.string;
            list.children[0].getComponent(Toggle).isChecked = false;
            // console.log(list.active)

            // 使用Layout 不需要設定Position
            // list.setPosition(0, this.addCount * -60, 0);
            list.setParent(this.listItemPrefab.parent);



            // 設定ListItem編號
            list.children[2].getComponent(Button).clickEvents[0].customEventData = (this.addCount).toString();

            // add 次數
            list.active = true;
            // 動畫
            tween(list)
                .to(0.5, { scale: new Vec3(1, 1, 1) })
                .start();


            // console.log(list.scale)
            // Tween.stopAll();

            // clear input string
            this.addInput.string = "";


            // list.children[2].getComponent(Button).clickEvents[0].customEventData = ""

        } else {
            // console.log("請輸入文字");
            this.InputMenu.active = true;

            // 使用i18n控制警告視窗文字
            console.log(this.warningText.getComponent(LocalizedLabel)._key)
            this.warningText.getComponent(LocalizedLabel)._key = "warning.login";
            // 即時更新LocalizedLabel._key
            // this.warningText.getComponent(LocalizedLabel).updateLabel();
            // console.log(this.warningText.getComponent(LocalizedLabel)._key);
        }


        // .to(duration, {position: targetPos}, {easing: 'smooth'})




        // list.children[2].getComponent(Label).string = "5"
        // list.getChildByName('Item').getComponent(Label).string = "5"


    }

    setDeleteState(event: Event, customData: string) {
        this.DeleteMenu.active = true;
        // this.deleteEvent = event;
        this.deleteCustomData = customData;
        // console.log(`刪除=> deleteCustomData: 第${this.deleteCustomData}個Item`)

    }

    // 刪除代辦
    // onDelete1(event: Event, customData: string, value: DeleteState) {
    //     if(value === DeleteState.DL_COMFIRM){

    //     // 取得listItem[index]:
    //     // 方法一: 使用event.target(可能會有紅色錯誤=>解決:不定義Event型別)
    //     // 方法二: 使用customData, 設定每個listItem編號
    //     // console.log(customData)
    //     // console.log(this.listItemPrefab.parent.children[customData])

    //     // 更新編號: 該筆資料後編號全部-1
    //     if (Number(customData) !== this.addCount) {

    //         this.listItemPrefab.parent.children[customData].destroy();

    //         for (let i = Number(customData); i < this.addCount; i++) {
    //             // this.listItemPrefab.parent.children[i].destroy();
    //             // console.log(i)
    //             // console.log(this.content.children[i].children[1].getComponent(Label).string);

    //             // 所有customData後的編號 -1
    //             this.content.children[i + 1].children[2].getComponent(Button).clickEvents[0].customEventData = i.toString();

    //             this.addCount--;

    //         }
    //     } else {
    //         // console.log("最後一個數")
    //         this.listItemPrefab.parent.children[customData].destroy();
    //         this.addCount--;
    //     }

    //     // 關閉deleteMenu
    //     this.DeleteMenu.active = false;
    //     }

    // }


    onDelete() {
        // 取得listItem[index]:
        // 方法一: 使用event.target(可能會有紅色錯誤=>解決:不定義Event型別)
        // 方法二: 使用customData, 設定每個listItem編號
        // console.log(customData)
        // console.log(this.listItemPrefab.parent.children[customData])

        // 更新編號: 該筆資料後編號全部-1
        if (Number(this.deleteCustomData) !== this.addCount) {

            this.listItemPrefab.parent.children[this.deleteCustomData].destroy();

            // 動畫
            // tween(this.listItemPrefab.parent.children[this.deleteCustomData])
            //     .to(0, { scale: new Vec3(1, 0, 0) })
            //     .start();
            // console.log(`確認deleteCustomData: 刪掉第${this.deleteCustomData}個Item`)
            // console.log(`所有Item索引值:`)
            for (let i = Number(this.deleteCustomData); i < this.addCount; i++) {
                // console.log(`回圈內addCount: ${this.addCount}`)
                // this.listItemPrefab.parent.children[i].destroy();
                // console.log(i)
                // console.log(this.content.children[i].children[1].getComponent(Label).string);

                // 所有customData後的編號 -1
                this.content.children[i + 1].children[2].getComponent(Button).clickEvents[0].customEventData = i.toString();
                console.log(`i=: ${i}`)
                // console.log(`i+1=: ${i}`)
            }
            this.addCount--;
            // console.log(`迴圈結束: 目前共有${this.addCount}個`)

        } else {
            // console.log("最後一個數")
            this.listItemPrefab.parent.children[this.deleteCustomData].destroy();
            this.addCount--;
        }

        // 關閉deleteMenu
        this.DeleteMenu.active = false;

    }



    // // 刪除按鈕
    // targetDel:Node
    // setDeleteState2(event, customData: string) {
    //     // 刪除Btn的parent = ListItem
    //     this.targetDel = event.target.parent
    //     this.DeleteMenu.active = true;
    // }
    // // 確認按鈕
    // onDelete2() {
    //     // 刪除
    //     this.targetDel.destroy();
    //     // 關閉deleteMenu
    //     this.DeleteMenu.active = false;

    // }

}

