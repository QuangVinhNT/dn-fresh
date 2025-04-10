import { AdminContainerComponent, BackComponent, ButtonComponent } from "@/components";
import './EditImportFood.scss'

interface IProps {
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>
}

const EditImportFood = (props: IProps) => {
  const {setIsShowDetail, setIsShowEdit} = props
  return (
    <div className="edit-import-food-component">
      <div className="edit-import-food-header">
        <BackComponent
        backTitle="Quay lại chi tiết phiếu nhập"
        onBack={() => {
          setIsShowDetail(true)
          setIsShowEdit(false)
        }}
        />
        <div className="cancel-save">
          <ButtonComponent
            className="btn-cancel"
            type="no-submit"
            label="Hủy thay đổi"
            onClick={() => { }}
          />
          <ButtonComponent
            className="btn-save"
            type="no-submit"
            label="Lưu thay đổi"
            variant="primary"
            onClick={() => { }}
          />
        </div>
      </div>
      <div className="edit-import-food-body">
        <AdminContainerComponent 
          title='Thông tin phiếu nhập'
          children={
            <>
            </>
          }
        />
      </div>
    </div>
  )
}

export default EditImportFood
