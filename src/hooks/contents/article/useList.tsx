function useArticle(params: Record<string, string | number> = {} ) {
    const {
        data: app,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = { 
        data: { 
                data: {
                    value:[
                        {
                            id: 28,
                            category_id: 11,
                            title: "asdsa",
                            description: "Wtrite down the article content ...",
                            thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                            published_at: "2025-04-15",
                            slug: "selamat-datang-muara-enim-1",
                            user_id: 1,
                            meta: [
                                {
                                    key: "title",
                                    value: "asdsa"
                                },
                                {
                                    key: "description",
                                    value: "asdsaasdsa"
                                },
                                {
                                    key: "keywords",
                                    value: [
                                        "keyowrds 1",
                                        "keywords 2"
                                    ]
                                }
                            ],
                            views: 8,
                            category: {
                                id: 11,
                                name: "Bisnis"
                            }
                        },
                        {
                            id: 29,
                            category_id: 11,
                            title: "asdsa",
                            description: "Wtrite down the article content ...",
                            thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                            published_at: "2025-04-15",
                            slug: "selamat-datang-muara-enim-1",
                            user_id: 1,
                            meta: [
                                {
                                    key: "title",
                                    value: "asdsa"
                                },
                                {
                                    key: "description",
                                    value: "asdsaasdsa"
                                },
                                {
                                    key: "keywords",
                                    value: [
                                        "keyowrds 1",
                                        "keywords 2"
                                    ]
                                }
                            ],
                            views: 8,
                            category: {
                                id: 11,
                                name: "Bisnis"
                            }
                        },
                         {
                            id: 30,
                            category_id: 11,
                            title: "asdsa",
                            description: "Wtrite down the article content ...",
                            thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                            published_at: "2025-04-15",
                            slug: "selamat-datang-muara-enim-1",
                            user_id: 1,
                            meta: [
                                {
                                    key: "title",
                                    value: "asdsa"
                                },
                                {
                                    key: "description",
                                    value: "asdsaasdsa"
                                },
                                {
                                    key: "keywords",
                                    value: [
                                        "keyowrds 1",
                                        "keywords 2"
                                    ]
                                }
                            ],
                            views: 8,
                            category: {
                                id: 11,
                                name: "Bisnis"
                            }
                        },
                        {
                            id: 31,
                            category_id: 11,
                            title: "asdsa",
                            description: "Wtrite down the article content ...",
                            thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                            published_at: "2025-04-15",
                            slug: "selamat-datang-muara-enim-1",
                            user_id: 1,
                            meta: [
                                {
                                    key: "title",
                                    value: "asdsa"
                                },
                                {
                                    key: "description",
                                    value: "asdsaasdsa"
                                },
                                {
                                    key: "keywords",
                                    value: [
                                        "keyowrds 1",
                                        "keywords 2"
                                    ]
                                }
                            ],
                            views: 8,
                            category: {
                                id: 11,
                                name: "Bisnis"
                            }
                        },
                    ]
                }
              },
        isLoading: false,
        isError: false,
        isFetching: false,
        refetch: () => console.log(`"Refetching data..." ${params}`),
      };

    return {
      data: app?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useArticle;