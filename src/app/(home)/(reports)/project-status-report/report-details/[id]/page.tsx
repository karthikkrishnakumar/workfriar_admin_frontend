import ProjectReportTabs from "@/module/reports/components/project-report-tabs/project-report-tabs";

export default function page ({ params }: { params: { id: string } }) {
  return (
    <ProjectReportTabs id={params.id}/>
  )
}

