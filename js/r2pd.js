var width = 700, height = 700;
var oneObjectW = 20, oneObjectH = 20;
var r;

function Node(_current_point) {
	this.left_child = null;
	this.right_child = null;
	this.height = -1;
};

function RPlot(_Rplot_idx, _r_dist) {
	// RPlot=[p[1], …, p[n]] is the input reachability plot; each element RPlot[i]=p[i] has the following attributes:
	this.r_dist = _r_dist; // RPlot[i].r_dist = reachability distance of p[i]
	this.current_node = null; // RPlot[i].current_node = the current node in the dendrogram where p[i] belongs to
	
	this.Rplot_idx = _Rplot_idx;
}

function getRandomInt(min,max)
{
 return Math.round(min + Math.random()*(max-min))
}

function traverse(node, px, py) {
	var x = getRandomInt(50, width - 50);
	//var x = px + oneObjectW * 2;
	//var y = getRandomInt(50, height - 50);
	var y = py + oneObjectH * 4;
	r.rect(x - oneObjectW / 2, y - oneObjectW / 2, oneObjectW, oneObjectH);
	r.circle(x, y, 5);
	
	if (px != -1 && py != -1)
		r.path("M" + x + " " + y + "L" + px + " " + py + "");

	if (node.left_child != null)
		traverse(node.left_child, x, y);
	if (node.right_child != null)
		traverse(node.right_child, x, y);		
}

window.onload = function() {		
	var p = [];
	p[0] = new RPlot(0, 0.); 			p[1] = new RPlot(1, 6.08276253); 	p[2] = new RPlot(2, 13.07669683); 	
	p[3] = new RPlot(3, 5.19615242); 	p[4] = new RPlot(4, 24.04163056);	p[5] = new RPlot(5, 5.19615242); 	
	p[6] = new RPlot(6, 9.11043358); 	p[7] = new RPlot(7, 16.03121954); 	p[8] = new RPlot(8, 22.04540769); 	
	p[9] = new RPlot(9, 2.64575131);	p[10] = new RPlot(10, 2.64575131); 	p[11] = new RPlot(11, 2.64575131); 	
	p[12] = new RPlot(12, 5.09901951); 	p[13] = new RPlot(13, 22.04540769); p[14] = new RPlot(14, 7.07106781);
	p[15] = new RPlot(15, 13.07669683); p[16] = new RPlot(16, 1.73205081); 	p[17] = new RPlot(17, 10.09950494);
  
	for (i = 0, n = p.length; i < n; i++) {
		// create a leaf node N_i for RPlot[i];
		// RPlot[i].current_node = N_i; //assign the new leaf node to be the points initial current_node
		p[i].current_node = new Node();
	}
	
	var PointList = []; // PointList = [q[1], …, q[n]] is a sequence of references to the points in ascending order of 
						// the corresponding reachability values – excluding p[1] since p[1].r_dist = ∞ in any reachability plot.	
	for (i = 0, n = p.length; i < n; i++)
		PointList[i] = p[i];
	PointList.sort(function(a,b){return a.r_dist - b.r_dist});
	
	for (i = 1, n = PointList.length; i < n; i++) {
		var point = PointList[i]; // pick the point with the next smallest r_dist
		var q = p[point.Rplot_idx - 1]; // q = left neighbor of point in Rplot;
		var N = new Node(); // create a new node N in the dendrogram;
		N.height = point.r_dist;		
		N.left_child = q.current_node;
		N.right_child = point.current_node;
		point.current_node = q.current_node = N;	
	}
	
	r = Raphael("holder", width, height);
	traverse(PointList[15].current_node, -1, -1);
}  