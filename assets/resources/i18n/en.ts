
const win = window as any;

export const languages = {
    // Data
    // "test": {
    //     "main": "测试",
    //     "hello": "HI",
    // },
    // "test-1": {
    //     "main": "测试",
    //     "hello": "你好",
    // }
};

if (!win.languages) {
    win.languages = {};
}

win.languages.en = languages;
