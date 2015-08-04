/* CalenderView.js Mon Jul 27 10:53:49 SGT 2015 */

var CalendarView = (function(_super) {
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

    __extends(CalendarView, _super);

    function CalendarView(view,data) {
        this.view = view;
        this.data = data ;
        this.today = new Date();
        this.day = this.today.getDate();
        this.month = this.today.getMonth()+1; 
        var dateArrStart=[];
        var recurArr=[];
        var descriptionArrrepeat =[];
        var eventsArr =[];
        this.year = this.today.getFullYear();
        var timeArr =[];
        this.destroy = __bind(this.destroy, this);
        this.resize = __bind(this.resize, this);
        CalendarView.__super__.constructor.call(this, this.view);
        this.initialiseMonthDay();
        this.getData();
        this.drawCalendar();
    }

CalendarView.prototype.initialiseMonthDay = function () {
 if(this.day < 10){
        this.day='0'+this.day
    } 
    if(this.month < 10){
        this.month='0'+this.month
    } 

}

     CalendarView.prototype.getData = function (){
  eventsArr =[];
    $.each(this.data, function(k,v) {
     dateArrStart=[];
     descriptionArrrepeat =[];
     timeArr =[];
     recurArr=[];
  for(var key in v)
  {
  if(String(key) == "c_calendar.start_date"){dateArrStart.push(v[key]);}
  if(String(key) == "c_calendar.description"){ descriptionArrrepeat.push(v[key]); }
  if(String(key) == "c_calendar.end_date"){ dateArrStart.push(v[key]); }
  if(String(key) == "c_calendar.repeat_frequency"){recurArr.push(v[key]); }
  if(String(key) == "c_calendar.start_time"){ timeArr.push(v[key]); }
  if(String(key) == "c_calendar.end_time"){ timeArr.push(v[key]); }
  } 
  
  (createEvent(dateArrStart,descriptionArrrepeat[0],recurArr,timeArr));

    })
    }

   function createEvent (date, description, recur , timeArr) {

   var startdata = new Date(date[0]);
   var enddata = new Date(date[1]);
  if(startdata.getDate() < 10){
    var ddstartdata='0'+startdata.getDate()
    } 
    if((startdata.getMonth()+1) < 10){
       var mmstartdata='0'+(startdata.getMonth()+1)
  } else{ var mmstartdata = (startdata.getMonth()+1)}
  
    if(enddata.getDate() < 10){
       var ddenddata='0'+enddata.getDate()
    } 
    if((enddata.getMonth()+1) < 10){
       var mmenddata='0'+(enddata.getMonth()+1)
    } else{ var mmenddata = (enddata.getMonth()+1)}
  
  var startyear = startdata.getFullYear();
  var endyear = enddata.getFullYear();

	
  switch(recur[0]){
  
  case "None":  if(timeArr[0]!= null && timeArr[1]!= null)
                {
                eventsArr.push({title :description,start:(date[1]+'T'+timeArr[1]),end:(date[0]+'T'+timeArr[0])});
                }
                else{
                eventsArr.push({title :description,start:date[1],end:date[0]})
                 }
                break;
   
  case "Yearly":  while(endyear <= startyear)
                 {
                  if(timeArr[0]!= null && timeArr[1]!= null)
                  {
  
                  eventsArr.push({title :description,start:(endyear+'-'+mmstartdata+'-'+ddstartdata+'T'+timeArr[1]),end:(endyear+'-'+mmenddata+'-'+ddenddata+'T'+timeArr[0])})
				  }else{
	        eventsArr.push({title :description,start:(endyear+'-'+mmstartdata+'-'+ddstartdata),end:(endyear+'-'+mmenddata+'-'+ddenddata)})
				  }
				  endyear++;
				  }
                   break;

  case "Monthly":  if( endyear == startyear)
                 {
  
                  while(mmenddata <= mmstartdata)
                 {
  
                  if(timeArr[0]!= null && timeArr[1]!= null)
                  {
                    
                 eventsArr.push({title :description,start:(endyear+'-'+mmenddata+'-'+ddenddata+'T'+timeArr[1]),end:(endyear+'-'+mmenddata+'-'+ddenddata+'T'+timeArr[0])})
				  }else{

				  eventsArr.push({title :description,start:(endyear+'-'+mmenddata+'-'+ddenddata),end:(endyear+'-'+mmenddata+'-'+ddenddata)})
				  }
				  mmenddata++;
                  if((mmenddata < 10)){mmenddata='0'+mmenddata}
				  }
				  }
				  else{
               
				  while( endyear <= startyear)
				  {
                     if(endyear != startyear){

				   while( mmenddata <= 12){
                  if(timeArr[0]!= null && timeArr[1]!= null)
                  {
                 eventsArr.push({title :description,start:(endyear+'-'+mmenddata+'-'+ddenddata+'T'+timeArr[1]),end:(endyear+'-'+mmenddata+'-'+ddenddata+'T'+timeArr[0])})
				  }else{
				  eventsArr.push({title :description,start:(endyear+'-'+mmenddata+'-'+ddenddata),end:(endyear+'-'+mmenddata+'-'+ddenddata)})
				  }
                  mmenddata++; if((mmenddata < 10)){mmenddata='0'+mmenddata}
                  }
				  }
				  else{
				  
				  while( mmenddata <= mmstartdata){
                  if(timeArr[0]!= null && timeArr[1]!= null)
                  {
                  eventsArr.push({title :description,start:(endyear+'-'+mmenddata+'-'+ddenddata+'T'+timeArr[1]),end:(endyear+'-'+mmenddata+'-'+ddenddata+'T'+timeArr[0])})
				  }else{
				  eventsArr.push({title :description,start:(endyear+'-'+mmenddata+'-'+ddenddata),end:(endyear+'-'+mmenddata+'-'+ddenddata)})
				  }
                  mmenddata++; if((mmenddata < 10)){mmenddata='0'+mmenddata}
                  }
				  
				  }
				  endyear++;mmenddata =1; if((mmenddata < 10)){mmenddata='0'+mmenddata}
				  
				  }
				  }
                   break;
  
  
  case "Daily":    var between = []
                   var currentDate = new Date(date[1]),
                    end = new Date(date[0]);
                   while (currentDate <= end) {
                   between.push(formatDate(new Date(currentDate)));
                   currentDate.setDate(currentDate.getDate() + 1);
                  }
                  if(timeArr[0]!= null && timeArr[1]!= null)
                  {
                    jQuery.each(between, function(index, item) {
                   eventsArr.push({title :description,start:(item+'T'+timeArr[1]),end:(item+'T'+timeArr[0])})
                      });
                
				  }else{
				  jQuery.each(between, function(index, item) {
                  eventsArr.push({title :description,start:item,end:item})
                      });
				  }
                 
                   break;

  }
  

   };

CalendarView.prototype.drawCalendar = function (){

$('#calendar').fullCalendar({
       theme:true,
       firstDay :1,
        height :390,
			header: {
				left: 'prevYear,nextYear,today,prev',
				center: 'title',
				right: 'next,month,agendaWeek,agendaDay'
			},
           buttonText: {
             today:    'Today',
             month:    'Month',
             week:     'Week',
             day:      'Day'
        },
      eventDurationEditable: false,
			defaultDate: this.year+'-'+this.month+'-'+this.day,
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: eventsArr,
             eventRender: function(event, element) {
   element.attr('title', event.title);
   event.startEditable = false;
         element.attr('href', 'javascript:void(0);');
        element.click(function() {
           $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
  
  if((event.end) != null ){
  $("#endTime").html("End: " + moment(event.end).format('MMM Do h:mm A'));}
  
  $("#eventInfo").html(event.title);
      $("#eventContent").dialog({
        autoOpen: true
    });
       
   $("#eventContent").dialog("widget").position({
       my: 'bottom',
       at: 'bottom',
       of: element
    });
  
    $("#eventContent").dialog({ modal: false, title: 'Event Details', width:100});
   });
} 
      
});


}
   function formatDate  (date) {
    var d = new Date(date),
     month = '' + (d.getMonth() + 1),
       day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

    CalendarView.prototype.resize = function(evt) {
 if ( this.view.position.width < evt.width)
{

var width = 800;
$("#" + this.id + "-action-bar-div").width(width), $("#" + this.id + "-vroot").css({
                    position: "absolute",
                    top: "0px",
                    left: width / 4
                }), 
$("#calendar").fullCalendar('option', 'height', width-100);
$("#calendar").width(width);
 }
else{
 $("#" + this.id + "-action-bar-div").width(evt.width),
                $("#" + this.id + "-vroot").css({
                position: "absolute",
                top: "365px",
                left: "937px"
           }),
$("#calendar").fullCalendar('option', 'height',evt.height);
$("#calendar").width(evt.width);
//width :361
//height : 433

 }
    };

    CalendarView.prototype.destroy = function() {
        
    };


   return CalendarView;

})(BaseView);

elx.CalendarView = CalendarView;


