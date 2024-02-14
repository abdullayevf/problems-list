export async function fetchProblems(params) {
    try {
      const response = await fetch(`https://kep.uz/api/problems/?${params}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }