
class OPCookies{
    //保存cookie
    save = (key, value) =>{
        var Days = 1; 
        var exp = new Date(); 
        exp.setTime(exp.getTime() + Days*24*60*60*1000); 
        document.cookie = key + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
    }

    //得到cookie
    get = (key) =>{
        var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
 
        if((arr = document.cookie.match(reg)))
            return unescape(arr[2]); 

        return null; 
    }

    //删除cookie
    del = (key) =>{
        var exp = new Date(); 
        
        exp.setTime(exp.getTime() - 1); 
        var cval = this.get(key); 
        if(cval != null) 
            document.cookie= key + "="+cval+";expires="+exp.toGMTString(); 

        }
};

var OpCookies = new OPCookies();

export {OpCookies}