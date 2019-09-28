
var narmalMenu=[
    {text:"文章", href:"/", key:"/"},
    {text:"话题", href:"/topic", key:"/topic"},
    {text:"关于博主", href:"/about", key:"/about"}
];
var manageMenu = [
    {type:0, text:"文章", href:"/", key:"/"},
    {type:0, text:"话题", href:"/topic", key:"/topic"},
    {type:1, text:"管理", key:"/manage", itemArray:[
                                {text:"文章管理", href:"/articlemanage", key:"/articlemanage"},
                                {text:"话题管理", href:"/topicmanage", key:"/topicmanage"}
                                ]},
    {type:0, text:"个人中心", href:"/personal", key:"/personal"},
    {type:0, text:"关于站主", href:"/about", key:"/about"}
];

class MenuGenerator {
    getMenu = (isLogin) =>{
        if(isLogin === false){
            return narmalMenu;
        }
        return manageMenu;
    }
}

var menuGenerator = new MenuGenerator();
export {menuGenerator};
