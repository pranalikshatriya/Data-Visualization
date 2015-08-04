var UsageColumnHighchartView = (function(_super) {
    __bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

    __extends(UsageColumnHighchartView, _super);

    function UsageColumnHighchartView(view, leveloneData, UsersArr, title) {
        this.view = view;
        this.leveloneData = leveloneData;
        this.title = title;
        this.UsersArr = UsersArr;
        this.destroy = __bind(this.destroy, this);
        this.resize = __bind(this.resize, this);
        UsageColumnHighchartView.__super__.constructor.call(this, this.view);
        this.div = $("#" + this.id).addClass("ui-widget").css("background-color", "#ffffff");
        this.parent = this.div.parent();
        this.chart1Click();

    }


    UsageColumnHighchartView.prototype.setChart = function(chartOption) {
        if (this.chart) this.destroy();
        this.chart = new Highcharts.Chart(chartOption);
        this.chart = $('#' + this.id).highcharts();
        this.resize({
            width: this.parent.width(),
            height: this.parent.height()
        });
    };

    UsageColumnHighchartView.prototype.resize = function(evt) {
        if (this.chart) {
            this.chart.setSize(evt.width, evt.height, false);
            this.chart.redraw();
        }
    };

    UsageColumnHighchartView.prototype.destroy = function() {
        this.chart.destroy();
    };

    UsageColumnHighchartView.prototype.chart1 = function() {

        return {

            chart: {
                renderTo: this.id,
                type: 'column'
            },
credits :{ enabled : false},

            xAxis: {

                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '9px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
                title: {
                    enabled: true,
                    text: 'Dashboards',
                    style: {
                        fontSize: '9px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Count'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    },
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: _.bind(this.chart2Click, this),

                        }
                    }

                }
            },

            title: {
                text: this.title
            },


            tooltip: {

                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
            },

            series: [{
                name: '',
                colorByPoint: true,
                data: this.leveloneData
            }]

        };
    };

    UsageColumnHighchartView.prototype.chart1Click = function() {
        var options = this.chart1();
        this.setChart(options);
    };
    UsageColumnHighchartView.prototype.chart2Click = function(evt) {

        var name = [evt.currentTarget.name];
        var tempArr = this.UsersArr;
        if (this.UsersArr.length > 1) {
 console.log( " name ",name);
            var sel =

                {
   
                    type: "value",
                    col: "v_logging_audit.template_name",
                    sels: name

                };
            elx.host.utils.notifySelect(this.view, sel);



        } else {
            var sel = {
                type: "and-value",
                list: [{
                    type: "value",
                    col: "v_logging_audit.userid",
                    values: this.UsersArr
                }, {
                    type: "value",
                    col: "v_logging_audit.template_name",
                    values: name
                }]
            };
            elx.host.utils.notifySelect(this.view, sel);
        }



    };


    return UsageColumnHighchartView;

})(BaseView);

elx.UsageColumnHighchartView = UsageColumnHighchartView;