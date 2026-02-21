import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { StateData } from '../data/statesData';
import { useNavigate } from 'react-router-dom';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'hub' | 'state';
  category?: string;
  image?: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  distance: number;
}

interface TourismGraphProps {
  data: StateData[];
  region: 'india' | 'korea';
}

export function TourismGraph({ data, region }: TourismGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  const graphData = useMemo(() => {
    const hubId = `hub-${region}`;
    const nodes: Node[] = [
      { id: hubId, name: region === 'india' ? 'India Hub' : 'Korea Hub', type: 'hub' },
      ...data.map(s => ({
        id: s.id,
        name: s.name,
        type: 'state' as const,
        category: s.category,
        image: s.image
      }))
    ];

    const links: Link[] = data.map((s, i) => ({
      source: hubId,
      target: s.id,
      distance: 150 + (i % 3) * 50 // Simulated distance
    }));

    return { nodes, links };
  }, [data, region]);

  useEffect(() => {
    if (!svgRef.current || graphData.nodes.length === 0) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])
      .attr('width', '100%')
      .attr('height', height);

    svg.selectAll('*').remove();

    const g = svg.append('g');

    // Zoom behavior
    svg.call(d3.zoom<SVGSVGElement, unknown>()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      }));

    const simulation = d3.forceSimulation<Node>(graphData.nodes)
      .force('link', d3.forceLink<Node, Link>(graphData.links).id(d => d.id).distance(d => d.distance))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    // Draw links
    const link = g.append('g')
      .selectAll('line')
      .data(graphData.links)
      .join('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Link labels (distance)
    const linkText = g.append('g')
      .selectAll('text')
      .data(graphData.links)
      .join('text')
      .attr('font-size', '10px')
      .attr('fill', '#64748b')
      .attr('text-anchor', 'middle')
      .text(d => `${d.distance}km`);

    // Draw nodes
    const node = g.append('g')
      .selectAll('.node')
      .data(graphData.nodes)
      .join('g')
      .attr('class', 'node')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        if (d.type === 'state') {
          navigate(`/tourism/${region}/${d.id}`);
        }
      })
      .style('cursor', 'pointer');

    // Node shapes based on type/category
    node.append('path')
      .attr('d', d => {
        if (d.type === 'hub') return d3.symbol(d3.symbolStar, 1200)();
        if (d.category === 'Heritage') return d3.symbol(d3.symbolSquare, 800)();
        if (d.category === 'Nature') return d3.symbol(d3.symbolCircle, 800)();
        return d3.symbol(d3.symbolCircle, 800)();
      })
      .attr('fill', d => d.type === 'hub' ? '#f97316' : '#6366f1')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Node labels
    node.append('text')
      .attr('dy', 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#1e293b')
      .text(d => d.name);

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      linkText
        .attr('x', d => ((d.source as any).x + (d.target as any).x) / 2)
        .attr('y', d => ((d.source as any).y + (d.target as any).y) / 2);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [graphData, navigate, region]);

  return (
    <div className="bg-white rounded-xl shadow-inner border border-gray-100 overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-lg text-xs text-gray-500 shadow-sm border border-gray-100">
        <p className="font-bold mb-2 text-gray-700">Legend</p>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-orange-500 rotate-45"></div> <span>Landing Hub</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-indigo-500"></div> <span>Heritage Site</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div> <span>Nature/Other</span>
        </div>
        <p className="mt-2 italic">Drag to move • Scroll to zoom</p>
      </div>
      <svg ref={svgRef} className="w-full h-[600px]"></svg>
    </div>
  );
}
