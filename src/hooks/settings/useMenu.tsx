function useMenu() {
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
                          order:1,
                          title: 'Home',
                          route: '/',
                          staticPage: null,
                          child: null
                      },
                      { 
                        order: 2,
                        title: 'Artikel',
                        route: '/article',
                        staticPage: null,
                        child: null
                      },
                      { 
                          order: 3,
                          title: 'Wisata',
                          route: '/tour',
                          staticPage: null,
                          child: null
                      },
                      { 
                          order: 4,
                          title: 'Profile',
                          route: '/profile',
                          staticPage: null,
                          child: [
                              { 
                                  order:1,
                                  title: 'Desa',
                                  route: '/desa',
                                  staticPage: null,
                                  child: [
                                    { 
                                        order:1,
                                        title: 'Kata Sambuatan',
                                        route: '/kata-sambutan',
                                        staticPage: 'kata-sambutan',
                                        child: null
                                    },
                                    { 
                                      order:2,
                                      title: 'Program Desa',
                                      route: '/program-desa',
                                      staticPage: 'program-desa',
                                      child: null
                                  }
                                ]
                              },
                              { 
                                  order:2,
                                  title: 'Visi Misi',
                                  route: '/visi-misi',
                                  staticPage: 'visi-misi',
                                  child: null
                              },
                              { 
                                  order:3,
                                  title: 'Sejarah',
                                  route: '/sejarah',
                                  staticPage: 'sejarah',
                                  child: null
                              }
                          ]
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
  
  export default useMenu;