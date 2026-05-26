import { IslandGroup, Destination, Dish, Phrase, QuizQuestion } from './types';

export const ISLAND_GROUPS: IslandGroup[] = [
  {
    id: 'luzon',
    name: 'Luzon',
    tagline: 'The North: Heritage, Mountains & Modernity',
    description: 'The largest and most populous island group in the Philippines. Luzon is home to Manila (the capital), the high cordillera mountains, heritage cities like Vigan, and breathtaking beaches like El Nido and Batanes. It is a land of towering pine forests, active volcanoes, and ancient rice terraces.',
    majorProvinces: ['Metro Manila', 'Palawan', 'Ilocos Sur', 'Benguet', 'Albay', 'Bataan', 'Cavite'],
    nativeLanguages: ['Tagalog', 'Ilocano', 'Kapampangan', 'Pangasinan', 'Bicolano'],
    climate: 'Varies from tropical savanna in the lowlands to temperate-subtropical in the highland mountains of Baguio.',
    destinations: []
  },
  {
    id: 'visayas',
    name: 'Visayas',
    tagline: 'The Center: Tropical Havens, Diving & Island Beat',
    description: 'The central island group of the Philippines, consisting of several islands scattered through warm seas. Famous for its powdery white beaches (Boracay), majestic geological formations (Chocolate Hills), rich marine biodiversity, vibrant local festivals, and the site where West met East in Cebu.',
    majorProvinces: ['Cebu', 'Bohol', 'Aklan (Boracay)', 'Leyte', 'Iloilo', 'Negros Oriental'],
    nativeLanguages: ['Cebuano (Bisaya)', 'Hiligaynon (Ilonggo)', 'Waray-Waray'],
    climate: 'Warm and humid tropical maritime climate year-round with occasional sea breezes.',
    destinations: []
  },
  {
    id: 'mindanao',
    name: 'Mindanao',
    tagline: 'The South: Promised Land, Wild Peaks & Tapestries',
    description: 'The southern island group, renowned for its incredible geographic diversity, majestic wild peaks (Mt. Apo, the tallest in the country), surf capitals (Siargao), and deep ethno-linguistic woven tapestries. Mindanao boasts untouched rainforests, cascading waterfalls, and rich Islamic and Lumad traditional cultures.',
    majorProvinces: ['Davao del Sur', 'Surigao del Norte', 'Camiguin', 'South Cotabato', 'Zamboanga del Sur'],
    nativeLanguages: ['Cebuano', 'Tausug', 'Maranao', 'Maguindanaon', 'Chavacano'],
    climate: 'Typically equatorial with rainfall distributed relatively evenly throughout the year, lying mostly outside the country\'s typhoon belt.',
    destinations: []
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'batanes',
    name: 'Batanes Islands',
    location: 'Cagayan Valley, Northern Luzon',
    islandGroup: 'Luzon',
    description: 'The northernmost province of the Philippines, characterized by rolling hills, steep cliffs, traditional stone houses built to withstand typhoons, deep blue waters, and a unique Ivatan culture.',
    funFact: 'Traditional Ivatan stone houses are bound with lime mortar and thatched with thick cogon grass to survive extreme oceanic winds.',
    tags: ['Scenic', 'Culture', 'Highlands'],
    bestTime: 'March to June (Dry summer season)',
    activities: ['Touring Marlboro Hills', 'Viewing Basco Lighthouse', 'Riding traditional Falua boats', 'Meeting the welcoming Ivatan people']
  },
  {
    id: 'vigan',
    name: 'Historic City of Vigan',
    location: 'Ilocos Sur, Luzon',
    islandGroup: 'Luzon',
    description: 'A UNESCO World Heritage Site, Vigan is one of the best-preserved Spanish colonial towns in Asia. It is famous for its cobblestone streets, masterfully planned architecture merging Spanish, Chinese, and Filipino styles, and horse-drawn carriages (kalesas).',
    funFact: 'Vigan was saved from destruction during WWII due to a romantic truce between a Japanese commander and a local priest.',
    tags: ['History', 'Heritage', 'Architecture'],
    bestTime: 'November to February (Cooler dry months)',
    activities: ['Riding a Kalesa on Calle Crisologo', 'Eating hot empanada at the plaza', 'Trying traditional pottery at Pagburnayan', 'Visiting Syquia Mansion']
  },
  {
    id: 'el-nido',
    name: 'El Nido & Bacuit Archipelago',
    location: 'Palawan, Luzon',
    islandGroup: 'Luzon',
    description: 'World-renowned for its dramatic limestone cliffs rising straight out of turquoise lagoons. El Nido is the ultimate marine adventure gateway, blessed with white sand beaches, coral gardens, and hidden sinkhole tunnels.',
    funFact: 'The limestone cliffs of El Nido are 250 million years old, dating back to the late Paleozoic and early Mesozoic eras.',
    tags: ['Beach', 'Nature', 'Diving'],
    bestTime: 'December to May',
    activities: ['Kayaking in Big and Small Lagoon', 'Snorkeling at Secret Lagoon', 'Ziplining between Las Cabanas islets', 'Sunbathing on Nacpan Beach']
  },
  {
    id: 'boracay',
    name: 'Boracay Island',
    location: 'Aklan, Western Visayas',
    islandGroup: 'Visayas',
    description: 'A tiny, butterfly-shaped island famous worldwide for its 4-kilometer stretching "White Beach" consisting of ultra-fine, cool-to-the-touch shell sand, spectacular sailing sunsets, and high-quality beachside hospitality.',
    funFact: 'Boracay underwent a legendary 6-month environmental rehabilitation in 2018, transforming its ecosystem back to its pristine historic state.',
    tags: ['Beach', 'Nightlife', 'Lounge'],
    bestTime: 'November to May (Amihan season)',
    activities: ['Paraw sailing at sunset', 'Helmet diving', 'Experiencing island beach walks', 'Savoring fresh calamansi muffins']
  },
  {
    id: 'chocolate-hills',
    name: 'Chocolate Hills',
    location: 'Bohol, Visayas',
    islandGroup: 'Visayas',
    description: 'A geological anomaly of at least 1,260 symmetrical dome-shaped hills spreading over more than 50 square kilometers. They turn a dusty chocolate-brown color during the dry season, hence the name.',
    funFact: 'Local legend says the hills are tears of a giant named Arogo who wept over the death of his mortal lover, Aloya.',
    tags: ['Adventure', 'Nature', 'Geology'],
    bestTime: 'January to May (Dry season to see them brown)',
    activities: ['Viewing from Carmen peak', 'Riding ATVs around the hill bases', 'Visiting nearby Philippine Tarsier Sanctuary', 'Cruising Loboc River']
  },
  {
    id: 'siargao',
    name: 'Siargao Island',
    location: 'Surigao del Norte, Mindanao',
    islandGroup: 'Mindanao',
    description: 'The "Surf Capital of the Philippines." A tear-shaped island in the Philippine Sea characterized by vast mangrove forests, pristine tidal rock pools, dense coconut roadways, and world-class reef break waters.',
    funFact: 'Siargao\'s famous wave is nicknamed "Cloud 9" because a traveling surfer named it after a popular local chocolate bar.',
    tags: ['Surf', 'Tropical', 'Nature'],
    bestTime: 'August to November (Peak swells for surfing)',
    activities: ['Surfing the Cloud 9 boardwalk reef', 'Coconut grove swings at Maasin River', 'Island-hopping to Naked, Daku & Guyam', 'Swimming at Sugba Lagoon']
  },
  {
    id: 'camiguin',
    name: 'Camiguin Island',
    location: 'Northern Mindanao',
    islandGroup: 'Mindanao',
    description: 'Known as the "Island Born of Fire" due to its seven active volcanoes. This pear-shaped pearly island boasts bubbling sulfuric hot springs, refreshing cold soda springs, colonial ruins, and a Sunken Cemetery.',
    funFact: 'Camiguin has more volcanoes per square kilometer than any other island on the planet.',
    tags: ['Volcano', 'Nature', 'Wellness'],
    bestTime: 'May to October',
    activities: ['Snorkeling at Sunken Cemetery', 'Relaxing on the sandbar of White Island', 'Bathing in Hibok-Hibok Ardent Hot Springs', 'Admiring Katibawasan Falls']
  }
];

export const DISHES: Dish[] = [
  {
    id: 'adobo',
    name: 'Adobo',
    originalName: 'Adobong Pilipino',
    pronunciation: 'ah-DOH-boh',
    islandGroupOrigin: 'Nationwide',
    flavorProfile: ['Savory', 'Sour', 'Garlic', 'Subtly Sweet'],
    mainIngredients: ['Pork or Chicken', 'Vinegar (Suka)', 'Soy Sauce', 'Garlic', 'Bay Leaves', 'Black Peppercorns'],
    description: 'Often called the unofficial national dish of the Philippines. It consists of meat slow-stewed in vinegar, soy sauce, crushed garlic, bay leaves, and peppercorns, rendering a tender, intensely flavored comfort dish.',
    historyAndCulture: 'Before refrigeration, indigenous Filipinos preserved meats using native vinegars and salt. When Spanish colonizers arrived, they observed this acid braise and named it "adobo" (from Spanish "adobar", to marinate), though the cooking method is purely pre-colonial.',
    cookingStyle: 'Meat is marinated and browned, then simmered slowly under low heat until the rich sauce is reduced and emulsifies in its own fat.'
  },
  {
    id: 'sinigang',
    name: 'Sinigang',
    pronunciation: 'see-nee-GANG',
    islandGroupOrigin: 'Nationwide',
    flavorProfile: ['Sour', 'Savory', 'Refreshing', 'Spicy-Undertone'],
    mainIngredients: ['Pork, Shrimp, or Fish', 'Tamarind (Sampalok)', 'Taro (Gabi)', 'Radish', 'Kangkong (River Spinach)', 'Long Green Chili'],
    description: 'A celebrated sour soup renowned for its refreshing, savory base. It showcases a diverse medley of indigenous vegetables like kangkong, long green chilies (sili), and eggplant, tied together by a lip-smacking tang.',
    historyAndCulture: 'Voted multiple times as one of the best soups in the world, Sinigang reflects Filipino preferences for "asim" (sourness), which mimics refreshing properties ideal for hot tropical weather.',
    cookingStyle: 'Ingredients are boiled sequentially in a clear broth soured naturally by mashed real tamarind pods or local acidic fruits like batuan, bayabas (guava), or kamias.'
  },
  {
    id: 'lechon',
    name: 'Lechon Cebu',
    originalName: 'Litson sa Sugbo',
    pronunciation: 'leh-CHON',
    islandGroupOrigin: 'Visayas',
    flavorProfile: ['Rich', 'Salty', 'Herby', 'Crisp'],
    mainIngredients: ['Whole Roasting Pig', 'Lemongrass (Tanglad)', 'Spring Onions', 'Garlic', 'Star Anise', 'Peppercorns'],
    description: 'An iconic spit-roasted whole suckling pig, featuring shatteringly crisp golden-red skin and insanely juicy meat, heavily stuffed and perfumed with native lemongrass and herbs.',
    historyAndCulture: 'Crowned by Anthony Bourdain as the "best pig in the world," Lechon is the absolute centerpiece of Filipino fiestas, Christmas holiday feasts, and historic milestones.',
    cookingStyle: 'The cavity is filled with lemongrass, spring onions, and garlic, then skewered on a bamboo spit and hand-rotated over roaring red-hot coal embers for several hours.'
  },
  {
    id: 'chicken-inasal',
    name: 'Chicken Inasal',
    pronunciation: 'ee-nah-SAL',
    islandGroupOrigin: 'Visayas',
    flavorProfile: ['Citrusy', 'Garlic', 'Savory', 'Smoky'],
    mainIngredients: ['Chicken cuts', 'Calamansi', 'Lemongrass', 'Coconut Vinegar', 'Annatto Oil (Atsuete)', 'Garlic'],
    description: 'A distinct, smoky grilled chicken from Bacolod City. Unlike western barbecue, it is marinated in a special mixture of calamansi (local lime), lemongrass, ginger, and garlic, then basted with deep orange annatto seed oil.',
    historyAndCulture: 'Originated in Negros Occidental, it is proof of how native citrus (calamansi) and seed oils (annatto) can create unparalleled charcoal-fired profiles.',
    cookingStyle: 'Basted continuously with annatto oil over blazing coals, lending its signature rich red-orange glaze and caramelized edges.'
  },
  {
    id: 'halo-halo',
    name: 'Halo-Halo',
    pronunciation: 'HAH-loh HAH-loh',
    islandGroupOrigin: 'Luzon',
    flavorProfile: ['Sweet', 'Creamy', 'Icy', 'Vibrant'],
    mainIngredients: ['Shaved Ice', 'Evaporated Milk', 'Ube Halaya (Purple Yam)', 'Leche Flan (Caramel Custard)', 'Sweetened Bananas', 'Jackfruit', 'Nata de Coco', 'Pinipig'],
    description: 'The ultimate colorful Filipino dessert! Meaning "Mix-Mix," it is layer upon layer of sweet beans, gelatins, taro, jackfruit, topped with fluffy shaved ice, thick evaporated milk, a scoop of purple ube ice cream, and caramel flan.',
    historyAndCulture: 'Evolved from Japanese pre-war migrants who brought "mitsu mame" (iced beans) to Manila. Filipinos hyper-customized it by piling fresh tropical fruits, ube, and rich Spanish-style egg pudding.',
    cookingStyle: 'Layered beautifully inside a tall clear glass, filled with shaved ice and dairy, and vigorously hand-stirred by the diner before consuming.'
  },
  {
    id: 'kare-kare',
    name: 'Kare-Kare',
    pronunciation: 'KAH-reh KAH-reh',
    islandGroupOrigin: 'Luzon',
    flavorProfile: ['Nutty', 'Rich', 'Savory-Salty Combo'],
    mainIngredients: ['Oxtail or Beef Tripe', 'Peanut Butter/Ground Peanuts', 'Toasted Rice Flour', 'Banana Blossoms', 'Eggplant', 'String Beans', 'Sauteed Shrimp Paste (Bagoong)'],
    description: 'A thick, golden oxtail stew slow-steamed in a rich toasted peanut butter and rice flour sauce. It is traditionally served beside pungent, salty sauteed shrimp paste (bagoong) to perfectly balance the nutty richness.',
    historyAndCulture: 'Some trace it back to Sepoy soldiers from India who settled in Marikina during the British occupation of Manila, adapting traditional curries with local peanut ingredients.',
    cookingStyle: 'Beef oxtail is simmered for hours until gelatinously tender, then mixed into a toasted rice-and-peanut sauce, keeping vegetables crisp.'
  }
];

export const PHRASES: Phrase[] = [
  // Greetings
  {
    id: 'g1',
    english: 'Hello / How are you?',
    tagalog: 'Kumusta?',
    cebuano: 'Kumusta ka?',
    ilocano: 'Kumusta kayo?',
    context: 'greetings',
    pronunciationTip: 'kooh-moohs-TAH'
  },
  {
    id: 'g2',
    english: 'Welcome / Long Live!',
    tagalog: 'Mabuhay!',
    cebuano: 'Maayong pag-abot!',
    ilocano: 'Naragsak a ya-ay!',
    context: 'greetings',
    pronunciationTip: 'mah-BOO0-high'
  },
  {
    id: 'g3',
    english: 'Thank you very much',
    tagalog: 'Maraming salamat.',
    cebuano: 'Daghan kaayong salamat.',
    ilocano: 'Agyamanak unay.',
    context: 'greetings',
    pronunciationTip: 'mah-RAH-ming sah-LAH-mat'
  },
  {
    id: 'g4',
    english: 'Good morning',
    tagalog: 'Magandang umaga.',
    cebuano: 'Maayong buntag.',
    ilocano: 'Naimbag a bigat.',
    context: 'greetings',
    pronunciationTip: 'mah-gan-DANG ooh-MAH-gah'
  },
  {
    id: 'g5',
    english: 'Good evening',
    tagalog: 'Magandang gabi.',
    cebuano: 'Maayong gabion.',
    ilocano: 'Naimbag a rabii.',
    context: 'greetings',
    pronunciationTip: 'mah-gan-DANG gah-BEE'
  },

  // Dining
  {
    id: 'd1',
    english: 'Let\'s eat!',
    tagalog: 'Kain tayo!',
    cebuano: 'Mangaon ta!',
    ilocano: 'Mangan tayon!',
    context: 'dining',
    pronunciationTip: 'kah-IN-tah-YOH'
  },
  {
    id: 'd2',
    english: 'Delicious!',
    tagalog: 'Masarap!',
    cebuano: 'Lami!',
    ilocano: 'Naimas!',
    context: 'dining',
    pronunciationTip: 'mah-sah-RAP'
  },
  {
    id: 'd3',
    english: 'Water, please',
    tagalog: 'Tubig, pakiusap.',
    cebuano: 'Tubig, palihug.',
    ilocano: 'Danum, pakiusap.',
    context: 'dining',
    pronunciationTip: 'TOO-big, pah-KEE-ooh-sap'
  },
  {
    id: 'd4',
    english: 'The bill, please',
    tagalog: 'Ang bayad, pakiusap.',
    cebuano: 'Palihug sa bayad / bill.',
    ilocano: 'Ti bayad, pakiusap.',
    context: 'dining',
    pronunciationTip: 'ang BAH-yad, pah-KEE-ooh-sap'
  },

  // Travel
  {
    id: 't1',
    english: 'Where is the beach?',
    tagalog: 'Saan ang baybayin / beach?',
    cebuano: 'Asa ang baybayon / beach?',
    ilocano: 'Ayanna ti baybay / beach?',
    context: 'travel',
    pronunciationTip: 'sah-AN ang beach'
  },
  {
    id: 't2',
    english: 'How much is the fare?',
    tagalog: 'Magkano ang pamasahe?',
    cebuano: 'Pila ang plite / plete?',
    ilocano: 'Manumo ti plete?',
    context: 'travel',
    pronunciationTip: 'mahg-KAH-no ang pah-mah-SAH-heh'
  },
  {
    id: 't3',
    english: 'Stop here (Jeepney driver cue)',
    tagalog: 'Para po!',
    cebuano: 'Lugar lang, palihug!',
    ilocano: 'Para ditoy, pakiusap!',
    context: 'travel',
    pronunciationTip: 'PAH-rah po'
  },
  {
    id: 't4',
    english: 'Where is the bathroom?',
    tagalog: 'Nasaan ang banyo / C.R.?',
    cebuano: 'Hain ang banyo / C.R.?',
    ilocano: 'Ayanna ti banyo / bilyar?',
    context: 'travel',
    pronunciationTip: 'NAH-sah-an ang ban-YOH'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How many islands in total make up the Philippine Archipelago during high tide?',
    options: ['Around 7,107', 'Exactly 10,000', 'Around 7,641', 'Around 3,500'],
    correctAnswerIndex: 2,
    explanation: 'In recent years, the National Mapping and Resource Information Authority (NAMRIA) updated the official count of islands of the Philippines to 7,641, discovering more coastal landmasses.'
  },
  {
    id: 2,
    question: 'Which volcano in the Philippines is famous for having a near-perfect symmetrical cone?',
    options: ['Mount Pinatubo', 'Mount Mayon', 'Taal Volcano', 'Mount Pulag'],
    correctAnswerIndex: 1,
    explanation: 'Mount Mayon in Albay, Bicol, is world-famous for its majestic "perfect cone" structure, though it is also one of the country\'s most active volcanoes.'
  },
  {
    id: 3,
    question: 'What is the unofficial, internationally recognized national dish of the Philippines featuring slow-braised meat in soy and vinegar?',
    options: ['Lechon', 'Adobo', 'Kare-Kare', 'Sinigang'],
    correctAnswerIndex: 1,
    explanation: 'Adobo is widely regarded as the unofficial national dish, showcasing pre-colonial vinegar braising techniques that preserve meat naturally in warm tropical climates.'
  },
  {
    id: 4,
    question: 'Which municipality in Bohol is famous for symmetrical green hills that turn brown in the dry season?',
    options: ['Carmen (Chocolate Hills)', 'Panglao Island', 'Loboc River', 'Anda'],
    correctAnswerIndex: 0,
    explanation: 'The Chocolate Hills in Bohol (primarily viewed from the town of Carmen) consist of over 1,260 dome-shaped limestone hills that turn cocoa-brown during summer.'
  },
  {
    id: 5,
    question: 'What is the oldest Spanish colonial city in the Philippines, containing historic landmarks like Magellan\'s Cross?',
    options: ['Manila', 'Vigan', 'Cebu City', 'Zamboanga'],
    correctAnswerIndex: 2,
    explanation: 'Cebu City is known as the "Queen City of the South" and is the oldest colonial city, established in 1565 by Miguel López de Legazpi following Magellan\'s initial landfall in 1521.'
  },
  {
    id: 6,
    question: 'What sweet, colorful dessert\'s name literally translates to "Mix-Mix" in English?',
    options: ['Leche Flan', 'Bibingka', 'Halo-Halo', 'Sapin-Sapin'],
    correctAnswerIndex: 2,
    explanation: 'Halo-Halo literally means "Mix-Mix" in Tagalog because it requires diners to stir up layers of sweetened fruits, milk, ice, and ube before eating!'
  },
  {
    id: 7,
    question: 'Which island in Surigao del Norte is globally celebrated as the "Surf Capital of the Philippines"?',
    options: ['Boracay', 'Siargao', 'Camiguin', 'Samal'],
    correctAnswerIndex: 1,
    explanation: 'Siargao is famous internationally as the Surf Capital of the country, home to the iconic "Cloud 9" wave which crashes over shallow coral reef flats.'
  }
];

// Combine Island group destinations
export const getFullIslandGroups = (): IslandGroup[] => {
  return ISLAND_GROUPS.map(group => ({
    ...group,
    destinations: DESTINATIONS.filter(d => d.islandGroup === group.name)
  }));
};
