var BudgetChartDistrict;

BudgetChartDistrict = (function () {

    function BudgetChartDistrict(parent, view, settings) {
	var parameters = {};
		this.div = parent;
		this.view = view;
		this.settings = settings || {};
        this.rootClick = 0;
        this.m =  this.settings.margin.left;
        this.w = 1500;
	    this.h = 800;
		this.maxLabel = 150;
       this.duration = 500;
		this.radius = 5;
		this.Fselect = {
		    spendField: "sum_Federal",
		    actField: "sum_Federal",
		    sumField: ["Federal"],
		    sourceField: ["level1", "level2", "level3", "level4", "value"]
		}; 
		
	this.colors = ["#8d8ee1", "#f8aa38", "#1e7145", "#99b433", "#f7614b", "#3CB371", "#BA55D3", "#c19e9e",
			"#a8c5a8", "#9595bc", "#e97878", "#c995ce","#aaed94", "#557e55", "#5f5fa4", "#ff9a9a",
	       "#6a5252", "#e28274", "#DAA520", "#b8204e", "#1c6276", "#a6a739", "#D2B48C", "#FFA500",
		   "#48D1CC","#f9a03f", "#edd382", "#d45113", "#692b85", "#f6872a",
	        "#f2f3ae", "#48D1CC","#f9a03f", "#edd382","#d45113", "#692b85", "#f6872a", "#8d8ee1",
			"#f8aa38", "#1e7145", "#99b433", "#f7614b","#3CB371", "#BA55D3", "#c19e9e", "#a8c5a8",
			"#9595bc", "#e97878", "#c995ce","#aaed94","#557e55", "#5f5fa4", "#ff9a9a", "#6a5252",
			"#8d8ee1", "#f8aa38", "#1e7145", "#99b433", "#f7614b", "#3CB371", "#BA55D3", "#c19e9e",
			"#a8c5a8", "#9595bc", "#e97878", "#c995ce","#aaed94", "#557e55", "#5f5fa4", "#ff9a9a",
			"#6a5252", "#e28274", "#DAA520", "#b8204e", "#1c6276", "#a6a739", "#D2B48C", "#FFA500",
			"#f2f3ae", "#48D1CC","#f9a03f", "#edd382","#d45113", "#692b85", "#f6872a", "#8d8ee1",
			"#f8aa38", "#1e7145", "#99b433", "#f7614b","#3CB371", "#BA55D3", "#c19e9e", "#a8c5a8",
			"#9595bc", "#e97878", "#c995ce","#aaed94","#557e55", "#5f5fa4", "#ff9a9a", "#6a5252",
			"#e28274", "#DAA520", "#b8204e", "#1c6276","#a6a739", "#D2B48C", "#FFA500", "#f2f3ae",
			"#48D1CC","#f9a03f", "#edd382", "#d45113", "#692b85", "#f6872a",
			"#f8aa38", "#1e7145", "#99b433", "#f7614b","#3CB371", "#BA55D3", "#c19e9e", "#a8c5a8",
			"#9595bc", "#e97878", "#c995ce","#aaed94","#557e55", "#5f5fa4", "#ff9a9a", "#6a5252",
			"#e28274", "#DAA520", "#b8204e", "#1c6276","#a6a739", "#D2B48C", "#FFA500", "#f2f3ae",
			"#48D1CC","#f9a03f", "#edd382", "#d45113", "#692b85", "#f6872a",
			"#8d8ee1", "#f8aa38", "#1e7145", "#99b433", "#f7614b", "#3CB371", "#BA55D3", "#c19e9e",
			"#a8c5a8", "#9595bc", "#e97878", "#c995ce","#aaed94", "#557e55", "#5f5fa4", "#ff9a9a",
			"#6a5252", "#e28274", "#DAA520", "#b8204e", "#1c6276", "#a6a739", "#D2B48C", "#FFA500",
			"#f2f3ae", "#48D1CC","#f9a03f", "#edd382","#d45113", "#692b85", "#f6872a", "#8d8ee1"
			
		];

		this.leveloneArr = [];
		this.leveloneArrUniq = [];
		this.leveltwoArr = [];
		this.leveltwoArrUniq = [];
		this.levelthreeArr = [];
		this.levelthreeArrUniq = [];
		this.levelfourArr = [];
		this.levelfourArrUniq = [];
		this.root = {};
		var final_data = this.settings.dataone;
			var nest = d3.nest()
			.key(function(d) {
				return d.level1;
			})
			.key(function(d) {
				return d.level2;
			})
			.key(function(d) {
				return d.level3;
			})
			.key(function(d) {
				return d.level4;
			})
			.entries(final_data);
		this.colorMap = this.buildColorMap(final_data);
        this.root.values = nest;    //should show data in level format
		
        this.root.x0 = this.h / 2;
		this.root.y0 = 0;
        this.alreadySummed = true;
        this.value = 1;
        
		
		
        this.d3select(this.w, this.h, this.m);
        
	    this.initialize();
              this.setup();
              this.togglesetup();


    }

	BudgetChartDistrict.prototype.buildColorMap = function (rawdata) {
		var map = {};
   		var vArrs = _.map(rawdata, function(d){
			var dd = _.pick(d, "level1","level2","level3","level4");
			return _.values(dd);
		});
               
		var values = _.sortBy(_.uniq(_.flatten(vArrs)), function(d){ return d; });
     	var counter = 0;
		for(var i = 0; i < values.length;i++){
		   if ( typeof values[i] != 'null'){
			if(counter >= this.colors.length) counter = 0;
			var key = values[i].split('-');
			map[key[0]] = this.colors[i];
			counter++;
		}
		}
		
		return map;
	}

	BudgetChartDistrict.prototype.retDes = function(d) {
		var ret = d.source_Description;
		ret = (String(ret).length > 25) ? String(ret).substr(0, 22) + "..." : ret;
		return ret;
	}

  BudgetChartDistrict.prototype.buildChartElements = function() {
     $("<div class='chartBody'>").appendTo(this.div)
	var tooltip = $("<div class='toolTip'>").appendTo(this.div)
	$("<div class='head'>").appendTo(tooltip)
	$("<div class='header1'>").appendTo(tooltip)
	$("<div class='header2'>").appendTo(tooltip)
	$("<div class='federalDiv'>").appendTo(tooltip)
    $("<div class='fedSpend'>").appendTo(tooltip)
            }

	BudgetChartDistrict.prototype.d3select = function(w, h, m) {
      
		this.tree = d3.layout.tree();
		
		this.tree.children(function(d) {
		 if(typeof d.values != 'undefined'){
        return d.values;
           };
        });
		
	
		this.tree.size([this.h - 420, this.w - 500]);

		this.diagonal = d3.svg.diagonal()
		.projection(function(d) {
			return [d.y, d.x];
		});

             this.vis = d3.select("#chartBody").append("svg:svg")
			.attr("width", w + this.settings.margin.left + this.settings.margin.right)
			.attr("height", h + this.settings.margin.bottom + this.settings.margin.top)
			.append("svg:g")
             .attr("transform", "translate(" + this.settings.margin.right + "," + this.settings.margin.bottom + ")");

	}

	BudgetChartDistrict.prototype.togglesetup = function() {
		var _this = this;
                     if ( typeof this.root.children != 'undefined')
	         {
                     	this.root.children.forEach(function(d){
			_this.toggleAll(d)
		});
                 	
		this.update(this.root);
                  }
	}

	BudgetChartDistrict.prototype.initialize = function() {
		this.level1Max = {};
		this.level2Max = {};
		this.level3Max = {};
		this.level4Max = {};

		this.level1Radius;
		this.level2Radius;
		this.level3Radius;
		this.level4Radius;

		this.alreadySummed = false;
		this.data_i = 0;
	  var nodes = this.tree.nodes(this.root).reverse();
		this.tree.children(function(d) {
			return d.children;
		});
 
		for (var i = 0; i < this.Fselect.sumField.length; i++) {
			this.level1Max["sum_" + this.Fselect.sumField[i]] = 0;
			this.level2Max["sum_" + this.Fselect.sumField[i]] = 0;
			this.level3Max["sum_" + this.Fselect.sumField[i]] = 0;
			this.level4Max["sum_" + this.Fselect.sumField[i]] = 0;
		} 
		if ( typeof this.root.children != 'undefined')
	         {	this.sumNodes(this.root.children);}
                   else {
//this.sumNodes(this.root.children);
 elx.ClientActionAPI.showView("v-72");
}
	}

	BudgetChartDistrict.prototype.setup = function () {
	 	  
	   this.level1Radius = d3.scale.sqrt()
		.domain([0, this.level1Max[this.Fselect.spendField]])
		.range([1, 30]);
			
		this.level2Radius = d3.scale.sqrt()
		.domain([0, this.level1Max[this.Fselect.spendField]])
		.range([1, 30]);

		this.level3Radius = d3.scale.sqrt()
		.domain([0, this.level1Max[this.Fselect.spendField]])
		.range([1, 30]);

		this.level4Radius = d3.scale.sqrt()
		.domain([0, this.level1Max[this.Fselect.spendField]])
		.range([1, 30]); 
	}

	BudgetChartDistrict.prototype.toggleAll = function (d) {
		var _this = this;
	    if (d.values && d.values.actuals) {
	        d.values.actuals.forEach(function(d){
	        	_this.toggleAll(d);
	        });
	        this.toggle(d);
	    } else if (d.values) {
	        d.values.forEach(function(d){
	        	_this.toggleAll(d);
	        });
	        this.toggle(d);
	    }
	}

	BudgetChartDistrict.prototype.setSourceFields = function(child, parent) {
	    if (parent) {
	        for (var i = 0; i < this.Fselect.sourceField.length; i++) {
	            var sourceField = this.Fselect.sourceField[i];
	            if (child[sourceField] != undefined) {
				 
	                child["source_" + sourceField] = child[sourceField];
					
	            }
	            parent["source_" + sourceField] = (child["source_" + sourceField]) ? child["source_" + sourceField] : child[sourceField];
	        }
	    }
	}

	BudgetChartDistrict.prototype.sumNodes = function(nodes) {
	  //sourceField
	    for (var y = 0; y < nodes.length; y++) {
	        var node = nodes[y];
	        if (node.children) {
	            this.sumNodes(node.children);
	            for (var z = 0; z < node.children.length; z++) {
	                var child = node.children[z];
					
	                for (var i = 0; i < this.Fselect.sumField.length; i++) {
	                    if (isNaN(node["sum_" + this.Fselect.sumField[i]])) node["sum_" + this.Fselect.sumField[i]] = 0;
	                    node["sum_" + this.Fselect.sumField[i]] += Number(child["sum_" + this.Fselect.sumField[i]]);
	                    //Set scales;
	                    if ((node.parent)) {
	                        if (node.depth == 1) {
	                            this.level1Max["sum_" + this.Fselect.sumField[i]] = Math.max(this.level1Max["sum_" + this.Fselect.sumField[i]], Number(node["sum_" + this.Fselect.sumField[i]]));
	                        } else if (node.depth == 2) {
	                            this.level2Max["sum_" + this.Fselect.sumField[i]] = Math.max(this.level2Max["sum_" + this.Fselect.sumField[i]], Number(node["sum_" + this.Fselect.sumField[i]]));
	                        } else if (node.depth == 3) {
	                            this.level3Max["sum_" + this.Fselect.sumField[i]] = Math.max(this.level3Max["sum_" + this.Fselect.sumField[i]], Number(node["sum_" + this.Fselect.sumField[i]]));
	                        } else if (node.depth == 4) {
	                            this.level4Max["sum_" + this.Fselect.sumField[i]] = Math.max(this.level4Max["sum_" + this.Fselect.sumField[i]], Number(node["sum_" + this.Fselect.sumField[i]]));
	                        }
	                        this.setSourceFields(node, node.parent);
	                    }
	                }
	            }
	        } else {
	            for (var i = 0; i < this.Fselect.sumField.length; i++) {
	                node["sum_" + this.Fselect.sumField[i]] = Number(node[this.Fselect.sumField[i]]);
	                if (isNaN(node["sum_" + this.Fselect.sumField[i]])) {
	                    node["sum_" + this.Fselect.sumField[i]] = 0;
	                }
	            }
	        }
	        this.setSourceFields(node, node.parent);
	    }

	}

	BudgetChartDistrict.prototype.fireSelection = function(d) 	
	{
		var selection = this.buildSelection(this.findPathInfo(d));
		//var params = this.data(selection);      
		var paramsnew = {};
	  
		_.each(selection[0].criteria, function(c){
			paramsnew[c.col] = c.value;
		});
		
        console.log(" selection   ", selection);
		elx.ClientActionAPI.updateViewParams("v-64",paramsnew); 
		
        elx.host.utils.notifySelect(this.view, {type: "composite-where", sels:selection});  
	}
	
	
		BudgetChartDistrict.prototype.fireSelectionforRoot = function(d) 
		
		{
			var selectionroot = this.buildSelection(this.findPathInfo(d));
			parameters={};
			var paramsroot = this.dataroot(selectionroot);
			
			elx.ClientActionAPI.updateViewParams("v-64", {"name":"all"} );
			var v =  elx.host.getViewById("v-64");
                      elx.host.utils.notifySelect(this.view, {type: "composite-where", sels:selectionroot});
	   
	}
	 BudgetChartDistrict.prototype.data = function(d) {
	 var sel = d;
     var ret = this.selectData( sel[0].criteria, this.settings.originaldata);
     return JSON.stringify(ret);
 
    };
	
	BudgetChartDistrict.prototype.dataroot = function(d) {
	 var sel = d;
     var ret = this.selectDataRoot( sel[0].criteria, this.settings.originaldata);
     return JSON.stringify(ret);
 
    };

		 BudgetChartDistrict.prototype.selectData = function( criteria, data)
	 {
	 for(var i =0; i < criteria.length ; i++)
	 {
         if(criteria.length ==0){return "" ;}
		 var name = criteria[0].value.split('-');
          var result = _.findWhere(data.children,{"name" : name[0] });  
		  var x = {};

switch(name[0]){
case "AgeRange" : x[criteria[0].col] = "age-range";
                   break;

case "Race":  x[criteria[0].col] = "race";
                   break;

case "DwellingType":  x[criteria[0].col] = "dwelling";
                   break;

case "Gender":  x[criteria[0].col] = "gender";
                   break;

case "CountryOfBirth":  x[criteria[0].col] = "country";
                         break;

case "Nationality":  x[criteria[0].col] = "nation";
                     break;


case "Position":  x[criteria[0].col] = "position";
                   break;
default : x[criteria[0].col] = name[0];
           break;
}    /*if(name[0] =="AgeRange"){
           x[criteria[0].col] = "age-range";
}
else{ x[criteria[0].col] = name[0]} */
			 
		 for (var attrname in x) { parameters[attrname] = x[attrname]; }
          this.selectData(criteria.slice(1),result);
		  }
		  return parameters;
		
	 };

	 BudgetChartDistrict.prototype.selectDataRoot = function( criteria, data)
	 {
         if(criteria.length ==0){return "" ;}
         var result = _.where(data.children,{"parent" : "root" });
		 var count = 0;
         result.forEach(function(d)
         {
		 
		 var x = {};
		 x[criteria[0].col] = d.name;
		 
		 for (var attrname in x) { parameters[attrname] = x[attrname]; }
		 count ++;
		 }
		 ) 		 
		
		  return parameters;
		
	 };
	 
	BudgetChartDistrict.prototype.findPathInfo = function(n) {
	
	 if(n.depth != 0)
	 {
		var pathInfo = [];
		function walk(n){
			if (n.key) pathInfo.push({key:n.key,depth:n.depth});
			if (n.parent) walk(n.parent);
		}
		walk(n);
		
		return pathInfo.reverse();
		}
		else{
		var pathInfo = [];
		n.values.forEach(function (d)
		{
		pathInfo.push({key:d.key,depth:0});
		})
		return pathInfo.reverse();
		}
	}

	BudgetChartDistrict.prototype.buildSelection = function(pathInfo) {
		var criteria = [];
		var where = [];
	    values = [];
	    for(var i = 0; i < pathInfo.length; i++){
	    	var info = pathInfo[i];
	    	where.push(this.buildWhere(info));
	    }
	    criteria.push({
	      jsonClass: "AndCriteria",
	      criteria: where
	    });
		return criteria;
	}

	BudgetChartDistrict.prototype.buildWhere = function(info) {
	var value = info.key.split('-');
	    return {
	      jsonClass: "WhereCriteria",
	      col: this.lookupColumn(info.depth),
	      wtype: "equal",
	      value: value[0]
	    };
	}

	BudgetChartDistrict.prototype.lookupColumn = function(depth) {
		var dataInfo = this.view.typeinfo.data;
                    console.log("  dataInfo.level1Col   ", dataInfo.level1Col);
				switch(depth){
			case 0: return "FederalBudgetView.level1";
			      //return dataInfo.level1Col;
		    case 1: return "FederalBudgetView.level1";
			   // return dataInfo.level1Col;
		    case 2: return "FederalBudgetView.level2";
		              // return dataInfo.level2Col;
		    case 3: return "FederalBudgetView.level3";
		           // return "name";
		    case 4: return "FederalBudgetView.level4";
		        //return  dataInfo.level4Col;
		}
	}

         

	BudgetChartDistrict.prototype.update = function(source) {
		var _this = this
	    var duration = d3.event && d3.event.altKey ? 5000 : 500;

	    var nodes = this.tree.nodes(this.root).reverse();
        var links = this.tree.links(nodes);
	    var depthCounter = 0;

	    // Normalize for fixed-depth.
	    nodes.forEach(function(d) {
	        d.y = d.depth * 180;
			
	        d.numChildren = (d.children) ? d.children.length : 0;

	        if (d.depth == 0) {
	        	if(!d.linkColor){
	   d.linkColor = _this.colors[(depthCounter % (_this.colors.length - 1))];
	        	}
	            depthCounter++;

	        }

	        if (d.numChildren == 0 && d._children) d.numChildren = d._children.length;

	    });

	    //Set link colors
	    nodes.forEach(function(d) {
	        var obj = d;
	        var value = d.key;
			var _this = this;


	    });


	    // Update the nodes…
	    var node = this.vis.selectAll("g.node")
	        .data(nodes, function(d) {
	            return d.id || (d.id = ++_this.data_i);
	        });

	    // Enter any new nodes at the parent's previous position.
	    var nodeEnter = node.enter().append("svg:g")
	        .attr("class", "node")
	        .attr("transform", function(d) {
	            return "translate(" + source.y0 + "," + source.x0 + ")";
	        })
	        .on("click", function(d) {
                      elx.ClientActionAPI.hideView("v-73");
                      elx.ClientActionAPI.showView("v-64");
                     
	                if (typeof d.key != 'undefined') {
	                    _this.rootClick = d.depth;
	                    _this.toggle(d);
	                    _this.update(d);
	                } else {
	                    _this.rootClick = 0;
	                    _this.toggle(d);
	                    _this.update(d);
		          _this.fireSelectionforRoot(d);
	                }
                    _this.fireSelection(d);
	               // if(!d._children){
	                //	_this.fireSelection(d);
	               // }
	            
	        });


	    nodeEnter.append("svg:circle")
	        .attr("r", function(d) { return d.total; })
	        .on("mouseover", function(d){
	        	_this.node_onMouseOver(d);
	        })
	        .on("mouseout", function(d) { // when the mouse leaves a circle, do the following

	        })
	        .style("fill", function(d) {
			if(d.key)
	        	{return _this.colorMap[(d.key.split('-'))[0]];}
	            //return d.source ? d.source.linkColor : d.linkColor;
	        })
	        .style("fill-opacity", ".8")
	        .style("stroke", function(d) {
			if(d.key){
	        	return _this.colorMap[(d.key.split('-'))[0]];}
	            //return d.source ? d.source.linkColor : d.linkColor;
	        });


	    nodeEnter.append("svg:text")
	        .attr("x", function(d) {
	           return d.children || d._children ? -10 : 10;
			   
			   
	        })
	        .attr("dy", ".35em")
	        .attr("text-anchor",
	            function(d) {
	                return d.children || d._children ? "end" : "start";
	            })
	        .text(function(d) {
	           var ret = d.key;
	            ret = (String(ret).length > 25) ? String(ret).substr(0, 22) + "..." : ret;
	            return ret;
	        })
	        .on("mouseover", function(d){
	        	_this.node_onMouseOver(d);
	        })
	        .on("mouseout", function(d) { // when the mouse leaves a circle, do the following

	        })
	        .style("fill-opacity", "0");

	    // Transition nodes to their new position.
	    var nodeUpdate = node.transition()
	        .duration(duration)
	        .attr("transform", function(d) {
	            return "translate(" + d.y + "," + d.x + ")";
	        });

	    nodeUpdate.select("circle")
	        .attr("r", function(d) {
	            if (d.depth == 0) {
	                return  10;
	            } else if (d.depth == 1) {
				
	                var ret = _this.level1Radius(d[_this.Fselect.spendField]);
	                return (isNaN(ret) ? 2 : ret);
				   
	            } else if (d.depth == 2) {
				
	                var ret = _this.level2Radius(d[_this.Fselect.spendField]);
	               return (isNaN(ret) ? 2 : ret);
					 
	            } else if (d.depth == 3) {
				
	                var ret = _this.level3Radius(d[_this.Fselect.spendField]);
	                return (isNaN(ret) ? 2 : ret);
					 
	            } else if (d.depth == 4) {
				
	                var ret = _this.level4Radius(d[_this.Fselect.spendField]);
	                return (isNaN(ret) ? 2 : ret);
					 
	            }

	        })
	        .style("fill", function(d) {
			if(d.key){
	        	return _this.colorMap[(d.key.split('-'))[0]];
				}
	            //return d.source ? d.source.linkColor : d.linkColor
	        })
	        .style("fill-opacity", function(d) {
	            var ret = ((d.depth + 1) / 5);
	            return ret;
	        });

	    nodeUpdate.select("text").style("fill-opacity", 1);

	    // Transition exiting nodes to the parent's new position.
	    var nodeExit = node.exit().transition()
	        .duration(duration)
	        .attr("transform", function(d) {
	            return "translate(" + source.y + "," + source.x + ")";
	        })
	        .remove();

	    nodeExit.select("circle").attr("r", 1e-6);
           
	    nodeExit.select("text").style("fill-opacity", 1e-6);
          
	    // Update the links…
	    var link = this.vis.selectAll("path.link")
	        .data(this.tree.links(nodes), function(d) {
	            return d.target.id;
	        });

	    var rootCounter = 0;
	    var oneCounter = 0;
	    var twoCounter = 0;
	    var threeCounter = 0;
	    // Enter any new links at the parent's previous position.
	    link.enter().insert("svg:path", "g")
	        .attr("class", "link")
	        .attr("d", function(d) {
			
	           if (Number(d.target[_this.Fselect.spendField]) > 0) {
	                var o = {
	                   x: source.x0,
	                    y: source.y0
	                };
	                return _this.diagonal({
	                    source: o,
	                    target: o
	                });
	            } else {
	               null;
	            }
	        })
	        .style("stroke", function(d, i) {
	        	var colour = "";
	            if (d.source.depth == 0) {
	                rootCounter++;
	                colour = (d.source.children[rootCounter - 1].linkColor);
	            }

	            if (d.source.depth == 1) {
	            	if(oneCounter >= d.source.children.length){
						oneCounter = 0;
	            	}
	                oneCounter++;
	                if (typeof d.source.children[(oneCounter - 1)] != 'undefined') {
	                    colour = (d.source.children[oneCounter - 1].linkColor);
	                } else {
	                    //need to change this logic
	                    d.source._children = d.source.children;
	                    for (var i = 0; i < d.source.children.length; i++) {
	                    	if(!d.source.children[i].linkColor){
	                    		//d.source.children[i].linkColor = _this.colors[_this.indextwoArrUniq[i]];
	                    	}
	                       
	                        colour =  (d.source.children[i].linkColor);
	                    }
	                }
	            }
	            if (d.source.depth == 2) {
	            	if(twoCounter >= d.source.children.length){
						twoCounter = 0;
	            	}
	                twoCounter++;
	                if (typeof d.source.children[(twoCounter - 1)] != 'undefined') {
	                    colour = (d.source.children[twoCounter - 1].linkColor);
	                } else {
	                    //need to change this logic
	                    d.source._children = d.source.children;
	                    for (var i = 0; i < d.source.children.length; i++) {
	                    	if(!d.source.children[i].linkColor){
	                    		//d.source.children[i].linkColor = _this.colors[_this.indexthreeArrUniq[i]];
	                    	}
	                        colour = (d.source.children[i].linkColor);
	                    }
	                }
	            }
	            if (d.source.depth == 3) {
	            	if(threeCounter >= d.source.children.length){
						threeCounter = 0;
	            	}
	                threeCounter++;
	                if (typeof d.source.children[(threeCounter - 1)] != 'undefined') {
	                    colour = (d.source.children[threeCounter - 1].linkColor);
	                } else {
	                    for (var i = 0; i < d.source.children.length; i++) {
	                    	if(!d.source.children[i].linkColor){
	                    		d.source.children[i].linkColor = _this.colors[_this.levelfourArrUniq[i]];
	                    	}
	                        colour = (d.source.children[i].linkColor);
	                    }
	                }
	            }
	           
	            //return colour;
	            if(d.target.key){
				return _this.colorMap[(d.target.key.split('-'))[0]];}
				
	        })
	        .style("stroke-width", function(d, i) {
	            if (d.source.depth == 0) {
				
	               var ret = _this.level1Radius(d.target[_this.Fselect.spendField]) * 2;
	                return (isNaN(ret) ? 2 : ret);
					
	            } else if (d.source.depth == 1) {
				 
	                var ret = _this.level2Radius(d.target[_this.Fselect.spendField]) * 2;
	                return (isNaN(ret) ? 2 : ret);
					
	            } else if (d.source.depth == 2) {
				    
	                var ret = _this.level3Radius(d.target[_this.Fselect.spendField]) * 2;
	                return (isNaN(ret) ? 2 : ret);
				  
	            } else if (d.source.depth == 3) {
				   
	                var ret = _this.level4Radius(d.target[_this.Fselect.spendField]) * 2;
	                return (isNaN(ret) ? 2 : ret);
					
	            }
	        })
	        .style("stroke-opacity", function(d) {
	            var ret = ((d.source.depth + 1) / 4.5)
	            if (d.target[_this.Fselect.spendField] <= 0) ret = .1;
	            return ret;
	        })
	        .style("stroke-linecap", "round")
	        .transition()
	        .duration(duration);

	    var linkUpdate = link.transition()
	        .duration(duration)
	        .attr("d", _this.diagonal);

	    linkUpdate
	        .style("stroke-width", function(d, i) {
	            if (d.source.depth == 0) {

	                var ret = _this.level1Radius(Number(d.target[_this.Fselect.spendField])) * 2;
	                return (isNaN(ret) ? 4 : ret);
					
	            } else if (d.source.depth == 1) {
				
	                var ret = _this.level2Radius(Number(d.target[_this.Fselect.spendField])) * 2;
	                return (isNaN(ret) ? 4 : ret);
				   
	            } else if (d.source.depth == 2) {
	                var ret = _this.level3Radius(Number(d.target[_this.Fselect.spendField])) * 2;
	                return (isNaN(ret) ? 4 : ret);
				   
	            } else if (d.source.depth == 3) {
	               var ret = _this.level4Radius(Number(d.target[_this.Fselect.spendField])) * 2;
	               return (isNaN(ret) ? 4 : ret);
				   
	            }

	        })

	    .style("stroke-opacity", function(d) {
	        var ret = ((d.source.depth + 1) / 4.5)
	        if (d.target[_this.Fselect.spendField] <= 0) ret = .1;
	        return ret;
	    })


	    // Transition exiting nodes to the parent's new position.
	    link.exit().transition()
	        .duration(duration)
	        .attr("d", this.diagonal)
	        .remove();

	    // Stash the old positions for transition.
	    nodes.forEach(function(d) {
	        d.x0 = d.x;
	        d.y0 = d.y;
	    });

	}



	BudgetChartDistrict.prototype.toggle = function(d) {
	    if (d.children) {
	        d._children = d.children;
	        d.children = null;
	    } else {
		if(d._children){
	        if (d._children[0].key) {
	            d.children = d._children;
	            d._children = null;
	        } else {
	            d.children = null;
	            d._children = null;
	        }
			}
	    }
	}

	BudgetChartDistrict.prototype.node_onMouseOver = function(d) {

    }

    return BudgetChartDistrict;

})();

elx.BudgetChartDistrict = BudgetChartDistrict;
