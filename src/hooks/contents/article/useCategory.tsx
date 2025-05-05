function useCategory() {
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
                        {id: 1, name: "Olahraga"},
                        {id: 2, name: "Bisnis"},
                        {id: 3, name: "Politik"},
                        {id: 4, name: "Teknologi"},
                        {id: 5, name: "Fashion"},
                        {id: 6, name: "Developer"}
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
  
  export default useCategory;