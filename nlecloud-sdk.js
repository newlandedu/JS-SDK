/**
 * Desc: NLECloud JS SDK 使用高风险，仅限实验用
 * Author: cs
 * Time: 2017-12-04 14:27
 * Version: 1.0.0
 * Copyright (c) 2016 新大陆物联网云平台
 */
(function () {

    var API_HOST = "http://api.nlecloud.com";
    var AccessToken = '';

    function jsonp(url, fn, token, data)
    {
        url += (url.indexOf('?') > 0 ? '&' : '?') + 't=' + (new Date()).getTime();
        if (token != null && token != undefined)
        {
            if (token == "")
            {
                console.log("请求" + url, { "Status": 1, "Msg": "AccessToken为空！" });
                return;
            }
            else
                url += "&accesstoken=" + token;
        }
        url += "&jsoncallback=?";

        data = data || {};

        $.ajax({
            type: "GET",
            url: url,
            data: data,
            dataType: "json",
            success: function (data) {
                fn(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    //构造函数
    function NLECloudAPI() {}

    NLECloudAPI.prototype = {
        /*
        * 用户登录（同时返回AccessToken）
        * @param account 用户
        * @param password 密码
        */
        userLogin: function (account, password) {
            var completedCallback;
            jsonp(API_HOST + '/developer/jsonpresend?func=login&account=' + account + '&password=' + password, function (res) {

                if (res.Status === 0) AccessToken = res.ResultObj.AccessToken;

                completedCallback && completedCallback(res);
            });
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 获取某个项目的信息
        * @param tag 项目标识
        */
        getProjectInfo: function (tag) {
            var completedCallback;
            jsonp(API_HOST + "/v2/project/" + tag, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 获取某个设备的信息
        * @param gatewaytag 设备标识
        */
        getGatewayInfo: function (gatewayTag) {
            var completedCallback;
            jsonp(API_HOST + "/v2/gateway/" + gatewayTag , function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 获取某个设备的传感器列表
        * @param gatewayTag 设备标识
        */
        getSensorList: function (gatewayTag) {
            var completedCallback;
            var url = API_HOST + "/v2/gateway/{0}/SensorList";
            jsonp(url.format(gatewayTag), function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 获取某个传感器的信息
        * @param gatewayTag 设备标识
        * @param apiTag 传感器标识
        */
        getSensorInfo: function (gatewayTag, apiTag) {
            var completedCallback;
            var url = API_HOST + "/v2/gateway/{0}/sensor/{1}".format(gatewayTag, apiTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 获取某个设备的执行器列表
        * @param gatewayTag 设备标识
        */
        getActuatorList: function (gatewayTag) {
            var completedCallback;
            var url = API_HOST + "/v2/gateway/{0}/actuatorlist".format(gatewayTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
        * 获取某个执行器的信息
        * @param gatewayTag 设备标识
        * @param apiTag     执行器标识
        */
        getActuatorInfo: function (gatewayTag, apiTag) {
            var completedCallback;
            var url = API_HOST + "/v2/gateway/{0}/actuator/{1}".format(gatewayTag, apiTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 获取某个设备的摄像头列表
        * @param gatewayTag 设备标识
        */
        getCameraList: function (gatewayTag) {
            var completedCallback;
            var url = API_HOST + "/v2/gateway/{0}/cameralist".format(gatewayTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 获取某个摄像头的信息
        * @param gatewayTag 设备标识
        * @param apiTag     执行器标识
        */
        getCameraInfo: function (gatewayTag, apiTag) {
            var completedCallback;
            var url = API_HOST + "/v2/gateway/{0}/camera/{1}".format(gatewayTag, apiTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 获取某个设备的当前在/离线状态
        * @param gatewayTag
        */
        getGatewayOnOffLine: function (gatewayTag) {
            var completedCallback;
            var url = API_HOST + "/v2/gateway/{0}/onoffline".format(gatewayTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 获取某个设备的历史分页在/离线状态
        * @param gatewayTag
        * @param startDate
        * @param endDate
        * @param pageIndex
        * @param pageSize
        */
        getGatewayHistoryPagerOnOffLine: function (gatewayTag, startDate, endDate, pageIndex, pageSize) {
            var completedCallback;
            var url = API_HOST + "/v2/gateway/{0}/historypageronoffline".format(gatewayTag);
            var data = {};
            data.StartDate = startDate;
            data.EndDate = endDate;
            data.PageIndex = pageIndex;
            data.PageSize = pageSize;
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken, data);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
        * 获取某个设备的当前启/禁状态
        */
        getGatewayStatus: function (gatewayTag) {
            var completedCallback;
            var url = API_HOST + "/v2/gateway/{0}/Status".format(gatewayTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
        * 获取某个设备的所有传感器、执行器最新值
        * @param gatewayTag
        */
        getGatewayNewestData: function (gatewayTag) {
            var completedCallback;
            var url = API_HOST + "/v2/Gateway/{0}/NewestDatas".format(gatewayTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
        * 获取某个传感器的最新值
        * @param gatewayTag
        * @param sensorTag
        */
        getSensorNewestData: function (gatewayTag, sensorTag) {
            var completedCallback;
            var url = API_HOST + "/v2/Gateway/{0}/Sensor/{1}/NewestData".format(gatewayTag, sensorTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        *获取某个传感器的历史数据
        * @param gatewayTag
        * @param sensorTag
        * @param method  1，2，3，4，5对应分钟，小时，天，周，月
        * @param timeAgo 前几
        */
        getSensorHistoryData: function (gatewayTag, sensorTag, method, timeAgo) {
            var completedCallback;
            var data = {};
            data.Method = method;
            data.TimeAgo = timeAgo;
            var url = API_HOST + "/v2/Gateway/{0}/Sensor/{1}/HistoryData".format(gatewayTag, sensorTag);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken, data);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
         *获取某个传感器的历史分页数据
         * @param gatewayTag
         * @param sensorTag
         * @param startDate
         * @param endDate
         * @param pageIndex
         * @param pageSize
         */
        getSensorHistoryPagerData: function (gatewayTag, sensorTag, startDate, endDate, pageIndex, pageSize) {
            var completedCallback;
            var url = API_HOST + "/v2/Gateway/{0}/Sensor/{1}/HistoryPagerData".format(gatewayTag, sensorTag);
            var data = {};
            data.StartDate = startDate;
            data.EndDate = endDate;
            data.PageIndex = pageIndex;
            data.PageSize = pageSize;
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken, data);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
        * 获取某个执行器的最新值
        * @param gatewayTag
        * @param actuatorApi
        */
        getActuatorNewestData: function (gatewayTag, actuatorApi) {
            var completedCallback;
            var url = API_HOST + "/v2/Gateway/{0}/actuator/{1}/NewestData".format(gatewayTag, actuatorApi);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        *获取某个执行器的历史数据
        * @param gatewayTag
        * @param actuatorApi
        * @param method  1，2，3，4，5对应分钟，小时，天，周，月
        * @param timeAgo 前几
        */
        getActuatorHistoryData: function (gatewayTag, actuatorApi, method, timeAgo) {
            var completedCallback;
            var data = {};
            data.Method = method;
            data.TimeAgo = timeAgo;
            var url = API_HOST + "/v2/Gateway/{0}/actuator/{1}/HistoryData".format(gatewayTag, actuatorApi);
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken, data);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
        *获取某个执行器的历史分页数据
        * @param gatewayTag
        * @param actuatorApi
        * @param startDate
        * @param endDate
        * @param pageIndex
        * @param pageSize
        */
        getActuatorHistoryPagerData: function (gatewayTag, actuatorApi, startDate, endDate, pageIndex, pageSize) {
            var completedCallback;
            var url = API_HOST + "/v2/Gateway/{0}/actuator/{1}/HistoryPagerData".format(gatewayTag, actuatorApi);
            var data = {};
            data.StartDate = startDate;
            data.EndDate = endDate;
            data.PageIndex = pageIndex;
            data.PageSize = pageSize;
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken, data);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
        * 控制某个执行器
        * @param gatewayTag
        * @param actuatorApi
        * @param data
        */
        controlActuator: function (gatewayTag, actuatorApi, data) {
            var completedCallback;
            var url = API_HOST + '/developer/jsonpresend?func=control&gatewaytag=' + gatewayTag + '&apitag=' + actuatorApi + "&data=" + data;
            jsonp(url, function (res) {

                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        }
    };

    window.NLECloudAPI = NLECloudAPI;

})();


String.prototype.format = function (args) {
    var result = this;
    var reg;
    if (arguments.length > 0) {
        if (arguments.length === 1 && typeof (args) === "object") {
            for (var key in args) {
                if (args.hasOwnProperty(key) && args[key] !== undefined) {
                    reg = new RegExp("({)" + key + "(})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined) {
                    reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};