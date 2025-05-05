function useFooter() {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = { 
        data: { 
                data: {
                    value:{
                      contactUs: {
                        address: "Jl. Tegar Beriman, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16914",
                        phone: "(024) 3513366 – 3515871",
                        email: "muaraenimpemkot@gmail.com",
                      },
                      socialMedia: {
                        Facebook: {
                          profileUrl: "facebook.com",
                          iconUrl: null,
                        },
                        Instagram: {
                          profileUrl: "instagram.com",
                          iconUrl: null,
                        },
                        X: {
                          profileUrl: "x.com",
                          iconUrl: null,
                        },
                        TikTok: {
                          profileUrl: "tiktok.com",
                          iconUrl: null,
                        },
                      },
                    }
                }
              },
        isLoading: false,
        isError: false,
        isFetching: false,
        refetch: () => console.log("Refetching data..."),
      };

  
    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useFooter;