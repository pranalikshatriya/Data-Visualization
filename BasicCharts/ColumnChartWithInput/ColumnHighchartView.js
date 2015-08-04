var ColumnHighchartView = (function(_super) {
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

    __extends(ColumnHighchartView, _super);

    function ColumnHighchartView(view, options, title) {
        this.view = view;
        this.options = options;
        this.destroy = __bind(this.destroy, this);
        this.resize = __bind(this.resize, this);
        ColumnHighchartView.__super__.constructor.call(this, this.view);
        this.div = $("#" + this.id).addClass("ui-widget").css("background-color","#ffffff");
        this.parent = this.div.parent();
        this.buildHeader().appendTo(this.div);
        this.chartcontainer = $("<div>").appendTo(this.div);
        this.title = title;
        this.chart1Click();
        var _this = this;
        $("input:radio", this.header).click(function() {
            _this.chart1Click();
        });
    }

    ColumnHighchartView.prototype.getInfo = function(parent) {
        return $('input:checked',this.header).val();
    }

    ColumnHighchartView.prototype.buildHeader = function() {
     // this.header = $("<div style='background-color: #ffffff;height :30px;margin:5px;' >");
      this.header = $("<div style='background-color: #ffffff;height :15px;margin:1px;' >");
      this.header.append('<input style="margin-right:4px;line-height :15px" type="radio" name="radio" value="Solemnisation" checked="checked" />Solemnisation</label>');
      this.header.append('<input style="margin-left:6px;margin-right:4px;line-height :15px" type="radio" name="radio" value="Div" />Within Division</label>');
      this.header.append('<input style="margin-left:6px;margin-right:4px,line-height :15px" type="radio" name="radio" value="CS" />Within CS</label>');
      return this.header;
    }

    ColumnHighchartView.prototype.getdata = function(info) {
        var nest='';
      var newfinalData =[];
  switch (info){
  
  case "Solemnisation":
                          nest = d3.nest()
                         .key(function(d) { return d.Solemniser;})
                         .rollup(function(d) { 
                         return d3.sum(d, function(g) {return g.Solemnisation; });
                         }).entries(this.options);
                         break;                              
 
  case "Div":
                      nest = d3.nest()
                     .key(function(d) { return d.Solemniser;})
                     .rollup(function(d) { 
                      return d3.sum(d, function(g) {return g.Div; });
                      }).entries(this.options);
                       break;
               
  case "CS":      nest = d3.nest()
                 .key(function(d) { return d.Solemniser;})
                  .rollup(function(d) { 
                  return d3.sum(d, function(g) {return g.CS; });
                    }).entries(this.options);
                  break;

 case "default":
                          nest = d3.nest()
                         .key(function(d) { return d.Solemniser;})
                         .rollup(function(d) { 
                         return d3.sum(d, function(g) {return g.Solemnisation; });
                         }).entries(this.options);
                          break;
  
  }

         nest.forEach(function(d) {
         newfinalData.push([d.key,d.values]);
         });

     newfinalData.sort(function(a, b){ return d3.descending(a[1], b[1]); })
   
      return _.first(newfinalData,10);
    };

    ColumnHighchartView.prototype.setChart = function(chartOption) {
        if (this.chart) this.destroy();
        this.chart = new Highcharts.Chart(chartOption);
        this.chart = this.chartcontainer.highcharts();
          this.resize({
            width: this.parent.width(),
            height: this.parent.height()
        });
    };

    ColumnHighchartView.prototype.resize = function(evt) {
      //this.div.width(evt.width).height(evt.height);
     // this.chartcontainer.width(evt.width).height(evt.height - this.header.height());
 var width = 800;
      if(this.chart){
       if (this.chart.containerWidth < evt.width) {
     this.div.width(width).height(width-100);
     this.chartcontainer.width(width).height((width-100) - this.header.height());
      this.chart.options.title.style.fontSize = "2em",
      this.chart.options.xAxis[0].title.style.fontSize = "1.3em", 
      this.chart.options.xAxis[0].labels.style.fontSize = "1.3em", 
      this.chart.options.yAxis[0].title.style.fontSize = "1.3em", 
      this.chart.options.yAxis[0].labels.style.fontSize = "1.3em", 
      this.chart.options.tooltip.style.fontSize = "1.3em", 
      this.chart.options.series[0].dataLabels.style.fontSize = "1.3em", 
       this.chart = new Highcharts.Chart(this.chart.options);
      // var width = (0.33 *this.chart.containerWidth) + this.chart.containerWidth;
           
       $("#" + this.id + "-action-bar-div").width(width), 
       $("#" + this.id + "-vroot").css({
                    position: "absolute",
                    top: "0px",
                    left: width / 4
                }),

        this.chart.setSize(width, width-100, false);
        this.chart.redraw();

       }
       else{
     this.div.width(evt.width).height(evt.height);
     this.chartcontainer.width(evt.width).height(evt.height - this.header.height());
      this.chart.options.title.style.fontSize = "1em",
      this.chart.options.xAxis[0].title.style.fontSize = "0.8em", 
      this.chart.options.xAxis[0].labels.style.fontSize = "0.8em", 
      this.chart.options.yAxis[0].title.style.fontSize = "0.8em", 
      this.chart.options.yAxis[0].labels.style.fontSize = "0.8em", 
      this.chart.options.tooltip.style.fontSize = "0.8em",
     this.chart.options.series[0].dataLabels.style.fontSize = "0.8em", 
      this.chart = new Highcharts.Chart(this.chart.options);
       $("#" + this.id + "-action-bar-div").width(evt.width), 
       $("#" + this.id + "-vroot").css({
                    position: "absolute",
                    top: "25px",
                    left: "0px",
                }),
        this.chart.setSize(evt.width, evt.height, false);
        this.chart.redraw();
       }
      }
    };

    ColumnHighchartView.prototype.destroy = function() {
        this.chart.destroy();
    };

    ColumnHighchartView.prototype.chart1 = function(data,color) {
        return {
            chart: {
                renderTo: this.chartcontainer[0],
                defaultSeriesType: 'column',
                borderWidth: 0.5,
                events: {}
            },
            credits: {
                style: {
                    fontSize: "0.7em"
                },
                enabled: false
            },
            title: {
                text: 'Top 10 Solemniser' + this.title,
                style: {
                    fontSize:  "1em",
                    fontFamily: 'Verdana, sans-serif',
                    fontWeight: 'Bold'
                }
            },
            subtitle: {
                text: ''
            },
            xAxis: {

                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize:  "0.8em",
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
                title: {
                    enabled: true,
                    margin: 5,
                    text: 'Licensed Solemnizer',
                    style: {
                        fontSize: "0.8em",
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Solemnisation',
                    //text: yText + " Count",
                    style: {
                        fontSize:  "0.8em",
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
                labels: {
                    style: {
                        fontSize:  "0.8em",
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '',
               style: {
                    fontSize: "0.8em"
                },
                pointFormat: 'Solemnisation: <b>{point.y}</b>'
            },
            series: [{
                name: 'Solemnisation',
                data: data,
                color: color,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y}', // one decimal
                    y: 3, // 10 pixels down from the top
                    style: {
                        fontSize:  "0.8em",
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        };
    };

    ColumnHighchartView.prototype.chart1Click = function() {
      var info = this.getInfo()
      var data = this.getdata(info);
     var color =  "#7cb5ec";
  switch(info){
case "Solemnisation" :  color = "#7cb5ec"; break;
case "Div" :  color = "#90ed7d"; break;
case "CS" :  color = "#f7a35c"; break;
default :  color = "#7cb5ec"; break;
}
    
      var options = this.chart1(data,color);
      
      this.setChart(options);
    
    };

  

    return ColumnHighchartView;

})(BaseView);

elx.ColumnHighchartView = ColumnHighchartView;
