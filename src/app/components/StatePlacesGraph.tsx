import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';

interface PlaceNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'hub' | 'place';
  category?: string;
  isUNESCO?: boolean;
  image?: string;
}

interface PlaceLink extends d3.SimulationLinkDatum<PlaceNode> {
  distance: number;
}

interface StatePlacesGraphProps {
  places: any[];
  stateName: string;
}

export function StatePlacesGraph({ places, stateName }: StatePlacesGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const graphData = useMemo(() => {
    const hubId = 'central-hub';
    const nodes: PlaceNode[] = [
      { 
        id: hubId, 
        name: `${stateName} Hub (Airport/Station)`, 
        type: 'hub' 
      },
      ...places.map((p, i) => ({
        id: `place-${i}`,
        name: p.name,
        type: 'place' as const,
        category: p.category || 'Other',
        isUNESCO: p.isUNESCO || false,
        image: p.image
      }))
    ];

    const links: PlaceLink[] = places.map((p, i) => ({
      source: hubId,
      target: `place-${i}`,
      distance: p.distanceFromHub || (20 + (i * 10)) // Use data or simulated distance
    }));

    return { nodes, links };
  }, [places, stateName]);

  useEffect(() => {
    if (!svgRef.current || graphData.nodes.length === 0) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])
      .style('background', 'radial-gradient(circle, #f8fafc 0%, #f1f5f9 100%)');

    svg.selectAll('*').remove();

    // Define filters for shadows
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'drop-shadow')
      .attr('height', '130%');
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 3);
    filter.append('feOffset')
      .attr('dx', 2)
      .attr('dy', 2)
      .attr('result', 'offsetblur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg.append('g');

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    const simulation = d3.forceSimulation<PlaceNode>(graphData.nodes)
      .force('link', d3.forceLink<PlaceNode, PlaceLink>(graphData.links)
        .id(d => d.id)
        .distance(d => d.distance * 5)) // Scale distance for visual clarity
      .force('charge', d3.forceManyBody().strength(-800))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(70));

    // Fix the hub in the center
    const hub = graphData.nodes.find(n => n.type === 'hub');
    if (hub) {
      hub.fx = width / 2;
      hub.fy = height / 2;
    }

    // Draw links
    const link = g.append('g')
      .selectAll('line')
      .data(graphData.links)
      .join('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    // Link labels (distance)
    const linkLabels = g.append('g')
      .selectAll('.link-label')
      .data(graphData.links)
      .join('g')
      .attr('class', 'link-label');

    linkLabels.append('rect')
      .attr('width', 40)
      .attr('height', 18)
      .attr('rx', 9)
      .attr('fill', '#fff')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 1);

    linkLabels.append('text')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#475569')
      .attr('text-anchor', 'middle')
      .attr('dy', '13')
      .attr('dx', '20')
      .text(d => `${d.distance} km`);

    // Draw nodes
    const node = g.append('g')
      .selectAll('.node')
      .data(graphData.nodes)
      .join('g')
      .attr('class', 'node')
      .call(d3.drag<SVGGElement, PlaceNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Node shapes
    node.append('path')
      .attr('d', d => {
        if (d.type === 'hub') return d3.symbol(d3.symbolTriangle, 1500)(); // Airplane/Train vibe
        if (d.category === 'Religious') return d3.symbol(d3.symbolCircle, 1000)();
        if (d.category === 'Beach') return "M-25,-15 C-35,0 -25,25 0,25 C25,25 35,0 25,-15 C15,-30 -15,-30 -25,-15 Z"; // Organic blob
        if (d.category === 'Fort' || d.category === 'Historical') return d3.symbol(d3.symbolSquare, 1000)();
        if (d.category === 'Nature') return "M0,-25 L22,-12.5 L22,12.5 L0,25 L-22,12.5 L-22,-12.5 Z"; // Hexagon
        return d3.symbol(d3.symbolCircle, 1000)();
      })
      .attr('fill', d => {
        if (d.type === 'hub') return '#0ea5e9';
        if (d.category === 'Beach') return '#fde68a'; // Sand tone
        if (d.category === 'Nature') return '#22c55e'; // Green
        if (d.category === 'Religious') return '#f97316'; // Orange
        return '#6366f1'; // Blue/Indigo
      })
      .attr('stroke', d => d.isUNESCO ? '#fbbf24' : '#fff')
      .attr('stroke-width', d => d.isUNESCO ? 4 : 2)
      .style('filter', 'url(#drop-shadow)');

    // Node Icons (Simplified)
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('font-family', 'Arial')
      .attr('font-size', '14px')
      .attr('fill', '#fff')
      .text(d => {
        if (d.type === 'hub') return '✈️';
        if (d.category === 'Beach') return '🏖️';
        if (d.category === 'Nature') return '🌿';
        if (d.category === 'Religious') return '🛕';
        if (d.category === 'Fort' || d.category === 'Historical') return '🏰';
        return '📍';
      });

    // Node labels
    node.append('text')
      .attr('dy', 45)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('fill', '#334155')
      .text(d => d.name);

    // Tooltip interactions
    node.on('mouseover', (event, d) => {
      if (!tooltipRef.current) return;
      const tooltip = d3.select(tooltipRef.current);
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`
        <div class="p-2">
          <div class="font-bold text-gray-900">${d.name}</div>
          <div class="text-xs text-gray-500">${d.category || ''}</div>
          ${d.type === 'place' ? `<div class="text-xs font-bold text-blue-600 mt-1">Click to explore</div>` : ''}
        </div>
      `)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px');
      
      // Highlight connected edges
      link.attr('stroke-opacity', l => (l.source === d || l.target === d) ? 1 : 0.1);
      link.attr('stroke-width', l => (l.source === d || l.target === d) ? 3 : 2);
    })
    .on('mousemove', (event) => {
      d3.select(tooltipRef.current)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    })
    .on('mouseleave', () => {
      d3.select(tooltipRef.current).transition().duration(200).style('opacity', 0);
      link.attr('stroke-opacity', 0.4).attr('stroke-width', 2);
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      linkLabels.attr('transform', d => {
        const x = ((d.source as any).x + (d.target as any).x) / 2 - 20;
        const y = ((d.source as any).y + (d.target as any).y) / 2 - 9;
        return `translate(${x},${y})`;
      });

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
      if (event.subject.type !== 'hub') {
        event.subject.fx = null;
        event.subject.fy = null;
      }
    }

    return () => simulation.stop();
  }, [graphData]);

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Legend */}
      <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 text-sm">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-orange-500" />
          Map Legend
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-sky-500 rotate-45"></div>
            <span className="text-gray-600">Central Hub</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600">Religious</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-amber-200 rounded-lg"></div>
            <span className="text-gray-600">Beach</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-indigo-500"></div>
            <span className="text-gray-600">Historical/Fort</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
            <span className="text-gray-600">Nature</span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <div className="w-4 h-4 border-2 border-amber-400 rounded-full"></div>
            <span className="text-gray-600 font-medium">UNESCO Site</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400 italic">
          Drag nodes to explore • Scroll to zoom
        </div>
      </div>

      <svg ref={svgRef} className="w-full h-[650px] cursor-grab active:cursor-grabbing"></svg>
      
      <div 
        ref={tooltipRef} 
        className="fixed pointer-events-none bg-white/95 backdrop-blur-sm shadow-xl border border-gray-100 rounded-lg opacity-0 z-50 transition-opacity duration-200 min-w-[150px]"
      ></div>
    </div>
  );
}

// Re-importing MapPin for the legend
import { MapPin } from 'lucide-react';
