import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnswerData } from '../../pages/EstimatePage';
import logo from '../../assects/logo.png';
import { CheckCircle } from 'lucide-react';

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

const categories: Category[] = [
  {
    id: 'living-room',
    name: 'Living Room / Hall',
    image: logo,
    subcategories: [
      { id: 'main-door', name: 'Main Door Panelling / Safety Door', image: logo },
      { id: 'tv-unit', name: 'TV Unit (Wall-mounted / Floor-standing)', image: logo },
      { id: 'display-unit', name: 'Display Unit / Showcase', image: logo },
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
    image: logo,
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
    image: logo,
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
    id: 'childrens-room',
    name: "Children's Room",
    image: logo,
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
    id: 'kitchen',
    name: 'Kitchen',
    image: logo,
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
    image: logo,
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
    image: logo,
    subcategories: [
      { id: 'pooja-unit', name: 'Pooja Unit (Wall-mounted / Floor-standing)', image: logo },
      { id: 'mandapam-style', name: 'Mandapam Style Pooja Unit', image: logo },
      { id: 'storage-drawers', name: 'Storage Drawers below Pooja Unit', image: logo },
    ],
  },
  {
    id: 'home-office',
    name: 'Home Office / Study Room',
    image: logo,
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
    name: 'Balcony / Outdoor Space',
    image: logo,
    subcategories: [
      { id: 'seating-bench', name: 'Seating Bench with Storage', image: logo },
      { id: 'garden-storage', name: 'Garden Storage Cabinet', image: logo },
      { id: 'outdoor-shoe-rack', name: 'Outdoor Shoe Rack', image: logo },
      { id: 'swing', name: 'Swing / Jhula (if applicable)', image: logo },
    ],
  },
  {
    id: 'common-areas',
    name: 'Common Areas / Passage',
    image: logo,
    subcategories: [
      { id: 'wall-niches', name: 'Wall Niches with Shelving', image: logo },
      { id: 'shoe-rack', name: 'Shoe Rack / Bench Storage', image: logo },
      { id: 'mirror-panels', name: 'Mirror Panels', image: logo },
      { id: 'decorative-panelling', name: 'Decorative Wall Panelling', image: logo },
      { id: 'wall-mounted-display', name: 'Wall-mounted Display Unit', image: logo },
    ],
  },
  {
    id: 'optional-addons',
    name: 'Optional Add-Ons (Quoted Separately)',
    image: logo,
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
  return (
    <div
      className={`relative w-32 h-32 border-2 rounded-xl flex flex-col items-center justify-center cursor-pointer m-2 p-2 transition-all duration-300
        ${selected 
          ? 'border-primary-600 ring-2 ring-primary-400/50 shadow-lg bg-primary-50/80 hover:bg-primary-50' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}`}
      onClick={onClick}
    >
      {selected && (
        <CheckCircle
          size={24}
          className="absolute top-2 right-2 text-primary-600 bg-white rounded-full shadow-sm"
        />
      )}
      <img src={image} alt={title} className="w-16 h-16 object-cover mb-2 rounded-lg" />
      <span className="text-center text-sm font-medium text-gray-700">{title}</span>
      {price !== undefined && <span className="text-xs text-gray-500 mt-1">₹{price}</span>}
    </div>
  );
}

const QuestionFlow = ({ onComplete }: QuestionFlowProps) => {
  const [step, setStep] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // array of category ids
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string[]>>({}); // { [catId]: [subcatId, ...] }
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({}); // { [subcatId]: optionId }

  // Wizard state
  const [mainCatIdx, setMainCatIdx] = useState(0);
  const [subCatIdx, setSubCatIdx] = useState(0);

  // Add state for active subcategory in current main category step
  const [activeSubcatId, setActiveSubcatId] = useState<string | null>(null);

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
        // Deselect: remove from selected, clear product selection, deactivate
        updated = {
          ...prev,
          [catId]: current.filter((id) => id !== subcatId),
        };
        setActiveSubcatId(null);
        setSelectedOptions((opts) => {
          const newOpts = { ...opts };
          delete newOpts[subcatId];
          return newOpts;
        });
      } else {
        // Select: add to selected, activate
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
  };
  
  // Step 4: Complete and submit
  const handleSubmit = () => {
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
    onComplete(answers, total);
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
    <motion.div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Main Categories</h2>
          {selectedCategories.length === 0 ? (
            <div className="mb-6 text-gray-600">Select at least one main category to continue.</div>
          ) : null}
          <div className="flex flex-wrap">
            {categories.map((cat) => (
              <Card
                key={cat.id}
                image={cat.image}
                title={cat.name}
                selected={selectedCategories.includes(cat.id)}
                onClick={() => handleCategorySelect(cat.id)}
              />
            ))}
          </div>
          <div className="flex justify-end">
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
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">{currentMainCat.name}</h2>
          {selectedSubcats.length === 0 ? (
            <div className="mb-6 text-gray-600">Select at least one subcategory to continue.</div>
          ) : null}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {currentMainCat.subcategories.map((sub) => {
              const isSelected = selectedSubcats.includes(sub.id);
              const isActive = activeSubcatId === sub.id;
              const hasProduct = !!selectedOptions[sub.id];
              const shouldBlur = activeSubcatId && !hasProduct && !isActive;
              return (
                <div key={sub.id} className="w-full mb-4">
                  <div
                    className={`transition-all duration-300 ${isActive ? 'z-10' : ''} ${shouldBlur ? 'blur-sm opacity-50 pointer-events-none' : ''}`}
                    onClick={() => {
                      if (isSelected) setActiveSubcatId(sub.id);
                      else handleSubcategorySelect(currentMainCat.id, sub.id);
                    }}
                  >
                    <Card
                      image={sub.image}
                      title={sub.name}
                      selected={isSelected}
                      onClick={() => {}}
                    />
                  </div>
                  <AnimatePresence>
                    {isActive && isSelected && !hasProduct && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-nowrap gap-4 mt-4 mb-4"
                      >
                        {optionsList.map((opt) => (
                          <Card
                            key={opt.id}
                            image={opt.image}
                            title={opt.name}
                            price={opt.price}
                            selected={selectedOptions[sub.id] === opt.id}
                            onClick={() => {
                              handleOptionSelect(sub.id, opt.id);
                              setActiveSubcatId(null);
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {hasProduct && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="text-white text-lg text-center mt-2 font-bold rounded-xl px-6 py-3 shadow-md"
                      style={{ width: '75%', background: 'rgb(122, 44, 0)' }}
                    >
                      {(() => {
                        const opt = optionsList.find(o => o.id === selectedOptions[sub.id]);
                        return opt ? `${opt.name} - ₹${opt.price}` : '';
                      })()}
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
      {step === 3 && allAnswered && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Review & Submit</h2>
          <div className="flex justify-end">
            <button
              className="px-8 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-md hover:bg-primary-700 transition-colors"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default QuestionFlow;