"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { 
  Building2, MapPin, ListPlus, ShieldCheck, 
  ChevronLeft, Check, CheckCircle2,
  Mail, Calendar, Phone
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["Single Family", "Townhome", "Penthouse", "Waterfront Estate", "Multi-Family Portfolio"];

const AMENITIES_OPTIONS = [
  "Smart Home System", "Heated Pool & Spa", "Gated Security Access", 
  "Wine Cellar", "Professional Chef Kitchen", "Lake Norman Dock", 
  "Private Garage (3+ Cars)", "Guest House / ADU", "Home Cinema", "Modern Outdoor Living"
];

export default function ListPropertyPage() {
  const [registrationCode, setRegistrationCode] = useState("");
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Single Family");
  const [description, setDescription] = useState("");
  
  const [beds, setBeds] = useState(3);
  const [baths, setBaths] = useState(2.5);
  const [size, setSize] = useState(3500);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  const [price, setPrice] = useState(4500);
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  const handleNext = async () => {
    if (step === 1 && (!title || !location || !description)) {
      alert("Please fill in all details for Step 1.");
      return;
    }
    if (step === 3 && (!ownerName || !ownerEmail || !ownerPhone || !inspectionDate)) {
      alert("Please fill in your contact information and select an inspection date.");
      return;
    }
    
    if (step === 3) {
      setIsSubmitting(true);
      try {
        const payload = {
          name: ownerName,
          email: ownerEmail,
          phone: ownerPhone,
          propertyAddress: location,
          propertyType: category,
          expectedRent: price,
          bedrooms: beds,
          bathrooms: baths,
          squareFeet: size,
          source: "Website Rental Analysis Form",
          notes: `Title: ${title}\nDescription: ${description}\nAmenities: ${selectedAmenities.join(", ")}\nRequested Audit Date: ${inspectionDate}`
        };

        const WEBHOOK_URL = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL || "https://abode-crm-lime.vercel.app/api/webhooks/leads";
        const WEBHOOK_SECRET = process.env.NEXT_PUBLIC_CRM_WEBHOOK_SECRET || "default_dev_secret_12345";

        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${WEBHOOK_SECRET}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error("Failed to submit to CRM");
        }
        
        setRegistrationCode(`ABD-${Math.floor(10000 + Math.random() * 90000)}`);
        setStep(prev => prev + 1);
      } catch (error) {
        console.error("Submission error:", error);
        alert("There was an error submitting your request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-24 font-sans bg-white">
      {/* Wizard Header */}
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
          For Charlotte Property Owners & Investors
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
          Request Your Free Rental Analysis
        </h1>
        <p className="text-slate-500 font-light text-sm leading-relaxed">
          Submit your property profile below to begin our detailed market audit and receive a customized management assessment.
        </p>
      </div>

      {/* Progress Bar */}
      {step <= 3 && (
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-slate-400 mb-4">
            <span className={step >= 1 ? "text-primary" : ""}>01. PROPERTY DETAILS</span>
            <span className={step >= 2 ? "text-primary" : ""}>02. SPECIFICATIONS</span>
            <span className={step >= 3 ? "text-primary" : ""}>03. PORTFOLIO & AUDIT</span>
          </div>
          <div className="h-[2px] bg-slate-100 w-full rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-secondary" 
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      {/* Form Steps */}
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl relative overflow-hidden bg-white max-w-3xl mx-auto">
        <input type="hidden" name="property_type" value={category} />
        <input type="hidden" name="amenities" value={selectedAmenities.join(", ")} />
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-3 border-b border-slate-100 pb-4">
                <Building2 className="w-6 h-6 text-secondary" /> Residence Details
              </h2>
              
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Property Nickname / Title</label>
                <input
                  type="text"
                  name="property_title"
                  placeholder="e.g., The Myers Park Manor"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none placeholder:text-slate-400 transition-colors"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Property Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="property_address"
                    placeholder="e.g., 2200 Queens Rd W, Charlotte, NC 28207"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl pl-12 pr-5 py-4 text-sm text-primary focus:outline-none placeholder:text-slate-400 transition-colors"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Property Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-3 px-4 rounded-xl border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        category === cat
                          ? "bg-[#0F172A] border-[#0F172A] text-white shadow-md"
                          : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Brief Property Description</label>
                <textarea
                  name="property_description"
                  rows={4}
                  placeholder="Outline key architectural highlights, target rent goals, current tenancy status, and any upgrades..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none placeholder:text-slate-400 resize-none transition-colors"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-3 border-b border-slate-100 pb-4">
                <ListPlus className="w-6 h-6 text-secondary" /> Residence Specifications
              </h2>

              {/* Grid of Beds, Baths, Sq ft */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    min="1"
                    value={beds}
                    onChange={(e) => setBeds(Number(e.target.value))}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none text-center transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    min="1"
                    step="0.5"
                    value={baths}
                    onChange={(e) => setBaths(Number(e.target.value))}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none text-center transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Size (Sq Ft)</label>
                  <input
                    type="number"
                    name="square_footage"
                    min="500"
                    step="100"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none text-center transition-colors"
                  />
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Amenities & Infrastructure</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AMENITIES_OPTIONS.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`flex items-center gap-4 py-4 px-5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-50 border-secondary text-primary"
                            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isSelected ? "bg-secondary border-secondary text-white" : "border-slate-300 bg-transparent"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="font-light">{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-3 border-b border-slate-100 pb-4">
                <ShieldCheck className="w-6 h-6 text-secondary" /> Portfolio Audit Setup
              </h2>

              {/* Price Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Target Monthly Rent (USD)</label>
                  <div className="relative flex items-center">
                    <span className="text-2xl font-heading font-extrabold text-primary absolute left-0">$</span>
                    <input 
                      type="number"
                      name="target_rent"
                      min="500"
                      value={price || ""}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="text-2xl font-heading font-extrabold text-primary bg-transparent w-32 pl-5 text-right focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="500"
                  max="30000"
                  step="50"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-secondary bg-slate-200 h-1.5 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold tracking-wider">
                  <span>$500</span>
                  <span>$15,000</span>
                  <span>$30,000+</span>
                </div>
              </div>

              {/* Owner Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Investor Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="e.g. Richard Branson"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none placeholder:text-slate-400 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Contact Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. owner@portfolio.com"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl pl-12 pr-5 py-4 text-sm text-primary focus:outline-none placeholder:text-slate-400 transition-colors"
                    />
                  </div>
                </div>
                {/* Contact Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +1 704 555 0101"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl pl-12 pr-5 py-4 text-sm text-primary focus:outline-none placeholder:text-slate-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Inspection Date picker */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Preferred On-Site Audit Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="date"
                      name="inspection_date"
                      value={inspectionDate}
                      onChange={(e) => setInspectionDate(e.target.value)}
                      className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-2xl pl-12 pr-5 py-4 text-sm text-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-light mt-1">
                * A physical walk-through is scheduled prior to finalize our portfolio onboarding and property safety verification.
              </p>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 flex flex-col items-center gap-8"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-14 h-14 animate-bounce" />
              </div>
              
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-3">Portfolio Submission Received</h2>
                <p className="text-sm text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-primary">{ownerName}</span>. Your application for <span className="font-semibold text-primary">{title}</span> has been logged under our Charlotte onboarding team.
                </p>
              </div>

              <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 text-left text-xs font-light space-y-3.5 max-w-md w-full shadow-inner">
                <div className="flex justify-between border-b border-slate-200/50 pb-3">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Dossier Reference Code</span>
                  <span className="font-mono font-semibold text-primary">{registrationCode}</span>
                </div>
                <p><span className="text-slate-400 font-medium">Property Address:</span> {location}</p>
                <p><span className="text-slate-400 font-medium">Category Type:</span> {category}</p>
                <p><span className="text-slate-400 font-medium">Target Rent Goal:</span> ${price.toLocaleString()} / mo</p>
                <p><span className="text-slate-400 font-medium">Proposed Audit Date:</span> {inspectionDate}</p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
                Our property underwriting team will perform a desk rent analysis and contact you within 24 hours to confirm the audit scheduled on {inspectionDate}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-6">
                <Link href="/" className="flex-1">
                  <Button className="w-full">Return Home</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Controls */}
        {step <= 3 && (
          <div className="flex justify-between mt-12 pt-6 border-t border-slate-100">
            <Button
              type="button"
              variant="glass"
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 cursor-pointer ${step === 1 ? "opacity-30 pointer-events-none" : ""}`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            
            <Button
              type={step === 3 ? "submit" : "button"}
              onClick={step === 3 ? undefined : handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 cursor-pointer"
            >
              {step === 3 ? (isSubmitting ? "Submitting..." : "Submit Onboarding Dossier") : "Continue"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
