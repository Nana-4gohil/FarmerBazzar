import { Injectable } from "@angular/core";
import * as L from "leaflet";

@Injectable({
  providedIn: "root",
})
export class GraphService {
  private roadGraph: Map<string, { node: string; weight: number }[]> = new Map();

  constructor() {}

  /**
   * Extracts the graph from Leaflet map layers (road network).
   */
  extractGraphFromMap(map: L.Map): void {
    this.roadGraph.clear(); // Reset graph

    // Iterate over all polylines on the map (which represent roads)
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        const latLngs = layer.getLatLngs() as L.LatLng[];

        for (let i = 0; i < latLngs.length - 1; i++) {
          let nodeA = `${latLngs[i].lat},${latLngs[i].lng}`;
          let nodeB = `${latLngs[i + 1].lat},${latLngs[i + 1].lng}`;
          let distance = latLngs[i].distanceTo(latLngs[i + 1]); // Calculate distance

          if (!this.roadGraph.has(nodeA)) this.roadGraph.set(nodeA, []);
          if (!this.roadGraph.has(nodeB)) this.roadGraph.set(nodeB, []);

          this.roadGraph.get(nodeA)?.push({ node: nodeB, weight: distance });
          this.roadGraph.get(nodeB)?.push({ node: nodeA, weight: distance }); // Bidirectional
        }
      }
    });

    console.log("Extracted Graph:", this.roadGraph);
  }

  /**
   * Get the generated road graph.
   */
  getGraph(): Map<string, { node: string; weight: number }[]> {
    return this.roadGraph;
  }
}
