function useInformation(params: Record<string, string | number> = {}, slug: string) {
    
    interface value {
        title: string,
        subTitle?: string,
        description?: string,
        imageUrl?: string,
        videoUrl?: string, 
    }
    
    let value: value = { title: ""}

    if(slug === "tour"){
        value = {
            title: "Pojok Wisata",
            subTitle: "Nikmati Pesona Alam & Budaya Tanpa Batas",
            description: "Rasakan keseruan petualangan yang penuh warna! Jelajahi tempat-tempat indah, kuliner khas, dan budaya yang memikat. Dari perjalanan santai hingga ekspedisi penuh tantangan, temukan berbagai destinasi wisata.",
            imageUrl: "https://www.trendwisata.com/wp-content/uploads/2023/05/1fdc0f893412ce55f0d2811821b84d3b-177.jpg"
          }
    }

    if(slug === "hero"){
        value = {
            title: "Jakarta Jati Diri Indonesia, Megapolitan Dunia",
            description: "Kehidupan perkotaan yang semarak dengan berbagai keragaman, dari warisan budaya, inovasi tanpa henti, hingga destinasi kelas dunia yang memikat. Selamat datang!",
            videoUrl: "/Visit Muara Enim Teaser.mp4"
          }
    }

    if(slug === "enterprise"){
        value = {
            title: "UMKM Desa",
            description: "Temukan produk dan jasa unggulan dari UMKM lokal desa. Temukan produk dan jasa unggulan dari UMKM lokal desa",
            imageUrl: "/images/muara-enim-skyline.jpg"
        }
    }

    if(slug === "article"){
        value = {
            title: "Daftar Artikel",
            imageUrl: "/images/muara-enim-skyline.jpg"
          }
    }

    if(slug === "app"){
        value = {
            title: "Layanan Digital",
            subTitle: "Kabupaten Muara Enim"
        }
    }

    if(slug === "profile"){
      value = {
          title: "Profil Desa Kedungwungu",
          description: "Mengenal sejarah, visi misi, dan struktur pemerintahan Desa Kedungwungu",
          imageUrl: "/images/muara-enim-skyline.jpg"
      }
    }

    if(slug === "statistic"){
      value = {
          title: "Statistik Desa Kedungwungu",
          description: "Data dan perkembangan desa dalam bentuk visualisasi yang informatif",
          imageUrl: "/images/muara-enim-skyline.jpg"
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
        refetch: () => console.log(`Refetching data...${params}`),
      };

  
    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useInformation;