import { ButtonComponent, InputComponent } from "@/components";
import './ConfirmCode.scss'
import { useNavigate } from "react-router-dom";
const ConfirmCode = () => {
  const navigate = useNavigate();
  return (
    <div className="confirm-code-component">
      <h1>Nhập mã xác nhận</h1>
      <p>Vui lòng điền mã xác nhận được gửi tới email: <span>abc@gmail.com</span></p>
      <form action="">
        <InputComponent
          name="confirm-code"
          placeholder="Nhập mã xác nhận"
          className="confirm-code-input"
        />
        <ButtonComponent 
          className="btn-confirm"
          label='Gửi'
          type="submit"
          variant="secondary"
          onClick={() => navigate('/login')}
        />
      </form>
    </div>
  )
}

export default ConfirmCode
