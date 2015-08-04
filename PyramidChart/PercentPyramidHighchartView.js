var CumulativePyramidHighchartView = (function(_super) {
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

    __extends(CumulativePyramidHighchartView, _super);

    function CumulativePyramidHighchartView(view, T1, T2, T3,T4,title) {
        this.view = view;
        this.T1 = T1;
        this.T2 = T2;
        this.T3 = T3;
        this.T4 = T4;
        this.title = title;
      
        this.destroy = __bind(this.destroy, this);
        this.resize = __bind(this.resize, this);
        CumulativePyramidHighchartView.__super__.constructor.call(this, this.view);
        this.div = $("#" + this.id).addClass("ui-widget").css("background-color", "#ffffff");
        this.parent = this.div.parent();
        this.drawChart();

    }


    CumulativePyramidHighchartView.prototype.setChart = function(chartOption) {
        if (this.chart) this.destroy();
        var colors = 
        this.chart = new Highcharts.Chart(chartOption);
         this.chart = $('#'+this.id).highcharts();
        
         this.resize({
            width: this.parent.width(),
            height: this.parent.height()
        });
    };

    CumulativePyramidHighchartView.prototype.resize = function(evt) {
      if(this.chart){
        this.chart.setSize(evt.width, evt.height, false);
        this.chart.redraw();
      }
      
    };

    CumulativePyramidHighchartView.prototype.destroy = function() {
        this.chart.destroy();
    };

    CumulativePyramidHighchartView.prototype.getOptions = function() {
    
        return {
          chart: {
            renderTo: this.id,
            type: 'pyramid',
             borderWidth: 0.5, 
            marginRight: 150
        },
        title: {
            text: this.title,
            x: -50
        },
   colors : ["#6390bc","#7cb5ec","#353539","#434348","#73bd64","#90ed7d","#c58249","#f7a35c"],
  credits :{ enabled: false},
                plotOptions: {
            series: {
                dataLabels: {                
                    enabled:true,
                    formatter: function() {
        if ( typeof this.key != 'undefined') {
          return this.key +'<br>'+this.y+'%';
        } else {
          return null;
        }
    },
                    // format: '<b>{point.name}</b> <br> <b>( {point.y}% )</b>',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                },
  cursor:'pointer',
    point:{
   events: {
          click: _.bind(this.chartClick, this)
            }}
  }},
        legend: {
            enabled: false
        },
  tooltip: {
  enabled: false},
        series: [{
            name: 'Pass Count',
            data: [
                ['Tier1 (Activity =1)',   parseFloat(((this.T1/(this.T1 +  this.T2 + this.T3 +  this.T4))*100).toFixed(2))],
                ['', parseFloat( 100-((this.T1/(this.T1 +  this.T2 + this.T3 +  this.T4))*100).toFixed(2))],
                ['Tier2 (Activity >=3 < 8)', parseFloat(((this.T2/(this.T1 +  this.T2 + this.T3 +  this.T4))*100).toFixed(2))],
                ['',  parseFloat(100-((this.T2/(this.T1 +  this.T2 + this.T3 +  this.T4))*100).toFixed(2))],
                ['Tier3 (Activity >=8 )', parseFloat(((this.T3/(this.T1 +  this.T2 + this.T3 +  this.T4))*100).toFixed(2))],
                ['', parseFloat( 100-((this.T3/(this.T1 +  this.T2 + this.T3 +  this.T4))*100).toFixed(2))],
                ['Tier4 (PV/GRL)',  parseFloat(((this.T4/(this.T1 +  this.T2 + this.T3 +  this.T4))*100).toFixed(2))],
                ['', parseFloat( 100-((this.T4/(this.T1 +  this.T2 + this.T3 +  this.T4))*100).toFixed(2))],
            ]
 ,
  keys: ['name','y']
         }]
 

        };
    };

    CumulativePyramidHighchartView.prototype.drawChart = function() {
      var options = this.getOptions();
      this.setChart(options);
    };
   

   CumulativePyramidHighchartView.prototype.chartClick = function(evt){
     var selData = "0";
      switch(evt.currentTarget.name)
                 {
                  case 'Tier1 (Activity =1)' : selData = "1";break;
                  case 'Tier2 (Activity >=3 < 8)' : selData = "2";break;
                  case 'Tier3 (Activity >=8 )' : selData = "3";break;
                  case 'Tier4 (PV/GRL)' : selData = "4";break;
                  default : selData = "0";break;
                  }            
               elx.dashboard.view.notifySelect(this.view.id,{
                type: "value",
                col: "s_scef_cumulative.tier",
                sels: [selData]
               })
 };


    return CumulativePyramidHighchartView;

})(BaseView);

elx.CumulativePyramidHighchartView = CumulativePyramidHighchartView;
