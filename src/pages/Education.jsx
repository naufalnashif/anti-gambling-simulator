import React from 'react';
import { ShieldAlert, Users, Scale, AlertTriangle } from 'lucide-react';
import '../index.css';

const Education = () => {
  return (
    <div className="page-container" style={{ paddingBottom: '50px' }}>
      <div className="header" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}><span className="text-lose">Fakta & Realita</span> Dampak Judol</h1>
        <p>Edukasi preventif untuk memutus rantai kecanduan judi online.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        
        {/* Article 1 */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
            <div style={{ background: 'rgba(255, 51, 102, 0.1)', padding: '15px', borderRadius: '12px' }}>
              <Users className="text-lose" size={30} />
            </div>
            <h2 className="outfit" style={{ margin: 0 }}>Kerusakan Finansial & Sosial</h2>
          </div>
          <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
            Hutang pinjol (Pinjaman Online) yang menumpuk seringkali berawal dari "meminjam sedikit untuk modal balik modal" dalam judol. Pecandu kehilangan logika finansial dan berani mempertaruhkan uang tabungan, uang sekolah anak, hingga dana perusahaan. Selain itu, kecurigaan dan kebohongan menghancurkan ikatan pernikahan dan keluarga, berujung pada perceraian massal di berbagai kasus nyata.
          </p>
        </div>

        {/* Article 2 */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
            <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '15px', borderRadius: '12px' }}>
              <ShieldAlert className="text-accent" size={30} />
            </div>
            <h2 className="outfit" style={{ margin: 0 }}>Neurobiologi Kecanduan (Dopamin)</h2>
          </div>
          <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
            Judi online secara harfiah mengubah struktur sirkuit otak (sistem reward). Sensasi antisipasi saat slot berputar menciptakan lonjakan dopamin yang lebih besar daripada saat memenangkan hadiah. Akibatnya, otak membangun toleransi ekstrim. Pecandu terus bermain, bukan karena ingin uang lagi, melainkan karena otak mereka tidak mampu merasakan "kesenangan" normal tanpa stimulasi dari lampu kilat dan suara mesin judi.
          </p>
        </div>

        {/* Article 3 */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
            <div style={{ background: 'rgba(200, 200, 200, 0.1)', padding: '15px', borderRadius: '12px' }}>
              <Scale color="#ddd" size={30} />
            </div>
            <h2 className="outfit" style={{ margin: 0 }}>Jerat Pidana dan Legalitas</h2>
          </div>
          <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
            Di berbagai negara, termasuk Indonesia (Pasal 27 ayat 2 UU ITE), perbuatan mendistribusikan atau membuat akses judi online adalah tindak pidana berat. Pemain pun menjadi subyek hukum pidana. Lebih jauh lagi, uang hasil deposit pemain sering dicuci oleh sindikat kejahatan transnasional. Dengan bermain, pemain secara tidak langsung membiayai operasi mafia internasional, perdagangan manusia, dan kejahatan siber lainnya.
          </p>
        </div>

        {/* Action Panel */}
        <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, rgba(255,51,102,0.2) 0%, rgba(20,20,30,0.8) 100%)', padding: '40px', borderRadius: '16px', border: '1px solid var(--lose-color)', textAlign: 'center' }}>
          <AlertTriangle className="text-lose" size={50} style={{ margin: '0 auto 20px', display: 'block' }} />
          <h2 className="outfit text-white" style={{ fontSize: '2rem', marginBottom: '15px' }}>Berhenti Sekarang.</h2>
          <p style={{ color: '#ccc', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Jika Anda atau kerabat Anda menderita kecanduan judi, jangan takut untuk mencari bantuan profesional. Hubungi psikiater, layanan rehabilitasi kecanduan, atau layanan dukungan krisis di daerah Anda. Tidak ada kata terlambat untuk memutus tali server bandar.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Education;
