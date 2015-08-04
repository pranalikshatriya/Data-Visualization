var LineHighchartView = (function(_super) {
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

    __extends(LineHighchartView, _super);

    function LineHighchartView(view, finalData, monthData) {
        this.view = view;
        this.finalData = finalData;
        this.monthData = monthData;
        this.destroy = __bind(this.destroy, this);
        this.resize = __bind(this.resize, this);
        LineHighchartView.__super__.constructor.call(this, this.view);
        this.div = $("#" + this.id).addClass("ui-widget").css("background-color","#ffffff");
        this.parent = this.div.parent();
        this.chart1Click();

    }


    LineHighchartView.prototype.setChart = function(chartOption) {
        if (this.chart) this.destroy();
        this.chart = new Highcharts.Chart(chartOption);
         this.chart = $('#'+this.id).highcharts();
         this.resize({
            width: this.parent.width(),
            height: this.parent.height()
        });
    };

    LineHighchartView.prototype.resize = function(evt) {
      if(this.chart){
       if (this.chart.containerWidth < evt.width) {
     this.chart.options.title.style.fontSize = "2em", 
     this.chart.options.legend.itemStyle.fontSize = "1.3em",
     this.chart.options.tooltip.style.fontSize = "1.3em", 
     this.chart.options.xAxis[0].labels.style.fontSize = "1.3em", 
      this.chart.options.xAxis[0].title.style.fontSize = "1.3em", 
      this.chart.options.yAxis[0].labels.style.fontSize = "1.3em", 
      this.chart.options.yAxis[0].title.style.fontSize = "1.3em", 
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
                               this.chart.options.xAxis[0].labels.style.fontSize = "0.8em", 
      this.chart.options.xAxis[0].title.style.fontSize = "0.8em", 
      this.chart.options.yAxis[0].labels.style.fontSize = "0.8em", 
      this.chart.options.yAxis[0].title.style.fontSize = "0.8em", 
                             
			this.chart = new Highcharts.Chart(this.chart.options),
                      $("#" + this.id + "-action-bar-div").width(evt.width),
                $("#" + this.id + "-vroot").css({
                position: "absolute",
                top: "417px",
                left: "586px"
            }),

        this.chart.setSize(evt.width, evt.height, false);
        this.chart.redraw();
      }
      }
    };

    LineHighchartView.prototype.destroy = function() {
        this.chart.destroy();
    };

    LineHighchartView.prototype.chart1 = function() {
   
        return {
chart: {
        renderTo: this.id,
        defaultSeriesType: 'line',
        borderWidth: 0.5, 
         events: {}
    },
   credits: {
            enabled: false
        },
        title: {
            text: 'Number of Solemnisation Over Past 10 Years',
            style:{ fontSize: "1em",fontFamily: 'Verdana, sans-serif',fontWeight:'Bold'}
        },
        subtitle: {
           
        },
        xAxis: {
           
            categories: this.monthData,
            labels: {
                rotation: -45,
                style: {
                    fontSize: "0.8em",
                    fontFamily: 'Verdana, sans-serif'
                }
            },
              title:{
                     margin :20,
                     enabled: true,
                     text: 'Year',
                     style:{ fontSize: "0.8em",fontFamily: 'Verdana, sans-serif'}
                  } 
        },
        yAxis: {
            title: {
                 text: 'Number of Solemnisation',
               style:{ fontSize: "0.8em",fontFamily: 'Verdana, sans-serif'}
            },
            min: 0,
             labels: {
                    style: {
                    fontSize: "0.8em",
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            shared: true,
           style: {
                    fontSize: "0.8em"
                },
           headerFormat: '<span style ="font-size:0.8em">{point.key}</span><br/>'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            itemStyle: {
                 fontSize:"0.8em",
                 font: 'Verdana, sans-serif'
                
              }
        },
        series: this.finalData
 

        };
    };

    LineHighchartView.prototype.chart1Click = function() {
      var options = this.chart1();
      this.setChart(options);
    };



    return LineHighchartView;

})(BaseView);

elx.LineHighchartView = LineHighchartView;
