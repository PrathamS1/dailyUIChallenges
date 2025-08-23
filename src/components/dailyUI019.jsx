import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Clock, Award, Filter } from 'lucide-react';
import BackToHome from './BackToHome';

const ACCENT_COLOR = 'var(--landing-accent, #FF796F)';

const getVariantImage = (url, variantIndex) => {
  try {
    const u = new URL(url);
    const seed = u.searchParams.get('seed') || 'seed';
    u.searchParams.set('seed', `${seed}-v${variantIndex}`);
    return u.toString();
  } catch {
    return url;
  }
};

const TIMEFRAMES = [
  { key: '24h', label: '24h' },
  { key: '7d', label: '7d' },
  { key: '30d', label: '30d' },
  { key: 'all', label: 'All' },
];

const CREATORS = [
  {
    id: 'c1',
    name: 'AstraForge',
    handle: '@astra',
    avatar: 'https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg',
    stats: {
      '24h': { volume: 82.4, sales: 48, changePct: 12.3, floor: 1.9 },
      '7d': { volume: 540.2, sales: 310, changePct: 22.1, floor: 1.6 },
      '30d': { volume: 1890.3, sales: 1024, changePct: 41.5, floor: 1.4 },
      'all': { volume: 9210.7, sales: 5120, changePct: 0, floor: 1.2 },
    },
  },
  {
    id: 'c2',
    name: 'NeonMonks',
    handle: '@monks',
    avatar: 'https://images.unsplash.com/photo-1728577740843-5f29c7586afe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhcGhpYyUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    stats: {
      '24h': { volume: 64.1, sales: 35, changePct: 5.2, floor: 1.2 },
      '7d': { volume: 420.9, sales: 247, changePct: 9.6, floor: 1.0 },
      '30d': { volume: 1402.8, sales: 790, changePct: 18.4, floor: 0.9 },
      'all': { volume: 7504.2, sales: 4050, changePct: 0, floor: 0.9 },
    },
  },
  {
    id: 'c3',
    name: 'PixelHeritage',
    handle: '@pixel',
    avatar: '/mineNFT.png',
    stats: {
      '24h': { volume: 95.6, sales: 55, changePct: 16.8, floor: 2.2 },
      '7d': { volume: 602.3, sales: 340, changePct: 28.6, floor: 2.0 },
      '30d': { volume: 1850.1, sales: 980, changePct: 35.4, floor: 1.7 },
      'all': { volume: 8021.0, sales: 4012, changePct: 0, floor: 1.6 },
    },
  },
  {
    id: 'c4',
    name: 'GlitchGarden',
    handle: '@glitch',
    avatar: 'https://plus.unsplash.com/premium_photo-1739278712940-2b36e2ab87de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGdyYXBoaWMlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D',
    stats: {
      '24h': { volume: 28.9, sales: 22, changePct: -4.1, floor: 0.7 },
      '7d': { volume: 214.0, sales: 160, changePct: 3.6, floor: 0.8 },
      '30d': { volume: 910.2, sales: 650, changePct: 10.8, floor: 0.9 },
      'all': { volume: 3884.4, sales: 2890, changePct: 0, floor: 0.8 },
    },
  },
  {
    id: 'c5',
    name: 'ChainPoets',
    handle: '@poets',
    avatar: 'https://images.unsplash.com/vector-1743321182619-a3a4279a911b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8Mg%3D%3D',
    stats: {
      '24h': { volume: 51.2, sales: 31, changePct: 8.1, floor: 1.0 },
      '7d': { volume: 318.7, sales: 210, changePct: 11.4, floor: 0.9 },
      '30d': { volume: 1220.5, sales: 880, changePct: 19.5, floor: 0.8 },
      'all': { volume: 4602.2, sales: 3220, changePct: 0, floor: 0.8 },
    },
  },
  {
    id: 'c6',
    name: 'MonochromeLabs',
    handle: '@mono',
    avatar: 'https://images.unsplash.com/vector-1749575996601-f90ff9d03ebb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDI%3D',
    stats: {
      '24h': { volume: 33.4, sales: 19, changePct: -2.7, floor: 0.6 },
      '7d': { volume: 187.3, sales: 132, changePct: 1.2, floor: 0.7 },
      '30d': { volume: 720.1, sales: 505, changePct: 9.2, floor: 0.7 },
      'all': { volume: 3201.6, sales: 2400, changePct: 0, floor: 0.6 },
    },
  },
  {
    id: 'c7',
    name: 'CryptoCeramics',
    handle: '@ceramics',
    avatar: 'https://images.unsplash.com/vector-1749532960847-0321e8e5c2c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxwcm9maWxlJTIwcGljfGVufDB8fDB8fHwy',
    stats: {
      '24h': { volume: 12.5, sales: 11, changePct: -6.9, floor: 0.3 },
      '7d': { volume: 88.2, sales: 70, changePct: -2.1, floor: 0.4 },
      '30d': { volume: 405.0, sales: 290, changePct: 4.5, floor: 0.4 },
      'all': { volume: 1802.9, sales: 1410, changePct: 0, floor: 0.4 },
    },
  },
  {
    id: 'c8',
    name: 'VectorMythos',
    handle: '@mythos',
    avatar: 'https://images.unsplash.com/vector-1745847439146-c0381f39e8c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxwcm9maWxlJTIwcGljfGVufDB8fDB8fHwy',
    stats: {
      '24h': { volume: 22.0, sales: 14, changePct: 3.2, floor: 0.5 },
      '7d': { volume: 140.4, sales: 100, changePct: 6.7, floor: 0.6 },
      '30d': { volume: 610.7, sales: 420, changePct: 12.1, floor: 0.7 },
      'all': { volume: 2604.2, sales: 1800, changePct: 0, floor: 0.6 },
    },
  },
  {
    id: 'c9',
    name: 'InkChain',
    handle: '@ink',
    avatar: 'https://images.unsplash.com/vector-1741104194775-9171429acd67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ5fHxwcm9maWxlJTIwcGljfGVufDB8fDB8fHwy',
    stats: {
      '24h': { volume: 44.1, sales: 27, changePct: 7.9, floor: 0.9 },
      '7d': { volume: 284.5, sales: 190, changePct: 10.4, floor: 0.9 },
      '30d': { volume: 998.2, sales: 700, changePct: 16.2, floor: 0.9 },
      'all': { volume: 4020.4, sales: 2900, changePct: 0, floor: 0.9 },
    },
  },
  {
    id: 'c10',
    name: 'RareFactory',
    handle: '@factory',
    avatar: 'https://i.pinimg.com/236x/33/71/0b/33710b273ed1e486862440e0446dfc18.jpg',
    stats: {
      '24h': { volume: 70.8, sales: 43, changePct: 11.1, floor: 1.5 },
      '7d': { volume: 430.0, sales: 270, changePct: 13.9, floor: 1.3 },
      '30d': { volume: 1602.0, sales: 970, changePct: 27.5, floor: 1.2 },
      'all': { volume: 6814.8, sales: 4010, changePct: 0, floor: 1.1 },
    },
  },
  {
    id: 'c11',
    name: 'SpectraBits',
    handle: '@spectra',
    avatar: 'https://images.unsplash.com/vector-1742542556398-b5055c8ae4be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYzfHxwcm9maWxlJTIwcGljfGVufDB8fDB8fHwy',
    stats: {
      '24h': { volume: 18.7, sales: 15, changePct: -1.3, floor: 0.4 },
      '7d': { volume: 120.2, sales: 90, changePct: 2.2, floor: 0.5 },
      '30d': { volume: 540.0, sales: 380, changePct: 7.1, floor: 0.5 },
      'all': { volume: 2189.1, sales: 1570, changePct: 0, floor: 0.5 },
    },
  },
  {
    id: 'c12',
    name: 'MuseMakers',
    handle: '@muse',
    avatar: 'https://images.unsplash.com/vector-1753619451212-378d8b7cd7fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjg4fHxwcm9maWxlJTIwcGljfGVufDB8fDB8fHwy',
    stats: {
      '24h': { volume: 39.5, sales: 23, changePct: 4.4, floor: 0.8 },
      '7d': { volume: 205.4, sales: 140, changePct: 6.1, floor: 0.8 },
      '30d': { volume: 850.9, sales: 600, changePct: 11.0, floor: 0.9 },
      'all': { volume: 3410.6, sales: 2380, changePct: 0, floor: 0.8 },
    },
  },
];

const formatEth = (n) => `${n.toLocaleString(undefined, { maximumFractionDigits: 1 })} Ξ`;

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('7d');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  const ranked = useMemo(() => {
    const withStats = CREATORS.map((c) => ({
      ...c,
      current: c.stats[timeframe],
    }));
    return withStats.sort((a, b) => b.current.volume - a.current.volume);
  }, [timeframe]);

  const topThree = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  const totalPages = Math.max(1, Math.ceil(rest.length / ITEMS_PER_PAGE));
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = rest.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  // Header stats (monochrome chips)
  const totalVolume = useMemo(() => ranked.reduce((sum, c) => sum + c.current.volume, 0), [ranked]);
  const avgFloor = useMemo(() => {
    if (ranked.length === 0) return 0;
    return ranked.reduce((sum, c) => sum + c.current.floor, 0) / ranked.length;
  }, [ranked]);
  const marketChange = useMemo(() => {
    if (ranked.length === 0) return 0;
    return ranked.reduce((sum, c) => sum + c.current.changePct, 0) / ranked.length;
  }, [ranked]);
  const gainers = useMemo(() => ranked.filter((c) => c.current.changePct > 0).length, [ranked]);

  const handleChangePage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <BackToHome />

      {/* Header */}
      <motion.header
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-zinc-200 bg-white/90 backdrop-blur sticky top-0 z-30 relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(600px 200px at 90% -20%, ${ACCENT_COLOR}10, transparent 60%)` }}
        />
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">NFT Creator Leaderboard</h1>
              <p className="text-zinc-600 mt-1">Top creators by trading volume and sales.</p>
              <div className="flex gap-3 mt-3 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-2">
                  <span className="relative inline-flex items-center">
                    <motion.span
                      className="absolute inline-block w-2 h-2 rounded-full bg-zinc-900"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <span className="relative inline-block w-2 h-2 rounded-full bg-zinc-900" />
                  </span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Updated live</span>
                </span>
                <span className="inline-flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Ranked by volume</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-zinc-500 hidden md:flex items-center gap-2 pr-1 border-r border-zinc-200">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Timeframe</span>
              </div>
              <div className="relative flex p-1 rounded-lg border border-zinc-200 bg-white overflow-hidden">
                {(() => {
                  const activeIndex = TIMEFRAMES.findIndex((t) => t.key === timeframe);
                  const pillWidthPx = 56;
                  return (
                    <>
                      <motion.div
                        aria-hidden
                        className="absolute top-1 bottom-1 rounded-md bg-zinc-900"
                        initial={false}
                        animate={{ x: activeIndex * pillWidthPx }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        style={{ width: `${pillWidthPx}px` }}
                      />
                      {TIMEFRAMES.map((t) => (
                        <button
                          key={t.key}
                          onClick={() => { setTimeframe(t.key); setCurrentPage(1); }}
                          className={`relative z-10 w-14 text-center py-1.5 text-sm rounded-md transition-colors ${
                            timeframe === t.key ? 'text-white' : 'text-zinc-600 hover:text-zinc-900'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          <motion.div
            key={timeframe}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5"
          >
            <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-500">Total Volume</div>
                <div className="text-lg font-semibold text-zinc-900">{formatEth(totalVolume)}</div>
              </div>
              <div className="text-right text-xs text-zinc-500">Timeframe {timeframe}</div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-500">Avg Floor</div>
                <div className="text-lg font-semibold text-zinc-900">{avgFloor.toFixed(2)} Ξ</div>
              </div>
              <div className="text-right text-xs text-zinc-500">{ranked.length} creators</div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-500">Market Pulse</div>
                <div className="flex items-center gap-2">
                  {marketChange >= 0 ? <TrendingUp className="w-4 h-4 text-zinc-900" /> : <TrendingDown className="w-4 h-4 text-zinc-900" />}
                  <span className="text-lg font-semibold text-zinc-900">{marketChange.toFixed(1)}%</span>
                </div>
              </div>
              <div className="text-right text-xs text-zinc-500">{gainers}/{ranked.length} gainers</div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Top 3 Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 items-end"
        >
          {(() => {
            const order = [1, 0, 2];
            return order
              .map((o) => ({ creator: topThree[o], rank: o + 1 }))
              .filter((x) => x.creator)
              .map(({ creator, rank }) => (
                <TopThreeCard key={creator.id} rank={rank} creator={creator} />
              ));
          })()}
        </motion.div>

        <div className="bg-white border border-zinc-200 rounded-t-xl">
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium text-zinc-500 border-b border-zinc-200">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Creator</div>
            <div className="col-span-2 text-right">Volume</div>
            <div className="col-span-2 text-right">Sales</div>
            <div className="col-span-1 text-right">Floor</div>
            <div className="col-span-2 text-right">Change</div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
            }}
          >
            {pageItems.map((creator, idx) => (
              <Row
                key={creator.id}
                rank={idx + 4 + pageStart}
                creator={creator}
              />
            ))}
          </motion.div>
        </div>

        {/* Pagination */}
        <div className="bg-white border border-t-0 border-zinc-200 rounded-b-xl px-4 py-3 flex items-center justify-between">
          <div className="text-xs text-zinc-500">Showing {pageStart + 1}-{Math.min(pageStart + ITEMS_PER_PAGE, rest.length)} of {rest.length}</div>
          <div className="flex items-center gap-1">
            <PageButton iconLeft onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handleChangePage(p)}
                className={`w-8 h-8 rounded-md text-sm border transition-colors ${
                  p === currentPage
                    ? 'border-zinc-900 text-zinc-900'
                    : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                }`}
              >
                {p}
              </button>
            ))}
            <PageButton onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages} />
          </div>
        </div>
      </main>
    </div>
  );
};

const TopThreeCard = ({ index, rank, creator }) => {
  const isFirst = rank === 1;
  const heightClass = rank === 1 ? 'h-[360px]' : 'h-[320px]';
  const ambientOpacity = rank === 1 ? 0.25 : rank === 2 ? 0.5 : 0.12;

  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.div
        aria-hidden
        className="absolute -inset-4 rounded-3xl"
        style={{ backgroundColor: 'var(--landing-accent, #FF796F)', filter: 'blur(32px)', opacity: ambientOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: ambientOpacity }}
        whileHover={{ opacity: ambientOpacity + 0.1 }}
        transition={{ duration: 0.3 }}
      />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`absolute inset-0 ${heightClass} rounded-2xl overflow-hidden pointer-events-none`}
          style={{ transformOrigin: 'left bottom', zIndex: 0, willChange: 'transform' }}
          initial={{ rotate: -(1 + i * 0.3), x: -(2 + i * 0.5), y: -(1 + i * 0.5), opacity: 0.35 - i * 0.08, scale: 0.995 - i * 0.01 }}
          animate={{
            rotate: hovered ? -(4 + i * 1.5) : -(1 + i * 0.3),
            x: hovered ? -(8 + i * 3) : -(2 + i * 0.5),
            y: hovered ? -(3 + i * 2) : -(1 + i * 0.5),
            opacity: hovered ? 0.7 - i * 0.18 : 0.45 - i * 0.1,
            scale: hovered ? 0.985 - i * 0.02 : 0.995 - i * 0.01,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="absolute inset-3 rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            <img
              src={getVariantImage(creator.avatar, i + 1)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter grayscale"
              style={{ opacity: 1 }}
            />
          </div>
        </motion.div>
      ))}

      {/* Card */}
      <motion.div
        whileHover={{ y: -6, rotate: 3, scale: 1.02 }}
        style={{ transformOrigin: 'left bottom', willChange: 'transform' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`relative ${heightClass} rounded-2xl border border-zinc-200 bg-white overflow-hidden z-[1]`}
      >
        <motion.img
          src={creator.avatar}
          alt={creator.name}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.02 }}
          animate={{ scale: hovered ? 1.06 : 1.02 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-black text-white text-xs font-medium">
                <Crown className={`w-3.5 h-3.5 ${isFirst ? '' : 'opacity-70'}`} />
                Rank #{rank}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.75), 0 0 12px rgba(0,0,0,0.45)' }}>{creator.name}</h3>
              <div className="text-xs text-white/80" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{creator.handle}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.75), 0 0 12px rgba(0,0,0,0.45)' }}>{formatEth(creator.current.volume)}</div>
              <div className="text-xs text-white/80" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{creator.current.sales} sales</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-white/30 bg-white/90 backdrop-blur text-zinc-900 shadow-sm">
                {creator.current.changePct >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {creator.current.changePct}%
              </span>
              <span className="text-white/60">•</span>
              <span className="text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>Floor {creator.current.floor} Ξ</span>
            </div>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: rank === 1 ? 140 : rank === 2 ? 110 : 90, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-1 rounded-full origin-left"
              style={{ background: 'linear-gradient(90deg, #000, #bbb)' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Row = ({ rank, creator }) => {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -1, backgroundColor: 'rgba(0,0,0,0.02)', boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="relative group grid grid-cols-12 items-center px-4 py-4 border-b border-zinc-100 last:border-0"
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(180deg, #000, #777)' }}
      />

      <div className="col-span-1">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border text-xs font-medium text-zinc-700 border-zinc-200">
          {rank}
        </span>
      </div>

      <div className="col-span-4 flex items-center gap-3">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-10 h-10 rounded-lg border border-zinc-200 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="min-w-0">
          <div className="font-medium text-zinc-900 truncate">{creator.name}</div>
          <div className="text-xs text-zinc-500 truncate">{creator.handle}</div>
        </div>
      </div>

      <div className="col-span-2 text-right font-medium text-zinc-900">{formatEth(creator.current.volume)}</div>
      <div className="col-span-2 text-right text-zinc-700">{creator.current.sales}</div>
      <div className="col-span-1 text-right text-zinc-700">{creator.current.floor} Ξ</div>
      <div className="col-span-2 text-right">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-zinc-200 bg-white text-zinc-900 text-sm transition-transform duration-300 ease-out group-hover:scale-105">
          {creator.current.changePct >= 0 ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          {creator.current.changePct}%
        </span>
      </div>

      <div className="absolute left-0 right-0 bottom-0 h-px bg-zinc-200 overflow-hidden">
        <div className="h-full w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" style={{ background: 'linear-gradient(90deg, #000, #777)', willChange: 'transform' }} />
      </div>
    </motion.div>
  );
};

const PageButton = ({ onClick, disabled, iconLeft }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileTap={{ scale: disabled ? 1 : 0.96 }}
    className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${
      disabled
        ? 'border-zinc-200 text-zinc-300 cursor-not-allowed'
        : 'border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300'
    }`}
  >
    {iconLeft ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
  </motion.button>
);

export default Leaderboard;


