import { ButtonComponent, InputComponent } from "@/components";
import './ForgotPassword.scss'
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="forgot-password-component">
      <h1>Quên mật khẩu</h1>
      <form action="">
        <InputComponent
          name="new-password"
          title="Nhập mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          className="new-password-input"
        />
        <InputComponent
          name="confirm-new-password"
          title="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          className="confirm-new-password-input"
        />
        <ButtonComponent 
          className="btn-confirm"
          label='Xác nhận'
          type="submit"
          variant="secondary"
          onClick={() => navigate('/confirm-code')}
        />
      </form>
    </div>
  )
}

export default ForgotPassword
