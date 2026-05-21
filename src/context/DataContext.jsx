import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // --- SEVAS ---
  const [sevas, setSevas] = useState([
    { 
      id: 1, 
      title: 'Tailabhishekam', 
      desc: 'Oil abhishekam to Lord Hanuman to remove Shani Dosha.', 
      price: '₹501', 
      icon: '🛢️',
      benefits: 'Health, relief from debt, protection from negative energies.'
    },
    { 
      id: 2, 
      title: 'Vada Mala Seva', 
      desc: 'Garland made of Vadas offered to appease the Lord.', 
      price: '₹1116', 
      icon: '🌿',
      benefits: 'Success in ventures, courage, and family well-being.'
    },
    { 
      id: 3, 
      title: 'Deepa Seva', 
      desc: 'Lighting lamps in the temple premises.', 
      price: '₹101', 
      icon: '🪔',
      benefits: 'Mental peace, clarity of thought, and enlightenment.'
    },
    { 
      id: 4, 
      title: 'Sindoor Seva', 
      desc: 'Offering Sindoor (vermilion) to the Lord.', 
      price: '₹251', 
      icon: '🧂',
      benefits: 'Long life for spouse, marital harmony, and prosperity.'
    },
  ]);

  // --- STORE PRODUCTS ---
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Bronze Hanuman Idol', 
      price: '₹4,999', 
      category: 'Idols', 
      img: '/images/bronze_idol.png' 
    },
    { 
      id: 2, 
      name: 'Siddha Rudraksha Mala', 
      price: '₹1,250', 
      category: 'Mala', 
      img: '/images/rudraksha.png' 
    },
    { 
      id: 3, 
      name: 'Hanuman Chalisa Gold Edition', 
      price: '₹850', 
      category: 'Books',
      img: '/images/gold_chalisa.png'
    },
  ]);

  // --- TEMPLE TIMINGS ---
  const [timings, setTimings] = useState([
    { id: 1, name: 'Morning Darshan', value: '6:00 AM - 12:30 PM' },
    { id: 2, name: 'Evening Darshan', value: '4:30 PM - 9:00 PM' },
    { id: 3, name: 'Daily Aarti', value: '7:00 PM', highlighting: true },
  ]);

  // --- EVENTS ---
  const [events, setEvents] = useState([
    { id: 1, date: '15', month: 'MAY', title: 'Hanuman Jayanti', desc: 'Grand celebration with Akhanda Chalisa Path.' },
    { id: 2, date: '22', month: 'MAY', title: 'Sundarkand Path', desc: 'Powerful collective recitation of Sundarkand.' },
  ]);

  // --- ANNOUNCEMENTS ---
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Temple Renovation', message: 'The main gopuram is being renovated. Please follow the alternate path.', priority: 'Important' },
    { id: 2, title: 'New Seva Timing', message: 'Morning Seva timings have been extended by 30 mins.', priority: 'Normal' },
  ]);

  // --- HERO CONTENT ---
  const [heroContent, setHeroContent] = useState({
    title: 'Divine Strength & Devotion',
    subtitle: 'Step into the sacred abode of Lord Hanuman, where faith meets miracles.',
    btnText: 'View Today\'s Darshan'
  });

  // --- JAPA MANTRAS ---
  const [japaMantras, setJapaMantras] = useState([
    'Jai Shri Ram',
    'Om Ham Hanumate Namaha',
    'Jai Bajrangbali',
    'Sankat Mochan Hanumate Namaha'
  ]);

  // --- DARSHAN SLOTS ---
  const [darshanSlots, setDarshanSlots] = useState([
    { id: 'ds1', time: '06:00 AM - 08:00 AM', totalCapacity: 150, bookedCount: 30,  isActive: true,  isFull: false },
    { id: 'ds2', time: '08:00 AM - 10:00 AM', totalCapacity: 100, bookedCount: 80,  isActive: true,  isFull: false },
    { id: 'ds3', time: '10:00 AM - 12:00 PM', totalCapacity: 120, bookedCount: 40,  isActive: true,  isFull: false },
    { id: 'ds4', time: '04:30 PM - 06:30 PM', totalCapacity: 130, bookedCount: 20,  isActive: true,  isFull: false },
    { id: 'ds5', time: '06:30 PM - 08:30 PM', totalCapacity: 100, bookedCount: 100, isActive: true,  isFull: true  },
  ]);

  // --- CART ---
  const [cart, setCart] = useState([]);

  // Persistence (Mock)
  useEffect(() => {
    const savedSevas = localStorage.getItem('temple_sevas_v2');
    if (savedSevas) setSevas(JSON.parse(savedSevas));
    
    const savedProducts = localStorage.getItem('temple_products_v2');
    if (savedProducts) setProducts(JSON.parse(savedProducts));

    const savedMantras = localStorage.getItem('temple_japa_mantras');
    if (savedMantras) setJapaMantras(JSON.parse(savedMantras));

    const savedCart = localStorage.getItem('temple_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedSlots = localStorage.getItem('temple_darshan_slots');
    if (savedSlots) setDarshanSlots(JSON.parse(savedSlots));
  }, []);

  useEffect(() => {
    localStorage.setItem('temple_sevas_v2', JSON.stringify(sevas));
  }, [sevas]);

  useEffect(() => {
    localStorage.setItem('temple_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('temple_japa_mantras', JSON.stringify(japaMantras));
  }, [japaMantras]);

  useEffect(() => {
    localStorage.setItem('temple_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('temple_darshan_slots', JSON.stringify(darshanSlots));
  }, [darshanSlots]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      toast.success(`Increased ${product.name} quantity in cart!`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const removeFromCart = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    if (itemToRemove) {
      setCart(cart.filter((item) => item.id !== id));
      toast.error(`${itemToRemove.name} removed from cart.`);
    }
  };

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast('Cart cleared', { icon: '🧹' });
  };

  const updateSeva = (id, updatedSeva) => {
    setSevas(sevas.map(s => s.id === id ? { ...s, ...updatedSeva } : s));
  };

  const addSeva = (seva) => {
    setSevas([...sevas, { ...seva, id: Date.now() }]);
  };

  const deleteSeva = (id) => {
    setSevas(sevas.filter(s => s.id !== id));
  };

  // --- BOOKINGS ---
  const [bookings, setBookings] = useState([
    { id: 'HANU-38291', devotee: 'Ravi Kumar', seva: 'Tailabhishekam', date: '2026-05-10', status: 'Confirmed' },
    { id: 'HANU-44512', devotee: 'Priya Sharma', seva: 'Vada Mala Seva', date: '2026-05-14', status: 'Pending' },
  ]);

  // --- DONATIONS ---
  const [donations, setDonations] = useState([
    { id: 'DON-1021', name: 'Ravi Kumar', purpose: 'Annadanam', amount: '₹1,000', date: '2026-05-01' },
    { id: 'DON-0982', name: 'Lakshmi Devi', purpose: 'Temple Development', amount: '₹25,000', date: '2026-04-21' },
  ]);

  const approveBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
  };

  const rejectBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Rejected' } : b));
  };

  // --- DEVOTIONAL CONTENT ---
  const [devotionalContent, setDevotionalContent] = useState({
    chalisa: {
      title: "Hanuman Chalisa",
      subtitle: "The 40 verses of devotion written by Tulsidas.",
      text: `దోహా\nశ్రీ గురు చరణ సరోజ రజ నిజమన ముకుర సుధారి ।\nవరణౌ రఘువర విమలయశ జో దాయక ఫలచారి ॥\nబుద్ధిహీన తనుజానికై సుమిరౌ పవన కుమార ।\nబల బుద్ధి విద్యా దేహు మోహి హరహు కలేశ వికార ॥\n\nధ్యానం\nఅతులిత బలధామం స్వర్ణ శైలాభ దేహమ్ ।\nదనుజ వన కృశానుం జ్ఞానినా మగ్రగణ్యమ్ ॥\nసకల గుణ నిధానం వానరాణా మధీశమ్ ।\nరఘుపతి ప్రియ భక్తం వాతజాతం నమామి ॥\n\nగోష్పదీకృత వారాశిం మశకీకృత రాక్షసమ్ ।\nరామాయణ మహామాలా రత్నం వందే-(అ)నిలాత్మజమ్ ॥\nయత్ర యత్ర రఘునాథ కీర్తనం తత్ర తత్ర కృతమస్తకాంజలిమ్ ।\nభాష్పవారి పరిపూర్ణ లోచనం మారుతిం నమత రాక్షసాంతకమ్ ॥\n\nమనోజవం మారుత తుల్యవేగమ్ ।\nజితేంద్రియం బుద్ధి మతాం వరిష్టమ్ ॥\nవాతాత్మజం వానరయూథ ముఖ్యమ్ ।\nశ్రీ రామ దూతం శిరసా నమామి ॥\n\nచౌపాఈ\nజయ హనుమాన జ్ఞాన గుణ సాగర ।\nజయ కపీశ తిహు లోక ఉజాగర ॥ 1 ॥\n\nరామదూత అతులిత బలధామా ।\nఅంజని పుత్ర పవనసుత నామా ॥ 2 ॥\n\nమహావీర విక్రమ బజరంగీ ।\nకుమతి నివార సుమతి కే సంగీ ॥3 ॥\n\nకంచన వరణ విరాజ సువేశా ।\nకానన కుండల కుంచిత కేశా ॥ 4 ॥\n\nహాథవజ్ర ఔ ధ్వజా విరాజై ।\nకాంథే మూంజ జనేవూ సాజై ॥ 5॥\n\nశంకర సువన కేసరీ నందన ।\nతేజ ప్రతాప మహాజగ వందన ॥ 6 ॥\n\nవిద్యావాన గుణీ అతి చాతుర ।\nరామ కాజ కరివే కో ఆతుర ॥ 7 ॥\n\nప్రభు చరిత్ర సునివే కో రసియా ।\nరామలఖన సీతా మన బసియా ॥ 8॥\n\nసూక్ష్మ రూపధరి సియహి దిఖావా ।\nవికట రూపధరి లంక జలావా ॥ 9 ॥\n\nభీమ రూపధరి అసుర సంహారే ।\nరామచంద్ర కే కాజ సంవారే ॥ 10 ॥\n\nలాయ సంజీవన లఖన జియాయే ।\nశ్రీ రఘువీర హరషి ఉరలాయే ॥ 11 ॥\n\nరఘుపతి కీన్హీ బహుత బడాయీ (ఈ) ।\nతుమ మమ ప్రియ భరత సమ భాయీ ॥ 12 ॥\n\nసహస్ర వదన తుమ్హరో యశగావై ।\nఅస కహి శ్రీపతి కంఠ లగావై ॥ 13 ॥\n\nసనకాదిక బ్రహ్మాది మునీశా ।\nనారద శారద సహిత అహీశా ॥ 14 ॥\n\nయమ కుబేర దిగపాల జహాం తే ।\nకవి కోవిద కహి సకే కహాం తే ॥ 15 ॥\n\nతుమ ఉపకార సుగ్రీవహి కీన్హా ।\nరామ మిలాయ రాజపద దీన్హా ॥ 16 ॥\n\nతుమ్హరో మంత్ర విభీషణ మానా ।\nలంకేశ్వర భయే సబ జగ జానా ॥ 17 ॥\n\nయుగ సహస్ర యోజన పర భానూ ।\nలీల్యో తాహి మధుర ఫల జానూ ॥ 18 ॥\n\nప్రభు ముద్రికా మేలి ముఖ మాహీ ।\nజలధి లాంఘి గయే అచరజ నాహీ ॥ 19 ॥\n\nదుర్గమ కాజ జగత కే జేతే ।\nసుగమ అనుగ్రహ తుమ్హరే తేతే ॥ 20 ॥\n\nరామ దుఆరే తుమ రఖవారే ।\nహోత న ఆజ్ఞా బిను పైసారే ॥ 21 ॥\n\nసబ సుఖ లహై తుమ్హారీ శరణా ।\nతుమ రక్షక కాహూ కో డర నా ॥ 22 ॥\n\nఆపన తేజ సమ్హారో ఆపై ।\nతీనోం లోక హాంక తే కాంపై ॥ 23 ॥\n\nభూత పిశాచ నికట నహి ఆవై ।\nమహవీర జబ నామ సునావై ॥ 24 ॥\n\nనాసై రోగ హరై సబ పీరా ।\nజపత నిరంతర హనుమత వీరా ॥ 25 ॥\n\nసంకట సే హనుమాన ఛుడావై ।\nమన క్రమ వచన ధ్యాన జో లావై ॥ 26 ॥\n\nసబ పర రామ తపస్వీ రాజా ।\nతినకే కాజ సకల తుమ సాజా ॥ 27 ॥\n\nఔర మనోరథ జో కోయి లావై ।\nతాసు అమిత జీవన ఫల పావై ॥ 28 ॥\n\nచారో యుగ ప్రతాప తుమ్హారా ।\nహై పరసిద్ధ జగత ఉజియారా ॥ 29 ॥\n\nసాధు సంత కే తుమ రఖవారే ।\nఅసుర నికందన రామ దులారే ॥ 30 ॥\n\nఅష్ఠసిద్ధి నవ నిధి కే దాతా ।\nఅస వర దీన్హ జానకీ మాతా ॥ 31 ॥\n\nరామ రసాయన తుమ్హారే పాసా ।\nసదా రహో రఘుపతి కే దాసా ॥ 32 ॥\n\nతుమ్హరే భజన రామకో పావై ।\nజన్మ జన్మ కే దుఖ బిసరావై ॥ 33 ॥\n\nఅంత కాల రఘుపతి పురజాయీ ।\nజహాం జన్మ హరిభక్త కహాయీ ॥ 34 ॥\n\nఔర దేవతా చిత్త న ధరయీ ।\nహనుమత సేయి సర్వ సుఖ కరయీ ॥ 35 ॥\n\nసంకట కటై మిటై సబ పీరా ।\nజో సుమిరై హనుమత బల వీరా ॥ 36 ॥\n\nజై జై జై హనుమాన గోసాయీ ।\nకృపా కరహు గురుదేవ కీ నాయీ ॥ 37 ॥\n\nయహ శత వార పాఠ కర కోయీ ।\nఛూటహి బంది మహా సుఖ హోయీ ॥ 38 ॥\n\nజో యహ పడై హనుమాన చాలీసా ।\nహోయ సిద్ధి సాఖీ గౌరీశా ॥ 39 ॥\n\nతులసీదాస సదా హరి చేరా ।\nకీజై నాథ హృదయ మహ డేరా ॥ 40 ॥\n\nదోహా\nపవన తనయ సంకట హరణ - మంగళ మూరతి రూప్ ।\nరామ లఖన సీతా సహిత - హృదయ బసహు సురభూప్ ॥\nసియావర రామచంద్రకీ జయ । పవనసుత హనుమానకీ జయ । బోలో భాయీ సబ సంతనకీ జయ ।`,
      videoUrl: "https://www.youtube.com/embed/6XcSQL9lbjo?si=KX0sAXq2kooMasJr",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    aarti: {
      title: "Hanuman Aarti",
      subtitle: "Daily evening prayer to Lord Hanuman.",
      text: `హనుమాన్ ఆరతి \n\nఆరతి కీజే హనుమాన్ లాలా కి,\nదుష్ట దళన్ రఘునాథ కళా కి।\n\nజాకే బల్ సే గిరివర్ కాంపే,\nరోగ దోష జాకే నికట్ న జాంపే।\nఅంజనీ పుత్ర మహాబల్ దాయక్,\nసంతన్ కే ప్రభు సదా సహాయక్॥\n\nదే బీర రఘునాథ పఠాయే,\nలంక జరీ సియా సుధి లాయే।\nలంక సో కోట్ సముద్ర సీ ఖాయ్,\nజాత పవనసుత బర్ న లాయ్।\nలంక జరీ అసుర సంహారే,\nరాజా రామ్ జీ కే కాజ్ సంవారే॥\n\nలక్ష్మణ మూర్చిత పడే సకారే,\nఆన్ సంజీవన్ ప్రాణ ఉభారే।\nపైతి పాతాళ్ తోరి యమ కరే,\nఅహిరావణ కే భుజా ఉఖారే।\nబాయే భుజా అసుర దల్ మారే,\nదహినే భుజా సంత్ జన తారే॥\n\nసుర్ నర్ ముని ఆరతి ఉతారే,\nజయ జయ జయ హనుమాన్ ఉచారే।\nకంచన్ థార్ కపూర్ లౌ ఛాయ్,\nఆరతి కరత్ అంజనా మాయ్।\nజో హనుమాన్ జీ కీ ఆరతి గావే,\nబసి బైకుంఠ్ పరమ్ పద్ పావే॥\n\nఆరతి కీజే హనుమాన్ లాలా కి,\nదుష్ట దళన్ రఘునాథ కళా కి॥`,
      videoUrl: "https://www.youtube.com/embed/f7cbhOlQrrg?si=FpaMHFXpOAz0EUUO",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    names: {
      title: "108 Names of Hanuman",
      subtitle: "Ashtottara Shatanamavali of Lord Hanuman.",
      text: `ఓం శ్రీ ఆంజనేయాయ నమః ।
ఓం మహావీరాయ నమః ।
ఓం హనుమతే నమః ।
ఓం మారుతాత్మజాయ నమః ।
ఓం తత్త్వజ్ఞానప్రదాయ నమః ।
ఓం సీతాదేవీముద్రాప్రదాయకాయ నమః ।
ఓం అశోకవనికాచ్ఛేత్రే నమః ।
ఓం సర్వమాయావిభంజనాయ నమః ।
ఓం సర్వబంధవిమోక్త్రే నమః ।
ఓం రక్షోవిధ్వంసకారకాయ నమః । 10 ।
ఓం పరవిద్యాపరీహారాయ నమః ।
ఓం పరశౌర్యవినాశనాయ నమః ।
ఓం పరమంత్రниరాకర్త్రే నమః ।
ఓం పరయంత్రప్రభేదకాయ నమః ।
ఓం సర్వగ్రహవినాశినే నమః ।
ఓం భీమసేనసహాయకృతే నమః ।
ఓం సర్వదుఃఖహరాయ నమః ।
ఓం సర్వలోకచారిణే నమః ।
ఓం మనోజవాయ నమః ।
ఓం పారిజాతద్రుమూలస్థాయ నమః । 20 ।
ఓం సర్వమంత్రస్వరూపవతే నమః ।
ఓం సర్వతంత్రస్వరూపిణే నమః ।
ఓం సర్వయంత్రాత్మకాయ నమః ।
ఓం కపీశ్వరాయ నమః ।
ఓం మహాకాయాయ నమః ।
ఓం సర్వరోగహరాయ నమః ।
ఓం ప్రభవే నమః ।
ఓం బలసిద్ధికరాయ నమః ।
ఓం సర్వవిద్యాసంపత్ప్రదాయకాయ నమః ।
ఓం కపిసేనానాయకాయ నమః । 30 ।
ఓం భవిష్యచ్చతురాననాయ నమః ।
ఓం కుమారబ్రహ్మచారిణే నమః ।
ఓం రత్నకుండలదీప్తిమతే నమః ।
ఓం సంచలద్వాలసన్నద్ధలంబమానశిఖోజ్జ్వలాయ నమః ।
ఓం గంధర్వవిద్యాతత్త్వజ్ఞాయ నమః ।
ఓం మహాబలపరాక్రమాయ నమః ।
ఓం కారాగృహవిమోక్త్రే నమః ।
ఓం శృంఖలాబంధమోచకాయ నమః ।
ఓం సాగరోత్తారకాయ నమః ।
ఓం ప్రాజ్ఞాయ నమః । 40 ।
ఓం రామదూతాయ నమః ।
ఓం ప్రతాపవతే నమః ।
ఓం వానరాయ నమః ।
ఓం కేసరీసుతాయ నమః ।
ఓం సీతాశోకనివారకాయ నమః ।
ఓం అంజనాగర్భసంభూతాయ నమః ।
ఓం బాలార్కసదృశాననాయ నమః ।
ఓం విభీషణప్రియకరాయ నమః ।
ఓం దశగ్రీవకులాంతకాయ నమః ।
ఓం లక్ష్మణప్రాణదాత్రే నమః । 50 ।
ఓం వజ్రకాయాయ నమః ।
ఓం మహాద్యుతయే నమః ।
ఓం చిరంజీవినే నమః ।
ఓం రామభక్తాయ నమః ।
ఓం దైత్యకార్యవిఘాతకాయ నమః ।
ఓం అక్షహంత్రే నమః ।
ఓం కాంచనాభాయ నమః ।
ఓం పంచవక్త్రాయ నమః ।
ఓం మహాతపసే నమః ।
ఓం లంకిణీభంజనాయ నమః । 60 ।
ఓం శ్రీమతే నమః ।
ఓం సింహికాప్రాణభంజనాయ నమః ।
ఓం గంధమాదనశైలస్థాయ నమః ।
ఓం లంకాపురవిదాహకాయ నమః ।
ఓం సుగ్రీవసచివాయ నమః ।
ఓం ధీరాయ నమః ।
ఓం శూరాయ నమః ।
ఓం దైత్యకులాంతకాయ నమః ।
ఓం సురార్చితాయ నమః ।
ఓం మహాతేజసే నమః । 70 ।
ఓం రామచూడామణిప్రదాయ నమః ।
ఓం కామరూపిణే నమః ।
ఓం పింగళాక్షాయ నమః ।
ఓం వార్ధిమైనాకపూజితాయ నమః ।
ఓం కబళీకృతమార్తాండమండలాయ నమః ।
ఓం విజితేంద్రియాయ నమః ।
ఓం రామసుగ్రీవసంధాత్రే నమః ।
ఓం మహిరావణమర్దనాయ నమః ।
ఓం స్ఫటికాభాయ నమః ।
ఓం వాగధీశాయ నమః । 80 ।
ఓం నవవ్యాకృతిపండితాయ నమః ।
ఓం చతుర్బాహవే నమః ।
ఓం దీనబంధве నమః ।
ఓం మహాత్మనే నమః ।
ఓం భక్తవత్సలాయ నమః ।
ఓం సంజీవననగాహర్త్రే నమః ।
ఓం శుచయే నమః ।
ఓం వాగ్మినే నమః ।
ఓం దృఢవ్రతాయ నమః ।
ఓం కాలనేమిప్రమథనాయ నమః । 90 ।
ఓం హరిమర్కటమర్కటాయ నమః ।
ఓం దాంతాయ నమః ।
ఓం శాంతాయ నమః ।
ఓం ప్రసన్నాత్మనే నమః ।
ఓం శతకంఠమదాపహృతే నమః ।
ఓం యోగినే నమః ।
ఓం రామకథాలోలాయ నమః ।
ఓం సీతాన్веషణపండితాయ నమః ।
ఓం వజ్రదంష్ట్రాయ నమః ।
ఓం వజ్రనఖాయ నమః । 100 ।
ఓం రుద్రవీర్యసముద్భవాయ నమః ।
ఓం ఇంద్రజిత్ప్రహితమోఘబ్రహ్మాస్త్రవినివారకాయ నమః ।
ఓం పార్థివజ్రసమావాసినే నమః ।
ఓం శరపంజరభేదకాయ నమః ।
ఓం దశబాహవే నమః ।
ఓం లోకపూజ్యాయ నమః ।
ఓం జాంబవత్ ప్రీతివర్ధనాయ నమః ।
ఓం సీతాసమేత శ్రీరామపాదసేవాధురంధరాయ నమః ।
ఓం శ్రీ ఆంజనేయ స్వామినే నమః । 108 ।`,
      videoUrl: "https://www.youtube.com/embed/DXAfLcOoQWI?si=ntmUq190DfEFU1HX",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    dandakam: {
      title: "Hanuman Dandakam",
      subtitle: "Powerful Telugu hymn of Hanuman devotion.",
      text: `శ్రీ ఆంజనేయం ప్రసన్నాంజనేయం ప్రభాదివ్యకాయం ప్రకీర్తి ప్రదాయం ।
భజే వాయుపుత్రం భజే వాలగాత్రం భజేహం పవిత్రం భజే సూర్యమిత్రం ।
భజే రుద్రరూపం భజే బ్రహ్మతేజం బటంచున్ ప్రభాతంబు సాయంత్రమున్
నీ నామ సంకీర్తనల్ జేసి నీ రూపు వర్ణించి నీ మీద నే దండకం బొక్కటిన్
జేయ నూహించి నీ మూర్తి గావించి నీ సుందరం బెంచి నీ దాసదాసుండనై
రామ భక్తుండనై నిన్ను నే గొల్చెదన్ ।

నీ కటాక్షంబునన్ జూచితే వేడుకల్ జేసితే నా మొరాలించితే నన్ను రక్షించితే
అంజనాదేవి గర్భాన్వయా దేవా! నిన్నెంచ నేనెంతవాడన్?
దయాశాలివై జూచియున్, దాతవై బ్రోచియున్, దగ్గరన్ నిల్చియున్
తొల్లి సుగ్రీవుకున్ మంత్రివై, స్వామి కార్యార్థమై యేగి శ్రీరామ సౌమిత్రులన్ జూచి
వారిన్ విచారించి, సర్వేశు బూజించి, యబ్భానుజున్ బంటు గావించి
యవ్వాలినిన్ జంపి, కాకుత్థ్స తిలకున్ దయాదృష్టి వీక్షించి
కిష్కింధ కేతెంచి, శ్రీరామ కార్యార్థమై లంక కేతెంచియున్
లంకిణిన్ జంపియున్, లంకనున్ గాల్చియున్, యభ్భూమిజన్ జూచి
యానందముప్పొంగి, యాయుంగరంబిచ్చి, యారత్నమున్ దెచ్చి
శ్రీరామునకున్నిచ్చి, సంతోషమున్ జేసి, సుగ్రీవునిన్ యంగదున్
జాంబవంతు వీరాధులన్ గూడి యా సేతువున్ దాటి
వానరుల్ మూకలై పెన్మూకలై దైత్యులన్ ద్రుంచగా
రావణుండంత కాలాగ్ని రుద్రుండుగా వచ్చి బ్రహ్మాండమైనట్టి యా శక్తినిన్ వైచి
యాలక్ష్మణున్ మూర్ఛ నొందింపగా నప్పుడే పోయి నీవు సంజీవినిన్ దెచ్చి
సౌమిత్రికిన్నిచ్చి ప్రాణంబు రక్షింపగా
కుంభకర్ణాదులన్ వీరులన్ బోరి, శ్రీరామ బాణాగ్ని వారందరిన్, రావణున్ జంపగా
నంత లోకంబు లానందమై యుండ, నవ్వేళనున్ విభీషుణున్ వేడుకన్ తోడుకన్ వచ్చి
పట్టాభిషేకంబు చేయించి, సీతామహాదేవినిన్ దెచ్చి శ్రీరాముతో జేర్చి
యంతన్నయోధ్యాపురిన్ జొచ్చి పట్టాభిషేకంబు సంరంభమైయున్న
నీకన్న నాకెవ్వరున్ కూర్మి లేరంచు మన్నించినన్ ।

శ్రీరామ భక్తి ప్రశస్తంబుగా నిన్ను సేవించి నీ నామ సంకీర్తనల్ జేసితే
పాపముల్ బాయునే! భయములున్ దీరునే! భాగ్యముల్ గల్గునే!
సకల సామ్రాజ్యముల్ సర్వ సంపత్తులున్ గల్గునే!
ఓ వానరాకార! ఓ భక్త మందార! ఓ పుణ్య సంచార! ఓ ధీర! ఓ వీర!
నీవే సమస్తంబు నీవే మహాఫలముగా వెలసి
యాతారక బ్రహ్మ మంత్రంబు సంధానమున్ చేయుచు స్థిరమ్ముగన్
వజ్రదేహంబునున్ దాల్చి శ్రీరామ శ్రీరామయంచున్ మనఃపూతమైన
ఎప్పుడున్ తప్పకన్ తలతునా జిహ్వయందుండి
నీ దీర్ఘదేహమ్ము త్రైలోక్య సంచారివై రామనామాంకిత ధ్యానివై
బ్రహ్మవై బ్రహ్మతేజంబునన్ రౌద్రనీజ్వాల కల్లోల
హా వీర హనుమంత! ఓంకార శబ్దంబులన్
క్రూరకర్మ గ్రహ భూత ప్రేతంబులన్ బెన్ పిశాచంబులన్
శాకినీ ఢాకినీ మోహిని త్యాదులన్ గాలిదయ్యంబులన్
నీదు వాలంబునన్ జుట్టి నేలంబడం గొట్టి
నీ ముష్టి ఘాతంబులన్ బాహుదండంబులన్ రోమఖండంబులన్ ద్రుంచి
కాలాగ్ని రుద్రుండవై నీవు బ్రహ్మ ప్రభాభాసితంబైన నీ దివ్య తేజంబునున్ జూచి
రారా నాముద్దు నరసింహ యంచున్ దయాదృష్టి వీక్షించి నన్నేలు నాస్వామి
ఓ ఆంజనేయా! నమస్తే సదా బ్రహ్మచారీ! నమస్తే వ్రతపూర్ణహారీ!
నమస్తే నమో వాయుపుత్రా! నమస్తే నమో నమః!`,
      videoUrl: "https://www.youtube.com/embed/TSFV_N-ijkA?si=QqNSmNT6Aa1YuOaK",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
  });

  const value = {
    sevas, updateSeva, addSeva, deleteSeva,
    products, setProducts,
    timings, setTimings,
    events, setEvents,
    announcements, setAnnouncements,
    heroContent, setHeroContent,
    bookings, setBookings, approveBooking, rejectBooking,
    donations, setDonations,
    devotionalContent, setDevotionalContent,
    japaMantras, setJapaMantras,
    cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
    darshanSlots, setDarshanSlots,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
