var PieHighchartView = (function(_super) {
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

    __extends(PieHighchartView, _super);

    function PieHighchartView(view, leveloneData, title) {
        this.view = view;
        this.leveloneData = leveloneData;
        this.title = title;
        this.destroy = __bind(this.destroy, this);
        this.resize = __bind(this.resize, this);
        PieHighchartView.__super__.constructor.call(this, this.view);
        this.div = $("#" + this.id).addClass("ui-widget").css("background-color","#ffffff");
        this.parent = this.div.parent();
        this.chart1Click();

    }


    PieHighchartView.prototype.setChart = function(chartOption) {
        if (this.chart) this.destroy();
        this.chart = new Highcharts.Chart(chartOption);
         this.chart = $('#'+this.id).highcharts();
         this.resize({
            width: this.parent.width(),
            height: this.parent.height()
        });
    };

    PieHighchartView.prototype.resize = function(evt) {
      if(this.chart){

if (this.chart.containerWidth < evt.width) {
     this.chart.options.title.style.fontSize = "2em", 
     this.chart.options.legend.itemStyle.fontSize = "1.3em",
     this.chart.options.tooltip.style.fontSize = "1.3em", 
    this.chart.options.plotOptions.pie.dataLabels.style.fontSize = "1.3em", 
     this.chart = new Highcharts.Chart(this.chart.options);
     var width = 800;
    $("#" + this.id + "-action-bar-div").width(width), $("#" + this.id + "-vroot").css({
                    position: "absolute",
                    top: "0px",
                    left: width / 4
                }), 
                      this.chart.setSize(width, width - 100, false), 
                       this.chart.redraw();
            } else 
{                             this.chart.options.title.style.fontSize = "1em",
			this.chart.options.legend.itemStyle.fontSize = "0.8em", 
			this.chart.options.tooltip.style.fontSize = "0.8em",
                              
                               this.chart.options.plotOptions.pie.dataLabels.style.fontSize = "0.8em",  
			this.chart = new Highcharts.Chart(this.chart.options),
                      $("#" + this.id + "-action-bar-div").width(evt.width),
                $("#" + this.id + "-vroot").css({
                position: "absolute",
                top: "25px",
                left: "586px"
            }),

        this.chart.setSize(evt.width, evt.height, false);
        this.chart.redraw();
      }
      }
    };

    PieHighchartView.prototype.destroy = function() {
        this.chart.destroy();
    };

    PieHighchartView.prototype.chart1 = function() {
    
        return {

 chart: {
        renderTo: this.id,
        defaultSeriesType: 'Pie',
        events: {},
        borderWidth: 0.5,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    },
    credits: {
            enabled: false
        },
  legend: {
   enabled: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
              itemStyle: {
                 fontSize:"0.8em",
                 font: 'Verdana, sans-serif'
                
              }
        },
            title: {
                text: this.title,
               style:{ fontSize: "1em",fontFamily: 'Verdana, sans-serif',fontWeight:'Bold'}
            },
            tooltip: {
                
                style: {
                    fontSize: "0.8em"
                },
                headerFormat: '<span style ="font-size:0.8em">{point.key}</span><br/>',
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
               plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y} ',
                    style: {
                       fontSize: "0.8em",
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
            series: [{
                type: 'pie',
                name: 'Count',
                data: this.leveloneData
            }]

        };
    };

    PieHighchartView.prototype.chart1Click = function() {
      var options = this.chart1();
      this.setChart(options);
    };



    return PieHighchartView;

})(BaseView);

elx.PieHighchartView = PieHighchartView;
