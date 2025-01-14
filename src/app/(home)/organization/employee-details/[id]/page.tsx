import EmployeeDetailsTabs from "@/module/organization/components/employee-details-tabs/employee-details-tabs";
import { decodeToken } from "@/utils/token-generator/token-util";

export default function page ({ params }: { params: { id: string } }) {
  const id = decodeToken(params.id);
  return (
    <EmployeeDetailsTabs id={id}/>
  )
}

