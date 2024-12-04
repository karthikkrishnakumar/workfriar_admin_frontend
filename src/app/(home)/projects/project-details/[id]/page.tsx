import ProjectDetailsView from "@/module/projects/project-details/views/page";

export default function Page({ params }: { params: { id: string } }) {
  return <ProjectDetailsView id={params.id} />;
}
