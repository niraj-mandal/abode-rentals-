"use client";

import { use, useState } from "react";
import { properties } from "@/lib/properties";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Star, BedDouble, Bath, Square, MapPin, 
  Calendar, Check, ShieldCheck, User, MessageSquare
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [underwritingId, setUnderwritingId] = useState("");
  const [months, setMonths] = useState(12);
  const [startDate, setStartDate] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center font-sans">
        <h2 className="text-3xl font-heading font-bold mb-4">Property Not Found</h2>
        <p className="text-slate-500 mb-8 font-light">The property you are looking for does not exist in our active directory.</p>
        <Link href="/properties">
          <Button>Back to Portfolio</Button>
        </Link>
      </div>
    );
  }

  // Cost calculations
  const baseRent = property.price * months;
  const conciergeFee = Math.round(baseRent * 0.02); // 2% service charge
  const securityDeposit = property.price; // 1 month deposit
  const applicationFee = 150; // standard application fee

  // Secondary luxury interior photos
  const images = [
    `https://images.unsplash.com/photo-${property.image}?q=80&w=1200&auto=format&fit=crop`,
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop", // Bedroom
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop", // Lounge
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop", // Kitchen
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !bookingName || !bookingEmail) {
      alert("Please fill in all details.");
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmBooking = () => {
    setShowConfirmModal(false);
    setUnderwritingId(`AP-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsBooked(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 font-sans bg-white">
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/properties" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors gap-2 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to portfolio</span>
        </Link>
      </div>

      {/* Title & Info Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <span className="px-3.5 py-1 bg-secondary/15 border border-secondary/20 rounded-full text-[10px] font-bold text-secondary uppercase tracking-wider mb-4 inline-block">
            {property.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3">{property.title}</h1>
          <p className="text-slate-500 flex items-center gap-1.5 font-light">
            <MapPin className="w-4 h-4 text-secondary" /> {property.location}
          </p>
        </div>
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-5 py-3 rounded-full shrink-0">
          <Star className="w-4 h-4 text-secondary fill-secondary" />
          <span className="text-sm font-bold text-primary">{property.rating} Rating</span>
          <span className="text-xs text-slate-400 font-light border-l border-slate-200 pl-2.5">Managed Asset</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12">
        {/* Main large image */}
        <div className="lg:col-span-3 relative aspect-[16/10] rounded-3xl overflow-hidden border border-slate-100 shadow-2xl">
          <Image
            src={images[activeImageIndex]}
            alt={property.title}
            fill
            className="object-cover transition-all duration-700"
            priority
          />
        </div>

        {/* Thumbnails */}
        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[4/3] lg:aspect-auto lg:h-[105px] w-24 lg:w-auto rounded-2xl overflow-hidden border transition-all duration-300 shrink-0 cursor-pointer ${
                activeImageIndex === idx ? "border-secondary scale-[0.98] shadow-md" : "border-slate-100 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Interior details ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Details and Booking Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Detailed Info (Left - 2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Key specs */}
          <div className="grid grid-cols-3 gap-6 bg-slate-50/50 border border-slate-200 p-6 rounded-[2rem] text-center">
            <div className="flex flex-col items-center">
              <BedDouble className="w-6 h-6 text-secondary mb-2" />
              <span className="text-xl font-heading font-extrabold text-primary">{property.beds}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200">
              <Bath className="w-6 h-6 text-secondary mb-2" />
              <span className="text-xl font-heading font-extrabold text-primary">{property.baths}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center">
              <Square className="w-5 h-5 text-secondary mb-2.5" />
              <span className="text-xl font-heading font-extrabold text-primary">{property.size.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sq Ft</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">Property Description</h3>
            <p className="text-slate-600 leading-relaxed font-light text-sm md:text-base mb-6">
              {property.description}
            </p>
            <p className="text-slate-600 leading-relaxed font-light text-sm md:text-base">
              Managed to the exacting standard of Abode, this residence includes high-velocity HVAC, high-speed Wi-Fi, smart-locks, and premium professional maintenance dispatch.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Amenities */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-6">Property Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.features.concat(["Encrypted Smart Lock", "High-Speed Wi-Fi", "Dedicated Parking", "Premium Landscaping", "24/7 Portal Support"]).map((amenity) => (
                <div key={amenity} className="flex items-center gap-3 py-2.5 border-b border-slate-100">
                  <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-600 text-sm font-light">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Curation standard seal */}
          <div className="glass-card rounded-[2rem] p-8 flex items-start gap-6 border border-secondary/20 bg-slate-50/50">
            <ShieldCheck className="w-12 h-12 text-secondary shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-heading font-bold text-primary mb-2">Abode Maintenance Guarantee</h4>
              <p className="text-slate-500 leading-relaxed text-sm font-light">
                This property has passed our rigorous 100-point physical inspection covering HVAC, appliances, and layout compliance. We handle all tenant communications and maintenance issues.
              </p>
            </div>
          </div>
        </div>

        {/* Booking Card Sidebar (Right - 1 Col) */}
        <div className="sticky top-32">
          <AnimatePresence mode="wait">
            {!isBooked ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl bg-white"
              >
                <div className="flex justify-between items-baseline mb-6 border-b border-slate-100 pb-4">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Monthly Rent</p>
                  <p className="text-2xl font-heading font-extrabold text-primary">
                    ${property.price.toLocaleString()} <span className="text-xs text-slate-400 font-light font-sans">/ mo</span>
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6">
                  {/* Start Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Desired Move-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-xl pl-10 pr-4 py-3 text-sm text-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Duration Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Lease Term</label>
                      <span className="text-sm font-semibold text-primary">{months} {months === 1 ? "Month" : "Months"}</span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="24"
                      step="6"
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full accent-secondary bg-slate-200 h-1 rounded-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold tracking-wider">
                      <span>6 MO</span>
                      <span>12 MO</span>
                      <span>24 MO</span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Applicant Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-xl pl-9 pr-3 py-2 text-sm text-primary focus:outline-none placeholder:text-slate-400 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="applicant@email.com"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-secondary rounded-xl pl-9 pr-3 py-2 text-sm text-primary focus:outline-none placeholder:text-slate-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-2.5 text-xs font-light text-slate-500">
                    <div className="flex justify-between">
                      <span>Base Rent ({months} mo)</span>
                      <span>${baseRent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lease Admin Fee (2%)</span>
                      <span>${conciergeFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refundable Security Deposit</span>
                      <span>${securityDeposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Application Fee</span>
                      <span>${applicationFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-primary pt-3 border-t border-slate-100 text-sm">
                      <span>Estimated Upfront Cost</span>
                      <span>${(securityDeposit + applicationFee + property.price).toLocaleString()}</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-4 cursor-pointer">
                    Apply for Tenancy
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-[2.5rem] p-8 border border-secondary/20 text-center flex flex-col items-center gap-6 bg-white"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-10 h-10 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">Application Received</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Thank you, <span className="font-semibold text-primary">{bookingName}</span>. Your screening file is initialized. 
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 w-full text-left text-xs space-y-2.5 font-light">
                  <p><span className="text-slate-400 font-medium">Property:</span> {property.title}</p>
                  <p><span className="text-slate-400 font-medium">Move-in Date:</span> {startDate}</p>
                  <p><span className="text-slate-400 font-medium">Lease Term:</span> {months} Months</p>
                  <p><span className="text-slate-400 font-medium">Underwriting ID:</span> #{underwritingId}</p>
                </div>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                  Our leasing coordinator will contact you via <span className="text-slate-600 font-semibold">{bookingEmail}</span> within 24 hours to guide you through verification.
                </p>
                <Button variant="glass" size="sm" onClick={() => setIsBooked(false)} className="w-full cursor-pointer">
                  Modify Application
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-slate-200 rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">Tenant Screening Authorization</h3>
              <p className="text-slate-500 leading-relaxed font-light text-sm mb-6">
                To maintain our portfolio safety standards, all Abode leases require security background and financial background checks. By submitting this form, you authorize our onboarding team to run these checks.
              </p>
              <div className="flex gap-4">
                <Button variant="glass" className="flex-1 cursor-pointer" onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 cursor-pointer" onClick={confirmBooking}>
                  Authorize & Submit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
