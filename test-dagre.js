import dagre from 'dagre';
console.log('Dagre export:', dagre);
try {
    const g = new dagre.graphlib.Graph();
    console.log("Graph creation success");
} catch (e) {
    console.error("Graph creation failed:", e);
}
