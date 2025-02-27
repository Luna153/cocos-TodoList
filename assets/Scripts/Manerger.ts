import { _decorator, Button, Component, director, EditBox, instantiate, Label, Node, Sprite, SpriteFrame, Toggle } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;


@ccclass('Manerger')
export class Manerger extends Component {

    // Prefab使用Node節點可以設定EventHandler
    @property(Node)
    public listItemPrefab: Node = null;
    @property(Node)
    public content: Node = null;
    // @property(Prefab)
    // public listPrefab: Prefab = null;

    @property(EditBox)
    private addInput: EditBox = null;

    @property(Button)
    private addBtn: Button = null;
    @property(Node)
    private avatar: Node = null;

    @property(Label)
    private userName: Label = null;


    @property(SpriteFrame)
    private avatarAlbum: SpriteFrame[] = [];
    

    // @property
    private addCount = 0;
    private curAvatar = 0;



    setCheckState() {

    }

    start() {
        this.userName.string = Global.userName;
        this.listItemPrefab.active = false;
    }

    protected onLoad(): void {
        this.addBtn.node.on(Button.EventType.CLICK, this.onAdd, this)
    }

    // 更換相片
    onChangeAvatar(){
        if(this.curAvatar<this.avatarAlbum.length-1){
            this.curAvatar++;
            // console.log("更換照片")
            this.avatar.getComponent(Sprite).spriteFrame=this.avatarAlbum[this.curAvatar]
        }else{
            this.curAvatar=0;
            // console.log("照片從0開始")
            this.avatar.getComponent(Sprite).spriteFrame=this.avatarAlbum[0]
        }
    }

    // 新增代辦
    onAdd() {

        // 判斷是否有輸入文字
        if (this.addInput.string) {
            this.addCount++;

            // 製作Prefab
            const list = instantiate(this.listItemPrefab);
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
            // clear input string
            this.addInput.string = "";


            // list.children[2].getComponent(Button).clickEvents[0].customEventData = ""

        } else {
            console.log("請輸入文字");
        }



        // list.children[2].getComponent(Label).string = "5"
        // list.getChildByName('Item').getComponent(Label).string = "5"


    }

    // 刪除代辦
    onDelete(event: Event, customData: string) {
        // 取得listItem[index]:
        // 方法一: 使用event.target(可能會有紅色錯誤=>解決:不定義Event型別)
        // 方法二: 使用customData, 設定每個listItem編號
        // console.log(customData)
        // console.log(this.listItemPrefab.parent.children[customData])

        // 更新編號: 該筆資料後編號全部-1
        if (Number(customData) !== this.addCount) {

            this.listItemPrefab.parent.children[customData].destroy();

            for (let i = Number(customData); i < this.addCount; i++) {
                // this.listItemPrefab.parent.children[i].destroy();
                // console.log(i)
                // console.log(this.content.children[i].children[1].getComponent(Label).string);

                // 所有customData後的編號 -1
                this.content.children[i + 1].children[2].getComponent(Button).clickEvents[0].customEventData = i.toString();

                this.addCount--;

            }
        } else {
            console.log("最後一個數")
            this.listItemPrefab.parent.children[customData].destroy();
            this.addCount--;
        }


        // 更新位置
    }
}

