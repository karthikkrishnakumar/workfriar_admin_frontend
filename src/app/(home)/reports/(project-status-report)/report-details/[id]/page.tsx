import ProjectReportTabs from "@/module/reports/components/project-report-tabs/project-report-tabs";
import { decodeToken } from "@/utils/token-generator/token-util";

export default function page ({ params }: { params: { id: string} }) {
  const id  = decodeToken(params.id)
  return (
    <ProjectReportTabs id={id}/>
  )
}

