const apiUrl = import.meta.env.VITE_API_URL;

export const addBook = async (formData) => {
  try {
    console.log('Sending book data:', formData);

    const response = await fetch(`${apiUrl}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Important for JSON body
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add book");
    }

    const data = await response.json();
    console.log("Book added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding book:", error.message);
    alert("Failed to add book: " + error.message);
  }
};
