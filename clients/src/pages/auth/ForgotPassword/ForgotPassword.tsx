import { BackComponent, ButtonComponent, ErrorMessage, InputComponent, LoadingComponent, Overlay } from "@/components";
import './ForgotPassword.scss';
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "@/types/Object";
import { useState } from "react";
import isValidPassword from "@/utils/isValidPassword";
import { loadingStore, overlayStore } from "@/store";
import { toast } from "react-toastify";
import { checkEmailExist, verifyAndResetPassword } from "@/api/userApi";
import { IoClose } from "react-icons/io5";
const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowConfirmCode, setIsShowConfirmCode] = useState(false);
  const [verifyData, setVerifyData] = useState<{ email: string, token: string, newPassword: string; }>({ email: '', token: '', newPassword: '' });
  const { showOverlay, hideOverlay, isShowOverlay } = overlayStore();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();
  const { showLoading, hideLoading, isShowLoading } = loadingStore();
  // const { showOverlay, hideOverlay, isShowOverlay } = overlayStore();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: { email: string, matKhau: string; } = {
      email: data['email'] + '',
      matKhau: data['new-password'] + ''
    };
    if (payload.matKhau.length < 8) {
      setErrorMessage('Mật khẩu phải lớn hơn 8 ký tự!');
    } else if (!isValidPassword(payload.matKhau + '')) {
      setErrorMessage('Mật khẩu phải chứa ít nhất 1 ký tự in hoa, 1 chữ số, 1 ký tự đặc biệt!');
    } else if (payload.matKhau !== data['confirm-new-password']) {
      setErrorMessage('Nhập lại mật khẩu phải trùng với mật khẩu!');
    } else {
      setErrorMessage('');
      try {
        showLoading();
        const token = await checkEmailExist(payload.email);
        if (!token) {
          setErrorMessage('Email không tồn tại trong hệ thống!');
        } else {
          showOverlay();
          setIsShowConfirmCode(true);
          setVerifyData({ email: payload.email, newPassword: payload.matKhau, token });
        }
      } catch (error) {
        toast.error('Đổi mật khẩu thất bại!');
      } finally {
        hideLoading();
      }
    }
  };

  const onConfirmCodeSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: { email: string, code: string, token: string, newPassword: string; } = {
      email: verifyData.email,
      code: data['confirm-code'].toString(),
      token: verifyData.token,
      newPassword: verifyData.newPassword
    };
    try {
      const confirmResult = await verifyAndResetPassword(payload);
      console.log(confirmResult);
      if (confirmResult.message) {
        hideOverlay();
        setIsShowConfirmCode(false);
        toast.success('Đổi mật khẩu thành công!');
        navigate('/login');
      } else {
        setErrorMessage('Mã xác nhận không đúng');
      }
    } catch (error) {
      toast.error('Mã xác minh không đúng!');
    }
  };
  return (
    <>
      {isShowLoading && <LoadingComponent />}
      {isShowOverlay && <Overlay />}
      <div style={{margin: '64px 0 0 64px'}}>
        <BackComponent backTitle="Trở về" onBack={() => { navigate(-1); }} />
      </div>
      <div className="forgot-password-component">
        <h1>Quên mật khẩu</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
          <InputComponent
            name="email"
            title="Email"
            placeholder="Nhập email"
            className="new-password-input"
            register={register}
            isRequired
            onChange={() => {
              setErrorMessage('');
            }}
          />
          <InputComponent
            name="new-password"
            title="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            className="new-password-input"
            register={register}
            type="password"
            isRequired
            onChange={() => {
              setErrorMessage('');
            }}
          />
          <InputComponent
            name="confirm-new-password"
            title="Nhập lại mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            className="confirm-new-password-input"
            register={register}
            type="password"
            isRequired
            onChange={() => {
              setErrorMessage('');
            }}
          />
          {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
          <ButtonComponent
            className="btn-confirm"
            label='Xác nhận'
            type="submit"
            variant="secondary"
          />
        </form>
        <div className="confirm-code-component" style={{ transform: isShowConfirmCode ? 'translateY(0%)' : 'translateY(-200%)' }}>
          <div className="close-btn">
            <IoClose size={28} className="close-icon" onClick={() => {
              setIsShowConfirmCode(false);
              hideOverlay();
            }} />
          </div>
          <h1>Nhập mã xác nhận</h1>
          <p>Vui lòng điền mã xác nhận được gửi tới email: <span>{verifyData.email}</span></p>
          <form className="confirm-code-box" onSubmit={handleSubmit(onConfirmCodeSubmit)}>
            <InputComponent
              name="confirm-code"
              placeholder="Nhập mã xác nhận"
              className="confirm-code-input"
              register={register}
              onChange={() => setErrorMessage('')}
            />
            <ButtonComponent
              className="btn-confirm"
              label='Gửi'
              type="submit"
              variant="secondary"
            />
          </form>
          {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
        </div>
      </div>

    </>
  );
};

export default ForgotPassword;
