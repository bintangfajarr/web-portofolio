import ItemDetailPage from "@/components/ItemDetailPage";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <ItemDetailPage endpoint="projects" id={params.id} />;
}
