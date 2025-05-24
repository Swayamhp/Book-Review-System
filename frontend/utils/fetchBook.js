// export default fetchBook = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/books/${id}`);
//         const data = await response.json();
//         setBook(data);
//         setLoading(false);
//         console.log(response);
//       } catch (err) {
//         setError("Failed to load book.");
//         setLoading(false);
//       }
//     };