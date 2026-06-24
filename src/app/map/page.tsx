"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { properties } from "@/lib/properties";
import { Button } from "@/components/ui/Button";
import { 
  MapPin, Plus, Minus, RotateCcw, 
  ArrowRight, ChevronRight, X, Layers
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MapPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [mapType, setMapType] = useState<"dark" | "satellite">("dark");
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Find selected property details
  const selectedProperty = useMemo(() => {
    return properties.find(p => p.id === selectedId) || null;
  }, [selectedId]);

  // Map controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 1));
  const handleReset = () => {
    setZoom(1);
    setSelectedId(null);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 top-24 flex flex-col md:flex-row overflow-hidden bg-white font-sans">
      {/* Sidebar - Property list */}
      <div className="w-full md:w-96 lg:w-[420px] h-[45%] md:h-full border-r border-slate-100 flex flex-col bg-white z-20 shrink-0 shadow-lg">
        <div className="p-6 border-b border-slate-100">
          <span className="text-secondary font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">
            Charlotte Interactive
          </span>
          <h1 className="text-2xl font-heading font-bold text-primary mb-2">Map Directory</h1>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Select a managed asset to inspect neighborhood parameters and property details.
          </p>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {properties.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 bg-white ${
                selectedId === item.id
                  ? "border-secondary shadow-lg scale-[0.99]"
                  : hoveredId === item.id
                  ? "border-slate-300 shadow-md"
                  : "border-slate-100 shadow-sm"
              }`}
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                <Image
                  src={`https://images.unsplash.com/photo-${item.image}?q=80&w=200&auto=format&fit=crop`}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="font-heading font-bold text-sm text-primary line-clamp-1">{item.title}</h3>
                    <span className="text-[10px] font-bold text-secondary shrink-0">
                      ★ {item.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-0.5 mt-1 font-light">
                    <MapPin className="w-3.5 h-3.5 text-secondary" /> {item.location}
                  </p>
                </div>

                <div className="flex justify-between items-end border-t border-slate-100 pt-2 mt-1">
                  <p className="text-xs font-bold text-primary">
                    ${item.price.toLocaleString()}<span className="text-[10px] text-slate-400 font-light">/mo</span>
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center hover:text-primary transition-colors">
                    Details <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Canvas Panel */}
      <div className="flex-1 h-[55%] md:h-full relative overflow-hidden bg-slate-900" ref={mapContainerRef}>
        {/* Glowing background grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

        {/* The Interactive Map View (Draggable Canvas) */}
        <motion.div
          drag
          dragConstraints={mapContainerRef}
          dragElastic={0.1}
          style={{ transformOrigin: "center center" }}
          animate={{ scale: zoom }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
        >
          {/* Custom SVG Map Background representing Charlotte / Mecklenburg area */}
          <div className="relative w-[1000px] h-[700px] border border-white/5 rounded-[40px] overflow-hidden bg-slate-950 shadow-2xl">
            {mapType === "dark" ? (
              <svg viewBox="0 0 1000 700" className="w-full h-full opacity-70">
                {/* Lake Norman Shoreline (Top Left) */}
                <path
                  d="M0,0 C150,50 180,180 150,250 C120,290 80,320 0,350 Z"
                  fill="rgba(212, 175, 55, 0.03)"
                  stroke="rgba(212, 175, 55, 0.15)"
                  strokeWidth="2"
                />
                <path
                  d="M0,0 C150,50 180,180 150,250 C120,290 80,320 0,350 Z"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="4"
                  strokeDasharray="2 6"
                />

                {/* Catawba River System */}
                <path
                  d="M150,250 C200,320 180,450 140,550 C110,620 50,680 0,700"
                  fill="none"
                  stroke="rgba(212, 175, 55, 0.1)"
                  strokeWidth="2"
                />

                {/* I-77 Corridor */}
                <path d="M450,0 L450,700" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="6" />
                <path d="M450,0 L450,700" fill="none" stroke="rgba(212, 175, 55, 0.12)" strokeWidth="1.5" strokeDasharray="5 10" />

                {/* I-85 Corridor */}
                <path d="M0,380 L1000,420" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="4" />
                
                {/* Charlotte Inner Loop (I-277 / Route 4 Loop) */}
                <ellipse cx="480" cy="460" rx="90" ry="70" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="4" />
                <ellipse cx="480" cy="460" rx="90" ry="70" fill="none" stroke="rgba(212, 175, 55, 0.08)" strokeWidth="1.5" strokeDasharray="3 6" />

                {/* Outer Loop (I-485 simulation) */}
                <ellipse cx="480" cy="465" rx="350" ry="240" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="3" />

                {/* Neighborhood Markers Labels */}
                <text x="480" y="440" fill="rgba(255, 255, 255, 0.3)" fontSize="12" fontWeight="bold" letterSpacing="2" textAnchor="middle">UPTOWN</text>
                <text x="350" y="525" fill="rgba(255, 255, 255, 0.15)" fontSize="10" fontWeight="semibold" letterSpacing="1">MYERS PARK</text>
                <text x="560" y="415" fill="rgba(255, 255, 255, 0.15)" fontSize="10" fontWeight="semibold" letterSpacing="1">PLAZA MIDWOOD</text>
                <text x="180" y="150" fill="rgba(212, 175, 55, 0.25)" fontSize="10" fontWeight="semibold" letterSpacing="1">LAKE NORMAN</text>
                <text x="520" y="70" fill="rgba(255, 255, 255, 0.15)" fontSize="9" letterSpacing="1">HUNTERSVILLE</text>
                <text x="560" y="690" fill="rgba(255, 255, 255, 0.15)" fontSize="9" letterSpacing="1">SOUTHPARK</text>
              </svg>
            ) : (
              // Luxury Satellite Styled Backdrop
              <div className="absolute inset-0 bg-[#0F172A] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                  alt="Satellite Charlotte Map"
                  fill
                  className="object-cover opacity-20 saturate-50 contrast-125 select-none pointer-events-none"
                />
              </div>
            )}

            {/* Glowing Map Pins */}
            {properties.map((item) => {
              const isSelected = selectedId === item.id;
              const isHovered = hoveredId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    left: `${item.coordinates.x}%`,
                    top: `${item.coordinates.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(item.id);
                  }}
                  className="z-10 group cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring glow animations */}
                    <span className={`absolute inline-flex rounded-full bg-secondary opacity-60 transition-all duration-300 ${
                      isSelected ? "h-10 w-10 animate-ping" : isHovered ? "h-8 w-8 animate-ping" : "h-0 w-0"
                    }`} />
                    
                    {/* Pin base */}
                    <div
                      className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
                        isSelected
                          ? "h-10 w-10 bg-secondary border-white text-primary shadow-[0_0_20px_rgba(212,175,55,0.8)] scale-110"
                          : isHovered
                          ? "h-9 w-9 bg-secondary/80 border-white/80 text-primary"
                          : "h-7 w-7 bg-slate-900 border-secondary/50 text-secondary hover:border-secondary"
                      }`}
                    >
                      <MapPin className={`${isSelected ? "w-5 h-5" : "w-4 h-4"}`} />
                    </div>

                    {/* Pop Rate Tag */}
                    <div className={`absolute bottom-full mb-2 bg-[#0F172A] border border-white/10 px-2 py-1 rounded-md text-[10px] font-semibold font-mono text-secondary shadow-lg opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 whitespace-nowrap ${
                      isSelected && "opacity-100 border-secondary/30"
                    }`}>
                      ${(item.price / 1000).toFixed(1)}k/mo
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Map Control overlay (Top Right) */}
        <div className="absolute top-6 right-6 z-30 flex flex-col gap-2 bg-[#0F172A]/85 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-5 h-5" />
          </button>
          <hr className="border-white/10" />
          <button
            onClick={handleReset}
            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            title="Reset Map"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Map Type Toggle (Top Left) */}
        <div className="absolute top-6 left-6 z-30 flex bg-[#0F172A]/85 backdrop-blur-md border border-white/10 rounded-full p-1 text-xs shadow-2xl">
          <button
            onClick={() => setMapType("dark")}
            className={`px-4 py-2 rounded-full transition-colors font-medium flex items-center gap-1 cursor-pointer ${
              mapType === "dark" ? "bg-secondary text-primary-foreground font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Vector Dark
          </button>
          <button
            onClick={() => setMapType("satellite")}
            className={`px-4 py-2 rounded-full transition-colors font-medium flex items-center gap-1 cursor-pointer ${
              mapType === "satellite" ? "bg-secondary text-primary-foreground font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            Satellite
          </button>
        </div>

        {/* Selected Property Popup Card Overlay (Bottom Right / Floating) */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 z-30 max-w-sm w-auto bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col gap-4"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="px-2.5 py-0.5 bg-secondary/20 border border-secondary/20 rounded-full text-[9px] font-semibold text-secondary uppercase tracking-wider mb-2 inline-block">
                    {selectedProperty.category}
                  </span>
                  <h4 className="font-heading font-bold text-lg leading-tight text-white">{selectedProperty.title}</h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-0.5 mt-1 font-light">
                    <MapPin className="w-3.5 h-3.5 text-secondary" /> {selectedProperty.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="p-1.5 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5 text-center text-[10px] text-slate-300 font-light">
                <span>{selectedProperty.beds} Beds</span>
                <span className="border-x border-white/5">{selectedProperty.baths} Baths</span>
                <span>{selectedProperty.size.toLocaleString()} sqft</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Monthly rate</p>
                  <p className="text-lg font-heading font-extrabold text-secondary">${selectedProperty.price.toLocaleString()}</p>
                </div>
                <Link href={`/properties/${selectedProperty.id}`}>
                  <Button size="sm" variant="secondary" className="flex items-center gap-1">
                    Apply Tenancy <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
