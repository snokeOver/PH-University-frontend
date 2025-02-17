import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academitManagement";

const AcademicSemestet = () => {
  const { data } = useGetAllAcademicSemesterQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>this is academic semester component</h1>
    </div>
  );
};

export default AcademicSemestet;
