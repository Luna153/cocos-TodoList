
const win = window as any;

export const languages = {
    // Data
    // "test": {
    //     "main": "测试",
    //     "hello": "你好",
    // }

    // en有test-2, zh沒有不會報錯, 但會找不到(顯示空白)

    // 警告訊息
    "warning": {
        "login": "名稱不能空白", 
        "input": "代辦事項不能空白", 
        "delete": "確定刪除?", 
    }

};

if (!win.languages) {
    win.languages = {};
}

win.languages.zh = languages;
