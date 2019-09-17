function localParam (search) {
    search = search || window.location.search;
    var fn = function(str, reg) {
        if (str) {
            var data = {};
            str.replace(reg, function($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data;
        }
    }
    return fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")) 
}

export {
    localParam
}