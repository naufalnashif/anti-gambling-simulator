import React, { useState } from 'react';
import {
  BrainCircuit, ChevronDown, ChevronUp, Target, TrendingDown, ShieldAlert, Zap,
  Fish, Wallet, Lock, Gift, Server, Megaphone, BarChart3, AlertTriangle, ArrowRight
} from 'lucide-react';
import '../index.css';

const CATEGORY_COLORS = {
  psikologi: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', label: 'Psikologi' },
  matematika: { color: '#00e5ff', bg: 'rgba(0,229,255,0.1)', label: 'Matematika' },
  teknis: { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', label: 'Teknis' },
  manipulasi: { color: '#f43f5e', bg: 'rgba(244,63,94,0.1)', label: 'Manipulasi' },
};

const StrategyItem = ({ icon: Icon, title, category, shortDesc, description, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cat = CATEGORY_COLORS[category] || CATEGORY_COLORS.manipulasi;

  return (
    <div
      className="glass-panel"
      style={{
        marginBottom: '14px',
        overflow: 'hidden',
        border: isOpen ? `1px solid ${cat.color}44` : '1px solid rgba(255,255,255,0.06)',
        transition: 'border 0.3s ease',
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '18px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: isOpen ? `${cat.bg}` : 'transparent',
          transition: 'background 0.3s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={22} color={cat.color} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '3px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: '700', color: cat.color, textTransform: 'uppercase', letterSpacing: '1px', background: cat.bg, padding: '2px 8px', borderRadius: '20px' }}>
                {cat.label}
              </span>
              <span style={{ fontSize: '0.65rem', color: '#555', fontWeight: '600' }}>
                #{String(index).padStart(2, '0')}
              </span>
            </div>
            <h3 className="outfit" style={{ fontSize: '1.05rem', margin: 0, fontWeight: '700' }}>{title}</h3>
            {!isOpen && (
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#777', lineHeight: '1.4' }}>{shortDesc}</p>
            )}
          </div>
        </div>
        <div style={{ flexShrink: 0, marginLeft: '12px', color: '#555', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          <ChevronDown size={20} />
        </div>
      </div>

      {isOpen && (
        <div style={{
          padding: '0 22px 22px 22px',
          fontSize: '0.93rem',
          lineHeight: '1.75',
          color: '#ccc',
          borderTop: `1px solid ${cat.color}22`,
          paddingTop: '18px',
          marginTop: '0',
        }}>
          <div style={{ borderTop: `1px solid ${cat.color}22`, paddingTop: '18px' }}>
            {description}
          </div>
        </div>
      )}
    </div>
  );
};

const StatBanner = ({ value, label, sub }) => (
  <div style={{
    textAlign: 'center', padding: '20px 16px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)',
  }}>
    <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '800', color: '#f43f5e', fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}>{value}</div>
    <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '600', marginTop: '6px' }}>{label}</div>
    {sub && <div style={{ fontSize: '0.72rem', color: '#666', marginTop: '3px' }}>{sub}</div>}
  </div>
);

const Strategy = () => {
  const strategies = [
    {
      icon: Zap,
      title: 'Hook Phase — Pancingan Awal',
      category: 'psikologi',
      shortDesc: 'Kemenangan beruntun di awal untuk ciptakan ilusi "gacor".',
      description: (
        <div>
          <p>Pada 2–5 spin pertama, algoritma bandar secara sengaja meningkatkan win-rate hingga <strong style={{color:'#4ade80'}}>90–98%</strong>. Ini bukan keberuntungan — ini adalah implementasi teknis dari strategi pemasaran berbasis dopamin.</p>
          <p><strong style={{color:'#fff'}}>Cara Kerjanya:</strong></p>
          <ul style={{paddingLeft: '20px', margin: '8px 0'}}>
            <li>Server mendeteksi bahwa ini adalah sesi baru (first-deposit atau session-start).</li>
            <li>Bobot simbol jackpot dinaikan sementara untuk memastikan kemenangan terjadi.</li>
            <li>Otak pemain merespons dengan pelepasan <strong>dopamin</strong> — neurotransmitter yang sama yang dipicu oleh narkotika.</li>
            <li>Pemain menyimpulkan: <em>"Game ini mudah, saya bisa kaya dari sini."</em></li>
          </ul>
          <div style={{
            background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '10px', padding: '12px 15px', marginTop: '12px'
          }}>
            <strong style={{color:'#f59e0b'}}>⚠️ Fakta:</strong> Riset oleh National Council on Problem Gambling menunjukkan bahwa kemenangan awal meningkatkan risiko kecanduan sebesar <strong>300%</strong> dibanding pemain yang langsung kalah.
          </div>
        </div>
      ),
    },
    {
      icon: Target,
      title: 'Near Miss Engineering — Ilusi Hampir Menang',
      category: 'psikologi',
      shortDesc: '40% waktu dirancang menampilkan "nyaris jackpot" untuk memancing rasa penasaran.',
      description: (
        <div>
          <p><em>Near Miss</em> adalah kondisi di mana dua dari tiga simbol jackpot muncul, membuat Anda merasa kemenangan sangat dekat. Ini adalah teknik manipulasi psikologis yang sudah dipatenkan oleh industri judi sejak tahun 1970-an.</p>
          <p><strong style={{color:'#fff'}}>Mekanisme Near Miss dalam Algoritma:</strong></p>
          <ul style={{paddingLeft: '20px', margin: '8px 0'}}>
            <li>Sistem memilih dua simbol identik pada reel pertama dan kedua.</li>
            <li>Reel ketiga dipaksa menampilkan simbol berbeda — bukan hasil acak murni.</li>
            <li>Secara statistik, near-miss terjadi <strong style={{color:'#f43f5e'}}>40–65%</strong> dari total spin kekalahan.</li>
            <li>Studi neuro-imaging menunjukkan otak merespons near-miss <strong>hampir identik</strong> dengan kemenangan nyata.</li>
          </ul>
          <div style={{
            background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
            borderRadius: '10px', padding: '12px 15px', marginTop: '12px'
          }}>
            <strong style={{color:'#a78bfa'}}>🧠 Psikologi:</strong> Kondisi "hampir menang" memicu area otak yang sama dengan kemenangan nyata (striatum), namun dengan frustrasi tambahan yang mendorong pemain untuk terus bermain guna "menyelesaikan" sensasi tersebut.
          </div>
        </div>
      ),
    },
    {
      icon: TrendingDown,
      title: 'Drain Phase — Penyedotan Sistematis',
      category: 'matematika',
      shortDesc: 'Setelah Anda terikat, sistem beralih ke mode penyedotan saldo pelan-pelan.',
      description: (
        <div>
          <p>Setelah fase hook berhasil, server beralih ke <strong style={{color:'#f43f5e'}}>Drain Phase</strong> — fase di mana win-rate turun drastis ke <strong>10–20%</strong>. Yang berbahaya adalah cara penurunannya yang tidak terasa.</p>
          <p><strong style={{color:'#fff'}}>Loss Disguised as Win (LDW):</strong></p>
          <p>Bandar tidak langsung membuat Anda kalah besar. Mereka memberi kemenangan kecil yang nilainya <em>lebih kecil dari taruhan</em>. Misalnya, taruhan Rp100.000 → menang Rp30.000 → otak tetap memproses ini sebagai "menang" karena disertai animasi dan suara kemenangan.</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'14px'}}>
            <div style={{background:'rgba(244,63,94,0.08)', borderRadius:'10px', padding:'12px', border:'1px solid rgba(244,63,94,0.2)'}}>
              <div style={{fontSize:'1.3rem', fontWeight:'800', color:'#f43f5e', fontFamily:"'Outfit'"}}>85%</div>
              <div style={{fontSize:'0.78rem', color:'#ccc', marginTop:'4px'}}>Kemenangan di Drain Phase adalah LDW (kurang dari nilai taruhan)</div>
            </div>
            <div style={{background:'rgba(0,229,255,0.08)', borderRadius:'10px', padding:'12px', border:'1px solid rgba(0,229,255,0.2)'}}>
              <div style={{fontSize:'1.3rem', fontWeight:'800', color:'#00e5ff', fontFamily:"'Outfit'"}}>−60%</div>
              <div style={{fontSize:'0.78rem', color:'#ccc', marginTop:'4px'}}>Rata-rata net loss pemain per sesi setelah melewati fase Hook</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: BarChart3,
      title: 'RTP Manipulation & House Edge',
      category: 'matematika',
      shortDesc: 'RTP kasino legal: 95–98%. Situs judi ilegal Indonesia: bisa di bawah 50%.',
      description: (
        <div>
          <p><strong>Return to Player (RTP)</strong> adalah persentase uang yang dikembalikan ke pemain dalam jangka panjang. Di kasino legal yang diawasi (Las Vegas, Macau), RTP diaudit ketat dan biasanya 92–98%.</p>
          <p><strong style={{color:'#f43f5e'}}>Di situs judi online ilegal Indonesia:</strong></p>
          <ul style={{paddingLeft: '20px', margin: '8px 0'}}>
            <li>RTP bisa dikonfigurasi dari <strong>panel admin</strong> secara real-time.</li>
            <li>Tidak ada audit independen — angka "RTP 97%" di website hanyalah marketing.</li>
            <li>Admin bisa menurunkan RTP ke <strong>30–50%</strong> ketika banyak pemain aktif sekaligus.</li>
            <li>RTP yang ditampilkan bisa berbeda dengan RTP yang aktif berjalan di server.</li>
          </ul>
          <div style={{
            background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)',
            borderRadius: '10px', padding: '12px 15px', marginTop: '12px'
          }}>
            <strong style={{color:'#00e5ff'}}>📊 Matematika Sederhana:</strong> Jika RTP = 70%, maka setiap Rp1.000.000 yang Anda masukkan, <strong>secara rata-rata</strong> hanya Rp700.000 yang kembali. Sisanya Rp300.000 masuk kantong bandar — bukan karena Anda kurang beruntung, tapi karena <em>memang dirancang demikian</em>.
          </div>
        </div>
      ),
    },
    {
      icon: Fish,
      title: 'Whale Targeting — Memburu Pemain Berduit',
      category: 'teknis',
      shortDesc: 'Pemain dengan saldo besar diperlakukan berbeda oleh sistem.',
      description: (
        <div>
          <p>Dalam industri judi, "whale" adalah pemain dengan kapasitas deposit tinggi. Sistem secara otomatis mendeteksi dan mengklasifikasikan pemain berdasarkan riwayat deposit.</p>
          <p><strong style={{color:'#fff'}}>Mekanisme Whale Targeting:</strong></p>
          <ul style={{paddingLeft: '20px', margin: '8px 0'}}>
            <li><strong>Big Win Bait:</strong> Whale diberikan jackpot awal yang sangat besar untuk mendorong deposit lebih besar.</li>
            <li><strong>VIP Treatment:</strong> Akses ke "high-limit table" yang sebenarnya memiliki house edge lebih tinggi.</li>
            <li><strong>Personal Manager:</strong> CS aktif menghubungi whale untuk menawarkan "bonus eksklusif" — yang sesungguhnya adalah jebakan rollover.</li>
            <li><strong>Data Exploitation:</strong> Server mencatat pola bermain, jam aktif, dan respons emosional (frekuensi spin saat rugi) untuk optimasi manipulasi.</li>
          </ul>
          <div style={{
            background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
            borderRadius: '10px', padding: '12px 15px', marginTop: '12px'
          }}>
            <strong style={{color:'#a78bfa'}}>🎣 Fakta:</strong> 80% pendapatan situs judi berasal dari 20% pemain (whale). Mereka diidentifikasi dalam hitungan menit dan diperlakukan dengan "kasih sayang" yang terstruktur untuk menguras maksimal.
          </div>
        </div>
      ),
    },
    {
      icon: Lock,
      title: 'Withdrawal Manipulation — Uang Mudah Masuk, Susah Keluar',
      category: 'manipulasi',
      shortDesc: 'WD dipersulit sistematik untuk memaksa pemain "mainin lagi" uang yang sudah menang.',
      description: (
        <div>
          <p>Salah satu taktik paling efektif bandar adalah mempersulit proses penarikan (withdraw). Tujuannya jelas: membuat uang menang Anda tetap berada di sistem mereka selama mungkin.</p>
          <p><strong style={{color:'#fff'}}>Taktik WD Manipulation yang Umum:</strong></p>
          <ul style={{paddingLeft: '20px', margin: '8px 0'}}>
            <li>Verifikasi identitas berulang yang memakan waktu 2–7 hari.</li>
            <li>Batas WD harian yang sangat rendah (misal: max Rp500.000/hari meski saldo Rp5.000.000).</li>
            <li>WD "dalam proses" berhari-hari, sementara deposit langsung masuk.</li>
            <li>Alasan teknis palsu: "server maintenance", "rekening bermasalah".</li>
            <li>Syarat minimum turn-over (rollover) sebelum bisa WD — yang hampir mustahil dipenuhi.</li>
          </ul>
          <div style={{
            background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)',
            borderRadius: '10px', padding: '12px 15px', marginTop: '12px'
          }}>
            <strong style={{color:'#f43f5e'}}>⚠️ Realita:</strong> Banyak pemain yang "WD berhasil" di awal sebagai strategi marketing (membangun kepercayaan awal), namun ketika saldo mencapai jumlah signifikan, tiba-tiba akun di-suspend dengan alasan "fraud detection".
          </div>
        </div>
      ),
    },
    {
      icon: Gift,
      title: 'Bonus Trap & Rollover Jebakan',
      category: 'manipulasi',
      shortDesc: 'Bonus deposit 100% terdengar menggiurkan — tapi ada syarat rollover yang mustahil.',
      description: (
        <div>
          <p>Bonus adalah alat rekruitmen utama situs judi online. "Bonus New Member 100%!" terdengar luar biasa, tetapi tersembunyi di balik Terms & Conditions yang sengaja dibuat rumit.</p>
          <p><strong style={{color:'#fff'}}>Anatomi Bonus Jebakan:</strong></p>
          <ul style={{paddingLeft: '20px', margin: '8px 0'}}>
            <li><strong>Bonus 100%:</strong> Deposit Rp1.000.000 → Dapat Rp2.000.000. <em>Terlihat menguntungkan.</em></li>
            <li><strong>Syarat Rollover 30x:</strong> Anda harus bertaruh total <strong>Rp2.000.000 × 30 = Rp60.000.000</strong> sebelum bisa WD bonus.</li>
            <li>Dengan house edge 30%, Anda secara statistik harus kehilangan Rp18.000.000 untuk memenuhi rollover.</li>
            <li>Nilai bonus Rp1.000.000 tidak sebanding dengan kerugian yang diperlukan.</li>
          </ul>
          <div style={{
            background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '10px', padding: '12px 15px', marginTop: '12px'
          }}>
            <strong style={{color:'#f59e0b'}}>💡 Aturan Praktis:</strong> Tidak ada bonus gratis yang sesungguhnya dari situs judi. Setiap "keuntungan" yang mereka tawarkan selalu dirancang untuk menghasilkan profit lebih besar bagi mereka dalam jangka panjang.
          </div>
        </div>
      ),
    },
    {
      icon: Server,
      title: 'Server-Side Control — Admin Pegang Kendali Penuh',
      category: 'teknis',
      shortDesc: 'Admin situs bisa lihat saldo Anda, ubah RTP, dan matikan scatter kapanpun.',
      description: (
        <div>
          <p>Berbeda dengan kasino fisik yang menggunakan hardware RNG yang diaudit, situs judi online ilegal menjalankan software yang <strong>100% dikontrol oleh admin</strong>.</p>
          <p><strong style={{color:'#fff'}}>Kapabilitas Admin Panel (yang tidak Anda ketahui):</strong></p>
          <ul style={{paddingLeft: '20px', margin: '8px 0'}}>
            <li>Melihat saldo, riwayat bermain, dan pola taruhan setiap pemain secara real-time.</li>
            <li>Mengubah win-rate (RTP) per pemain atau secara global kapanpun.</li>
            <li>Memblokir fitur "scatter" atau "bonus game" secara remote.</li>
            <li>Men-trigger kemenangan manual untuk memikat pemain target (whale baru).</li>
            <li>Membaca geolokasi dan device information pemain.</li>
          </ul>
          <div style={{
            background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
            borderRadius: '10px', padding: '12px 15px', marginTop: '12px'
          }}>
            <strong style={{color:'#a78bfa'}}>🔴 Risiko Data:</strong> Banyak situs judi ilegal dikelola oleh sindikat internasional yang juga menjalankan bisnis penipuan. Data KTP, nomor rekening, dan foto selfie yang Anda kirim untuk verifikasi bisa dijual atau digunakan untuk kejahatan lain.
          </div>
        </div>
      ),
    },
    {
      icon: Megaphone,
      title: 'Psychological Weaponization — Senjata Mental',
      category: 'psikologi',
      shortDesc: 'FOMO, social proof, urgensi palsu — semua dirancang untuk bypass logika Anda.',
      description: (
        <div>
          <p>Desain UI/UX situs judi online bukan dibuat secara kebetulan. Setiap elemen — dari warna, suara, hingga notifikasi — dirancang secara ilmiah untuk mempengaruhi keputusan Anda.</p>
          <p><strong style={{color:'#fff'}}>Teknik Weaponization yang Digunakan:</strong></p>
          <ul style={{paddingLeft: '20px', margin: '8px 0'}}>
            <li><strong>Social Proof Palsu:</strong> Ticker "⚡ Budi dari Surabaya baru menang Rp50jt" — bisa diprogram otomatis dan tidak mewakili kejadian nyata.</li>
            <li><strong>FOMO (Fear of Missing Out):</strong> Timer countdown "Bonus berakhir dalam 02:00:00" yang selalu diperbarui.</li>
            <li><strong>Warna Merah & Emas:</strong> Riset menunjukkan warna ini memicu impulsivitas dan rasa urgensi.</li>
            <li><strong>Musik Loop:</strong> Audio yang dirancang untuk mencegah pemain mengalihkan perhatian — pola ritme tertentu meningkatkan fokus pada layar.</li>
            <li><strong>Tidak Ada Jam:</strong> Interface judi tidak pernah menampilkan waktu nyata untuk mencegah pemain sadar berapa lama mereka bermain.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: '40px' }}>
      {/* Header */}
      <div className="header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '12px' }}>
          <BrainCircuit className="text-accent" size={34} />
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', margin: 0 }}>
            Strategi <span className="text-accent">Bandar</span>
          </h1>
        </div>
        <p style={{ maxWidth: '620px', margin: '0 auto 24px', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Pembongkaran komprehensif tentang bagaimana situs judi online merancang sistem mereka secara matematis, psikologis, dan teknis untuk memastikan Anda <em>selalu kalah</em>.
        </p>

        {/* Stats Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <StatBanner value="4.4 Juta" label="Pemain Judi Online di Indonesia" sub="Sumber: Setneg RI, 2023" />
          <StatBanner value="Rp327T" label="Perputaran Uang Judi Per Tahun" sub="Estimasi PPATK, 2023" />
          <StatBanner value="80.000+" label="Situs Judi Diblokir Kominfo" sub="Kumulatif sejak 2018" />
          <StatBanner value="<5%" label="Pemain yang Akhirnya Profit" sub="Dalam jangka panjang" />
        </div>
      </div>

      {/* Strategy Items */}
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {strategies.map((strat, index) => (
          <StrategyItem key={index} {...strat} index={index + 1} />
        ))}
      </div>

      {/* Bottom Warning */}
      <div className="glass-panel" style={{
        marginTop: '30px', padding: '24px 28px',
        borderLeft: '4px solid var(--lose-color)',
        maxWidth: '820px', margin: '30px auto 0',
        background: 'rgba(244,63,94,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <AlertTriangle size={22} color="#f43f5e" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ margin: '0 0 10px', fontWeight: '700', color: '#f43f5e' }}>Satu-satunya Strategi yang Benar</p>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#bbb', lineHeight: '1.65', textAlign: 'justify' }}>
              Dalam dunia perjudian online ilegal, tidak ada strategi, sistem taruhan, atau "pola gacor" yang bisa mengalahkan algoritma bandar secara konsisten. Satu-satunya cara untuk tidak kalah adalah dengan <strong style={{color:'#fff'}}>tidak memulai bermain</strong>. Jika Anda atau orang terdekat sudah terjebak, segera cari bantuan profesional.
            </p>
          </div>
        </div>
      </div>

      {/* CTA to Education */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <p style={{ color: '#666', fontSize: '0.88rem', marginBottom: '12px' }}>Ingin memahami lebih dalam dampak nyata judi online?</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--accent-secondary)', fontWeight: '600', fontSize: '0.92rem', cursor: 'pointer' }}
          onClick={() => window.dispatchEvent(new CustomEvent('navigate-to', { detail: 'education' }))}
        >
          Baca Artikel Edukasi Lengkap <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default Strategy;
