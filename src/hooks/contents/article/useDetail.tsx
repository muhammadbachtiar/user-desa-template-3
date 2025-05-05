function useArticleDetail(params: Record<string, string | number> = {}, slug: string ) {
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
                        id: 1,
                        user_id: 101,
                        category_id: "technology",
                        title: "Introduction to Artificial Intelligence",
                        description: "Learn the basics of artificial intelligence and its applications.",
                        slug: "introduction-to-artificial-intelligence",
                        content: `
                        <h1>Exploring the World of Artificial Intelligence (AI)</h1>
                        <p>Artificial Intelligence (AI) is revolutionizing the way we interact with technology. From smart assistants to advanced robotics, AI is becoming an integral part of our lives.</p>
                      
                        <!-- Gambar -->
                        <img src="https://tse4.mm.bing.net/th?id=OIP.HjY4-XDU5El6yrLcveTjZQHaEH&pid=Api&P=0&h=220" alt="Overview of Artificial Intelligence" />
                      
                        <!-- Tabel -->
                        <h2>Applications of AI</h2>
                        <table border="1">
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th>Examples</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Healthcare</td>
                              <td>Diagnosis systems, personalized medicine</td>
                            </tr>
                            <tr>
                              <td>Finance</td>
                              <td>Fraud detection, algorithmic trading</td>
                            </tr>
                            <tr>
                              <td>Entertainment</td>
                              <td>Recommendation systems, video game AI</td>
                            </tr>
                          </tbody>
                        </table>
                      
                        <!-- Daftar -->
                        <h2>Why is AI Important?</h2>
                        <ul>
                          <li>Automation of repetitive tasks</li>
                          <li>Improving decision-making processes</li>
                          <li>Enhancing user experiences</li>
                          <li>Creating opportunities for new innovations</li>
                        </ul>
                      
                        <!-- Penutup -->
                        <p>As we continue to develop AI, it's crucial to consider ethical implications and ensure that technology is used responsibly for the benefit of humanity.</p>
                      `,
                        published_at: "05 May 2025 06:15",
                        views: 1234,
                        thumbnail: "https://example.com/ai-thumbnail.jpg",
                        meta: [
                          { key: "author", value: "John Doe" },
                          { key: "keywords", value: ["AI", "Machine Learning", "Technology"] }
                        ],
                        created_at: "2025-04-20T08:00:00Z",
                        updated_at: "2025-04-26T08:00:00Z",
                        category: {
                          id: "tech",
                          name: "Technology",
                          description: "All things technology-related.",
                        },
                        user: {
                            id: "tech",
                            name: "Johm Doe",
                            description: "All things technology-related.",
                        },
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
  
  export default useArticleDetail;