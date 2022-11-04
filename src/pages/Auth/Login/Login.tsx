import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';

// Toast
import { toast } from 'react-toastify';

// Service
import authServices from 'services/auth.service';

// Utils
import { ApiError } from 'utils/api';

// Component
import { Button } from 'common/components/Button';
import { Header } from 'common/components/Header';
import { Input } from 'common/components/Input';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { LoginType } from 'common/types/Login.type';
import { LayoutContext } from 'context/LayoutContext';

// Schema
const schema = yup.object().shape({
  deviceCode: yup
    .string()
    .required('Phone number is required')
    .max(9, 'The phone number must be max. 9 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const { initLoading, finishLoading } = useContext(LayoutContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async ({ deviceCode }: LoginType) => {
    initLoading();
    try {
      const res = await authServices.login(deviceCode);
      handleLogin(res);
      toast.success(` ${res.message} !`);
    } catch (error) {
      const err = error as ApiError;
      toast.error(`${err.message} !`);
    }
    finishLoading();
    navigate('/');
  };

  return (
    <div className="h-full gap-10 sm:gap-20 flex flex-col items-center justify-center mx-auto w-[90%] sm:w-full">
      <div>
        <Header
          title={t('common.welcome')}
          className="text-[21px] leading-tight md:text-[36px] lg:text-[56px] text-[#003060] text-center"
        />
        <Header
          className="font-medium leading-tight text-[36px] sm:text-[56px] lg:text-[83px] text-[#003060] text-center font"
          title="Gjestbok's panel"
        />
      </div>
      <div className="mx-auto  max-w-md">
        <div className="flex flex-col gap-2">
          <div className="">
            <h6 className="text-base text-[#003060]">
              {t('pages.login.info')}
            </h6>
          </div>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex items-center gap-2 flex-nowrap"
          >
            <Input
              {...register('deviceCode')}
              label={t('pages.login.label.deviceCode')}
              placeholder={t('pages.login.placeholder.enterDeviceCode')}
              errors={errors}
              wrapperClassName={'flex-1'}
              size="sm"
            />
            <Button
              className="px-[24px] py-[14px] self-end disabled:opacity-70 transition-all duration-300"
              size="sm"
              type="submit"
              title={t('button.connect')}
              disabled={!isValid}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
