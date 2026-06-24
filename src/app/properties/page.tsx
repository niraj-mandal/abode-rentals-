"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { properties } from "@/lib/properties";
import { Button } from "@/components/ui/Button";
import { Search, MapPin, SlidersHorizontal, ArrowUpDown, BedDouble, Bath, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = ["All", "Mansion", "Penthouse", "Villa"];
const LOCATIONS = ["All", "Myers Park", "Plaza Midwood", "Mooresville", "Dilworth", "Eastover", "SouthPark"];

export default function PropertiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating">("rating");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        const matchesCategory = selectedCategory === "All" || prop.category === selectedCategory;
        const matchesLocation =
          selectedLocation === "All" || prop.location.toLowerCase().includes(selectedLocation.toLowerCase());
        const matchesSearch =
          prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prop.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = prop.price <= maxPrice;

        return matchesCategory && matchesLocation && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return b.rating - a.rating; // default is rating high to low
      });
  }, [selectedCategory, selectedLocation, searchQuery, maxPrice, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto px-6 pb-24 font-sans bg-white"
    >
      {/* Page Header */}
      <div className="mb-16 text-center md:text-left max-w-2xl">
        <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
          Asset Directory
        </span>
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-4">The Portfolio</h1>
        <p className="text-slate-500 font-light text-sm leading-relaxed">
          Browse our managed Charlotte rental properties. Every property is maintained under our strict 100-point physical inspection protocol.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by estate name, neighborhood, or key terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-5 py-4 rounded-full bg-slate-50/50 border border-slate-200 text-primary placeholder:text-slate-400 focus:outline-none focus:border-secondary text-sm transition-colors"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          <Button
            variant="glass"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full sm:w-auto rounded-full py-3.5"
          >
            <div className="flex items-center justify-center gap-2 w-full">
              <SlidersHorizontal className="w-4 h-4" /> FILTERS
            </div>
          </Button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center justify-center bg-slate-50/50 border border-slate-200 rounded-full px-5 py-3.5 text-sm text-primary w-full sm:w-auto">
            <div className="flex items-center justify-center">
              <ArrowUpDown className="w-4 h-4 mr-2.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "price-asc" | "price-desc" | "rating")}
                className="bg-transparent focus:outline-none cursor-pointer pr-4 text-xs tracking-wider uppercase font-bold text-slate-600 appearance-none text-center"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Rent: Low to High</option>
                <option value="price-desc">Rent: High to Low</option>
              </select>
              <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:flex flex-col gap-8 glass-card rounded-[2rem] p-8 border border-slate-100 shadow-md sticky top-32 bg-white">
          {/* Categories */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary mb-4">Residence Type</h3>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-xs py-2.5 px-4 rounded-xl transition-all font-semibold cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-slate-50 border-l-2 border-secondary text-primary"
                      : "text-slate-500 hover:text-primary hover:bg-slate-50/30"
                  }`}
                >
                  {cat === "All" ? "All Residences" : cat}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Locations */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary mb-4">Neighborhood</h3>
            <div className="flex flex-col gap-2">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`text-left text-xs py-2.5 px-4 rounded-xl transition-all font-semibold cursor-pointer ${
                    selectedLocation === loc
                      ? "bg-slate-50 border-l-2 border-secondary text-primary"
                      : "text-slate-500 hover:text-primary hover:bg-slate-50/30"
                  }`}
                >
                  {loc === "All" ? "All Locations" : loc}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary">Max Rate</h3>
              <span className="text-sm font-bold text-primary">${maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="4000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-secondary bg-slate-200 h-1 rounded-full cursor-pointer focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-slate-400 mt-2 font-bold tracking-wider">
              <span>$4K/MO</span>
              <span>$12K/MO</span>
              <span>$20K/MO</span>
            </div>
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md lg:hidden flex items-end justify-center"
              onClick={() => setShowMobileFilters(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-h-[85vh] bg-white border-t border-slate-200 rounded-t-[2.5rem] p-8 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-heading font-bold text-primary">Filters</h2>
                  <Button variant="glass" size="sm" onClick={() => setShowMobileFilters(false)}>
                    Done
                  </Button>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Categories */}
                  <div>
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-primary mb-4">Residence Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`text-xs py-2 px-4 rounded-full transition-all cursor-pointer ${
                            selectedCategory === cat
                              ? "bg-primary text-white font-bold"
                              : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {cat === "All" ? "All Types" : cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Locations */}
                  <div>
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-primary mb-4">Neighborhood</h3>
                    <div className="flex flex-wrap gap-2">
                      {LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setSelectedLocation(loc)}
                          className={`text-xs py-2 px-4 rounded-full transition-all cursor-pointer ${
                            selectedLocation === loc
                              ? "bg-primary text-white font-bold"
                              : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {loc === "All" ? "All Locations" : loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-primary">Max Rate</h3>
                      <span className="text-sm font-bold text-primary">${maxPrice.toLocaleString()} / mo</span>
                    </div>
                    <input
                      type="range"
                      min="4000"
                      max="20000"
                      step="500"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-secondary bg-slate-200 h-1.5 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listings Grid */}
        <div className="lg:col-span-3">
          {filteredProperties.length === 0 ? (
            <div className="glass-card rounded-[2rem] p-16 text-center border border-slate-100 shadow-sm bg-slate-50/50">
              <p className="text-slate-500 text-lg mb-6 font-light">No properties match your active filters.</p>
              <Button
                variant="glass"
                size="sm"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedLocation("All");
                  setMaxPrice(20000);
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProperties.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col glass-card rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 bg-white"
                  >
                    <Link href={`/properties/${item.id}`} className="relative aspect-[4/3] w-full overflow-hidden block">
                      <Image
                        src={`https://images.unsplash.com/photo-${item.image}?q=80&w=800&auto=format&fit=crop`}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-85" />
                      <div className="absolute top-4 left-4 px-3.5 py-1 bg-secondary/20 backdrop-blur-md border border-secondary/20 rounded-full text-[10px] font-bold text-secondary uppercase tracking-wider">
                        {item.category}
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-secondary">
                        ★ {item.rating}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div>
                          <p className="text-xs text-slate-300 flex items-center gap-1 font-light mb-1">
                            <MapPin className="w-3.5 h-3.5 text-secondary" /> {item.location}
                          </p>
                          <h3 className="text-xl font-heading font-bold text-white leading-tight">{item.title}</h3>
                        </div>
                      </div>
                    </Link>

                    {/* Stats & Info */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                      <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-100 pb-4">
                        <span className="flex items-center gap-1.5 font-light">
                          <BedDouble className="w-4 h-4 text-secondary" /> {item.beds} Beds
                        </span>
                        <span className="flex items-center gap-1.5 font-light">
                          <Bath className="w-4 h-4 text-secondary" /> {item.baths} Baths
                        </span>
                        <span className="flex items-center gap-1.5 font-light">
                          <Square className="w-3.5 h-3.5 text-secondary" /> {item.size.toLocaleString()} sq ft
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Monthly rate</p>
                          <p className="text-xl font-heading font-extrabold text-primary">${item.price.toLocaleString()} <span className="text-xs text-slate-400 font-light font-sans">/ mo</span></p>
                        </div>
                        <Link href={`/properties/${item.id}`}>
                          <Button size="sm">View Estate</Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
