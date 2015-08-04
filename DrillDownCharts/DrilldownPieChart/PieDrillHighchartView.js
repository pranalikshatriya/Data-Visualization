var PieDrillHighchartView=function(t){function i(t,e,s,o,p){this.view=t,this.leveloneData=e,this.drilldownData=s,
this.destroy=__bind(this.destroy,this),this.resize=__bind(this.resize,this),
i.__super__.constructor.call(this,this.view),this.div=$("#"+this.id).addClass("ui-widget").css("background-color","#ffffff"),
this.parent=this.div.parent(),this.subtitle=o,this.title=p,this.newoptions={},
this.chart1Click()}return __bind=function(t,i){return function(){return t.apply(i,arguments)}},
__hasProp={}.hasOwnProperty,__extends=function(t,i){function e(){this.constructor=t}for(var s in i)__hasProp.call(i,s)&&(t[s]=i[s]);
return e.prototype=i.prototype,t.prototype=new e,t.__super__=i.prototype,t},__extends(i,t),
i.prototype.setChart=function(t){this.chart&&this.destroy(),this.chart=new Highcharts.Chart(t),this.chart=$("#"+this.id).highcharts(),
this.resize({width:this.parent.width(),height:this.parent.height()})},i.prototype.resize=function(t)
{
/*if(this.chart)
if(this.chart.containerWidth<t.width)
{this.newoptions.title.style.fontSize="1.5em",
this.newoptions.tooltip.style.fontSize="1em",
this.newoptions.subtitle.style.fontSize="1em",
this.newoptions.plotOptions.series.dataLabels.style.fontSize="1em",
this.chart=new Highcharts.Chart(this.newoptions);
{
var i=.33*this.chart.containerWidth+this.chart.containerWidth;
.2*$("#"+this.id+"-vroot").height()+$("#"+this.id+"-vroot").height()}$("#"+this.id+"-action-bar-div").width(i+100),
$("#"+this.id+"-vroot").css({position:"absolute",top:"0px",left:i/2}),
this.chart.setSize(i+100,i+100,!1),
this.chart.redraw()
}else this.newoptions.title.style.fontSize="1.5em",
this.newoptions.tooltip.style.fontSize="1em",
this.newoptions.subtitle.style.fontSize="1em",
this.newoptions.plotOptions.series.dataLabels.style.fontSize="1em",
this.chart=new Highcharts.Chart(this.newoptions),
$("#"+this.id+"-action-bar-div").width(t.width),
$("#"+this.id+"-vroot").css({position:"absolute"}),this.chart.setSize(t.width,t.height,doAnimation=!0),
this.chart.redraw()*/
},


i.prototype.destroy=function(){this.chart.destroy()},
i.prototype.chart1=function(){return Highcharts.setOptions({lang:{drillUpText:"Back"}}),
{chart:{style:{fontSize:"1em"},borderWidth:0,renderTo:this.id,type:"pie"},credits:{style:{fontSize:"0.7em"},enabled:!0},legend:{enabled: !0,verticalAlign: 'top'},title:{style:{fontSize:"1.5em"},text:this.title},plotOptions:{series:{dataLabels:{enabled:!0,showInLegend:!0,format:"{point.name}: {point.y}",style:{fontSize:"1em"}}}},tooltip:{style:{fontSize:"1em"},headerFormat:'<span style="color:{point.color}">{series.name}</span><br>',pointFormat:'<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'},subtitle:{style:{fontSize:"1em"},text:this.subtitle},series:[{name:"Type: ",colorByPoint:!0,data:this.leveloneData}],drilldown:{series:this.drilldownData}}},i.prototype.chart1Click=function(){this.newoptions=this.chart1(),this.setChart(this.newoptions)},i}(BaseView);elx.PieDrillHighchartView=PieDrillHighchartView;