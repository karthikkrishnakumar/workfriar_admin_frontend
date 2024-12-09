
import ForecastDetailsView from "@/module/project-forecast/forecast-details/views/page";

export default function Page({ params }: { params: { id: string } }) {
  return <ForecastDetailsView id={params.id} />;
}
