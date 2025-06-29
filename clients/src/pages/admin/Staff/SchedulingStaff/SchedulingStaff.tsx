import { BackComponent } from "@/components";
import './SchedulingStaff.scss';
import getDaysInMonth from "@/utils/getDaysInMonth";
import { useEffect, useState } from "react";

interface IProps {
  setIsShowScheduling: React.Dispatch<React.SetStateAction<boolean>>;
}

const SchedulingStaff = (props: IProps) => {
  const [daysOfMonth, setDaysOfMonth] = useState<number>();

  useEffect(() => {
    calDaysOfMonth();
  }, []);

  const calDaysOfMonth = () => {
    setDaysOfMonth(getDaysInMonth(2025, 6));
  };

  const { setIsShowScheduling } = props;
  return (
    <div className="scheduling-staff-component">
      <div className="scheduling-staff-header">
        <BackComponent
          backTitle="Quay lại danh sách nhân viên"
          onBack={() => { setIsShowScheduling(false); }}
        />
      </div>
      <div className="scheduling-staff-body">
        
      </div>
    </div>
  );
};

export default SchedulingStaff;
