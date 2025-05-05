function useTour(params: Record<string, string | number> = {} ) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = { 
        data: { 
                data: {
                    value:[{
                        id: 51,
                        user_id: 1,
                        title: "Curup Bali di Muara Enim",
                        slug: "curup-bali-di-muara-enim",
                        description: "Muara Enim merupakan salah satu kabupaten di Sumatera Selatan (Sumsel). Ada banyak destinasi wisata di Muara Enim yang bisa detikers dikunjungi jika datang ke daerah ini.",
                        thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/w9nPZRZjRAZL3DVjCVVkgrMxjYbfpfY5IrQaI0lT.jpg",
                        latitude: "https://maps.app.goo.gl/rQUsrmZm5MRGS5seA",
                        longitude: "https://maps.app.goo.gl/rQUsrmZm5MRGS5seA",
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
                                ke: "Instagram",
                                valu: "https://instagram.com"
                                },
                                {
                                ke: "YouTube",
                                valu: "https://www.youtube.com"
                                },
                                {
                                ke: "X",
                                valu: "https://x.com"
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
                    },
                        {
                          id: 1,
                          user_id: 101,
                          title: "Sample Title 1",
                          slug: "sample-title-1",
                          description: "Description for sample title 1.",
                          thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/w9nPZRZjRAZL3DVjCVVkgrMxjYbfpfY5IrQaI0lT.jpg",
                          latitude: "12.34",
                          longitude: "56.78",
                          address: "Address for sample 1",
                          link: {
                            sosmed: [],
                            email: "sample1@email.com",
                            website: "sample1.com",
                            gmap: "https://maps.google.com/?q=sample1"
                          },
                          published_at: "2025-04-20",
                          views: 123,
                          created_at: "2025-04-19T10:30:00.000000Z",
                          updated_at: "2025-04-20T08:00:00.000000Z",
                          meta: [
                            { key: "title", value: "Meta Title 1" },
                            { key: "keywords", value: ["sample", "title", "mock"] }
                          ]
                        },
                        {
                          id: 2,
                          user_id: 102,
                          title: "Sample Title 2",
                          slug: "sample-title-2",
                          description: "Description for sample title 2.",
                          thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/w9nPZRZjRAZL3DVjCVVkgrMxjYbfpfY5IrQaI0lT.jpg",
                          latitude: "98.76",
                          longitude: "54.32",
                          address: "Address for sample 2",
                          link: {
                            sosmed: ["facebook.com/sample2"],
                            email: "sample2@email.com",
                            website: "sample2.com",
                            gmap: "https://maps.google.com/?q=sample2"
                          },
                          published_at: "2025-04-21",
                          views: 456,
                          created_at: "2025-04-20T12:00:00.000000Z",
                          updated_at: "2025-04-21T10:00:00.000000Z",
                          meta: [
                            { key: "title", value: "Meta Title 2" },
                            { key: "keywords", value: ["mock", "data", "example"] }
                          ]
                        },
                        {
                          id: 3,
                          user_id: 103,
                          title: "Sample Title 3",
                          slug: "sample-title-3",
                          description: "Description for sample title 3.",
                          thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/w9nPZRZjRAZL3DVjCVVkgrMxjYbfpfY5IrQaI0lT.jpg",
                          latitude: "45.67",
                          longitude: "89.01",
                          address: "Address for sample 3",
                          link: {
                            sosmed: [],
                            email: "sample3@email.com",
                            website: "sample3.com",
                            gmap: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/w9nPZRZjRAZL3DVjCVVkgrMxjYbfpfY5IrQaI0lT.jpg"
                          },
                          published_at: "2025-04-22",
                          views: 789,
                          created_at: "2025-04-21T14:00:00.000000Z",
                          updated_at: "2025-04-22T09:00:00.000000Z",
                          meta: [
                            { key: "title", value: "Meta Title 3" },
                            { key: "keywords", value: ["example", "mock", "test"] }
                          ]
                        },
                        {
                          id: 4,
                          user_id: 104,
                          title: "Sample Title 4",
                          slug: "sample-title-4",
                          description: "Description for sample title 4.",
                          thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/w9nPZRZjRAZL3DVjCVVkgrMxjYbfpfY5IrQaI0lT.jpg",
                          latitude: "67.89",
                          longitude: "12.34",
                          address: "Address for sample 4",
                          link: {
                            sosmed: ["twitter.com/sample4"],
                            email: "sample4@email.com",
                            website: "sample4.com",
                            gmap: "https://maps.google.com/?q=sample4"
                          },
                          published_at: "2025-04-23",
                          views: 100,
                          created_at: "2025-04-22T16:00:00.000000Z",
                          updated_at: "2025-04-23T11:00:00.000000Z",
                          meta: [
                            { key: "title", value: "Meta Title 4" },
                            { key: "keywords", value: ["data", "mock", "sample"] }
                          ]
                        }
                      
                      
                 ]
                }
              },
        isLoading: false,
        isError: false,
        isFetching: false,
        refetch: () => console.log(`"Refetching data..." ${params}`),
      };

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useTour;