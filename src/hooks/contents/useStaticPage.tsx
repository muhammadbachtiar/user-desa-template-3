interface value {
    content : string
    profile?: {
        name: string,
        imageUrl: string,
        jabatan: string,
        years: string
      }
}

function useStaticPage(params: Record<string, string | number> = {}, slug: string ) {
    let value: value = { content: ''}

    if (slug === 'kata-sambutan'){
        value = {
            content: `
            <h1>Kata Sambutan Kepala Desa</h1>
            <p>Dengan rasa syukur yang mendalam kepada Tuhan Yang Maha Esa, saya selaku Kepala Desa mengucapkan selamat datang kepada seluruh warga yang hadir pada acara ini. Kehadiran Bapak, Ibu, dan seluruh masyarakat desa merupakan bukti nyata semangat kebersamaan yang terus kita jaga.</p>
          
            <p>Desa kita adalah rumah bagi berbagai potensi besar, baik dari segi sumber daya alam, budaya, maupun masyarakat yang penuh semangat. Sebagai kepala desa, saya memiliki komitmen untuk terus mengembangkan potensi-potensi ini agar membawa manfaat bagi kehidupan kita semua. Saya percaya bahwa melalui kerja sama yang erat, kita mampu mewujudkan desa yang lebih maju, mandiri, dan sejahtera.</p>
          
            <!-- Daftar -->
            <h2>Harapan dan Ajakan</h2>
            <p>Dalam kesempatan ini, saya ingin mengajak seluruh masyarakat untuk terus bersama-sama bekerja dan berinovasi dalam membangun desa kita. Tanpa kerja sama, mustahil kita dapat mewujudkan cita-cita besar yang kita miliki.</p>
            <ul>
              <li>Berpartisipasi aktif dalam program pembangunan desa</li>
              <li>Menjaga lingkungan hidup agar tetap asri dan lestari</li>
              <li>Memperkuat solidaritas antarwarga untuk menghadapi tantangan bersama</li>
            </ul>
          
            <p>Terima kasih atas perhatian dan kerja sama yang telah diberikan. Semoga Tuhan selalu menyertai langkah kita semua. Wassalamualaikum Warahmatullahi Wabarakatuh.</p>
          `,
            profile: {
              name: "Nursholeh Ahmad",
              imageUrl: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",
              jabatan: "Kepala Desa",
              years: "2020 - 2026"
            }
          }
    }

    if (slug === 'program-desa'){
        value = {
            content: `
            <h1>Program Desa untuk Pembangunan dan Kesejahteraan</h1>
            <p>Berikut adalah daftar program-program unggulan yang dirancang untuk meningkatkan kehidupan masyarakat desa kami. Program-program ini mencakup berbagai sektor, mulai dari infrastruktur hingga pemberdayaan masyarakat.</p>
          
            <!-- Daftar Program -->
            <ul>
              <li>
                <h2>Peningkatan Infrastruktur</h2>
                <p>Membangun dan memperbaiki jalan desa, jembatan, serta fasilitas umum lainnya untuk menunjang mobilitas dan aktivitas masyarakat.</p>
              </li>
              <li>
                <h2>Program Pendidikan</h2>
                <p>Menyediakan beasiswa bagi siswa berprestasi, pelatihan keterampilan, dan fasilitas perpustakaan desa untuk meningkatkan kualitas pendidikan.</p>
              </li>
              <li>
                <h2>Pemberdayaan Ekonomi</h2>
                <p>Melaksanakan pelatihan kewirausahaan, pemberian modal usaha, dan pengembangan BUMDes (Badan Usaha Milik Desa).</p>
              </li>
              <li>
                <h2>Kesehatan Masyarakat</h2>
                <p>Menyelenggarakan layanan kesehatan gratis, posyandu, serta penyuluhan kesehatan untuk pencegahan penyakit.</p>
              </li>
              <li>
                <h2>Pengelolaan Lingkungan Hidup</h2>
                <p>Melakukan penghijauan, pengelolaan sampah berbasis masyarakat, dan pelatihan daur ulang.</p>
              </li>
              <li>
                <h2>Pengembangan Wisata Desa</h2>
                <p>Meningkatkan potensi wisata lokal dengan memperbaiki akses, promosi, dan fasilitas untuk menarik wisatawan.</p>
              </li>
              <li>
                <h2>Program Digitalisasi</h2>
                <p>Meningkatkan literasi digital warga desa dengan pelatihan teknologi informasi serta menyediakan akses internet gratis di tempat umum.</p>
              </li>
              <li>
                <h2>Pelestarian Budaya</h2>
                <p>Mendukung kegiatan seni dan budaya lokal seperti tari tradisional, festival desa, dan pelatihan kesenian.</p>
              </li>
              <li>
                <h2>Program Bantuan Sosial</h2>
                <p>Menyalurkan bantuan untuk warga yang kurang mampu, serta mendukung korban bencana alam dengan kebutuhan dasar.</p>
              </li>
              <li>
                <h2>Kerja Bakti dan Gotong Royong</h2>
                <p>Mengadakan kegiatan bersama untuk membersihkan lingkungan, memperbaiki fasilitas desa, dan mempererat solidaritas warga.</p>
              </li>
            </ul>
          
            <!-- Penutup -->
            <p>Kami percaya bahwa dengan adanya program-program ini, desa kita akan semakin maju dan sejahtera. Partisipasi aktif dari seluruh masyarakat sangat dibutuhkan untuk mensukseskan setiap program yang telah direncanakan.</p>
          `  
        }
    }
    
    if (slug === 'visi-misi'){
      value = {
          content: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2E86C1; text-align: center; border-bottom: 2px solid #2E86C1; padding-bottom: 10px;">Visi</h2>
                    <p style="text-indent: 20px; font-size: 16px;">
                        Menjadi daerah yang <strong>unggul</strong> dalam segala aspek kehidupan, 
                        berlandaskan nilai-nilai <em>keadilan, keberlanjutan, dan inovasi</em>, serta 
                        mampu memberikan kontribusi signifikan bagi kesejahteraan masyarakat dan 
                        pembangunan nasional.
                    </p>
                    <h2 style="color: #2E86C1; text-align: center; border-bottom: 2px solid #2E86C1; padding-bottom: 10px;">Misi</h2>
                    <ol style="padding-left: 40px; font-size: 16px;">
                        <li>Meningkatkan mutu pendidikan dan kesehatan masyarakat secara menyeluruh.</li>
                        <li>Mendorong pertumbuhan ekonomi berbasis teknologi dan inovasi.</li>
                        <li>Melestarikan budaya lokal dan meningkatkan pariwisata berwawasan lingkungan.</li>
                        <li>Memastikan pengelolaan sumber daya alam yang berkelanjutan dan bertanggung jawab.</li>
                        <li>Memperkuat tata kelola pemerintahan yang transparan, efektif, dan akuntabel.</li>
                        <li>Memperkokoh solidaritas sosial untuk menciptakan masyarakat yang damai dan harmonis.</li>
                    </ol>
                </div>
        `  
      }
    }

    if (slug === 'sejarah'){
      value = {
          content: `
           <div>
                        <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 10px;">
                        Kerajaan Sriwijaya
                        </h2>
                        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
                        Kerajaan maritim yang pernah berjaya di Asia Tenggara pada abad ke-7 hingga ke-13. 
                        Sriwijaya dikenal sebagai pusat perdagangan dan penyebaran agama Buddha.
                        </p>
                        <img 
                        src="http://3.bp.blogspot.com/-wnrkShr8Cdo/VPBWGf24RLI/AAAAAAAABa8/cj0NNr6euE8/s1600/sriwijaya%2B4.jpg" 
                        alt="Kerajaan Sriwijaya" 
                        style="width: 100%; max-width: 600px; border-radius: 8px; margin-top: 10px;"
                        />
                    </div>
                    <div style="margin-top: 20px;">
                        <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 10px;">
                        Pendudukan Belanda
                        </h2>
                        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
                        Periode penjajahan Belanda di wilayah Sumatra Selatan berlangsung dari tahun 1602 hingga 1942, 
                        memberikan dampak besar pada sejarah dan budaya lokal.
                        </p>
                    </div>
        `  
      }
    }

    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = { 
        data: { 
                data: {
                    value: value
                }
              },
        isLoading: false,
        isError: false,
        isFetching: false,
        refetch: () => console.log(`"Refetching data..." ${params} ${slug}`),
      };

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useStaticPage;