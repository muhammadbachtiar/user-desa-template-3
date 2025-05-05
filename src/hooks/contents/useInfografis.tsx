function useInfografis() {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = { 
        data: { 
                data: {
                    value:[
                        {
                            id: 154,
                            user_id: 1,
                            title: "Muara Enim Infografis",
                            slug: "muara-enim-infografis-1",
                            link: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/mXYEd45k0KGtYOfO6YGqKZZJEobS0Lug7vrvCLlD.jpg",
                            published_at: "2025-04-16",
                            description: "With a double light press, you can select another camera setting. Then slide to adjust that setting.",
                            meta: [
                                {
                                    key: "title",
                                    value: "Muara Enim Infografis"
                                },
                                {
                                    key: "description",
                                    value: "Tes Description"
                                },
                                {
                                    key: "keywords",
                                    value: [
                                        "keyowrds 1",
                                        "keywords 2"
                                    ]
                                }
                            ],
                            views: 0,
                            created_at: "2025-04-16T03:19:41.000000Z",
                            updated_at: "2025-04-16T03:19:41.000000Z"
                        },
                        {
                            id: 153,
                            user_id: 1,
                            title: "Muara Enim Infografis",
                            slug: "muara-enim-infografis",
                            link: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/mXYEd45k0KGtYOfO6YGqKZZJEobS0Lug7vrvCLlD.jpg",
                            published_at: "2025-04-16",
                            description: "Now you can take the perfect photo or video in record time. ",
                            meta: [
                                {
                                    key: "title",
                                    value: "Muara Enim Infografis"
                                },
                                {
                                    key: "description",
                                    value: "Tes Description"
                                },
                                {
                                    key: "keywords",
                                    value: [
                                        "keyowrds 1",
                                        "keywords 2"
                                    ]
                                }
                            ],
                            views: 0,
                            created_at: "2025-04-16T03:19:32.000000Z",
                            updated_at: "2025-04-16T03:19:32.000000Z"
                        },
                        {
                            user_id: 1,
                            id: 152,
                            title: "retes4",
                            slug: "retes4",
                            link: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/X92UuQC0O8HNFgbS4GgrRp3CEQ5UaEcfKytYnSJ3.jpg",
                            published_at: "2025-04-20",
                            description: "Apple Intelligence is designed to protect your privacy at every step. ",
                            meta: [
                                {
                                    key: "test",
                                    value: "test12345"
                                }
                            ],
                            views: 0,
                            created_at: "2025-04-16T03:15:58.000000Z",
                            updated_at: "2025-04-16T03:15:58.000000Z"
                        },
                        {
                            id: 151,
                            user_id: 1,
                            title: "msg1",
                            slug: "msg1",
                            link: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/X92UuQC0O8HNFgbS4GgrRp3CEQ5UaEcfKytYnSJ3.jpg",
                            published_at: "2025-04-19",
                            description: "Apple Intelligence can draw on larger Apple-designed server-based models, running on Apple silicon, to handle more complex requests for yo",
                            meta: [
                                {
                                    key: "info",
                                    value: "muara_enim"
                                }
                            ],
                            views: 0,
                            created_at: "2025-04-16T02:58:01.000000Z",
                            updated_at: "2025-04-16T02:58:01.000000Z"
                        }
                    ]
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
  
  export default useInfografis;