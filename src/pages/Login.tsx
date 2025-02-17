import { Button, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authAPI";
import { useAppDispatch } from "../redux/hooks";
import { IUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    id: "A-0001",
    password: "123456",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (formData: FieldValues) => {
    // console.log(formData);
    const toastId = toast.loading("Loggin in");
    try {
      const { data } = await login({
        id: formData.id,
        password: formData.password,
      });
      const user = verifyToken(data.data.accessToken) as IUser;

      dispatch(setUser({ user: user, token: data.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("Logged In", { id: toastId, duration: 2000 });
    } catch (err) {
      toast.error("Something went wrong while logging in", {
        id: toastId,
        duration: 2000,
      });
      void err;
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="id" label="ID:" />
        <PHInput type="text" name="password" label="Password:" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
