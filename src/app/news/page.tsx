import NewsList from '../../components/NewsList';

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Valorant News</h1>
      <NewsList />
    </div>
  );
}