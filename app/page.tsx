import Home from '../components/home'; // Import the Home component
import { getAllEntries } from '@/helper'; // Import the getAllEntries function

export default async function Page() {
  // Fetch data from getAllEntries
  const homePageData = await getAllEntries();
  // const response = await uploadAssetToContentstack();
  // console.log("res",response)

  // Pass the fetched data as a prop to the Home component
  return (
    <div>
      <Home homePageData={homePageData} /> {/* Passing the data as a prop */}
    </div>
  );
}
