import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnswerData } from '../../pages/EstimatePage';
import logo from '../../assects/logo.png';
import { CheckCircle, X as XIcon } from 'lucide-react';
import { useGoogleApi } from '../../utils/googleApi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import livingroom from '../../assects/livingroom.jpg';
import diningroom from '../../assects/diningroom.jpg';
import bedroom from '../../assects/bedroom.jpg';
import parent from '../../assects/parents.jpg'
import childrensroom from '../../assects/children.jpg';
import kitchen from '../../assects/kitchen1.jpg';
import utilityarea from '../../assects/utility.jpg';
import poojaroom from '../../assects/pooja.jpg';
import homeoffice from '../../assects/homeoffice.jpg';
import balcony from '../../assects/balcony.jpg';
// import commonarea from '../../assects/commonarea.jpg';
import options from '../../assects/optionalS.jpg';
import guste from '../../assects/gustroom.jpg'

// Placeholder image
const placeholderImg = 'https://via.placeholder.com/100?text=Image';

interface Option {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Subcategory {
  id: string;
  name: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: Subcategory[];
}

interface CardProps {
  image: string;
  title: string;
  selected: boolean;
  onClick: () => void;
  price?: number;
}

interface QuestionFlowProps {
  onComplete: (answers: AnswerData[], total: number) => void;
}

interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
}

const categories: Category[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    image: livingroom,
    subcategories: [
      { id: 'main-door', name: 'Main Door Panelling / Safety Door', image: logo },
      { id: 'tv-unit', name: 'TV Unit', image: logo },
      { id: 'display-unit', name: 'Display Unit', image: logo },
      { id: 'center-table', name: 'Center Table / Coffee Table', image: logo },
      { id: 'side-tables', name: 'Side Tables / End Tables', image: logo },
      { id: 'wall-shelves', name: 'Wall Shelves', image: logo },
      { id: 'shoe-rack', name: 'Shoe Rack', image: logo },
      { id: 'partition-unit', name: 'Partition Unit / Divider', image: logo },
      { id: 'crockery-unit', name: 'Crockery Unit (if placed here)', image: logo },
      { id: 'seating-bench', name: 'Seating Bench with Storage', image: logo },
      { id: 'swing', name: 'Swing (Jhula)', image: logo },
      { id: 'bookshelf', name: 'Bookshelf (if applicable)', image: logo },
    ],
  },

  {
    id: 'dining-area',
    name: 'Dining Area',
    image: diningroom,
    subcategories: [
      { id: 'dining-table', name: 'Dining Table with Chairs', image: logo },
      { id: 'crockery-unit', name: 'Crockery Unit / Glass Cabinet', image: logo },
      { id: 'mini-bar', name: 'Mini Bar Unit / Bar Counter', image: logo },
      { id: 'buffet-table', name: 'Buffet Table / Sideboard', image: logo },
      { id: 'wall-shelf', name: 'Wall-mounted Shelf / Service Counter', image: logo },
    ],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    image: bedroom,
    subcategories: [
      { id: 'cot', name: 'Cot (Box Bed / Hydraulic Storage / Non-storage)', image: logo },
      { id: 'side-table', name: 'Side Table / Bedside Table', image: logo },
      { id: 'wardrobe', name: 'Wardrobe (Sliding / Openable)', image: logo },
      { id: 'loft', name: 'Loft (Above Wardrobe or Door)', image: logo },
      { id: 'dressing-unit', name: 'Dressing Unit with Mirror', image: logo },
      { id: 'study-table', name: 'Study Table / Working Table', image: logo },
      { id: 'bookshelf', name: 'Bookshelf / Wall Shelf', image: logo },
      { id: 'mini-tv-unit', name: 'Mini TV Unit', image: logo },
      { id: 'window-seating', name: 'Window Seating / Bay Window Bench', image: logo },
      { id: 'chest-of-drawers', name: 'Chest of Drawers', image: logo },
      { id: 'walk-in-closet', name: 'Walk-in Closet (if applicable)', image: logo },
      { id: 'prayer-unit', name: 'Prayer Unit / Pooja Shelf (if inside bedroom)', image: logo },
    ],
  },
  {
    id: 'parents-bedroom',
    name: `Parent's bedroom`,
    image: parent,
    subcategories: [
      { id: 'cot', name: 'Cot (Box / Hydraulic)', image: logo },
      { id: 'side-table', name: 'Side Table', image: logo },
      { id: 'wardrobe', name: 'Wardrobe', image: logo },
      { id: 'loft', name: 'Loft', image: logo },
      { id: 'dressing-unit', name: 'Dressing Unit', image: logo },
      { id: 'study-table', name: 'Study Table', image: logo },
      { id: 'bookshelf', name: 'Bookshelf / Wall Shelf', image: logo },
      { id: 'mini-tv-unit', name: 'Mini TV Unit', image: logo },
      { id: 'window-seating', name: 'Window Seating / Bay Window Bench', image: logo },
      { id: 'chest-of-drawers', name: 'Chest of Drawers', image: logo },
      { id: 'walk-in-closet', name: 'Walk-in Closet', image: logo },
      { id: 'prayer-unit', name: 'Prayer Unit / Pooja Shelf', image: logo },
    ],
  },
  {
    id: 'childrens-room',
    name: "Children's Room",
    image: childrensroom,
    subcategories: [
      { id: 'bunk-bed', name: 'Bunk Bed / Single Bed', image: logo },
      { id: 'study-table-storage', name: 'Study Table with Storage', image: logo },
      { id: 'wardrobe-study-combo', name: 'Wardrobe with Study Combo', image: logo },
      { id: 'bookshelf', name: 'Bookshelf', image: logo },
      { id: 'toy-storage', name: 'Toy Storage Unit', image: logo },
      { id: 'wall-shelves', name: 'Wall-mounted Shelves', image: logo },
      { id: 'pinup-board', name: 'Pin-up / Marker Board Panel', image: logo },
    ],
  },
  {
    id: 'guest-bedroom',
    name: "Guest Bedroom",
    image: guste,
    subcategories: [
      { id: 'bunk-bed', name: 'Cot (Box / Basic)', image: logo },
      { id: 'study-table-storage', name: 'Side Table', image: logo },
      { id: 'wardrobe-study-combo', name: 'Wardrobe (2-door or 3-door)', image: logo },
      { id: 'bookshelf', name: 'Loft', image: logo },
      { id: 'toy-storage', name: 'Mirror with Shelf', image: logo },
      { id: 'wall-shelves', name: 'Mini Study Table', image: logo },
      { id: 'pinup-board', name: 'Bookshelf', image: logo },
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    image: kitchen,
    subcategories: [
      { id: 'base-cabinets', name: 'Base Cabinets', image: logo },
      { id: 'wall-cabinets', name: 'Wall Cabinets', image: logo },
      { id: 'tall-unit', name: 'Tall Unit / Pantry Unit', image: logo },
      { id: 'microwave-unit', name: 'Microwave Unit', image: logo },
      { id: 'cutlery-pullout', name: 'Cutlery / Bottle Pull-out Unit', image: logo },
      { id: 'corner-carousel', name: 'Corner Carousel / Magic Corner', image: logo },
      { id: 'wicker-basket', name: 'Wicker Basket Unit', image: logo },
      { id: 'loft-shutters', name: 'Loft Shutters', image: logo },
      { id: 'under-sink', name: 'Under-sink Unit', image: logo },
      { id: 'chimney-duct', name: 'Chimney Duct Cover Box', image: logo },
    ],
  },
  {
    id: 'utility-area',
    name: 'Utility Area',
    image: utilityarea,
    subcategories: [
      { id: 'washing-machine-cabinet', name: 'Washing Machine Cabinet', image: logo },
      { id: 'sink-counter', name: 'Sink Counter Unit', image: logo },
      { id: 'storage-shelves', name: 'Storage Shelves / Cleaning Storage', image: logo },
      { id: 'ironing-board', name: 'Ironing Board Unit (foldable)', image: logo },
    ],
  },
  {
    id: 'pooja-room',
    name: 'Pooja Room',
    image: poojaroom,
    subcategories: [
      { id: 'pooja-unit', name: 'Pooja Unit (Wall-mounted / Floor-standing)', image: logo },
      { id: 'mandapam-style', name: 'Mandapam Style Pooja Unit', image: logo },
      { id: 'storage-drawers', name: 'Storage Drawers below Pooja Unit', image: logo },
    ],
  },
  {
    id: 'home-office',
    name: 'Office / Study Room',
    image: homeoffice,
    subcategories: [
      { id: 'working-table', name: 'Working Table / Office Desk', image: logo },
      { id: 'bookshelf', name: 'Bookshelf / Library Unit', image: logo },
      { id: 'filing-cabinet', name: 'Filing Cabinet / Storage Drawers', image: logo },
      { id: 'overhead-storage', name: 'Overhead Storage', image: logo },
      { id: 'writing-board', name: 'Wall-mounted Writing Board / Pin Board', image: logo },
    ],
  },
  {
    id: 'balcony',
    name: 'Balcony / Outdoor',
    image: balcony,
    subcategories: [
      { id: 'seating-bench', name: 'Seating Bench with Storage', image: logo },
      { id: 'garden-storage', name: 'Garden Storage Cabinet', image: logo },
      { id: 'outdoor-shoe-rack', name: 'Outdoor Shoe Rack', image: logo },
      { id: 'swing', name: 'Swing / Jhula (if applicable)', image: logo },
    ],
  },
  // {
  //   id: 'common-areas',
  //   name: 'Common Areas / Passage',
  //   image: commonarea,
  //   subcategories: [
  //     { id: 'wall-niches', name: 'Wall Niches with Shelving', image: logo },
  //     { id: 'shoe-rack', name: 'Shoe Rack / Bench Storage', image: logo },
  //     { id: 'mirror-panels', name: 'Mirror Panels', image: logo },
  //     { id: 'decorative-panelling', name: 'Decorative Wall Panelling', image: logo },
  //     { id: 'wall-mounted-display', name: 'Wall-mounted Display Unit', image: logo },
  //   ],
  // },
  // {
  //   id: 'common-areas',
  //   name: 'Common Areas / Passage',
  //   image: commonarea,
  //   subcategories: [
  //     { id: 'wall-niches', name: 'Wall Niches with Shelving', image: logo },
  //     { id: 'shoe-rack', name: 'Shoe Rack / Bench Storage', image: logo },
  //     { id: 'mirror-panels', name: 'Mirror Panels', image: logo },
  //     { id: 'decorative-panelling', name: 'Decorative Wall Panelling', image: logo },
  //     { id: 'wall-mounted-display', name: 'Wall-mounted Display Unit', image: logo },
  //   ],
  // },
  {
    id: 'optional-addons',
    name: 'Optional Add-Ons',
    image: options,
    subcategories: [
      { id: 'false-ceiling', name: 'False Ceiling (Wooden Design)', image: logo },
      { id: 'wooden-panelling', name: 'Wooden Wall Panelling / Fluted Panels', image: logo },
      { id: 'decorative-moulding', name: 'Decorative Moulding / Cornices', image: logo },
      { id: 'edge-banding', name: 'Edge Banding, Pasting & Cutting (if factory-made)', image: logo },
      { id: 'hardware-accessories', name: 'Hardware Accessories (handles, hinges, locks)', image: logo },
      { id: 'mirror-panels', name: 'Mirror Panels', image: logo },
      { id: 'skirting', name: 'Skirting / Floor Beading', image: logo },
    ],
  },
];

const optionsList: Option[] = [
  { id: 'opt1', name: 'Basic', price: 1000, image: '/images/opt1.jpg' },
  { id: 'opt2', name: 'Standard', price: 2000, image: '/images/opt2.jpg' },
  { id: 'opt3', name: 'Premium', price: 3000, image: '/images/opt3.jpg' },
];

function Card({ image, title, selected, onClick, price }: CardProps) {
  const rippleRef = useRef<HTMLSpanElement>(null);

  // Ripple effect handler
  const handleRipple = (e: React.MouseEvent) => {
    const ripple = rippleRef.current;
    if (ripple) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.classList.remove('animate-ripple');
      void ripple.offsetWidth; // reflow
      ripple.classList.add('animate-ripple');
    }
    onClick();
  };

  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -6, boxShadow: '0 8px 32px 0 rgba(163,120,86,0.12)' }}
      animate={selected ? { scale: 1.08, boxShadow: '0 6px 24px 0 rgba(163,120,86,0.18)', borderColor: '#a37856' } : { scale: 1, boxShadow: 'none', borderColor: '#e5e7eb' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative w-32 h-32 border-2 rounded-xl flex flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-400/60
        ${selected
          ? 'border-primary-600 ring-2 ring-primary-400/50 shadow-lg bg-primary-50/80 hover:bg-primary-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}`}
      tabIndex={0}
      onClick={handleRipple}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-pressed={selected}
      role="button"
    >
      {/* Ripple effect */}
      <span
        ref={rippleRef}
        className="pointer-events-none absolute rounded-full bg-primary-300/40 opacity-60 animate-none"
        style={{ transform: 'scale(0)', zIndex: 1 }}
      />
      {/* Animated check icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={selected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute top-2 right-2 z-30"
      >
        {selected && (
          <CheckCircle
            size={24}
            className="text-primary-600 bg-white rounded-full shadow-sm"
          />
        )}
      </motion.div>

      {/* Image will take full card space */}
      <img src={image} alt={title} className="w-full h-full object-cover rounded-xl" />
    </motion.div>
  );
}

const QuestionFlow = ({ onComplete }: QuestionFlowProps) => {
  const [step, setStep] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Wizard state
  const [mainCatIdx, setMainCatIdx] = useState(0);
  const [subCatIdx, setSubCatIdx] = useState(0);
  const [activeSubcatId, setActiveSubcatId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isInitializing, error, saveDataToSheet, uploadPdfToDrive } = useGoogleApi();

  useEffect(() => {
    if (isInitializing) {
      console.log('Google API is initializing...');
    } else if (error) {
      console.error('Google API initialization error:', error);
    }
  }, [isInitializing, error]);

  // Scroll to top of QuestionFlow on step change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  // Step 1: Select main categories
  const handleCategorySelect = (catId: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  // Step 2: Select subcategories for each selected main category
  const handleSubcategorySelect = (catId: string, subcatId: string) => {
    setSelectedSubcategories((prev: Record<string, string[]>) => {
      const current = prev[catId] || [];
      const isSelected = current.includes(subcatId);
      let updated: Record<string, string[]>;

      if (isSelected) {
        updated = {
          ...prev,
          [catId]: current.filter((id) => id !== subcatId),
        };
        setSelectedOptions((opts) => {
          const newOpts = { ...opts };
          delete newOpts[subcatId];
          return newOpts;
        });
        setActiveSubcatId(null);
      } else {
        updated = {
          ...prev,
          [catId]: [...current, subcatId],
        };
        setActiveSubcatId(subcatId);
      }
      return updated;
    });
  };

  // Step 3: Select one option per subcategory
  const handleOptionSelect = (subcatId: string, optionId: string) => {
    setSelectedOptions((prev: Record<string, string>) => ({ ...prev, [subcatId]: optionId }));
    setActiveSubcatId(null);
  };
  
  // Step 4: Personal details form
  const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({ ...prev, [name]: value }));
  };

  const renderPersonalDetailsForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name" 
          value={personalDetails.fullName}
          onChange={handlePersonalDetailsChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400" 
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={personalDetails.email}
          onChange={handlePersonalDetailsChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={personalDetails.phone}
          onChange={handlePersonalDetailsChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={personalDetails.city}
          onChange={handlePersonalDetailsChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          required
        />
      </div>
      <textarea
        name="address"
        placeholder="Full Address"
        value={personalDetails.address}
        onChange={handlePersonalDetailsChange}
        rows={3}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 md:col-span-2"
        required
      />
      <div className="flex justify-between items-center mt-8">
        <button
          className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium shadow-sm hover:bg-gray-200 transition-colors"
          onClick={() => setStep(2)}
        >
          Back
        </button>
        <button
          className="px-8 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!personalDetails.fullName || !personalDetails.email || !personalDetails.phone || !personalDetails.city || !personalDetails.address}
          onClick={() => setStep(4)}
        >
          Review & Submit
        </button>
      </div>
    </motion.div>
  );

  // Step 5: Complete and submit
  const handleSubmit = async () => {
    if (isSubmitting || isInitializing) return; // Prevent multiple submissions or submission while API is initializing
    setIsSubmitting(true);

    try {
      // Prepare answers and total
      let answers: AnswerData[] = [];
      let total = 0;
      Object.entries(selectedOptions).forEach(([subcatId, optionId]) => {
        const option = optionsList.find((o) => o.id === optionId);
        if (option) {
          answers.push({ questionId: subcatId, answer: option.name, value: option.price });
          total += option.price;
        }
      });

      // Generate PDF content
      const pdfContent = `
        <div style="padding: 40px; font-family: Arial, sans-serif;">
          <h2>Quotation Details</h2>
          <div>
            <h3>Personal Information:</h3>
            <p>Name: ${personalDetails.fullName}</p>
            <p>Email: ${personalDetails.email}</p>
            <p>Phone: ${personalDetails.phone}</p>
            <p>City: ${personalDetails.city}</p>
            <p>Address: ${personalDetails.address}</p>
          </div>
          <div>
            <h3>Selected Items:</h3>
            ${answers.map(answer => `
              <p>${answer.questionId}: ${answer.answer} - ₹${answer.value}</p>
            `).join('')}
          </div>
          <div>
            <h3>Total Amount: ₹${total}</h3>
          </div>
        </div>
      `;

      // Create a temporary div for PDF generation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = pdfContent;
      document.body.appendChild(tempDiv);

      try {
        // Generate PDF
        const canvas = await html2canvas(tempDiv, { scale: 2 });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        
        // Convert PDF to Blob
        const pdfBlob = pdf.output('blob');

        // Upload PDF to Google Drive and get link
        const driveResponse = await uploadPdfToDrive(pdfBlob, `Quotation_${personalDetails.fullName}_${Date.now()}.pdf`);
        const driveLink = driveResponse.webViewLink || `https://drive.google.com/file/d/${driveResponse.id}/view`;

        // Save data to Google Sheet
        const rowData = [
          new Date().toISOString(),
          personalDetails.fullName,
          personalDetails.email,
          personalDetails.phone,
          personalDetails.city,
          personalDetails.address,
          JSON.stringify(answers),
          total.toString(),
          driveLink
        ];
        await saveDataToSheet('details!A:I', [rowData]);

        // Clean up
        document.body.removeChild(tempDiv);
        
        // Call onComplete only after successful save
        onComplete(answers, total);
      } catch (error) {
        console.error('Error in PDF generation or Google API operations:', error);
        throw new Error('Failed to generate PDF or save to Google services.');
      }
    } catch (error) {
      console.error('Error submitting estimate:', error);
      alert('There was an error saving your estimate. Please try again. Error: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Wizard navigation logic
  const currentMainCatId = selectedCategories[mainCatIdx];
  const currentMainCat = categories.find((c) => c.id === currentMainCatId);
  const currentSubcats = currentMainCat ? currentMainCat.subcategories : [];
  const selectedSubcats = selectedSubcategories[currentMainCatId] || [];
  const currentSubcatId = selectedSubcats[subCatIdx];
  const currentSubcat = currentSubcats.find((s) => s.id === currentSubcatId);

  // Helper: check if all subcategories for all main categories are answered
  const allAnswered = selectedCategories.every(catId => {
    const cat = categories.find(c => c.id === catId);
    const subcats = selectedSubcategories[catId] || [];
    return subcats.length > 0 && subcats.every(subId => selectedOptions[subId]);
  });
  
  return (
    <motion.div ref={containerRef} className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      {step === 1 && (
        <div>
          <h2 className="text-2xl text-center font-serif font-semibold mb-6 text-gray-800">Shape Your Space - "Pick the Rooms You Want Interiors For"</h2>
          {selectedCategories.length === 0 ? (
            <div className="mb-6 text-center t font-serif text-gray-600">(Pick at least one room)</div>
          ) : null}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-2 sm:p-4 md:p-6 mb-8">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center justify-center">
                <Card
                  image={cat.image}
                  title={cat.name}
                  selected={selectedCategories.includes(cat.id)}
                  onClick={() => handleCategorySelect(cat.id)}
                />
                <span className="mt-2 text-sm font-bold" style={{ color: 'rgb(164, 120, 100)' }}>
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end sticky bottom-0 bg-white pt-4 pb-2 z-10">
            <button
              className="mt-8 px-8 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedCategories.length === 0}
              onClick={() => {
                setStep(1.5);
                setMainCatIdx(0);
                setSubCatIdx(0);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 1.5 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Product Details Comparison</h2>
          <div className="overflow-x-auto mb-8 rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-primary-900 text-white">
                  <th className="px-6 py-4 border-b border-primary-800">Category</th>
                  <th className="px-6 py-4 border-b border-primary-800">Basic</th>
                  <th className="px-6 py-4 border-b border-primary-800">Standard</th>
                  <th className="px-6 py-4 border-b border-primary-800">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border px-2 py-1">Raw Material (Care board)</td><td className="border px-2 py-1">MDF or Particle Board</td><td className="border px-2 py-1">Commercial Plywood</td><td className="border px-2 py-1">Acrylic or PU finish</td></tr>
                <tr><td className="border px-2 py-1">Laminate Finish</td><td className="border px-2 py-1">Pre-laminated designs</td><td className="border px-2 py-1">High-pressure laminate</td><td className="border px-2 py-1">Acrylic or PU finish</td></tr>
                <tr><td className="border px-2 py-1">Shutter Edging</td><td className="border px-2 py-1">PVC edge banding</td><td className="border px-2 py-1">Branded soft-close hinges</td><td className="border px-2 py-1">Laser semeless-edge-fire</td></tr>
                <tr><td className="border px-2 py-1">Hinges</td><td className="border px-2 py-1">Regular self-closing</td><td className="border px-2 py-1">Branded soft-close hinges</td><td className="border px-2 py-1">Premium soft-close hinges</td></tr>
                <tr><td className="border px-2 py-1">Handles</td><td className="border px-2 py-1">Basic metallic handles</td><td className="border px-2 py-1">Branded designer handles</td><td className="border px-2 py-1">Blum/Hettich soft-close</td></tr>
                <tr><td className="border px-2 py-1">Basket</td><td className="border px-2 py-1">Basic wire baskets</td><td className="border px-2 py-1">Stainless steel baskets</td><td className="border px-2 py-1">SS-PVC coated seamless baskets</td></tr>
                <tr><td className="border px-2 py-1">Countertop</td><td className="border px-2 py-1">Granite granite</td><td className="border px-2 py-1">Choice of granite options</td><td className="border px-2 py-1">Premium quartz/marble</td></tr>
                <tr><td className="border px-2 py-1">Base (or E-style desk, profile is operatable)</td><td className="border px-2 py-1">Basic granite</td><td className="border px-2 py-1">Granite / 1% 4.0% loft</td><td className="border px-2 py-1">Premium upart or lain</td></tr>
                <tr><td className="border px-2 py-1">Backsplash</td><td className="border px-2 py-1">Fals sheets/filles</td><td className="border px-2 py-1">Granite or Quartz tiles</td><td className="border px-2 py-1">Premium Quartz or glass</td></tr>
                <tr><td className="border px-2 py-1">Wall Cabinets</td><td className="border px-2 py-1">21 nc height</td><td className="border px-2 py-1">Optional loft</td><td className="border px-2 py-1">Tall units, lofts</td></tr>
                <tr><td className="border px-2 py-1">Glass Shutters</td><td className="border px-2 py-1">Add, al option (optional all)</td><td className="border px-2 py-1">Premium tinted glass</td><td className="border px-2 py-1">Wooden louver or fluted glass</td></tr>
                <tr><td className="border px-2 py-1">Open Shelves</td><td className="border px-2 py-1">Bask shelves</td><td className="border px-2 py-1">Maite glass shelves</td><td className="border px-2 py-1">Worden or metallic shelves</td></tr>
                <tr><td className="border px-2 py-1">Lighting</td><td className="border px-2 py-1">Bulkhead-ceiling lighting</td><td className="border px-2 py-1">LED strip lights & spotlights</td><td className="border px-2 py-1">Layered lights + actylic lighting</td></tr>
                <tr><td className="border px-2 py-1">TV Unit</td><td className="border px-2 py-1">Basic open shelves</td><td className="border px-2 py-1">With drawer & option</td><td className="border px-2 py-1">Push to open drawers</td></tr>
                <tr><td className="border px-2 py-1">Painting</td><td className="border px-2 py-1">Single color rell polish</td><td className="border px-2 py-1">Basic wooden polish</td><td className="border px-2 py-1">Bespoke printer finish</td></tr>
                <tr><td className="border px-2 py-1">Kitchen Accessories</td><td className="border px-2 py-1">Optional basic cutlery, cup & plans basket</td><td className="border px-2 py-1">Up to 3 plain baskets corner solutions</td><td className="border px-2 py-1">Magic corner, oil pull out, woolker cutlary</td></tr>
                <tr><td className="border px-2 py-1">Hardware Warranty</td><td className="border px-2 py-1">5 years</td><td className="border px-2 py-1">5 years</td><td className="border px-2 py-1">10 years</td></tr>
                <tr><td className="border px-2 py-1">Wall Paint</td><td className="border px-2 py-1">Basic white emulsion</td><td className="border px-2 py-1">Choice of vibrant colours</td><td className="border px-2 py-1">Premium emulsion paint</td></tr>
                <tr><td className="border px-2 py-1">Overall Design Consultation</td><td className="border px-2 py-1">Basic 2D layout</td><td className="border px-2 py-1">30 visualization 1 time revision</td><td className="border px-2 py-1">Full 3D walkthrough + customization</td></tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button
              className="px-8 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-md hover:bg-primary-700 transition-colors"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && currentMainCat && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Subcategories for {currentMainCat.name}</h2>
          {selectedSubcats.length === 0 ? (
            <div className="mb-6 text-gray-600">Select at least one subcategory to continue.</div>
          ) : null}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-2 sm:p-4 md:p-6 mb-8">
            {currentMainCat.subcategories.map((sub) => {
              const isTrulySelected = selectedSubcats.includes(sub.id) && !!selectedOptions[sub.id];
              const isSelected = selectedSubcats.includes(sub.id);
              const isActive = activeSubcatId === sub.id;
              const hasProduct = !!selectedOptions[sub.id];
              const shouldBlur = activeSubcatId && !hasProduct && !isActive;
              return (
                <div key={sub.id} className="flex flex-col items-center justify-start w-full">
                  <motion.div
                    whileTap={{ scale: 0.96 }}
                    animate={isTrulySelected ? { scale: 1.08, boxShadow: '0 6px 24px 0 rgba(163,120,86,0.18)', borderColor: '#a37856' } : { scale: 1, boxShadow: 'none', borderColor: '#e5e7eb' }}
                    whileHover={{ y: -6, boxShadow: '0 8px 32px 0 rgba(163,120,86,0.12)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative w-full transition-all duration-300 ${shouldBlur ? 'blur-sm opacity-50 pointer-events-none' : ''}`}
                    onClick={() => {
                      if (selectedSubcats.includes(sub.id)) {
                         if (isActive) setActiveSubcatId(null);
                         else setActiveSubcatId(sub.id);
                      } else {
                         handleSubcategorySelect(currentMainCat.id, sub.id);
                         setActiveSubcatId(sub.id);
                      }
                    }}
                  >
                    <Card
                      image={sub.image}
                      title={sub.name}
                      selected={isTrulySelected}
                      onClick={() => {}}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto flex flex-col md:flex-row gap-4 justify-center items-stretch mt-4 mb-4"
                        style={{ position: 'static', zIndex: 'auto' }}
                      >
                        {optionsList.map((opt) => {
                          const isSelected = selectedOptions[sub.id] === opt.id;
                          return (
                            <motion.div
                              key={opt.id}
                              whileTap={{ scale: 0.97 }}
                              animate={isSelected ? { scale: 1.04, boxShadow: '0 4px 16px 0 rgba(163,120,86,0.13)', borderColor: '#a37856', backgroundColor: '#f7ede3' } : { scale: 1, boxShadow: 'none', borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                              className={`relative w-full md:flex-1 min-w-0 md:min-w-[7rem] md:max-w-[10rem] h-32 flex-shrink-0 flex flex-col items-center justify-center rounded-xl border-2 px-4 py-3 cursor-pointer select-none transition-all duration-300 shadow-sm text-center ${isSelected ? 'border-primary-600 bg-primary-50' : 'bg-white border-gray-200 text-gray-800 hover:border-primary-400 hover:bg-primary-50'}`}
                              style={{ minHeight: '8rem' }}
                              onClick={() => handleOptionSelect(sub.id, opt.id)}
                              tabIndex={0}
                              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleOptionSelect(sub.id, opt.id)}
                              aria-pressed={isSelected}
                              role="button"
                            >
                              <span className="font-semibold text-base mb-1 text-primary-700" style={{ color: isSelected ? '#a37856' : '#a37856' }}>{opt.name}</span>
                              <div className="w-8 h-0.5 bg-primary-200 my-1 rounded-full" />
                              <span className="text-lg font-bold mb-1" style={{ color: isSelected ? '#a37856' : '#a37856' }}>₹{opt.price}</span>
                              {isSelected && (
                                <span className="absolute bottom-2 right-2 text-primary-600">
                                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" stroke="#a37856" strokeWidth="2" fill="#fff"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#a37856" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                              )}
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {hasProduct && !isActive && selectedOptions[sub.id] && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-center justify-between text-white text-lg text-center mt-2 font-bold rounded-xl px-6 py-3 shadow-md"
                      style={{ width: '100%', background: 'rgb(163 120 86)' }}
                    >
                      <span className="flex-1 text-left">
                        {(() => {
                          const opt = optionsList.find(o => o.id === selectedOptions[sub.id]);
                          return opt ? `${opt.name} - ₹${opt.price}` : '';
                        })()}
                      </span>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center mt-8">
            <button
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium shadow-sm hover:bg-gray-200 transition-colors"
              onClick={() => {
                setActiveSubcatId(null);
                if (subCatIdx > 0) setSubCatIdx(subCatIdx - 1);
                else if (mainCatIdx > 0) {
                  setMainCatIdx(mainCatIdx - 1);
                  const prevCatId = selectedCategories[mainCatIdx - 1];
                  const prevSubcats = selectedSubcategories[prevCatId] || [];
                  setSubCatIdx(prevSubcats.length - 1);
                }
              }}
              disabled={mainCatIdx === 0 && subCatIdx === 0}
            >
              Back
            </button>
            <button
              className="px-8 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedSubcats.length === 0 || !selectedSubcats.every(subId => selectedOptions[subId])}
              onClick={() => {
                setActiveSubcatId(null);
                if (mainCatIdx < selectedCategories.length - 1) {
                  setMainCatIdx(mainCatIdx + 1);
                  setSubCatIdx(0);
                } else {
                  setStep(3);
                }
              }}
            >
              {mainCatIdx < selectedCategories.length - 1 ? 'Next Category' : 'Finish'}
            </button>
          </div>
        </div>
      )}
      {step === 3 && allAnswered && renderPersonalDetailsForm()}
      {step === 4 && allAnswered && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Review & Submit</h2>
          <div className="flex justify-end">
            <button
              className={`px-8 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-md transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'
              }`}
              onClick={handleSubmit}
              disabled={isSubmitting || isInitializing}
            >
              {isSubmitting || isInitializing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isInitializing ? 'Initializing API...' : 'Submitting...'}
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default QuestionFlow;