
function Kanoid (id) {
	this.d = window.document;
	this.canvas = this.d.getElementById(id);
	this.radius = 5;
	this.width = 1000;
	this.height = 600;
	this.pw = 12; //width pixel
	this.ph = 10; //height pixel
	this.tw = 1000; //width plane
	this.th = 11; //height plane
	this.ty = this.height - this.th;
	this.user = {
	    name    : 'Anonymous',
  		pts     : 0,
  		score 	: 0,
  	};
  	this.background = new Image();
	this.colors = [
		[],
		["#660099", "#660099", "#660099", "#660099", "#660099", "#660099", "#660099", "#660099", "#660099", "#660099", "#660099", "#660099"],
		["#990033", "#B2003C", "#CB0041", "#E4004E", "#FE0017", "#FF1967", "#FF3378"],
		["#FFDF81", "#FFD868", "#FFD24E", "#FFCB34", "#FFC11A", "#FFBF00", "#E6AC00", "#CC9900"],
		["#990000", "#B20000", "#CB0000", "#E40000", "#FE0000", "#FF1919", "#FF3333", "#FF4D4D", "#FF6767"],
		["#003300", "#004C00", "#006100", "#007E00", "#009700", "#00B000", "#00C900", "#00E200", "#00FB00", "#16FF11"],
		["#003366", "#004080", "#004D99", "#001AB2", "#0067CB", "#0074E4", "#0081FE", "#198EFF", "#339BFF", "#4DA7FF", "#67B4FF"]
	];
	this.intervalID;
	this.levels = [

		[],
	/*	[
			[0,1,1,0,0,1,1,0,0,0,1,1,1,0],  
			[0,1,1,0,0,1,1,0,0,1,1,1,1,1],  
			[0,1,1,1,1,1,1,0,0,1,1,0,0,0], 
			[0,1,1,1,1,1,1,0,0,1,1,1,1,0],  
			[0,1,1,1,1,1,1,0,0,1,1,1,1,1],  
			[0,1,1,1,1,1,1,0,0,1,1,0,1,1], 
			[0,1,6,1,1,1,1,0,0,1,1,0,1,1],  
			[0,1,1,0,0,1,1,0,0,1,1,1,1,1],  
			[0,1,1,0,0,1,1,0,0,0,1,1,1,0], 
		],
		[
			[0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,3,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
			[0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
			[0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
			[0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0],
			[0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,2,0,0,0,0,0,0,0,0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0],
			[0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0],
			[0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,2,2,2,2,0,0,0,0,0,0,0,2,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
			[0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
			[0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,2,2,2,2,2,0,0,0,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
			[0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
			[0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0],
			[0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0],
			[0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0],
			[0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
			[0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
			[0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
			[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
			[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
			[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		],
	*/	[                                                                              
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0]  
		],
                                                             
		[
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		]
		
	];
	this.ctx = this.canvas.getContext('2d');
	this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	this.reset();
}





Kanoid.prototype = {
	init: function () {
		var self = this;

		if (sessionStorage.getItem("score")) {
			this.user.score = parseInt(sessionStorage.getItem("score"));
 		}

		window.setTimeout(function () {
			self.newLife();
			console.log('newLife');
		}, 6000);

		this.load();		
	},
	reset: function () {
		window.clearInterval(this.intervalID);
		this.x = 110;
		this.y = 110;
		this.dx = 2;
		this.dy = 4;
		this.tx = 100;
		this.bricks = [];
		this.hits = [];
		this.currentLevel = 1;
		this.lifes = 3;
	},
	bind: function () {
		var self = this;
		self.d.getElementById("btnRestart").onclick = function () {
			self.reset();
			self.init();
			return false;
		};
		// move bat
		self.canvas.onmousemove = function (e) {
			self.tx = -self.canvas.offsetLeft + e.pageX - (self.tw / 2);
		};
		self.d.onkeydown = function (e) {
			var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
			switch (key) {
				case 37:
					// arrow left
					if (self.tx > 0) {
						self.tx -= 31;
					}
					break;
				case 39:
					// arrow right
					if (self.tx + self.tw < self.width) {
						self.tx += 31;
					}
					break;
			}
		};
		self.d.onkeypress = function (e) {
			var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
			switch (key) {
				case 97:
					// Char 'A'
					if (self.tx > 0) {
						self.tx -= 31;
					}
					break;
				case 100:
					// Char 'D'
					if (self.tx + self.tw < self.width) {
						self.tx += 31;
					}
					break;
			}
		};
		self.d.getElementById("audio_new_game").play();
	},
	start: function () {
		this.reset();
		this.bind();
		this.screen("M6 est partout sauf ici\n\n\n404 NOT FOUND");
		this.init();
	},
	newLife: function () {
		var self = this;
		self.tx = (self.width / 2) - (self.tw / 2);
		self.x = self.tx + (self.tw / 2) - self.radius;
		self.y = self.height - self.th - (self.radius * 2);
		self.dx = -2;
		self.dy = -4;
		self.screen("LEVEL " + self.currentLevel);
		self.d.getElementById("audio_new_level").play();
		window.setTimeout(function () {
			self.intervalID = window.setInterval(function () {
				self.draw.apply(self, []);
			}, 10);
		}, 2000);
	},
	die: function () {
		var self = this;
		self.lifes -= 1;
		window.clearInterval(self.intervalID);
		if (self.lifes > 0) {
			self.screen("YOU LOST A LIFE");
			this.d.getElementById("audio_die").play();
			window.setTimeout(function () {
				self.newLife();
			}, 2000);
		} else {		
			self.gameOver();
		}
	},
	gameOver: function () {
		this.screen("PERDU - VOTRE SCORE EST DE " + this.user.pts);
		this.d.getElementById("audio_game_over").play();

		try {
		    if (window.localStorage) {
		    	if(this.user.score < this.user.pts) {
						sessionStorage.removeItem("score");
						sessionStorage.setItem("score", this.user.pts);
					}
		    }
		} catch (e) {
		    // traitement lors de l'exception
		}

	},
	screen: function (text) {
		this.clear();
		this.drawPlayground();

		this.background.src = "m6.png";
		this.ctx.drawImage(this.background, this.width/2 - 300/2,  this.height/2);  

		this.ctx.textAlign = "center";
		this.ctx.font = "bold 20px sans-serif";
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.fillText(text, this.width/2, this.height/2, this.width);
	},
	clear: function () {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},
	ball: function (x, y, r, style, stroke) {
		if (style != null) {
			this.ctx.fillStyle = style;
		}
		if (stroke != null) {
			this.ctx.strokeStyle = stroke;
		}
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.fill();
	},
	pane: function (x, y, w, h, style, stroke) {
		if (style != null) {
			this.ctx.fillStyle = style;
		}
		if (stroke != null) {
			this.ctx.strokeStyle = stroke;
		}
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.closePath();
		this.ctx.fill();
	},
	drawPlayground: function () {
		var self = this,
			gradient = self.ctx.createLinearGradient(0, 0, 0, self.height);
		gradient.addColorStop(0.1, "#000000");
		gradient.addColorStop(1, "#000000");
		// draw playground
		self.pane(0, 0, self.width, self.height, gradient, null);
		//self.pane(0, 0, self.width, self.height, 'rgba(0, 0, 0, 1)', null);
	},
	draw: function () {
		var self = this;
		self.clear();
		// create gradient
		self.drawPlayground();		
		// complete current level
		if (self.bricks.length === 0 && self.hits.length > 0) {
			// move on next level
			if (self.currentLevel < self.levels.length - 1) {
				// TODO - play sound
				self.screen("YOU COMPLETE LEVEL " + self.currentLevel);
				var nextLevel = self.currentLevel + 1;
				self.reset();
				self.currentLevel = nextLevel;
				self.init();
			} else {
				// TODO - play sound
				self.screen("YOU WIN THE GAME");
			}
			return;
		}
		// draw ball
		self.ball(self.x, self.y, self.radius, "#FF0921", null);
		// draw paddle
		self.pane(self.tx, self.ty, self.tw, self.th, "#666666", null);
		// draw scoring
		self.scoring(this.user.pts);
		// collision with playground
		if (self.x + self.dx > self.width || self.x + self.dx < 0) {
			self.dx = -self.dx;
		}
		if (self.y + self.dy < 0) {
			self.dy = -self.dy;
		}
		if (self.y + self.dy > self.height) {
			self.die();
		}
		// collision with bat
		if (self.collision(self.x, self.y, self.radius, self.tx, self.ty, self.tw, self.th)) {
			/*if (self.x < self.tw/5 + self.tx) {
				// left pane
				if (self.dx + Math.abs(self.dx) !== 0) {
					self.dx = -self.dx;	
				}
			} 
			else if (self.x < (self.tw/5)*3 + self.tx) {
				// mid pane
				if (self.dx + Math.abs(self.dx) !== 0) {
					self.dx = Math.random(self.dx);
					console.log(self.dx);
				}
			}
			else {
				// right pane
				if (self.dx + Math.abs(self.dx) === 0) {
					self.dx = -self.dx;
				}
			}*/
			console.log(self.x - self.tx);
			self.dy = -self.dy;

			console.log(self.dx);	

			self.dx = -(((self.x - self.tx)* 14) / this.tw) - 7;

			this.d.getElementById("audio_ping").play();
		}
		// collision with bricks
		var i, row, rows, j, els, x = 0, y = 0;
		for (i = 0, row = 1, rows = self.levels[self.currentLevel].length; i < rows; i++, row++) {
			for (j = 0, els = self.levels[self.currentLevel][i].length; j < els; j++) {
				if (!self.inHits(x + 1, y + 1) && self.collision(self.x, self.y, self.radius, x + 1, y + 1, self.pw, self.ph)) {
					self.dx = self.dx;
					self.dy = -self.dy;
					self.hits.push({x: x + 1, y: y + 1});
					this.d.getElementById("audio_pong").play();
					self.scoring(this.user.pts++);
				}
				x += self.pw + 1;
			}
			x = 0;
			y += self.ph + 1;
		}
		
		self.x += self.dx;
		self.y += self.dy;
		
		self.bricks = [];
		x = 0;
		y = 0;
		for (i = 0, row = 1, rows = self.levels[self.currentLevel].length; i < rows; i++, row++) {
			for (j = 0, els = self.levels[self.currentLevel][i].length; j < els; j++) {
				if (self.levels[self.currentLevel][i][j] === 0) {
					if (!self.inHits(x + 1, y + 1)) {
						self.hits.push({x: x + 1, y: y + 1});
					}
				} else {
					if (!self.inHits(x + 1, y + 1)) {
						if (!self.bricks[row]) {
							self.bricks[row] = [];
						}
						self.bricks[row].push({x: x + 1, y: y + 1, w: self.pw, h: self.ph});
						//draw single brick
						//self.pane(x + 1, y + 1, self.pw, self.ph, self.colors[self.currentLevel][i], null);

						if(self.levels[self.currentLevel][i][j] === 1)
							self.pane(x + 1, y + 1, self.pw, self.ph, self.colors[self.currentLevel][i], null);
						else if(self.levels[self.currentLevel][i][j] === 2)
							self.pane(x + 1, y + 1, self.pw, self.ph, '#dce2ef', null);
						else if(self.levels[self.currentLevel][i][j] === 3)
							self.pane(x + 1, y + 1, self.pw, self.ph, '#df392e', null);
						else 
							self.pane(x + 1, y + 1, self.pw, self.ph, '#660099', null);

					

					}
				}
				x += self.pw + 1;
			}
			x = 0;
			y += self.ph + 1;
		}
	},
	inHits: function (x, y) {
		var self = this;
		for (var i = 0, len = self.hits.length; i < len; i++) {
			if (self.hits[i].x == x && self.hits[i].y == y) {
				return true;
			}
		}
		return false;
	},
	scoring: function(pts) {
		this.ctx.font = "10pt Calibri,Geneva,Arial";
    	this.ctx.fillStyle = "FFFFFF";
    	this.ctx.fillText("Score: " + pts, 30, 20);
    	this.ctx.fillText("Top Score: " + this.user.score, 40, 35);
	},
	collision: function (circleX, circleY, radius, squareX, squareY, width, height) {
		var distance = 0;	
		if (circleX < squareX) {
			distance += Math.pow(circleX - squareX, 2);
		} else if (circleX > squareX + width) {
			distance += Math.pow(circleX - squareX - width, 2);
		}	
		if (circleY < squareY) {
			distance += Math.pow(circleY - squareY, 2);
		} else if (circleY > squareY + height) {
			distance += Math.pow(circleY - squareY - height, 2);
		}	
		return distance <= Math.pow(radius, 2);
	},
	load: function ()
	{
		var xmlhttp = new XMLHttpRequest();
		var url = "http://localhost/m6.404/server/web/app_dev.php/api/app/example";

		xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		    var myArr = JSON.parse(xmlhttp.responseText);
		    console.log(myArr);
		    }
		}

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	},
	send: function()
	{

		var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		xmlhttp.open("POST", "/json-handler");
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.send(JSON.stringify({name:"John Rambo", time:"2pm"}));
	}
};
