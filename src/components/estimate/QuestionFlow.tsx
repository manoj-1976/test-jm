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
import options from '../../assects/optionalS.jpg';
import guste from '../../assects/gustroom.jpg';
import door3 from '../../assects/door3.jpg';
import door1 from '../../assects/door1.jpg';
import door2 from '../../assects/door2.jpg';
import tv1 from '../../assects/tv1.jpg';
import tv2 from '../../assects/tv2.jpg';
import tv3 from '../../assects/tv3.jpg';
import display1 from '../../assects/display1.jpg';
import display2 from '../../assects/display2.jpg';
import display3 from '../../assects/display3.jpg';
import table1 from '../../assects/table1.jpg';
import table2 from '../../assects/table2.jpg';
import table3 from '../../assects/table3.jpg';
import side1 from '../../assects/side1.jpg';
import side2 from '../../assects/side2.jpg';
import side3 from '../../assects/side3.jpg';
import wall1 from '../../assects/wall1.jpg';
import wall2 from '../../assects/wall2.jpg';
import wall3 from '../../assects/wall3.jpg';
import shoe1 from '../../assects/shoe1.jpg';
import shoe2 from '../../assects/shoe2.jpg';
import shoe3 from '../../assects/shoe3.jpg';
import partition1 from '../../assects/partition1.jpg';
import partition2 from '../../assects/partition2.jpg';
import partition3 from '../../assects/partition3.jpg';
import sofa1 from '../../assects/sofa1.jpg';
import sofa2 from '../../assects/sofa2.jpg';
import sofa3 from '../../assects/sofa3.jpg';
import dinning1 from '../../assects/dining1.jpg';
import dinning2 from '../../assects/dinning2.jpg';
import dinning3 from '../../assects/dinning3.jpg';
import crockery1 from '../../assects/crockery1.jpg';
import crockery2 from '../../assects/crockery2.jpg';
import crockery3 from '../../assects/crockery3.jpg';
import cot1 from '../../assects/cot1.jpg';
import cot2 from '../../assects/cot2.jpg';
import cot3 from '../../assects/cot3.jpg';
import wardrobe1 from '../../assects/wardrobe1.jpg';
import wardrobe2 from '../../assects/wardrobe2.jpg';
import wardrobe3 from '../../assects/wardrobe3.jpg';
import loft1 from '../../assects/loft1.jpg';
import loft2 from '../../assects/loft2.jpg';
import loft3 from '../../assects/loft3.jpg';
import dressing1 from '../../assects/dressing1.jpg';
import dressing2 from '../../assects/dressing2.jpg';
import dressing3 from '../../assects/dressing3.jpg';
import study1 from '../../assects/study1.jpg';
import study2 from '../../assects/study2.jpg';
import study3 from '../../assects/study3.jpg';
import mini1 from '../../assects/mini1.jpg';
import mini2 from '../../assects/mini2.jpg';
import mini3 from '../../assects/mini3.jpg';
import window1 from '../../assects/window1.jpg';
import window2 from '../../assects/window2.jpg';
import window3 from '../../assects/window3.jpg';
import walkin1 from '../../assects/walkin1.jpg';
import walkin2 from '../../assects/walkin2.jpg';
import walkin3 from '../../assects/walkin3.jpg';
import pooja1 from '../../assects/pooja1.jpg';
import pooja2 from '../../assects/pooja2.jpg';
import pooja3 from '../../assects/pooja3.jpg';
import wardrobechild1 from '../../assects/wardrobechild1.jpg';
import wardrobechild2 from '../../assects/wardrobechild2.jpg';
import wardrobechild3 from '../../assects/wardrobechild3.jpg';
import bunk1 from '../../assects/bunk1.jpg';
import bunk2 from '../../assects/bunk2.jpg';
import bunk3 from '../../assects/bunk3.jpg';
import toy1 from '../../assects/toy1.jpg';
import toy2 from '../../assects/toy2.jpg';
import toy3 from '../../assects/toy3.jpg';
import kidsstudy1 from '../../assects/kidsstudy1.jpg';
import kidsstudy2 from '../../assects/kidsstudy2.jpg';
import kidsstudy3 from '../../assects/kidsstudy3.jpg';

// Placeholder image
// const placeholderImg = 'https://via.placeholder.com/100?text=Image';

interface Option {
  id: string;
  name: string;
  price: number;
  image: string;
  dimensions?: string;
}

interface Subcategory {
  id: string;
  name: string;
  image: string;
  options?: Option[];
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
      { id: 'main-door', name: 'Main Door Panelling', image: door3, options: [
        { id: 'main-door-basic', name: 'Basic', price: 24350, image: door1, dimensions: `(42" (W) x 92" (H) = 32 sq ft)` },
        { id: 'main-door-standard', name: 'Standard', price: 35500, image: door2, dimensions: `(42" (W) x 92" (H) = 32 sq ft)` },
        { id: 'main-door-premium', name: 'Premium', price: 48500, image: door3, dimensions: `(72" (W) x 92" (H) = 48 sq ft)` },
      ]},
      { id: 'tv-unit', name: 'TV Unit', image: tv3, options: [
        { id: 'tv-unit-basic', name: 'Basic', price: 19500, image: tv1, dimensions: `(96" (W) x 15" (H) = 16 sq ft)` },
        { id: 'tv-unit-standard', name: 'Standard', price: 49450, image: tv2, dimensions: `(84" (W) x 84" (H) = 49 sq ft)`},
        { id: 'tv-unit-premium', name: 'Premium', price: 74900, image: tv3, dimensions: `(120" (W) x 96" (H) = 80 sq ft)` },
      ]},
      { id: 'display-unit', name: 'Display Unit', image: display3, options: [
        { id: 'display-unit-basic', name: 'Basic', price: 22000, image: display1, dimensions: `(36" (W) x 96" (H) = 24 sq ft)`},
        { id: 'display-unit-standard', name: 'Standard', price: 34500, image: display2, dimensions: `(48" (W) x 96" (H) = 32 sq ft)`},
        { id: 'display-unit-premium', name: 'Premium', price: 55100, image: display3, dimensions: `(84" (W) x 96" (H) = 56 sq ft)` },
      ]},
      { id: 'center-table', name: 'Center Table', image: table3, options: [
        { id: 'center-table-basic', name: 'Basic', price: 8500, image: table1, dimensions: `(48" (W) x 18" (H) = 8 sq ft)`},
        { id: 'center-table-standard', name: 'Standard', price: 12500, image: table2, dimensions: `(48" (W) x 18" (H) = 8 sq ft)`},
        { id: 'center-table-premium', name: 'Premium', price: 16800, image: table3, dimensions: `(48" (W) x 18" (H) = 8 sq ft)`},
      ] },
      { id: 'side-tables', name: 'Side Tables', image: side3, options: [
        { id: 'side-tables-basic', name: 'Basic', price: 5000, image: side1, dimensions: `(20" (W) x 20" (H) = 4 sq ft)`},
        { id: 'side-tables-standard', name: 'Standard', price: 6000, image: side2, dimensions: `(20" (W) x 24" (H) = 4 sq ft)`},
        { id: 'side-tables-premium', name: 'Premium', price: 7000, image: side3, dimensions: `(20" (W) x 28" (H) = 5 sq ft)`},
      ] },
      { id: 'wall-shelves', name: 'Wall Shelves', image: wall3, options: [
        { id: 'wall-shelves-basic', name: 'Basic', price: 5500, image: wall1, dimensions: `(18" (W) x 24" (H) = 3 sq ft)`},
        { id: 'wall-shelves-standard', name: 'Standard', price: 11300, image: wall2, dimensions: `(48" (W) x 48" (H) = 16 sq ft)`},
        { id: 'wall-shelves-premium', name: 'Premium', price: 24600, image: wall3, dimensions: `(72" (W) x 60" (H) = 30 sq ft)`},
      ] },
      { id: 'shoe-rack', name: 'Shoe Rack', image: shoe3, options: [
        { id: 'shoe-rack-basic', name: 'Basic', price: 14500, image: shoe1, dimensions: `(48" (W) x  48" (H) = 16 sq ft)`},
        { id: 'shoe-rack-standard', name: 'Standard', price: 20900, image: shoe2, dimensions: `(72" (W) x  48" (H) = 24 sq ft)`},
        { id: 'shoe-rack-premium', name: 'Premium', price: 36100, image: shoe3, dimensions: `(96" (W) x 60" (H) = 30 sq ft)`},
      ]},
      { id: 'partition-unit', name: 'Partition Unit ', image: partition3, options: [
        { id: 'partition-basic', name: 'Basic', price: 14500, image: partition1, dimensions: `(48" (W) x  48" (H) = 16 sq ft)`},
        { id: 'partition-standard', name: 'Standard', price: 20900, image: partition2, dimensions: `(72" (W) x  48" (H) = 24 sq ft)`},
        { id: 'partition-premium', name: 'Premium', price: 36100, image: partition3, dimensions: `(96" (W) x 60" (H) = 30 sq ft)`},
      ]},
      { id: 'sofa', name: 'Sofa', image: sofa3, options: [
        { id: 'sofa-basic', name: 'Basic', price: 19800, image: sofa1, dimensions: `(60" (W) x  36" (H) = 15 sq ft)`},
        { id: 'sofa-standard', name: 'Standard', price: 29800, image: sofa2, dimensions: `(84" (W) x  36" (H) = 21 sq ft)`},
        { id: 'sofa-premium', name: 'Premium', price: 74500, image: sofa3, dimensions: `(144" (W) x 36" (H) = 36 sq ft)`},
      ]}
      // { id: 'seating-bench', name: 'Seating Bench with Storage', image: logo },
      // { id: 'swing', name: 'Swing (Jhula)', image: logo },
      // { id: 'bookshelf', name: 'Bookshelf (if applicable)', image: logo },
    ],
  },

  {
    id: 'dining-area',
    name: 'Dining Area',
    image: diningroom,
    subcategories: [
      { id: 'dining-table', name: 'Dining Table', image: dinning3, options: [
        { id: 'dining-basic', name: 'Basic', price: 25500, image: dinning1, dimensions: `(4 Seater = 40 sq ft)`},
        { id: 'dining-standard', name: 'Standard', price: 65400, image: dinning2, dimensions: `(6 Seater = 60 sq ft)`},
        { id: 'dining-premium', name: 'Premium', price: 87000, image: dinning3, dimensions: `(8 Seater = 80 sq ft)`},
      ]},
      { id: 'crockery-unit', name: 'Crockery Unit', image: crockery3, options: [
        { id: 'crockery-basic', name: 'Basic', price: 22800, image: crockery1, dimensions: `(24" (W) x  60" (H) = 10 sq ft)`},
        { id: 'crockery-standard', name: 'Standard', price: 48700, image: crockery2, dimensions: `(60" (W) x  84" (H) = 30 sq ft)`},
        { id: 'crockery-premium', name: 'Premium', price: 85600, image: crockery3, dimensions: `(96" (W) x 96" (H) = 64 sq ft)`},
      ]}
      // { id: 'mini-bar', name: 'Mini Bar Unit / Bar Counter', image: logo },
      // { id: 'buffet-table', name: 'Buffet Table / Sideboard', image: logo },
      // { id: 'wall-shelf', name: 'Wall-mounted Shelf / Service Counter', image: logo },
    ],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    image: bedroom,
    subcategories: [
      { id: 'cot', name: 'Cot', image: cot3, options: [
        { id: 'cot-basic', name: 'Basic', price: 21500, image: cot1, dimensions: `(King' = 50 sq ft)`},
        { id: 'cot-standard', name: 'Standard', price: 48500, image: cot2, dimensions: `(King' = 50 sq ft)`},
        { id: 'cot-premium', name: 'Premium', price: 98500, image: cot3, dimensions: `(King' = 50 sq ft)`},
      ]},
      { id: 'side-table', name: 'Side Table ', image: side3, options: [
        { id: 'side-tables-bed-basic', name: 'Basic', price: 5000, image: side1, dimensions: `(20" (W) x 20" (H) = 4 sq ft)`},
        { id: 'side-tables-bed-standard', name: 'Standard', price: 6000, image: side2, dimensions: `(20" (W) x 24" (H) = 4 sq ft)`},
        { id: 'side-tables-bed-premium', name: 'Premium', price: 7000, image: side3, dimensions: `(20" (W) x 28" (H) = 5 sq ft)`},
      ] },
      { id: 'wardrobe', name: 'Wardrobe (Sliding / Openable)', image: wardrobe3, options: [
        { id: 'wardrobe-basic', name: 'Basic', price: 38200, image: wardrobe1, dimensions: `(48" (W) x 84" (H) = 28 sq ft)`},
        { id: 'wardrobe-standard', name: 'Standard', price: 58800, image: wardrobe2, dimensions: `(72" (W) x 84" (H) = 42 sq ft)`},
        { id: 'wardrobe-premium', name: 'Premium', price: 95800, image: wardrobe3, dimensions: `(96" (W) x 84" (H) = 56 sq ft)`},
      ] },
      { id: 'loft', name: 'Loft (Above Wardrobe or Door)', image: loft3, options: [
        { id: 'loft-basic', name: 'Basic', price: 30000, image: loft1, dimensions: `(120" (W) x 36" (H) = 30 sq ft)`},
        { id: 'loft-standard', name: 'Standard', price: 36000, image: loft2, dimensions: `(120" (W) x 36" (H) = 30 sq ft)`},
        { id: 'loft-premium', name: 'Premium', price: 42000, image: loft3, dimensions: `(120" (W) x 36" (H) = 30 sq ft)`},
      ] },
      { id: 'dressing-unit', name: 'Dressing Unit with Mirror', image: dressing3, options: [
        { id: 'dressing-basic', name: 'Basic', price: 14600, image: dressing1, dimensions: `(24" (W) x 72" (H) = 12 sq ft)`},
        { id: 'dressing-standard', name: 'Standard', price: 22600, image: dressing2, dimensions: `(48" (W) x 72" (H) = 24 sq ft)`},
        { id: 'dressing-premium', name: 'Premium', price: 54700, image: dressing3, dimensions: `(72" (W) x 85" (H) = 42 sq ft)`},
      ] },
      { id: 'study-table', name: 'Study Table / Working Table', image: study3, options: [
        { id: 'study-basic', name: 'Basic', price: 24500, image: study1, dimensions: `(60" (W) x 60" (H) = 25 sq ft)`},
        { id: 'study-standard', name: 'Standard', price: 42500, image: study2, dimensions: `(60" (W) x 84" (H) = 35 sq ft)`},
        { id: 'study-premium', name: 'Premium', price: 66400, image: study3, dimensions: `(84" (W) x 96" (H) = 56 sq ft)`},
      ] },
      // { id: 'bookshelf', name: 'Bookshelf / Wall Shelf', image: logo },
      { id: 'mini-tv-unit', name: 'Mini TV Unit', image: mini3, options: [
        { id: 'mini-basic', name: 'Basic', price: 16700, image: mini1, dimensions: `(48" (W) x 60" (H) = 20 sq ft)`},
        { id: 'mini-standard', name: 'Standard', price: 32600, image: mini2, dimensions: `(48" (W) x 72" (H) = 24 sq ft)`},
        { id: 'mini-premium', name: 'Premium', price: 74300, image: mini3, dimensions: `(96" (W) x 96" (H) = 64 sq ft)`},
      ] },
      { id: 'window-seating', name: 'Window Seating', image: window3, options: [
        { id: 'window-basic', name: 'Basic', price: 14000, image: window1, dimensions: `(60" (W) x 20" (H) = 12 sq ft)`},
        { id: 'window-standard', name: 'Standard', price: 17000, image: window2, dimensions: `(60" (W) x 20" (H) = 12 sq ft)`},
        { id: 'window-premium', name: 'Premium', price: 20000, image: window3, dimensions: `(60" (W) x 20" (H) = 12 sq ft)`},
      ] },
      // { id: 'chest-of-drawers', name: 'Chest of Drawers', image: logo },
      { id: 'walk-in-Wardrobe', name: 'Walk-in Wardrobe', image: walkin3, options: [
        { id: 'walk-in-basic', name: 'Basic', price: 14000, image: walkin1, dimensions: `(48" (W) x 60" (H) = 20 sq ft)`},
        { id: 'walk-in-standard', name: 'Standard', price: 17000, image: walkin2, dimensions: `(48" (W) x 72" (H) = 24 sq ft)`},
        { id: 'walk-in-premium', name: 'Premium', price: 20000, image: walkin3, dimensions: `(96" (W) x 96" (H) = 64 sq ft)`},
      ] },
      // { id: 'prayer-unit', name: 'Prayer Unit / Pooja Shelf (if inside bedroom)', image: pooja3, options: [
      //   { id: 'walk-in-basic', name: 'Basic', price:  14800, image: pooja1, dimensions: `(48" (W) x 48" (H) = 16 sq ft)`},
      //   { id: 'walk-in-standard', name: 'Standard', price: 29200, image: pooja2, dimensions: `(36" (W) x 84" (H) = 21 sq ft)`},
      //   { id: 'walk-in-premium', name: 'Premium', price: 62800, image: pooja3, dimensions: `(72" (W) x 96" (H) = 48 sq ft)`},
      // ] },
    ],
  },
  {
    id: 'parents-bedroom',
    name: `Parent's bedroom`,
    image: parent,
    subcategories: [
      { id: 'cot', name: 'Cot', image: cot3, options: [
        { id: 'cot-parent-basic', name: 'Basic', price: 21500, image: cot1, dimensions: `(King' = 50 sq ft)`},
        { id: 'cot-parent-standard', name: 'Standard', price: 48500, image: cot2, dimensions: `(King' = 50 sq ft)`},
        { id: 'cot-parent-premium', name: 'Premium', price: 98500, image: cot3, dimensions: `(King' = 50 sq ft)`},
      ]},
      { id: 'side-table', name: 'Side Table ', image: side3, options: [
        { id: 'side-tables-parent-bed-basic', name: 'Basic', price: 5000, image: side1, dimensions: `(20" (W) x 20" (H) = 4 sq ft)`},
        { id: 'side-tables-parent-bed-standard', name: 'Standard', price: 6000, image: side2, dimensions: `(20" (W) x 24" (H) = 4 sq ft)`},
        { id: 'side-tables-parent-bed-premium', name: 'Premium', price: 7000, image: side3, dimensions: `(20" (W) x 28" (H) = 5 sq ft)`},
      ] },
      { id: 'wardrobe', name: 'Wardrobe (Sliding / Openable)', image: wardrobe3, options: [
        { id: 'wardrobe-parent-basic', name: 'Basic', price: 38200, image: wardrobe1, dimensions: `(48" (W) x 84" (H) = 28 sq ft)`},
        { id: 'wardrobe-parent-standard', name: 'Standard', price: 58800, image: wardrobe2, dimensions: `(72" (W) x 84" (H) = 42 sq ft)`},
        { id: 'wardrobe-parent-premium', name: 'Premium', price: 95800, image: wardrobe3, dimensions: `(96" (W) x 84" (H) = 56 sq ft)`},
      ] },
      { id: 'loft', name: 'Loft (Above Wardrobe or Door)', image: loft3, options: [
        { id: 'loft-parent-basic', name: 'Basic', price: 30000, image: loft1, dimensions: `(120" (W) x 36" (H) = 30 sq ft)`},
        { id: 'loft-parent-standard', name: 'Standard', price: 36000, image: loft2, dimensions: `(120" (W) x 36" (H) = 30 sq ft)`},
        { id: 'loft-parent-premium', name: 'Premium', price: 42000, image: loft3, dimensions: `(120" (W) x 36" (H) = 30 sq ft)`},
      ] },
      { id: 'dressing-unit', name: 'Dressing Unit with Mirror', image: dressing3, options: [
        { id: 'dressing-parent-basic', name: 'Basic', price: 14600, image: dressing1, dimensions: `(24" (W) x 72" (H) = 12 sq ft)`},
        { id: 'dressing-parent-standard', name: 'Standard', price: 22600, image: dressing2, dimensions: `(48" (W) x 72" (H) = 24 sq ft)`},
        { id: 'dressing-parent-premium', name: 'Premium', price: 54700, image: dressing3, dimensions: `(72" (W) x 85" (H) = 42 sq ft)`},
      ] },
      { id: 'study-table', name: 'Study Table / Working Table', image: study3, options: [
        { id: 'study-parent-basic', name: 'Basic', price: 24500, image: study1, dimensions: `(60" (W) x 60" (H) = 25 sq ft)`},
        { id: 'study-parent-standard', name: 'Standard', price: 42500, image: study2, dimensions: `(60" (W) x 84" (H) = 35 sq ft)`},
        { id: 'study-parent-premium', name: 'Premium', price: 66400, image: study3, dimensions: `(84" (W) x 96" (H) = 56 sq ft)`},
      ] },
      // { id: 'bookshelf', name: 'Bookshelf / Wall Shelf', image: logo },
      { id: 'mini-tv-unit', name: 'Mini TV Unit', image: mini3, options: [
        { id: 'mini-parent-basic', name: 'Basic', price: 16700, image: mini1, dimensions: `(48" (W) x 60" (H) = 20 sq ft)`},
        { id: 'mini-parent-standard', name: 'Standard', price: 32600, image: mini2, dimensions: `(48" (W) x 72" (H) = 24 sq ft)`},
        { id: 'mini-parent-premium', name: 'Premium', price: 74300, image: mini3, dimensions: `(96" (W) x 96" (H) = 64 sq ft)`},
      ] },
      { id: 'window-seating', name: 'Window Seating', image: window3, options: [
        { id: 'window-parent-basic', name: 'Basic', price: 14000, image: window1, dimensions: `(60" (W) x 20" (H) = 12 sq ft)`},
        { id: 'window-parent-standard', name: 'Standard', price: 17000, image: window2, dimensions: `(60" (W) x 20" (H) = 12 sq ft)`},
        { id: 'window-parent-premium', name: 'Premium', price: 20000, image: window3, dimensions: `(60" (W) x 20" (H) = 12 sq ft)`},
      ] },
      // { id: 'chest-of-drawers', name: 'Chest of Drawers', image: logo },
      { id: 'walk-in-Wardrobe', name: 'Walk-in Wardrobe', image: walkin3, options: [
        { id: 'walk-in-parent-basic', name: 'Basic', price: 14000, image: walkin1, dimensions: `(48" (W) x 60" (H) = 20 sq ft)`},
        { id: 'walk-in-parent-standard', name: 'Standard', price: 17000, image: walkin2, dimensions: `(48" (W) x 72" (H) = 24 sq ft)`},
        { id: 'walk-in-parent-premium', name: 'Premium', price: 20000, image: walkin3, dimensions: `(96" (W) x 96" (H) = 64 sq ft)`},
      ] },
      // { id: 'prayer-unit', name: 'Prayer Unit / Pooja Shelf (if inside bedroom)', image: pooja3, options: [
      //   { id: 'prayer-parent-basic', name: 'Basic', price:  14800, image: pooja1, dimensions: `(48" (W) x 48" (H) = 16 sq ft)`},
      //   { id: 'prayer-parent-standard', name: 'Standard', price: 29200, image: pooja2, dimensions: `(36" (W) x 84" (H) = 21 sq ft)`},
      //   { id: 'prayer-parent-premium', name: 'Premium', price: 62800, image: pooja3, dimensions: `(72" (W) x 96" (H) = 48 sq ft)`},
      // ] },
    ],
  },
  {
    id: 'childrens-room',
    name: "Children's Room",
    image: childrensroom,
    subcategories: [
      { id: 'bunk-bed', name: 'Bunk Bed', image: bunk3, options: [
        { id: 'bunk-children-basic', name: 'Basic', price: 48200, image: bunk1, dimensions: `(2 Single Cot = 28 sq ft)`},
        { id: 'bunk-children-standard', name: 'Standard', price: 82300, image: bunk2, dimensions: `(2 Single Cot = 50 sq ft)`},
        { id: 'bunk-children-premium', name: 'Premium', price: 112800, image: bunk3, dimensions: `(2 Single Cot = 90 sq ft)`},
      ]},
      { id: 'study-table-storage', name: 'Study Table', image: kidsstudy3, options: [
        { id: 'study-children-basic', name: 'Basic', price: 12500, image: kidsstudy1, dimensions: `(36" (W) x 42" (H) = 12 sq ft)`},
        { id: 'study-children-standard', name: 'Standard', price: 65500, image: kidsstudy2, dimensions: `(108" (W) x 60" (H) = 45 sq ft)`},
        { id: 'study-children-premium', name: 'Premium', price: 98500, image: kidsstudy3, dimensions: `(120" (W) x 96" (H) = 80 sq ft)`},
      ]},
      { id: 'wardrobe-childrens', name: 'Childrens Wardrobe ', image: wardrobechild3, options: [
        { id: 'wardrobe-children-basic', name: 'Basic', price: 33800, image: wardrobechild1, dimensions: `(48" (W) x 84" (H) = 28 sq ft)`},
        { id: 'wardrobe-children-standard', name: 'Standard', price: 62400, image: wardrobechild2, dimensions: `(84" (W) x 84" (H) = 49 sq ft)`},
        { id: 'wardrobe-children-premium', name: 'Premium', price: 112700, image: wardrobechild3, dimensions: `(120" (W) x 108" (H) = 90 sq ft)`},
      ]},
      // { id: 'bookshelf', name: 'Bookshelf', image: logo },
      { id: 'toy-storage', name: 'Toy Storage Unit', image: toy3, options: [
        { id: 'toy-children-basic', name: 'Basic', price: 29800, image: toy1, dimensions: `(72" (W) x 60" (H) = 30 sq ft)`},
        { id: 'toy-children-standard', name: 'Standard', price: 63900, image: toy2, dimensions: `(96" (W) x 96" (H) = 64 sq ft)`},
        { id: 'toy-children-premium', name: 'Premium', price: 108300, image: toy3, dimensions: `(120" (W) x 108" (H) = 90 sq ft)`},
      ]},
      // { id: 'wall-shelves', name: 'Wall-mounted Shelves', image: logo },
      // { id: 'pinup-board', name: 'Pin-up / Marker Board Panel', image: logo },
    ],
  },
  {
    id: 'guest-bedroom',
    name: "Guest Bedroom",
    image: guste,
    subcategories: [
      { id: 'cot', name: 'Cot', image: cot3, options: [
        { id: 'cot-guest-basic', name: 'Basic', price: 21500, image: cot1, dimensions: `(King' = 50 sq ft)`},
        { id: 'cot-guest-standard', name: 'Standard', price: 48500, image: cot2, dimensions: `(King' = 50 sq ft)`},
        { id: 'cot-guest-premium', name: 'Premium', price: 98500, image: cot3, dimensions: `(King' = 50 sq ft)`},
      ]},
      { id: 'side-table', name: 'Side Table ', image: side3, options: [
        { id: 'side-tables-guest-bed-basic', name: 'Basic', price: 5000, image: side1, dimensions: `(20" (W) x 20" (H) = 4 sq ft)`},
        { id: 'side-tables-guest-bed-standard', name: 'Standard', price: 6000, image: side2, dimensions: `(20" (W) x 24" (H) = 4 sq ft)`},
        { id: 'side-tables-guest-bed-premium', name: 'Premium', price: 7000, image: side3, dimensions: `(20" (W) x 28" (H) = 5 sq ft)`},
      ] },
      { id: 'wardrobe', name: 'Wardrobe (Sliding / Openable)', image: wardrobe3, options: [
        { id: 'wardrobe-guest-basic', name: 'Basic', price: 38200, image: wardrobe1, dimensions: `(48" (W) x 84" (H) = 28 sq ft)`},
        { id: 'wardrobe-guest-standard', name: 'Standard', price: 58800, image: wardrobe2, dimensions: `(72" (W) x 84" (H) = 42 sq ft)`},
        { id: 'wardrobe-guest-premium', name: 'Premium', price: 95800, image: wardrobe3, dimensions: `(96" (W) x 84" (H) = 56 sq ft)`},
      ] },
      { id: 'loft', name: 'Loft (Above Wardrobe or Door)', image: loft3, options: [
        { id: 'loft-guest-basic', name: 'Basic', price: 30000, image: loft1, dimensions: `(120" (W) x 36" (H) = 30 sq ft)`},
        { id: 'loft-guest-standard', name: 'Standard', price: 36000, image: loft2, dimensions: `(120" (W) x 36" (H) = 30 sq ft)`},
        { id: 'loft-guest-premium', name: 'Premium', price: 42000, image: loft3, dimensions: `(120" (W) x 36" (H) = 30 sq ft)`},
      ] },
      { id: 'dressing-unit', name: 'Dressing Unit with Mirror', image: dressing3, options: [
        { id: 'dressing-guest-basic', name: 'Basic', price: 14600, image: dressing1, dimensions: `(24" (W) x 72" (H) = 12 sq ft)`},
        { id: 'dressing-guest-standard', name: 'Standard', price: 22600, image: dressing2, dimensions: `(48" (W) x 72" (H) = 24 sq ft)`},
        { id: 'dressing-guest-premium', name: 'Premium', price: 54700, image: dressing3, dimensions: `(72" (W) x 85" (H) = 42 sq ft)`},
      ] },
      { id: 'study-table', name: 'Study Table / Working Table', image: study3, options: [
        { id: 'study-guest-basic', name: 'Basic', price: 24500, image: study1, dimensions: `(60" (W) x 60" (H) = 25 sq ft)`},
        { id: 'study-guest-standard', name: 'Standard', price: 42500, image: study2, dimensions: `(60" (W) x 84" (H) = 35 sq ft)`},
        { id: 'study-guest-premium', name: 'Premium', price: 66400, image: study3, dimensions: `(84" (W) x 96" (H) = 56 sq ft)`},
      ] },
      // { id: 'bookshelf', name: 'Bookshelf / Wall Shelf', image: logo },
      { id: 'mini-tv-unit', name: 'Mini TV Unit', image: mini3, options: [
        { id: 'mini-guest-basic', name: 'Basic', price: 16700, image: mini1, dimensions: `(48" (W) x 60" (H) = 20 sq ft)`},
        { id: 'mini-guest-standard', name: 'Standard', price: 32600, image: mini2, dimensions: `(48" (W) x 72" (H) = 24 sq ft)`},
        { id: 'mini-guest-premium', name: 'Premium', price: 74300, image: mini3, dimensions: `(96" (W) x 96" (H) = 64 sq ft)`},
      ] },
      { id: 'window-seating', name: 'Window Seating', image: window3, options: [
        { id: 'window-guest-basic', name: 'Basic', price: 14000, image: window1, dimensions: `(60" (W) x 20" (H) = 12 sq ft)`},
        { id: 'window-guest-standard', name: 'Standard', price: 17000, image: window2, dimensions: `(60" (W) x 20" (H) = 12 sq ft)`},
        { id: 'window-guest-premium', name: 'Premium', price: 20000, image: window3, dimensions: `(60" (W) x 20" (H) = 12 sq ft)`},
      ] },
      // { id: 'chest-of-drawers', name: 'Chest of Drawers', image: logo },
      { id: 'walk-in-Wardrobe', name: 'Walk-in Wardrobe', image: walkin3, options: [
        { id: 'walk-in-guest-basic', name: 'Basic', price: 14000, image: walkin1, dimensions: `(48" (W) x 60" (H) = 20 sq ft)`},
        { id: 'walk-in-guest-standard', name: 'Standard', price: 17000, image: walkin2, dimensions: `(48" (W) x 72" (H) = 24 sq ft)`},
        { id: 'walk-in-guest-premium', name: 'Premium', price: 20000, image: walkin3, dimensions: `(96" (W) x 96" (H) = 64 sq ft)`},
      ] },
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
      { id: 'prayer-unit', name: 'Prayer Unit / Pooja Shelf (if inside bedroom)', image: pooja3, options: [
        { id: 'prayer-parent-basic', name: 'Basic', price:  14800, image: pooja1, dimensions: `(48" (W) x 48" (H) = 16 sq ft)`},
        { id: 'prayer-parent-standard', name: 'Standard', price: 29200, image: pooja2, dimensions: `(36" (W) x 84" (H) = 21 sq ft)`},
        { id: 'prayer-parent-premium', name: 'Premium', price: 62800, image: pooja3, dimensions: `(72" (W) x 96" (H) = 48 sq ft)`},
      ] },
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

function Card({ image, selected, onClick }: CardProps) {
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
      {/* Image only */}
      <img src={image} alt="" className="w-full h-full object-cover rounded-xl" />
    </motion.div>
  );
}

const QuestionFlow = ({ onComplete }: QuestionFlowProps) => {
  const [step, setStep] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Record<string, string>>>({});
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
          const catOpts = opts[catId];
          if (!catOpts) return opts;
          const newCatOpts = { ...catOpts };
          delete newCatOpts[subcatId];
          return {
              ...opts,
              [catId]: newCatOpts
          };
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
  const handleOptionSelect = (catId: string, subcatId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [catId]: {
        ...prev[catId],
        [subcatId]: optionId,
      },
    }));
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
      Object.entries(selectedOptions).forEach(([catId, subcatOptions]) => {
        const category = categories.find((c) => c.id === catId);
        if (category) {
          Object.entries(subcatOptions).forEach(([subcatId, optionId]) => {
            const subcategory = category.subcategories.find(
              (sc) => sc.id === subcatId
            );
            if (subcategory && subcategory.options) {
              const option = subcategory.options.find((o) => o.id === optionId);
              if (option) {
                answers.push({
                  questionId: `${category.name} - ${subcategory.name}`,
                  answer: option.name,
                  value: option.price,
                });
                total += option.price;
              }
            }
          });
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
    const subcats = selectedSubcategories[catId] || [];
    return subcats.length > 0 && subcats.every(subId => selectedOptions[catId]?.[subId]);
  });
  
  return (
    <motion.div ref={containerRef} className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      {step === 1 && (
        <div>
          <h2 className="text-2xl text-center font-serif font-semibold mb-6 text-gray-800">Shape Your Space - "Pick the Rooms You Want Interiors For"</h2>
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
              const isSelected = selectedSubcats.includes(sub.id);
              const isTrulySelected = isSelected && !!selectedOptions[currentMainCat.id]?.[sub.id];
              const isActive = activeSubcatId === sub.id;
              const hasProduct = !!selectedOptions[currentMainCat.id]?.[sub.id];
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
                    <span className="mt-2 text-sm font-bold text-center" style={{ color: 'rgb(164, 120, 100)', display: 'block' }}>
                      {sub.name}
                    </span>
                  </motion.div>
                  <AnimatePresence>
                    {isActive && sub.options && sub.options.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto flex flex-col md:flex-row gap-4 justify-center items-stretch mt-4 mb-4"
                        style={{ position: 'static', zIndex: 'auto' }}
                      >
                        {sub.options.map((opt) => {
                          const isSelected = selectedOptions[currentMainCat.id]?.[sub.id] === opt.id;
                          return (
                            <motion.div
                              key={opt.id}
                              whileTap={{ scale: 0.97 }}
                              animate={isSelected ? { scale: 1.04, boxShadow: '0 4px 16px 0 rgba(163,120,86,0.13)', borderColor: '#a37856', backgroundColor: '#f7ede3' } : { scale: 1, boxShadow: 'none', borderColor: '#e5e7eb', backgroundColor: '#fff' }}
                              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                              className={`relative overflow-hidden w-full md:flex-1 min-w-0 md:min-w-[8rem] md:max-w-[10rem] flex-shrink-0 flex flex-col items-center justify-start rounded-xl border-2 cursor-pointer select-none transition-all duration-300 shadow-sm text-center ${isSelected ? 'border-primary-600 bg-primary-50' : 'bg-white border-gray-200 text-gray-800 hover:border-primary-400 hover:bg-primary-50'}`}
                              style={{ minHeight: '10rem' }}
                              onClick={() => handleOptionSelect(currentMainCat.id, sub.id, opt.id)}
                              tabIndex={0}
                              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleOptionSelect(currentMainCat.id, sub.id, opt.id)}
                              aria-pressed={isSelected}
                              role="button"
                            >
                              <div className="w-full aspect-square">
                                <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="py-2 px-1 flex-grow flex flex-col justify-center">
                                <span className="font-semibold text-sm" style={{ color: isSelected ? '#a37856' : '#a37856' }}>{opt.name}</span>
                                <div className="w-8 h-0.5 bg-primary-200 my-1 mx-auto rounded-full" />
                                <span className="text-base font-bold" style={{ color: isSelected ? '#a37856' : '#a37856' }}>₹{opt.price}</span>
                                {opt.dimensions && (
                                  <span className="text-xs text-gray-500 mt-1 px-1">{opt.dimensions}</span>
                                )}
                              </div>
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
                  {hasProduct && !isActive && selectedOptions[currentMainCat.id]?.[sub.id] && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-center justify-between text-white text-lg text-center mt-2 font-bold rounded-xl px-6 py-3 shadow-md"
                      style={{ width: '100%', background: 'rgb(163 120 86)' }}
                    >
                      <span className="flex-1 text-left">
                        {(() => {
                          const optionId = selectedOptions[currentMainCat.id]?.[sub.id];
                          const opt = sub.options?.find(o => o.id === optionId);
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
              disabled={selectedSubcats.length === 0 || !selectedSubcats.every(subId => selectedOptions[currentMainCat.id]?.[subId])}
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