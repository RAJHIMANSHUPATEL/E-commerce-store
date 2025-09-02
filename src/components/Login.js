import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const FormWrapper = styled.form`
  background-color: #ffffff;
  padding: 40px 50px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #6c63ff;
    box-shadow: 0 0 5px rgba(108, 99, 255, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: #6c63ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #574fd6;
  }
`;

const Message = styled.div`
  margin-top: 15px;
  text-align: center;
  color: ${props => (props.success ? "green" : "#ff4d4f")};
`;

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault(); // prevent default form submission

        try {
            const response = await axios.post(
                "https://congenial-giggle-wjj775jr7gphgw47-3000.app.github.dev/api/user/login",
                input
            );

            console.log("Login response:", response.data);

            // Access token safely
            const token = response.data.token || response.data.data?.token;

            if (token) {
                localStorage.setItem("token", token);
                setMessage("Login successful!");
                setSuccess(true);
            } else {
                setMessage("Login failed! No token returned.");
                setSuccess(false);
            }
        } catch (err) {
            console.error("Login failed:", err);
            setMessage("Login failed! Check credentials.");
            setSuccess(false);
        }
    };

    return (
        <LoginContainer>
            <FormWrapper onSubmit={submitHandler}>
                <FormTitle>Login</FormTitle>

                <InputGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        required
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={input.email}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        required
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={input.password}
                        onChange={handleChange}
                    />
                </InputGroup>

                <Button type="submit">Submit</Button>

                {message && <Message success={success}>{message}</Message>}
            </FormWrapper>
        </LoginContainer>
    );
};

export default Login;
