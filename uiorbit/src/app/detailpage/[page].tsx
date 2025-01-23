import { useRouter } from 'next/router';
import libraries from '../../Data/Data'; // For TypeScript
export default function LibraryDetail() {
  const router = useRouter();
  const { name } = router.query;

  // Find the library by name
  const library = libraries.find(
    (lib) => lib.name.toLowerCase().replace(/\s+/g, '-') === name
  );

  if (!library) {
    return <p>Library not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">{library.name}</h1>
      <p>{library.overview}</p>
      <div className="flex gap-6 mt-8">
        <div>
          <h2 className="font-semibold">Weekly Downloads</h2>
          <p>{library.weeklyDownloads}</p>
        </div>
        <div>
          <h2 className="font-semibold">Contributors</h2>
          <p>{library.contributors}</p>
        </div>
        <div>
          <h2 className="font-semibold">Rating</h2>
          <p>{library.rating}</p>
        </div>
      </div>
    </div>
  );
}
