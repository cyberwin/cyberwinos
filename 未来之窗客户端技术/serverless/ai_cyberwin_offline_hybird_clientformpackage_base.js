(function($) {
    // 优化后的序列化函数
    $.fn.serializeJson = function() {
        var serializeObj = {};
        var array = this.serializeArray();

        $(array).each(function() {
            var name = this.name;
            var value = this.value;

            // 处理嵌套对象
            if (name.includes('[')) {
                var keys = name.replace(/\]/g, '').split('[');
                keys.reduce((acc, key, index) => {
                    if (index === keys.length - 1) {
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(value);
                    } else {
                        if (!acc[key]) acc[key] = {};
                    }
                    return acc[key];
                }, serializeObj);
            } else {
                // 处理普通字段
                if (serializeObj[name]) {
                    if (!$.isArray(serializeObj[name])) {
                        serializeObj[name] = [serializeObj[name]];
                    }
                    serializeObj[name].push(value);
                } else {
                    serializeObj[name] = value;
                }
            }
        });

        return serializeObj;
    };
})(jQuery);