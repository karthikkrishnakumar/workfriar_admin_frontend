import EmployeeDetailsTabs from "@/module/organization/components/employee-details-tabs/employee-details-tabs";

export default function page ({ params }: { params: { id: string } }) {
  return (
    <EmployeeDetailsTabs id={params.id}/>
  )
}

