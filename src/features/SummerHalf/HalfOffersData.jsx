import { Package, Shirt, Layers, Gift, Sparkles } from "lucide-react";

export const halfOffersData = [
  // ========== هاف كولون ==========
  { 
    name: "6 هاف كولون",
    quantity: 6, 
    price: 330, 
    badge: "عرض خاص",
    badgeColor: "from-[#e13485] to-[#c01e6f]",
    icon: <Package className="w-4 h-4" />,
    savings: 85,
    originalPrice: 405,
    unit: "هاف كولون",
    popular: true,
    tabType: "half"
  },
  { 
    name: "9 هاف كولون",
    quantity: 9, 
    price: 450, 
    badge: "الأكثر طلباً",
    badgeColor: "from-[#e13485] to-[#c01e6f]",
    icon: <Package className="w-4 h-4" />,
    savings: 140,
    originalPrice: 560,
    unit: "هاف كولون",
    popular: true,
    tabType: "half"
  },
  { 
    name: "12 هاف كولون",
    quantity: 12, 
    price: 570, 
    badge: "أفضل قيمة",
    badgeColor: "from-[#e13485] to-[#c01e6f]",
    icon: <Package className="w-4 h-4" />,
    savings: 270,
    originalPrice: 840,
    unit: "هاف كولون",
    popular: true,
    tabType: "half"
  },

  // ========== بندانات فقط ==========
  { 
    name: "6 بندانات",
    quantity: 6, 
    price: 270, 
    badge: "عرض خاص",
    badgeColor: "from-[#c01e6f] to-[#a0105a]",
    icon: <Shirt className="w-4 h-4" />,
    savings: 250,
    originalPrice: 520,
    unit: "بندانة",
    popular: false,
    tabType: "bandana"
  },
  { 
    name: "8 بندانات",
    quantity: 8, 
    price: 340, 
    badge: "عرض خاص",
    badgeColor: "from-[#c01e6f] to-[#a0105a]",
    icon: <Shirt className="w-4 h-4" />,
    savings: 250,
    originalPrice: 590,
    unit: "بندانة",
    popular: false,
    tabType: "bandana"
  },
  { 
    name: "12 بندانات",
    quantity: 12, 
    price: 510, 
    badge: "عرض خاص",
    badgeColor: "from-[#c01e6f] to-[#a0105a]",
    icon: <Shirt className="w-4 h-4" />,
    savings: 250,
    originalPrice: 760,
    unit: "بندانة",
    popular: false,
    tabType: "bandana"
  },

  // ========== أطقم بندانه + هاف كولون ==========
{ 
  name: "3 طقم بندانه + هاف كولون",
  quantity: 3, 
  price: 285, 
  badge: "عرض خاص",
  badgeColor: "from-[#a0105a] to-[#e13485]",
  icon: <Layers className="w-4 h-4" />,
  savings: 115,
  originalPrice: 400,
  unit: "طقم بندانه",
  popular: false,
  tabType: "set",
  type: "set-bandana"
},
{ 
  name: "4 طقم بندانه + هاف كولون",
  quantity: 4, 
  price: 380, 
  badge: "أفضل قيمة",
  badgeColor: "from-[#a0105a] to-[#e13485]",
  icon: <Layers className="w-4 h-4" />,
  savings: 115,
  originalPrice: 495,
  unit: "طقم بندانه",
  popular: false,
  tabType: "set",
  type: "set-bandana"
},
{ 
  name: "6 طقم بندانه + هاف كولون",
  quantity: 6, 
  price: 535, 
  badge: "الأكثر طلباً",
  badgeColor: "from-[#e13485] to-[#801040]",
  icon: <Gift className="w-4 h-4" />,
  savings: 215,
  originalPrice: 750,
  unit: "طقم بندانه",
  popular: true,
  tabType: "set",
  type: "set-bandana"
},

  // ========== تربون ==========
  { 
    name: "4 تربون",
    quantity: 4, 
    price: 280, 
    badge: "عرض خاص",
    badgeColor: "from-[#ff8c93] to-[#e13485]",
    icon: <Shirt className="w-4 h-4" />,
    savings: 80,
    originalPrice: 360,
    unit: "تربون",
    popular: false,
    tabType: "turbon"
  },
  { 
    name: "6 تربون",
    quantity: 6, 
    price: 390, 
    badge: "الأكثر طلباً",
    badgeColor: "from-[#ff8c93] to-[#e13485]",
    icon: <Shirt className="w-4 h-4" />,
    savings: 150,
    originalPrice: 540,
    unit: "تربون",
    popular: true,
    tabType: "turbon"
  },

  // ========== أطقم تربون + هاف كولون ==========
  { 
    name: "3 طقم تربون وهاف",
    quantity: 3, 
    price: 360, 
    badge: "عرض جديد",
    badgeColor: "from-[#a0105a] to-[#e13485]",
    icon: <Layers className="w-4 h-4" />,
    savings: 120,
    originalPrice: 480,
    unit: "طقم تربون",
    popular: false,
    tabType: "set",
    type: "set-turbon"
  },
  { 
    name: "5 طقم تربون وهاف",
    quantity: 5, 
    price: 540, 
    badge: "أفضل قيمة",
    badgeColor: "from-[#a0105a] to-[#e13485]",
    icon: <Layers className="w-4 h-4" />,
    savings: 210,
    originalPrice: 750,
    unit: "طقم تربون",
    popular: true,
    tabType: "set",
    type: "set-turbon"
  },
];