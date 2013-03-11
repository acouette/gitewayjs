var giteway = giteway || {};
giteway.views = giteway.views || {};


(function() {

	"use strict";
	
	giteway.views.Statistics = Backbone.View.extend({
	
		el: "#stat",

		templateRepo: _.template($('#repo-template').html()),

		templateCollaboration: _.template($('#collaboration-template').html()),

		templateTimeline: _.template($('#timeline-template').html()),

		initialize: function() {
			var that = this;
			$("#result").html(this.templateRepo(this.model.toJSON()));
			this.$stat = $("#stat");
			$("#btns-stats").children().click(function() {
					that.model.set("view", this.id.slice(4));
			});
			this.listenTo(this.model.get("commits"), 'reset', this.render);
			this.listenTo(this.model, 'change:view', this.render);


		},

		render: function() {

			console.log("render : "+this.model.get("view"));
			switch(this.model.get("view")){
				case "collaboration":
					this.drawCollaboration();
				break;
				case "timeline":
					this.drawTimeline();
				break;
			}
			return this;
		},

		/**
		 * Function used to draw the timeline. Based on Plot library
		 */
		drawTimeline: function() {

			var timeline = this.model.timeline();
			this.$stat.html(this.templateTimeline(timeline));

			var chartData = [];
			_.map(timeline.data, function(value, key) {
				chartData.push([ key, value ]);
			});

			var step = timeline.step;
			var timeformat = ((step < 36000000) ? "%d-%m<br/> %H:%M" : "%d-%b<br/>%y");

			var options = {
				xaxis : {
					mode : "time",
					timeformat : timeformat,
					monthNames : [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ]
				},
				bars : {
					show : true,
					barWidth : step,
					fillColor : "rgba(164, 170, 4, 0.3)"
				},
				colors : [ "rgba(164, 170, 4, 1)" ]
			};

			$.plot($("#timeline-chart"), [ chartData ], options);
		},

		drawCollaboration: function() {

			var collaboration = this.model.collaboration();
			this.$stat.html(this.templateCollaboration(collaboration));

			var chartData = [];
			_.map(collaboration.data, function(value, key) {
				chartData.push({
					label : key,
					data : [ [ 1, value ] ]
				});
			});

			var options = {
				series : {
					pie : {
						show : true,
						label : {
							show : true,
							formatter : function(label, series) {
								return '<div>' + label + '<br/>' + Math.round(series.percent) + '%</div>';
							}
						},
						combine : {
							threshold : 0.04
						}
					}
				},
				legend : {
					show : false
				}
			};

			$.plot($("#collaboration-chart"), chartData, options);
		}

	});


}());