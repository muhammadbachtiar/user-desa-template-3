function useTourDetail(params: Record<string, string | number> = {}, slug: string ) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = { 
        data: { 
                data: {
                    value: {
                      id: 51,
                      user_id: 1,
                      title: "Curup Bali di Muara Enim",
                      slug: "curup-bali-di-muara-enim",
                      description: "Muara Enim merupakan salah satu kabupaten di Sumatera Selatan (Sumsel). Ada banyak destinasi wisata di Muara Enim yang bisa detikers dikunjungi jika datang ke daerah ini.",
                      thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/w9nPZRZjRAZL3DVjCVVkgrMxjYbfpfY5IrQaI0lT.jpg",
                      latitude: "-4.0592127",
                      longitude: "103.7668845",
                      address: "Bedegung, Tanjung Agung, Muara Enim Regency, South Sumatra",
                      link: {
                          email: "email@email.com",
                          website: "detik.com",
                          gmap: "https://maps.app.goo.gl/rQUsrmZm5MRGS5seA",
                          sosmed: [
                              {
                                  key: "Facebook",
                                  value: "https://www.facebook.com"
                              },
                              {
                                  key: "TikTok",
                                  value: "https://www.tiktok.com"
                              },
                              {
                                  key: "Threads",
                                  value: "https://threads.com"
                              },
                              {
                              key: "Instagram",
                              value: "https://instagram.com"
                              },
                              {
                              key: "YouTube",
                              value: "https://www.youtube.com"
                              },
                              {
                              key: "X",
                              value: "https://x.com"
                              }
                          ]
                      },
                      published_at: "2025-04-22",
                      views: 14,
                      created_at: "2025-04-22T03:38:33.000000Z",
                      updated_at: "2025-04-27T10:39:46.000000Z",
                      meta: [
                          {
                              key: "title",
                              value: "Curup Bali di Muara Enim"
                          }
                      ]
                  }
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
  
  export default useTourDetail;