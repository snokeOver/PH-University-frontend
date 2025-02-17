import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {
  monthOptions,
  nameOptions,
  yearOptions,
} from "../../../components/constants/semestet";

import { zodResolver } from "@hookform/resolvers/zod";

import { academicSemesterSchema } from "../../../schemas/academicManagement";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academitManagement";
import { toast } from "sonner";
import { IAcademicSemester, IResponse } from "../../../types";

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semister");
    const name = nameOptions[Number(data.name) - 1].label;
    const semData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await createAcademicSemester(
        semData
      )) as IResponse<IAcademicSemester>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else toast.success(res.message, { id: toastId });
    } catch (error) {
      toast.error("Falied to create academic semister", { id: toastId });
      void error;
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={nameOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
