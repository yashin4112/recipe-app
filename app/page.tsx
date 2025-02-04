import Home from '../components/home'; // Import the Home component
import { getAllEntries } from '@/helper'; // Import the getAllEntries function

export const dynamic = "force-dynamic"; 

export default async function Page() {
  // Fetch data from getAllEntries
  const homePageData = await getAllEntries();

  return (
    <div>
      <Home homePageData={homePageData} /> {/* Passing the data as a prop */}
    </div>
  );
}
